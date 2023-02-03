console.log('app file connected')
// *** Requirements:
// addEventListener()
// innerHTML
// template strings
// local storage

const choreForm = document.getElementById('chore-form');
const choreInput = document.getElementById('chore-input');
const add = document.getElementById('add');
const deleteAll = document.getElementById('delete-all');
const choresList = document.getElementById('chores-list');

let savedChores = JSON.parse(localStorage.getItem('chores')) || [];

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM is loaded
  // ToDo: getChores from local storage
  document.addEventListener('DOMContentLoaded', renderChores);
  // add a chore
  choreForm.addEventListener('submit', addChore);
  // delete a single chore
  choresList.addEventListener('click', deleteChore);
  // delete all chores from list
  deleteAll.addEventListener('click', deleteAllChores);

}

// add a chore
function addChore(e) {
  e.preventDefault();
  let chore = choreInput.value.toLowerCase(); // make everything lowerCase?
  // handle empty input value
  if (chore === '') {
    alert('Add a chore') // replace alert with hidden error span?
    return; // keep from creating a li ***note: check if needed
  }

  storeChoreInLocalStorage(chore)
  renderChores()
  choreInput.value = '';
}

// add chore to local storage
function storeChoreInLocalStorage(chore) {

  savedChores.push(chore)
  localStorage.setItem('chores', JSON.stringify(savedChores));

}

// delete a single chore
function deleteChore(e) {
  console.log(`The event targe is: ${e.target.textContent}`)
}

// delete all chores from list
function deleteAllChores() {
  localStorage.clear(); // this is too broad - need to target savedChores
  choresList.innerHTML = ``; // call the render func instead?
}


// render the chores from the chores array / localStorage
function renderChores() {
  
  const chores = localStorage.getItem('chores')
  console.log(chores)

  let choresHtml = ''
  for (let chore of savedChores) {
    choresHtml += `<li class="chore">${chore}</li>`
  }
  choresList.innerHTML = choresHtml;
}


