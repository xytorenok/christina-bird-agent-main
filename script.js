const container = document.getElementById('container');
const header = document.getElementById('header');
const main = document.getElementById('main');
const game = document.getElementById('game');
const failed = document.getElementById('failed');
const tap = document.getElementById('tap');



const cactus = document.getElementById('cactus');
const stat = document.getElementById('status');
const life = document.getElementById('life');

const distancePoint = document.getElementById('distance');
const cruiser = document.getElementById('cruiser');
const rocket = document.getElementById('rocket');
const bang = document.getElementById('bang');
const bayraktar = document.getElementById('bayraktar');
const btnStartGame = document.getElementById('startgame');

const btnJump = document.getElementById('btnjump');


let lives = 2;
let daysClean = 0;

let firstmenu = true

// btnStartGame.onclick = startGame

tap.onclick = jump();

function startGame(){
  main.hidden = false
  header.hidden = true
  audioBg.volume = 0.2
  if (audioBg.paused) {
    audioBg.play();
  }
}

function tapStart() {
  tap.style.background ='url(img/tap.png) no-repeat,url(img/tapbang.png) no-repeat'
  tap.style.backgroundSize = '100%'
  tap.style.backgroundPosition = 'center 4px';
}

function tapEnd() {
  tap.style.background ='url(img/tap.png) no-repeat'
  tap.style.backgroundSize = '100%'
  tap.style.backgroundPosition = 'center 2px'; // возвращаем исходную позицию фонового изображения при отпускании
}

document.addEventListener('touchstart', function(event) {
  if (event.touches.length === 1) {
    firstmenu = false 
    jump();
    tapStart()
    }
});



document.addEventListener('touchend', function() {
  if (!firstmenu) startGame()
  tapEnd()
});


// btnJump.onclick = jump

document.addEventListener('keydown', function (event) {
  jump();
  startGame()
  tapStart()
});

document.addEventListener('keyup', function (event) {
  tapEnd()
});

function jump() {
  if (dino.classList != 'jump') {
    dino.classList.add('jump');
  }
  setTimeout(function () {
    dino.classList.remove('jump');
  }, 600);

  if (daysClean == 17) {
    // убирает ракету после "попадания"
    rocket.style.left = '150px'
    rocket.style.animation = 'rocket 2000ms linear';
  }

  if (daysClean == 7) {
    bayraktar.style.left = '-50px'
    bayraktar.style.animation = 'bayraktarMov 8000ms linear';
  }
}

let crash = false;
let start = false;

let isAlive = setInterval(function () {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue('left')
  );
  life.innerHTML = lives;

  //   счетчик пройденного пути
  if (cactusLeft < 50 && cactusLeft > 0 && !start) {
    start = true;
    daysClean++;
    distancePoint.innerHTML = daysClean;
    // добавляем паузу в 1 секунду, чтобы счетчик не увеличивался слишком быстро
    setTimeout(function () {
      start = false;
    }, 2000);
  }

  if (cactusLeft < 100 && cactusLeft > 50 && dinoTop >= 125 && !crash) {
    crash = true;
    lives--;
    daysClean--;
    cough.volume = 0.5
    cough.play();


    // обнуляем пройденное растояние если жизни на нуле
    if (lives == -1) {
      lives = 2;
      failed.hidden = false
      daysClean = -1;
      // отключение перезагрузки при проигрыше
      setTimeout(function() {
        location.reload();
      }, 3000);
    }

    // добавляем паузу в 1 секунду, чтобы счетчик не увеличивался слишком быстро
    setTimeout(function () {
      crash = false;
    }, 2000);
  }
}, 10);

let rocketStrike = setInterval(function () {


let cruiserLeft = parseInt(window.getComputedStyle(cruiser).getPropertyValue('left'));
let rocketLeft = parseInt(window.getComputedStyle(rocket).getPropertyValue('left'));
 
  if (rocketLeft == cruiserLeft) {
    lives = 666;
    cruiser.style.opacity = '0';
    cruiser.style.transition = 'all 1000ms linear';
    cruiser.style.animation = 'cruiseDying 1000ms linear'

    bang.style.animation = 'bang-bang 1000ms linear'
    
    rocket.style.opacity = '0';
    rocket.style.transition= 'all 1s linear';
  }

}, 100);




