const startBtn = document.querySelector('.start');

startBtn.addEventListener('click', handleStart);
function handleStart(e) {
  // Need to load 10 cats

  swap('guess-view');
  getTenCats();
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

// const banner = document.querySelector('h2');
// const img = document.querySelector('img');
// query the multiple choice

function getTenCats() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=10&api_key=live_NO1khTMuP3C8aJanIQAydCR1eolXjepWGEGEpBl2zkQDPctiac7A92lHoSqOpCdz');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
    const json = xhr.response;
    data.queue = json;
    // console.log('data.queue', data.queue[0].name);
    // for (let i = 0; i < json.length; i++) {}
  });
  xhr.send();
}
