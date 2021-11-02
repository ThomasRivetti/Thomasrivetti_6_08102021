//regex
const regexFirstName = /^[A-zÀ-ú]+[A-zÀ-ú-]?[A-zÀ-ú]+$/;
const regexLastName = /^[A-zÀ-ú]+[A-zÀ-ú-]?[A-zÀ-ú]+$/;
const regexEmail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;
const regexMessage = /^[a-zA-Z0-9!@#$%^&*()\[\]{};'’`\-\\:,.\/<>?| ]{30,500}$/

//DOM
const contactModal = document.getElementById("contactModal"); //modal
const modalBtn = document.getElementById("openModalBtn"); //bouton ouverture modal
const closeModalBtn = document.getElementById("closeModal"); //croix fermeture modal
const sendModalBtn = document.getElementById("sendBtn"); // bouton envoyer modal
const firstNameInput = document.getElementById("firstnameInput"); //input prénom
const lastNameInput = document.getElementById("lastnameInput"); //input nom
const emailInput = document.getElementById("emailInput"); //input mail
const messageInput = document.getElementById("messageInput"); //input message

//open modal
modalBtn.addEventListener("click", launchModal);
function launchModal() {
  contactModal.style.display = "block";
}

closeModalBtn.addEventListener("click", closeModal);//principale croix
function closeModal() {
  contactModal.style.display = "none";
}


//checking Input Firstname
firstNameInput.addEventListener("blur", function(){
  const firstNameError = document.getElementById("firstNameError");
  if(regexFirstName.test(firstNameInput.value) == false) {
    firstNameError.innerText = "Le Prénom doit faire 2 lettres minimum";
    firstNameInput.parentElement.dataset.errorVisible = "true";
  } else {
      firstNameError.innerText = "";
      firstNameInput.parentElement.dataset.errorVisible = "false";
  } 
})

// checking Input LastName
lastNameInput.addEventListener("blur", function(){
  const lastNameError = document.getElementById("lastNameError");
  if(regexLastName.test(lastNameInput.value) == false) {
    lastNameError.innerText = "Le nom doit faire 2 lettres minimum";
    lastNameInput.parentElement.dataset.errorVisible = "true";
  } else {
      lastNameError.innerText = "";
      lastNameInput.parentElement.dataset.errorVisible = "false";
  } 
})

// checking Input Email
emailInput.addEventListener("blur", function(){
  const emailError = document.getElementById("emailError");
  if(regexEmail.test(emailInput.value) == false) {
    emailError.innerText = "L'adresse mail n'est pas valide";
    emailInput.parentElement.dataset.errorVisible = "true";
  } else {
      emailError.innerText = "";
      emailInput.parentElement.dataset.errorVisible = "false";
    } 
  })

// checking Input Message
messageInput.addEventListener("blur", function(){
  const messageError = document.getElementById("messageError");
  if(regexMessage.test(messageInput.value) == false) {
    messageError.innerText = "Le message doit faire entre 30 et 2000 caractères";
    messageInput.parentElement.dataset.errorVisible = "true";
  } else {
      messageError.innerText = "";
      messageInput.parentElement.dataset.errorVisible = "false";
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