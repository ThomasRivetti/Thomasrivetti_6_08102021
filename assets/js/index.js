fetch('https://thomasrivetti.github.io/Thomasrivetti_6_08102021/api/photographer.json')
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(value) {
        showPhotographers(value.photographers);
        photographersArray = value.photographers;
        
        console.log(value.photographers)
    })
    .catch(function(error) {
        console.error(error);
    });

let photographersArray;

//btn scroll visible    
window.addEventListener("scroll", () => {
    let button = document.querySelector(".hidden__link");
    let y = window.scrollY;

    if (y >= 50) {
        button.style.display = "flex";
    } else {
        button.style.display = "none";
    }
});

function showPhotographers(photographers) {
    const photographersBlock = document.getElementById("photographers");
    photographersBlock.innerHTML = '';        
    for (const photographer of photographers) {
        photographersBlock.innerHTML += `
        <article class="photographer__info">
            <a href="photographer.html?id=${photographer.id}">
                <div class="photographer__profile">
                    <img src="${photographer.portrait}" alt="${photographer.alt}" class="photographer__portrait">
                    <h2 class="photographer__name photographer__name--home">${photographer.name}</h2>
                </div> 
            </a>
            <p class="photographer__place photographer__place--home">${photographer.city}, ${photographer.country}</p>
            <p class="photographer__quote photographer__quote--home">${photographer.tagline}</p>
            <p class="photographer__price">${photographer.price}€/jour</p>
            <ul class="photographer__taglist">
            ${photographer.tags.map(tag => `<li class="photographer__tag"><a href="#" onclick="filterByTag(event, '${tag}');" aria-label="Triez les photographes sur le thème des portraits">#${tag}</a></li>` ).join(" ")}
            </ul>
        </article>`
    }
    
}

function filterByTag(e, filteredTag) {
    if (e.target.classList.contains("is-active")) {
        document.querySelector(".header__taglist a.is-active").classList.remove("is-active");
        showPhotographers(photographersArray);
    } else {
        showPhotographers(photographersArray.filter(photographer => photographer.tags.includes(filteredTag)));
        if (document.querySelector(".header__taglist a.is-active") != null) {
            document.querySelector(".header__taglist a.is-active").classList.remove("is-active");
        }
        e.target.classList.add("is-active");
    }
    console.log(e);
}