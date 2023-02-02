console.log('app file connected')

const choreForm = document.getElementById('chore-form');
const choreInput = document.getElementById('chore-input');
const add = document.getElementById('add');
const deleteAll = document.getElementById('delete-all');
// const choresList = document.getElementById('chores-list');

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM is loaded
  // ToDo: getChores from local storage

  choreForm.addEventListener('submit', addChore);
}

// *** Requirements:
// addEventListener()
// innerHTML
// template strings
// local storage

const chores = [];

// add a chore
function addChore(e) {
  e.preventDefault();
  let chore = choreInput.value.toLowerCase(); // make everything lowerCase?
  // handle empty input value
  if (chore === '') {
    alert('Add a chore') // replace alert with hidden error span?
    return; // keep from creating a li
  }

  // prevent dup chores (stretch goal req)
  if (!chores.includes(chore)) {
    // add chore to choresArray? or set to localStorage?
    chores.push(chore) 
    renderChores(chores) // call the renderChores functions
  } else {
    console.log('no dup chores!') // debug - add error handling msg
  }

  // const li = document.createElement('li');
  // li.className = 'chore';
  // li.textContent = chore;
  // choresList.appendChild(li)

  // clear input
  choreInput.value = '';

}

// render the chores from the chores array / localStorage
function renderChores(arrayOfChores) {

  const choresList = document.getElementById('chores-list');
  let choresHtml = ''
  for (let chore of arrayOfChores) {
    choresHtml += `<li class="chore">${chore}</li>`
  }
  choresList.innerHTML = choresHtml;
}

// ToDo: add click listener for all chore li's

