// Global variables
const message = document.getElementById('message');
const choreForm = document.getElementById('chore-form');
const deleteAll = document.getElementById('delete-all');
const choresList = document.getElementById('chores-list');
const gifContainer = document.getElementById('gif-container');
// savedChores - get for localStorage if it's there, otherwise it's an empty array
const savedChores = JSON.parse(localStorage.getItem('chores')) || [];
let allChoresDone = false;

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM is loaded, get render savedChores from LS
  document.addEventListener('load', renderChores); // *** preference to use 'load' here - waits for everything, not jut DOM content
  // add a chore - form/button submit
  choreForm.addEventListener('submit', addChore);
  // delete a single chore
  choresList.addEventListener('click', deleteChore);
  // delete all chores from list
  deleteAll.addEventListener('click', deleteAllChores);
  // close the success gif
  gifContainer.addEventListener('click', () => {
    gifContainer.innerHTML = '';
  })
}

// add a chore
function addChore(e) {
  e.preventDefault();
  const choreInput = document.getElementById('chore-input');
  const chore = choreInput.value.toLowerCase().trim(); // lowerCase for better dup detection, trim() to account for just spaces in input
  // handle empty input value
  if (!chore) { // check if this is 
    showWarningMessage('Please add a chore.');
    return; // keep from creating a li
  }
  // handle duplicate chore input
  if (savedChores.includes(chore)){
    showWarningMessage('No duplicate chores, please.');
    choreInput.value = ''; // clear chore input
    return;
  }
  storeChoreInLocalStorage(chore) // call storeChoreInLocalStorage func, pass in chore
  renderChores() // call renderChores
  choreInput.value = ''; // clear chore input
  gifContainer.innerHTML = ''; // clear gif if needed
  deleteAll.disabled = false; // enable the delete all chores button
}

// add chore to local storage
function storeChoreInLocalStorage(chore) {
  savedChores.push(chore) // push chore to savedChores array
  localStorage.setItem('chores', JSON.stringify(savedChores)); // set chores in LS
}

// show warning message
function showWarningMessage(msg) {
  message.style.display = 'block'; // show the message
  message.textContent = msg; // assign message content
  setTimeout(function() { // clear message after 1.5 seconds
    message.style.display = 'none'
  }, 1500)
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
  if (savedChores.length === 0) {
    showRandomGif(); // get a success gif if last chore is cleared
  }
}

// delete all chores from list
function deleteAllChores() {
  // while there are chores in the savedChores array
  while (savedChores.length > 0) {
    savedChores.pop(); // remove any chores left in array
  }
  choresList.innerHTML = ``; // clear any elements in the choresList UL
  localStorage.setItem('chores', JSON.stringify(savedChores)); // set updated chores in LS
  showRandomGif()
}

// render the chores from the chores array / localStorage
function renderChores() {
  let choresHtml = ''
  for (let chore of savedChores) { // loop through savedChores
    choresHtml += `<li class="chore">${chore}</li>` // add an li for each chore
  }
  choresList.innerHTML = choresHtml;
}

// show random gif 
function showRandomGif() {
  const gifs = ['the-office-1.gif', 'the-office-2.gif', 'the-office-3.gif', 'the-office-4.gif', 'the-office-5.gif'];
  const randomGif = gifs[Math.floor(Math.random() * gifs.length)]; // get random gif/index
  const successImgHtml = `
    <img id="success-gif" class="success-gif" src="./img/${randomGif}" alt="A celebration gif from the office tv show">
  `
  gifContainer.innerHTML = successImgHtml;
  deleteAll.disabled = true; // disable the delete-all-chores button
}