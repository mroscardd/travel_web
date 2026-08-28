const searchBtn = document.querySelector("#searchBtn")
const url = "./travel_recommendation_api.json"
const section = document.querySelector(".filter")
const input = document.querySelector("#searchInput")


function filter() {

    
    const searchInput = input.value.toLowerCase()
    
    fetch(url)
    .then(response => response.json())
    .then(data => {

        const condition = searchInput !== ""    
        document.getElementById("home").classList.toggle("is-hidden", condition)

        section.innerHTML = ""
        if (searchInput !== "") {

            
            if (searchInput === "beaches" || searchInput ==="beach") {
                const key = data.beaches
                show(key)
            } else if (searchInput === "temples" || searchInput ==="temple") {
                const key = data.temples
                show(key) 
            } else if (searchInput === "countries" || searchInput === "country") {
                const countries = data.countries
                
                for (let i = 0; i < countries.length; i++) {
                    const key = countries[i]["cities"]  
                            
                    show(key)
                }
            } else {
                const html = "<h1>No se encontraron resultados</h1>"
                section.innerHTML = html
            }
        }
    })
}





function show(key) {
    
    for (const item of key) {
        const html = 
        `<article class="filter-class">
            <img src=${item.imageUrl}/>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </article>`

        input.value = ""
        section.innerHTML += html
        }
}







searchBtn.addEventListener("click", filter)
