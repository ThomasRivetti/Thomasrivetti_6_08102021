//récupération des données JSON pour la page des photographes
//todo liste des photographes à manipuler

fetch('../../../api/photographer.json')
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(value) {
        const searchParams = new URLSearchParams(window.location.search);
        const photographerId = searchParams.get("id");
        
        showPhotographersCard(value.photographers, photographerId)









    })
    .catch(function(error) {
        console.error(error);
    });

function showPhotographersCard(jsonObj, id) {
    console.log(jsonObj, id)
    const photographer = jsonObj.filter(person => person.id == id);
    console.log(photographer)
    const sectionPhotographerCard = document.getElementById("photographerCard");
    const templatePhotographerCard = `
        <div class="photographer__info--phPage">
            <h1 class="photographer__name photographer__name--phPage">${photographer[0].name}</h1>
            <p class="photographer__place photographer__place--phPage">${photographer[0].city},${photographer[0].country}</p>
            <p class="photographer__quote photographer__quote--phPage">${photographer[0].tagline}</p>
            <ul class="photographer__taglist photographer__taglist--phpage">
                <li class="photographer__tag">
                    <span aria-label="Triez les photographes sur le thème des portraits">#Portrait</span>
                </li>         
                <li class="photographer__tag">
                    <span aria-label="Triez les photographes sur le thème des voyages">#Travel</span>
                </li>
                <li class="photographer__tag">
                    <span aria-label="Triez les photographes sur le thème des animaux">#Animals</span>
                </li>
                <li class="photographer__tag">
                    <span aria-label="Triez les photographes sur le thème des évènements">#Events</span>
                </li>               
            </ul>
        </div>
        <button class="open__modal modal__btn" id="openModalBtn">Contactez-moi</button>
        <img src="${photographer[0].portrait}" alt="photographie du profit de Mimi Keel" class="photographer__portrait">
        `;
    sectionPhotographerCard.innerHTML = templatePhotographerCard; 
}