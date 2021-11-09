fetch('https://thomasrivetti.github.io/Thomasrivetti_6_08102021/api/photographer.json')
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(value) {
        const photographersTag = document.getElementById("photographers");
        for (const photographer of value.photographers) {
            photographersTag.innerHTML += `
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
                ${photographer.tags.map(tag => `<li class="photographer__tag"><a href="#" aria-label="Triez les photographes sur le thème des portraits">#${tag}</a></li>` ).join(" ")}
                </ul>
            </article>`
        }
        console.log(value.photographers)
    })
    .catch(function(error) {
        console.error(error);
    });