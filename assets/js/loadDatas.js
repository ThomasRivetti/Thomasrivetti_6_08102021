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
    console.log(jsonObj, id);
    const medias = jsonObj.filter(media => media.photographerId == id);
    console.log(medias);
    const sectionPhotographerMedias = document.getElementById("photographerMedias");
    let templatePhotographerMedias = ``;
    let photographerTotalLikes = 0;
    medias.forEach(media => {
        templatePhotographerMedias += `
            <article class="work__block">
                <a href="#" role="button" title="${media.alt}, s'ouvre dans l'album">
                    ${(media.image != undefined) ? `<img src="${media.image}" alt="${media.alt}" role="button" class="work__img"/>` : `<video controls muted class="work__video"><source src="${media.video}" type="video/mp4"></video>` }
                </a>
                <div class="work__legend">
                    <h2 class="work__name">${media.title}</h2>
                    <p class="work__likes">${media.likes}</p>
                    <i class="far fa-heart" aria-label="likes"></i>
                </div>
            </article>`
        photographerTotalLikes += media.likes;        
    });
    sectionPhotographerMedias.innerHTML = templatePhotographerMedias;

    //mise à jour du tatal des likes
    const photographerLikes = document.getElementById("photographerLikes");
    photographerLikes.innerHTML = photographerTotalLikes;
}
/*
//lightbox
const lightboxModal = document.getElementById("lightboxModal");
const lightboxOpen = document.querySelectorAll("openLightboxModal");

// Open lightbox
lightboxOpen.addEventListener("click", openLightbox);
function openLightbox() {
    lightboxModal.style.display = "block";
}
*/

// Close the Modal


// var slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("demo");
//   var captionText = document.getElementById("caption");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
//   captionText.innerHTML = dots[slideIndex-1].alt;
// }