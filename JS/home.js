// ===========> Global =============>
const links = document.querySelectorAll(".menu a");
const loading =  document.querySelector(".loading");
// ===========> When Start =============>
    getGames('mmorpg');
// ===========> Events =============>
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
        document.querySelector(".menu .active").classList.remove("active");
        links[i].classList.add("active");

        const category = links[i].getAttribute("data-category");
        console.log(category);

        getGames(category);
    });
    
}

document.querySelector('.logout-btn').addEventListener("click", function(){
    localStorage.removeItem("uToken")
    location.href = './index.html';
})

const mode = document.getElementById("mode");

mode.addEventListener('click',function(e){

    if (mode.classList.contains("fa-sun")) {

        document.querySelector("html").setAttribute("data-theme","light");
        mode.classList.replace("fa-sun","fa-moon");

    } else {

        document.querySelector("html").setAttribute("data-theme","dark");
        mode.classList.replace("fa-moon","fa-sun");

    }
    
})
// ===========> Functions =============>



async function getGames(categoryName){

    loading.classList.remove("d-none");

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
    };

    const apiResponse = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options);
        const data = await apiResponse.json();
        console.log(data);

        displayData(data);

        loading.classList.add("d-none");
}


function displayData(gamesData) {
    let gamesBox = ``;
    for (let i = 0; i < gamesData.length; i++) {

        let videoPath = gamesData[i].thumbnail.replace('thumbnail.jpg','videoplayback.webm')

        gamesBox+=
         `<div class="col">
    <div  onmouseleave="stopVideo(event)"  onmouseenter="startVideo(event)" onclick="showDetails(${gamesData[i].id})" class="card bg-black position-relative">
      <img src="${gamesData[i].thumbnail}" class="card-img-top" alt="...">

      <video muted="true" preload="none" loop  class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
      <source src="${videoPath}">
      </video>

      <div class="card-body">
        <h5 class="card-title">${gamesData[i].title}</h5>
        <span class="badge bg-primary p-2">Free</span>
        <p class="card-text">${gamesData[i].short_description}</p>
      </div>

      <footer class="card-footer small hstack justify-content-between">

      <span class="badge badge-color">${gamesData[i].genre}</span>
      <span class="badge badge-color">${gamesData[i].platform}</span>

      </footer>

    </div>
  </div>`;
        
    }

    document.getElementById("gameData").innerHTML = gamesBox;
}


function startVideo(event){
    const videoEl = event.target.querySelector("video");
    videoEl.classList.remove("d-none");
    videoEl.muted = true;
    videoEl.play();
}


function stopVideo(event){
    const videoEl = event.target.querySelector("video");
    videoEl.classList.add("d-none");
    videoEl.muted = true;
    videoEl.pause();
}

function showDetails(id){
    location.href = `./details.html?id=${id}`
}

