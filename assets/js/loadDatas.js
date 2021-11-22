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
                ${photographer[0].tags.map(tag => `<li class="photographer__tag photographer__tag--phPage">#${tag}</li>` ).join(" ")}              
            </ul>
        </div>
        <button id="openModalBtn" class="modal__btn modal__btn--open" onclick="launchModal();" tabindex="2">Contactez-moi</button>
        <img src="${photographer[0].portrait}" alt="photographie du profit de Mimi Keel" class="photographer__portrait photographer__portrait--phPage">`;
    sectionPhotographerCard.innerHTML = templatePhotographerCard;
    
    //mise à jour du prix des photographes
    const photographerPrice = document.getElementById("photographerPrice");
    photographerPrice.innerHTML = photographer[0].price + "€/Jour";


    //nom du photographe dans la modale
    const modalPhotographerName = document.getElementById("modalPhotographerName");
    modalPhotographerName.innerHTML = photographer[0].name;
}
class MediaFactory {
    static generateTag(media, idx) {
        if (media.video === undefined) {  // c'est une image
        return `<img src="${media.image}" alt="${media.alt}" onclick="openLightbox();currentSlide(${idx+1})" class="work__img  openLightboxModal"/>`
        } else { // c'est une video
        return `<video controls muted onclick="openLightbox();currentSlide(${idx+1})" class="work__video openLightboxModal"><source src="${media.video}" type="video/mp4"></video>`
        }
    }
}

function showPhotographerMedias(jsonObj, id) {    
    const medias = jsonObj.filter(media => media.photographerId == id);
    const sectionPhotographerMedias = document.getElementById("photographerMedias");
    let templatePhotographerMedias = ``;
    let photographerTotalLikes = 0;
    medias.forEach((media, i) => {
        templatePhotographerMedias += `
            <article class="work__block">
                <a href="#" class="work__imgcontainer" onclick="openLightbox()" tabindex="4" title="${media.alt}, s'ouvre dans l'album">
                ${MediaFactory.generateTag(media, i)}
                </a>
                <div class="work__legend">
                    <h2 class="work__name">${media.title}</h2>
                    <p class="work__likes">${media.likes}</p>
                    <button role="button" tabindex="4" aria-pressed="false" onclick="addLike(event);" class="work__likeBtn" aria-label="liker"><i class="far fa-heart"></i></button>
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
    //pression sur "ENTREE"
lightboxOpen.onkeydown = function(e) {
    if(e.key == "Enter") {
        openLightbox()
    }
}

function openLightbox() {
    lightboxModal.style.display = "flex";
    lightboxModal.setAttribute("aria-hidden", "false");
}

document.addEventListener('keyup', function(e) {
    if(e.key == "Escape") {
      if(lightboxModal.style.display == '' || lightboxModal.style.display == 'flex') {
        closeLightbox();
      }
      if(contactModal.style.display == '' || contactModal.style.display == 'block') {
        closeModal();
      }
    }
    if(e.key == "ArrowLeft" && lightboxModal.style.display == 'flex') { // left
      plusSlides(-1)
    }
    if(e.key == "ArrowRight" && lightboxModal.style.display == 'flex') { // right
      plusSlides(1)
    }
  })
// Close lightbox au clic
closeLightboxBtn.addEventListener("click", closeLightbox);
function closeLightbox() {
    lightboxModal.style.display = "none";
    lightboxModal.setAttribute("aria-hidden", "true");
}


function createLightboxItems(jsonObj, id) {
    const mediabox = document.getElementById("mediabox");
    const medias = jsonObj.filter(media => media.photographerId == id);
    let templateMediabox = ``
    medias.forEach(media => {
        templateMediabox += `
        <div class="lightbox__innerContainer">
            ${(media.image != undefined) ? `<img src="${media.image}" alt="${media.alt}" role="button" class="lightbox__media">` : `<video controls muted " class="work__video lightbox__media"><source src="${media.video}" type="video/mp4"></video>` }
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
  slides[slideIndex-1].style.display = "flex";
}