

const canvas = document.getElementById("canvas");
canvas.style.backgroundColor = 'blue';
canvas.width = canvas.height = 608;

const ctx = canvas.getContext("2d");


const kare = 32;


const foodImg = new Image();
foodImg.src = "img/food.png";

// ses dosyaları

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// yılanı oluştur

let snake = [];

snake[0] = {
    x : 9 * kare,
    y : 10 * kare
};

// elma oluştur

let food = {
    x : Math.floor(Math.random()*19) * kare,
    y : Math.floor(Math.random()*19) * kare
}

// skor

let skor = 0;

// yön tuşları

let tus;

document.addEventListener("keydown",hareketYonu);

function hareketYonu(e){
    let key = e.keyCode;
    if( key == 37 && tus != "SAG"){
        left.play();
        tus = "LEFT";
    }else if(key == 38 && tus != "ASAGI"){
        tus = "UP";
        up.play();
    }else if(key == 39 && tus != "SOL"){
        tus = "RIGHT";
        right.play();
    }else if(key == 40 && tus != "YUKARI"){
        tus = "DOWN";
        down.play();
    }
}

// çarpma kontrol
function carptimi(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// cizim fonksiyonu

function draw(){
    
   
    ctx.clearRect(0, 0, 608, 608);

    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = "white";
        ctx.fillRect(snake[i].x,snake[i].y,kare,kare);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,kare,kare);
    }
    
    ctx.drawImage(foodImg, food.x, food.y, 30, 30);
    
    // kafa pozisyonu
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // hangi yön
    if( tus == "LEFT") snakeX -= kare;
    if( tus == "UP") snakeY -= kare;
    if( tus == "RIGHT") snakeX += kare;
    if( tus == "DOWN") snakeY += kare;
    
    // yılan elmayı yerse
    if(snakeX == food.x && snakeY == food.y){
        skor++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*19) * kare,
            y : Math.floor(Math.random()*19) * kare
        }
       
    }else{
        // kuyruğu sil
        snake.pop();
    }
    
    // yeni kafa
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // oyun bitti
    
    if(snakeX < 0 || snakeX > canvas.width - kare || snakeY < 0 || snakeY > canvas.height - kare || carptimi(newHead,snake)){
        clearInterval(oyun);
        dead.play();

    ctx.fillStyle = "white";
    ctx.font = "90px arial";
    ctx.fillText('OYUN BİTTİ',50,300);
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "30px arial";
    ctx.fillText(skor,2,29);
}

// 

let oyun = setInterval(draw,150);


















