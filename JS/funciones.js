//variablesglobales
let images =[
    {
        "nombre": "Gokuns",
        "url": "img/Dragon-Ball-2.png"
    },
    {
        "nombre": "cell perfecto",
        "url": "img/cell perfecto.jfif"
    },
    {
        "nombre": "Frezzer Perfecto",
        "url": "img/Freezer forma 2.jfif"
    },
    {
        "nombre": "kid buu",
        "url": "img/kid buu.png"
    },
    {
        "nombre": "vegeta",
        "url": "img/vegeta.png"
    },
    {
        "nombre": " Yamcha",
        "url": "img/Yamcha.jfif"
    },
    {
        "nombre": "Gokuns",
        "url": "img/Dragon-ball-2.png"
    },

    {
        "nombre": "cell perfecto",
        "url": "img/cell perfecto.jfif"
    },
    {
        "nombre": "Frezzer Perfecto",
        "url": "img/Freezer forma 2.jfif"
    },
    {
        "nombre": "kid buu",
        "url": "img/kid buu.png"
    },
    {
        "nombre": "vegeta",
        "url": "img/vegeta.png"
    },
    {
        "nombre": " Yamcha",
        "url": "img/Yamcha.jfif"
    }
]
const d = document;
let dash = d.querySelector(".tablero");
let nameImg = [];
let posImg = [];
let attempts = 0; //intentos
let successes = 0; //aciertos
let time = 60;
let timeT;
let showSuccesses = d.querySelector(".aciertos");
let showAttempts = d.querySelector(".intentos");
let showTime = d.querySelector(".tiempo");
let btnStart = d.querySelector('.boton-iniciar');
let showLevel = d.querySelector('.nivel');
let gameActive = false;
let level = 1;
let sound = new Audio("./sonidos/gameover.mp3"); //sonido cuando el usuario falle

//poner imagenes en diferente posicion
images.sort(()=>Math.random() -0.5);



showTime.textContent = time;
btnStart.addEventListener("click", function(){
    if(gameActive === false && level===1){
        gameActive = true;
        addImages();
        timeGame();
    }else if(gameActive === false && level ===2){
        gameActive = true;
        addImages();
        timeGame();
    }else if(gameActive === false && level ===3){
        gameActive = true;
        addImages();
        timeGame();
    }
    //showLevel.textContent = level;
    
});

//iniciar juego con ayuda de setInterval
function timeGame(){
        timeT = setInterval(function(){
        time--;
        showTime.textContent = time;
        if(time === 10){
            showTime.setAttribute("style", "color:red; font-size:20px");
        }else if(time===0){
            
            clearInterval(timeT);
            alert("You Lose! 😒😒😒😒 You didn't guess everything");
            location.reload();
        }
    }, 1000)

}

let board = d.querySelector(".tablero");

//agregar imagenes
function addImages(){
    for(let i = 0; i<images.length;i++){
        let div = d.createElement("div");
        let img = d.createElement("img");
        div.setAttribute("class", "col-3");
        img.setAttribute("src", "img/chulito.jfif");
        img.setAttribute("class", "img-fluid altoimg");
        img.setAttribute("id", i);
        img.addEventListener("click", showImages);
        div.appendChild(img);
        board.appendChild(div);

    }
}


//mostrar las imagenes
function showImages(){
    let imgId = this.getAttribute("id");
    //mostrar imagenes ocultas
    this.setAttribute("src", images[imgId].url);
    //guardar el nombre y id de la imagen
    nameImg.push(images[imgId].nombre);
    posImg.push(imgId);
    
    //ejecutar la funcion comparar imagenes
    if(nameImg.length === 2){
        setTimeout(compareImages, 500);
        
    }
}


//comparar las imagenes 
function compareImages(){
    let totalImg = d.querySelectorAll(".tablero .col-3 img");
    if(nameImg[0]=== nameImg[1]){ //comparar si las imagenes son iguales
        if(posImg[0]!= posImg[1]){ //comparar imagenes en diferente posicion
            totalImg[posImg[0]].setAttribute("src", "img/chulito.jfif");
            totalImg[posImg[1]].setAttribute("src", "img/chulito.jfif");
            totalImg[posImg[0]].removeEventListener("click", showImages);
            totalImg[posImg[1]].removeEventListener("click", showImages);
            successes++;
            showSuccesses.textContent = successes;

        }else{
            alert('Please choose another image');
            totalImg[posImg[0]].setAttribute("src", ".img/ocultar.jfif");
            attempts++;
            showAttempts.textContent = attempts;
            sound.play();
            
        }
        
    }else{
        totalImg[posImg[0]].setAttribute("src", "img/ocultar.jfif");
        totalImg[posImg[1]].setAttribute("src", "img/ocultar.jfif");
        attempts++;
        showAttempts.textContent = attempts;
    }
    nameImg = []; //arrays vacios
    posImg = [];



    //logica para pasar de nivel
    if(successes=== 6 && level === 1){
        alert('🙌👍👌 Excellent you advanced of level');
        successes = 0;
        attempts = 0;
        clearInterval(timeT);
        time = 55;
        level++;
        showLevel.textContent = level;
        showAttempts.textContent = attempts;
        showSuccesses.textContent = successes;
        showTime.textContent = time;
        deleteImages();
        gameActive = false;
    }else if(successes === 6 && level===2){
        alert('🙌👍👌 Excellent you advanced of level');
        successes = 0;
        attempts = 0;
        clearInterval(timeT);
        time = 50;
        level++;
        showLevel.textContent = level;
        showAttempts.textContent = attempts;
        showSuccesses.textContent = successes;
        showTime.textContent = time;
        deleteImages();
        gameActive = false;
    }else if(successes===6 && level===3){
        alert('🙌👍👌 Excellent you advanced all levels');
        successes = 0;
        attempts = 0;
        clearInterval(timeT);
        time = 45;
        level=1;
        showLevel.textContent = level;
        showAttempts.textContent = attempts;
        showSuccesses.textContent = successes;
        showTime.textContent = time;
        deleteImages();
        gameActive = false;
    }
}

//quitar imagenes
function deleteImages(){
    let allImages = d.querySelectorAll('.tablero div');
    for(let i =0; i<allImages.length;i++){
        allImages[i].remove();
    }
}