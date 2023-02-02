console.log('app file connected')

const choreForm = document.getElementById('chore-form');
const choreInput = document.getElementById('chore-input');
const add = document.getElementById('add');
const deleteAll = document.getElementById('delete-all');
const choresList = document.getElementById('chores-list');

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


// add a chore
function addChore(e) {
  let chore = choreInput.value;
  // handle empty input value
  if (chore === '') {
    alert('Add a chore') // replace alert with hidden error span?
  }
  console.log(choreInput.value); // debug

  const li = document.createElement('li');
  li.className = 'chore';
  li.textContent = chore;
  choresList.appendChild(li)


  // clear input
  choreInput.value = '';

  e.preventDefault();
}

// ToDo: add click listener for all chore li's


