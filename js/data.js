/* exported data */
var data = {
  view: 'start-view',
  queue: []
};

window.addEventListener('beforeunload', handleStorage);
function handleStorage(event) {
  localStorage.setItem('local-storage', JSON.stringify(data));
}
const storage = JSON.parse(localStorage.getItem('local-storage'));
if (storage) {
  data = storage;
}
