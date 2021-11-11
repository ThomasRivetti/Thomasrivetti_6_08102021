// //lightbox
// const lightboxModal = document.getElementById("lightboxModal");
// const lightboxOpen = document.querySelectorAll("openLightboxModal");
// const closeLightboxBtn = document.getElementById("closeLightbox");

// // Open lightbox
// function openLightbox() {
//     lightboxModal.style.display = "block";
// }
// closeLightboxBtn.addEventListener("click", closeLightbox);
// function closeLightbox() {
//     lightboxModal.style.display = "none";
// }


function showlightboxModal(jsonObj, id) {
    console.log(jsonObj, id);
    const mediabox = document.getElementById("mediabox");
    const medias = jsonObj.filter(media => media.photographerId == id);
    console.log(medias)
    let templateMediabox = ``
    medias.forEach(media => {
        templateMediabox += `
            ${(media.image != undefined) ? `<img src="${media.image}" alt="${media.alt}" role="button" class="lightbox__media" onclick="openLightbox()">` : `<video controls muted onclick="openLightbox()" class="work__video"><source src="${media.video}" type="video/mp4"></video>` }                </div>
            <span class="lightbox__mediaName">${media.name}</span>        
            `
        });
        mediabox.innerHTML = templateMediabox;
}