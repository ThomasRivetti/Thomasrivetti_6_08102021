//regex
const regexFirstName = /^[A-zÀ-ú]+[A-zÀ-ú-]?[A-zÀ-ú]+$/;
const regexLastName = /^[A-zÀ-ú]+[A-zÀ-ú-]?[A-zÀ-ú]+$/;
const regexEmail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;

//DOM
const contactModal = document.getElementById("contactModal"); //modal
const modalBtn = document.getElementById("openModalBtn"); //bouton ouverture modal
const closeModalBtn = document.getElementById("closeModal"); //croix fermeture modal
const sendModalBtn = document.getElementById("sendBtn"); // bouton envoyer modal
const firstNameInput = document.getElementById("firstnameInput"); //input prénom
const lastNameInput = document.getElementById("lastnameInput"); //input nom
const emailInput = document.getElementById("emailInput"); //input mail

//open modal
function launchModal() {
    contactModal.style.display = "block";
  }


