//regex
const regexFirstName = /^[A-zÀ-ú]+[A-zÀ-ú-]?[A-zÀ-ú]+$/;
const regexLastName = /^[A-zÀ-ú]+[A-zÀ-ú-]?[A-zÀ-ú]+$/;
const regexEmail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;
const regexMessage = /^[A-zÀ-ú0-9!@#$%^&*()\[\]{};'’`\-\\:,.\/<>?| ]{30,500}$/;

//DOM
const body = document.getElementById("body");
const mainWrapper = document.getElementById("mainWrapper"); //contenu 
const contactModal = document.getElementById("contactModal"); //modal
const modalBtn = document.getElementById("openModalBtn"); //bouton ouverture modal
const closeModalBtn = document.getElementById("closeModal"); //croix fermeture modal
const sendModalBtn = document.getElementById("sendBtn"); // bouton envoyer modal
const firstNameInput = document.getElementById("firstnameInput"); //input prénom
const lastNameInput = document.getElementById("lastnameInput"); //input nom
const emailInput = document.getElementById("emailInput"); //input mail
const messageInput = document.getElementById("messageInput"); //input message

function launchModal() {
  contactModal.style.display = "block";
  contactModal.setAttribute("aria-hidden", "false");
  mainWrapper.setAttribute("aria-hidden", "true");
  mainWrapper.classList.add("modalFormOpenStyle");
  body.classList.add("no-scroll");
  closeModalBtn.focus();
  closeModalBtn.classList.toggle("visible");
}

closeModalBtn.addEventListener("click", closeModal);//principale croix

function closeModal() {
  contactModal.style.display = "none";
  contactModal.setAttribute("aria-hidden", "true");
  mainWrapper.setAttribute("aria-hidden", "false");
  mainWrapper.classList.remove("modalFormOpenStyle");
  body.classList.remove("no-scroll");
  
}

// add all the elements inside modal which you want to make focusable
const focusableElements ='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const firstFocusableElement = contactModal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = contactModal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

document.addEventListener('keydown', function(e) {
  let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) { // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else { // if tab key is pressed
    if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }
});

firstFocusableElement.focus();

//checking Input Firstname
firstNameInput.addEventListener("blur", function(){
  const firstNameError = document.getElementById("firstNameError");
  if(regexFirstName.test(firstNameInput.value) == false) {
    firstNameError.innerText = "Le Prénom doit faire 2 lettres minimum";
    firstNameInput.parentElement.dataset.errorVisible = "true";
    firstNameInput.setAttribute("aria-invalid", "true");
  } else {
      firstNameError.innerText = "";
      firstNameInput.parentElement.dataset.errorVisible = "false";
      firstNameInput.setAttribute("aria-invalid", "false");
  } 
})

// checking Input LastName
lastNameInput.addEventListener("blur", function(){
  const lastNameError = document.getElementById("lastNameError");
  if(regexLastName.test(lastNameInput.value) == false) {
    lastNameError.innerText = "Le nom doit faire 2 lettres minimum";
    lastNameInput.parentElement.dataset.errorVisible = "true";
    lastNameInput.setAttribute("aria-invalid", "true");
  } else {
      lastNameError.innerText = "";
      lastNameInput.parentElement.dataset.errorVisible = "false";
      lastNameInput.setAttribute("aria-invalid", "false");
  } 
})

// checking Input Email
emailInput.addEventListener("blur", function(){
  const emailError = document.getElementById("emailError");
  if(regexEmail.test(emailInput.value) == false) {
    emailError.innerText = "L'adresse mail n'est pas valide";
    emailInput.parentElement.dataset.errorVisible = "true";
    emailInput.setAttribute("aria-invalid", "true");
  } else {
      emailError.innerText = "";
      emailInput.parentElement.dataset.errorVisible = "false";
      emailInput.setAttribute("aria-invalid", "false");
    } 
  })

// checking Input Message
messageInput.addEventListener("blur", function(){
  const messageError = document.getElementById("messageError");
  if(regexMessage.test(messageInput.value) == false) {
    messageError.innerText = "Le message doit faire entre 30 et 500 caractères";
    messageInput.parentElement.dataset.errorVisible = "true";
    lastNameInput.setAttribute("aria-invalid", "true");
  } else {
      messageError.innerText = "";
      messageInput.parentElement.dataset.errorVisible = "false";
      messageInput.setAttribute("aria-invalid", "false");
    }
})

sendModalBtn.addEventListener("click", function(event) {
  event.preventDefault()
  console.group('Contact modal');
        console.log('Prénom : ' + firstNameInput.value);
        console.log('Nom : ' + lastNameInput.value);
        console.log('Email : ' + emailInput.value);
        console.log('Message : ' + messageInput.value);
        console.groupEnd();        
})


const dropdown = document.getElementById('dropdownMenu');
dropdown.addEventListener('change', function(e) {
    const value = dropdown.value;
    fetch('../../api/photographer.json')
        .then(response => response.json())
        .then(data => {
            const searchParams = new URLSearchParams(window.location.search);
            const photographerId = searchParams.get("id");
            const photographerMedia = data.media.filter(data => data.photographerId == photographerId);
            filterMedia(photographerMedia, value)
        }).catch(error => console.error(error))
});

function filterMedia(medias, type) {
    let sortedMedias;
    if (type == "popularity") {
        sortedMedias = medias.sort((a, b) => b.likes - a.likes)
    } else if (type == "date") {
        sortedMedias = medias.sort(function(a, b) {
          return new Date (b.date) - new Date (a.date)
        })
    } else if (type == "title") {
        sortedMedias = medias.sort(function(a, b) {
          if (a.title < b.title) {
            return -1;
          } else {
            return 1;
          }
      });
    }

    const sectionPhotographerMedias = document.getElementById("photographerMedias");
    let templatePhotographerMedias = ``;
    let photographerTotalLikes = 0;
    sortedMedias.forEach((media, i) => {
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