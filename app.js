// Global variables
const choreForm = document.getElementById('chore-form');
const deleteAll = document.getElementById('delete-all');
const choresList = document.getElementById('chores-list');
// savedChores - get for localStorage if it's there, otherwise it's an empty array
const savedChores = JSON.parse(localStorage.getItem('chores')) || [];

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM is loaded, get render savedChores from LS
  document.addEventListener('DOMContentLoaded', renderChores);
  // add a chore - form/button submit
  choreForm.addEventListener('submit', addChore);
  // delete a single chore
  choresList.addEventListener('click', deleteChore);
  // delete all chores from list
  deleteAll.addEventListener('click', deleteAllChores);
}

// add a chore
function addChore(e) {
  e.preventDefault();
  const choreInput = document.getElementById('chore-input');
  const chore = choreInput.value.toLowerCase(); // make everything lowerCase?
  // handle empty input value
  if (chore === '') {
    alert('Add a chore') // replace alert with hidden error span?
    return; // keep from creating a li
  }
  // handle duplicate chore input
  if (!savedChores.includes(chore)){
    storeChoreInLocalStorage(chore)
    renderChores()
  }
  choreInput.value = ''; // clear chore input
}

// add chore to local storage
function storeChoreInLocalStorage(chore) {
  savedChores.push(chore)
  localStorage.setItem('chores', JSON.stringify(savedChores));
}

// delete a single chore
function deleteChore(e) {
  const choreLi = e.target; // li element of chore
  const clickedChore = e.target.textContent; // text of chore
  // use forEach to loop through savedChores, match up LI textContent
  savedChores.forEach((chore, idx) => { // loop through chores to find clicked chore
    if (clickedChore === chore) {
      savedChores.splice(idx, 1); // remove chore with splice
    }
  });
  choreLi.remove(); // remove the li element from the DOM
  localStorage.setItem('chores', JSON.stringify(savedChores)); // set updated chores in LS
}

// delete all chores from list
function deleteAllChores() {
  // while there are chores in the savedChores array
  while (savedChores.length > 0) {
    savedChores.pop(); // remove any chores left in array
  }
  choresList.innerHTML = ``; // clear any elements in the choresList UL
  localStorage.setItem('chores', JSON.stringify(savedChores)); // set updated chores in LS
}

// render the chores from the chores array / localStorage
function renderChores() {
  console.log(JSON.parse(localStorage.getItem('chores'))) // debug

  let choresHtml = ''
  for (let chore of savedChores) {
    choresHtml += `<li class="chore">${chore}</li>`
  }
  choresList.innerHTML = choresHtml;
}


