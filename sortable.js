const url = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json'
let data = []
  async function fetchData () {
    try {
       const  resp = await fetch(url)
        if(!resp.ok)return
       data = await resp.json()
       diplayData(data)
        console.log(data);
        
    } catch (error) {
        console.error(error)
    }
}

let numItems = 20
let firstIndex =0

function diplayData (dataFilter = data){
    let lastIndex = firstIndex + numItems
    dataFilter = dataFilter.slice(firstIndex,lastIndex)
    const  grid = document.querySelector(".grid")
    // console.log(grid);
    
    
    const display = dataFilter.map(hero=>
        ` <tr>
        <td><img class="avatar" src="${hero.images.sm}" alt="${hero.name}"></td>
        <td>${hero.name}</td>
        <td>${hero.biography.fullName}</td>
        <td>${hero.powerstats.intelligence ?? 'N/A'}</td>
        <td>${hero.powerstats.strength ?? 'N/A'}</td>
        <td>${hero.powerstats.speed ?? 'N/A'}</td>
        <td>${hero.powerstats.durability ?? 'N/A'}</td>
        <td>${hero.powerstats.power ?? 'N/A'}</td>
        <td>${hero.powerstats.combat ?? 'N/A'}</td>
        <td>${hero.appearance.race ?? "N/A"}</td>
        <td>${hero.appearance.gender}</td>
        <td>${hero.appearance.height.join(" // ")}</td>
        <td>${hero.appearance.weight.join(" // ")}</td>
        <td>${hero.biography.placeOfBirth}</td>
        <td>${hero.biography.alignment}</td>
        </tr>`
        
    ).join("")
    grid.innerHTML = display
}

const select = document.querySelector("#select")
select.addEventListener("change",e=>{
    if(e.target.value === "all") {
        numItems = data.length 
    }else{
        numItems = +e.target.value
    }
    diplayData()
}
)
const page = document.querySelector("#page")
const next = document.querySelector("#next")
next.addEventListener("click",e=>{
    if(numItems * page.textContent < data.length) page.textContent = +page.textContent + 1
    if( firstIndex + numItems <= data.length )  firstIndex = firstIndex + numItems
    
    
    diplayData()
})
const prev = document.querySelector("#prev")
prev.addEventListener("click",e=>{
    if (page.textContent -1 >=1) {
        page.textContent = +page.textContent -1
    }
    if(firstIndex-numItems>=0){
        firstIndex = firstIndex - numItems
        diplayData()
    }
    
})
const search = document.querySelector("#search_bar")
search.addEventListener("input",e =>{
    let dataSearch = data.filter(hero =>{
        if(hero.name.toLowerCase().includes(e.target.value.toLowerCase())) return true
        if (hero.biography.fullName.toLowerCase().includes(e.target.value.toLowerCase())) return true
        return false
        
    })
    diplayData(dataSearch)
})
function sortData(order, column) {
    console.log(order);
    
    data.sort((a, b) => {
        const colum1 = getClum(a, column);
        const colum2 = getClum(b, column);
        if (colum1 == null || colum1 === "" || colum1 === "-") return 1;
        if (colum2 == null || colum2 === "" || colum2 === "-") return -1;
        
        if (colum1 < colum2) return order[column] === 'asc' ? -1 : 1;
        if (colum1 > colum2) return order[column] === 'asc' ? 1 : -1;
        return 0;
    });
}
function getClum(hero, column) {
    switch (column) {
        case 'name':
            return hero.name
            case 'fullName':
                return hero.biography.fullName    
                case 'intelligence': return hero.powerstats.intelligence
                case 'strength': return hero.powerstats.strength
                case 'speed': return hero.powerstats.speed
                case 'durability': return hero.powerstats.durability
                case 'power': return hero.powerstats.power
                case 'combat': return hero.powerstats.combat
                case 'race':
                    return hero.appearance.race
                    case 'gender':
                        return hero.appearance.gender
                        case 'height':
                            if (hero.appearance.height.length > 1) {
                                // console.log(hero.appearance.height);
                                
                                if (hero.appearance.height[1].slice(-6) == 'meters') {
                                    // console.log(parseInt(hero.appearance.height[1]) * 100);
                                    
                                    return hero.appearance.height[1] ? parseInt(hero.appearance.height[1]) * 100 : Infinity;
                                }
                                return hero.appearance.height[1] ? parseInt(hero.appearance.height[1]) : Infinity;
                            } 
                            case 'weight':
                                hero.appearance.weight[1] = hero.appearance.weight[1].replaceAll(',', '')
                                if (hero.appearance.weight[1].slice(-4) == 'tons') {
                                    return hero.appearance.weight[1] ? parseInt(hero.appearance.weight[1]) * 1000 : Infinity;
                                }
                                return hero.appearance.weight[1] ? parseInt(hero.appearance.weight[1]) : Infinity;
                                case 'birth':
                                    return hero.biography.placeOfBirth
                                    case 'alignment':
                                        return hero.biography.alignment
                                        default: null
                                    }
                                }
                                let order ={}
                                document.querySelectorAll('#table thead th').forEach(th =>{
                                    th.addEventListener("click",()=>{
                                        
                                        let column = th.getAttribute('data-sort')
                                        order[column] = order[column] ==='asc' ? 'desc' : 'asc'
                                        sortData(order, column)
                                        diplayData()
                                    })
                                })
                                fetchData()
                                
                                
                                