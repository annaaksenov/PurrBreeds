function getTenCats() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=10&api_key=live_NO1khTMuP3C8aJanIQAydCR1eolXjepWGEGEpBl2zkQDPctiac7A92lHoSqOpCdz');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const json = xhr.response;
    data.queue = json;
  });
  xhr.send();
}

const gView = document.querySelector('div[data-view="guess-view"]');
const sView = document.querySelector('div[data-view="start-view"]');
function swap(view) {
  data.view = view;
  if (view === 'guess-view') {
    sView.classList.add('hidden');
    gView.classList.remove('hidden');
  } else if (view === 'start-view') {
    sView.classList.remove('hidden');
    gView.classList.add('hidden');
  }
}

const breeds = [];
const images = [];
function getBreedAndImage() {
  for (let i = 0; i < data.queue.length; i++) {
    breeds.push(data.queue[i].breeds[0].name);
    images.push(data.queue[i].url);
  }
  // console.log(breeds);
}

const img = document.querySelector('img');
const inputs = document.querySelectorAll('input');
const h2 = document.querySelector('h2');

const quizCount = 0;
let usedIndex = [];
function handleQuiz() {
  img.setAttribute('src', images[quizCount]);
  const number = getRandomIndex(0, 2);
  inputs[number].setAttribute('value', breeds[quizCount]);
  inputs[number].addEventListener('click', function (e) {
    if (e) {
      inputs[number].classList.add('correct');
      h2.textContent = breeds[quizCount];
    }
  }
  );
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[number] !== inputs[i]) {
      let randomIndex;
      do {
        randomIndex = getRandomIndex(0, 9);
      } while (usedIndex.includes(randomIndex));
      usedIndex.push(randomIndex);
      inputs[i].setAttribute('value', breeds[randomIndex]);
      inputs[i].addEventListener('click', function (e) {
        inputs[i].classList.add('incorrect');
        usedIndex = [];
      });
      inputs.forEach(input => {
        input.addEventListener('click', () => {
          inputs.forEach(otherInput => {
            otherInput.classList.remove('active');
          });
          input.classList.add('active');
        });
      });
    }
  }
}

function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const startBtn = document.querySelector('.start');
startBtn.addEventListener('click', handleStart);
function handleStart(e) {
  swap('guess-view');
  getTenCats();
  getBreedAndImage();
  handleQuiz();
}
