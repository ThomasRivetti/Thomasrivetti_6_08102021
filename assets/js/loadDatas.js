//récupération des données JSON pour la page des photographes
//todo liste des photographes à manipuler

fetch('https://thomasrivetti.github.io/Thomasrivetti_6_08102021/api/photographer.json')
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(value) {
        const searchParams = new URLSearchParams(window.location.search);
        const photographerId = searchParams.get("id");
        
        showPhotographerCard(value.photographers, photographerId);
        showPhotographerMedias(value.media, photographerId);
        createLightboxItems(value.media, photographerId);
    })
    .catch(function(error) {
        console.error(error);
    });

function showPhotographerCard(jsonObj, id) {
    const photographer = jsonObj.filter(person => person.id == id);
    const sectionPhotographerCard = document.getElementById("photographerCard");
    const templatePhotographerCard = `
        <div class="photographer__info--phPage">
            <h1 class="photographer__name photographer__name--phPage">${photographer[0].name}</h1>
            <p class="photographer__place photographer__place--phPage">${photographer[0].city}, ${photographer[0].country}</p>
            <p class="photographer__quote photographer__quote--phPage">${photographer[0].tagline}</p>
            <ul class="photographer__taglist photographer__taglist--phpage">
                ${photographer[0].tags.map(tag => `<li class="photographer__tag"><a href="#" aria-label="Triez les photographes sur le thème des portraits">#${tag}</a></li>` ).join(" ")}              
            </ul>
        </div>
        <button id="openModalBtn" class="modal__btn modal__btn--open" onclick="launchModal();">Contactez-moi</button>
        <img src="${photographer[0].portrait}" alt="photographie du profit de Mimi Keel" class="photographer__portrait photographer__portrait--phPage">`;
    sectionPhotographerCard.innerHTML = templatePhotographerCard;
    
    //mise à jour du prix des photographes
    const photographerPrice = document.getElementById("photographerPrice");
    photographerPrice.innerHTML = photographer[0].price + "€/Jour";


    //nom du photographe dans la modale
    const modalPhotographerName = document.getElementById("modalPhotographerName");
    modalPhotographerName.innerHTML = photographer[0].name;
}

function showPhotographerMedias(jsonObj, id) {    
    const medias = jsonObj.filter(media => media.photographerId == id);
    const sectionPhotographerMedias = document.getElementById("photographerMedias");
    let templatePhotographerMedias = ``;
    let photographerTotalLikes = 0;
    medias.forEach((media, i) => {
        templatePhotographerMedias += `
            <article class="work__block">
                <a href="#" class="work__imgcontainer" title="${media.alt}, s'ouvre dans l'album">
                    ${(media.image != undefined) ? `<img src="${media.image}" alt="${media.alt}" onclick="openLightbox();currentSlide(${i+1})" class="work__img"/>` : `<video controls muted onclick="openLightbox();currentSlide(${i+1})" class="work__video"><source src="${media.video}" type="video/mp4"></video>` }
                </a>
                <div class="work__legend">
                    <h2 class="work__name">${media.title}</h2>
                    <p class="work__likes">${media.likes}</p>
                    <button role="button" aria-pressed="false" onclick="addLike(event);" class="work__likeBtn" aria-label="liker"><i class="far fa-heart"></i></button>
                </div>
            </article>`
        photographerTotalLikes += media.likes; 

    });
    sectionPhotographerMedias.innerHTML = templatePhotographerMedias;

    //mise à jour du tatal des likes
    const photographerLikes = document.getElementById("photographerLikes");
    photographerLikes.innerHTML = photographerTotalLikes;
}

//incrémentation likes du media
function addLike(event) {
    const mediaLikes = event.target.previousElementSibling;
    const totalLikes = document.getElementById("photographerLikes");
    if(event.target.getAttribute("aria-pressed") == "false"){
        mediaLikes.innerHTML = parseInt(mediaLikes.innerText) + 1;
        totalLikes.innerHTML = parseInt(totalLikes.innerText) + 1;
        event.target.setAttribute("aria-pressed", "true");
        event.target.classList.add("is-pressed");
    } else {
        mediaLikes.innerHTML = parseInt(mediaLikes.innerText) - 1;
        totalLikes.innerHTML = parseInt(totalLikes.innerText) - 1;
        event.target.setAttribute("aria-pressed", "false");
        event.target.classList.remove("is-pressed");
    }
}


//lightbox

//DOM
const lightboxModal = document.getElementById("lightboxModal");
const lightboxOpen = document.querySelectorAll("openLightboxModal");
const closeLightboxBtn = document.getElementById("closeLightbox");

// Open lightbox
function openLightbox() {
    lightboxModal.style.display = "block";
}
// Close lightbox au clic
closeLightboxBtn.addEventListener("click", closeLightbox);
function closeLightbox() {
    lightboxModal.style.display = "none";
}


function createLightboxItems(jsonObj, id) {
    const mediabox = document.getElementById("mediabox");
    const medias = jsonObj.filter(media => media.photographerId == id);
    let templateMediabox = ``
    medias.forEach(media => {
        templateMediabox += `
        <div class="lightbox__innerContainer">
            ${(media.image != undefined) ? `<img src="${media.image}" alt="${media.alt}" role="button" class="lightbox__media">` : `<video controls muted " class="work__video"><source src="${media.video}" type="video/mp4"></video>` }
            <span class="lightbox__mediaName">${media.title}</span>
        </div>        
            `
        });
        mediabox.innerHTML = templateMediabox;
}


let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("lightbox__innerContainer");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}