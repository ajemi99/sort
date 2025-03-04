const url = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json'
let data = []
  async function fetchData () {
    try {
       const  resp = await fetch(url)
        if(!resp.ok){
            throw new Error(`Response status : ${resp.status}`)
        }
       data = await resp.json()
       diplayData(data)
        console.log(data);
        
    } catch (error) {
        console.error(error)
    }
}
fetchData()
  let numItems = 20
   let firstIndex =0
   let lastIndex = firstIndex + numItems
function diplayData (dataFilter = data){
 
   data = data.slice(firstIndex,lastIndex)
   const  grid = document.querySelector(".grid")
    console.log(grid);
    
    
   const display = data.map(hero=>
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
            <td>${hero.appearance.race}</td>
            <td>${hero.appearance.gender}</td>
            <td>${hero.appearance.height.join(" && ")}</td>
            <td>${hero.appearance.weight.join(" && ")}</td>
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
        numItems = ++(e.target.value)
    }
    diplayData()
}
)

