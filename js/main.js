document.addEventListener('DOMContentLoaded', init); //call a function to start things off

const places = [
  { short: 'ON', full: 'Ontario' },
  { short: 'NS', full: 'Nova Scotia' },
  { short: 'BC', full: 'British Columbia' },
  { short: 'AB', full: 'Alberta' },
  { short: 'MB', full: 'Manitoba' },
]; //data that normally comes from outside the page

function init() {
  //the initial function to set up the page
  addListeners();
  populateDropDown();
}

function addListeners() {
  //add all the event listeners to the page in its initial state
  //submit the form #formPlace
  document.getElementById('formPlace');
  //change the selection in the dropdown list #places
  document.getElementById('places');
  //click on the h3#title
  document.getElementById('title');
}

function populateDropDown() {
  //build all the <option> elements inside #places
  const select = document.getElementById('places');
}

function handleFormSubmit(ev) {
  //get the currently selected item and add it to #data
}

function handleSelectChange(ev) {
  //get the currently selected item and add it to #data
  const select = ev.target;
}

function handleTitleClick(ev) {
  //display the selected item inside #data
  const section = document.getElementById('data');
}

function addItemToSection(value, text) {
  //create a paragraph with the value and text and add to #data
  const section = document.getElementById('data');
}

function wait(func, delay = 1000) {
  //wait for the delay then call a function
  setTimeout(func, delay);
}

function waitThen(func, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(func);
    }, delay);
  });
}

/* Promise Syntax Review
const myPromise = new Promise((ftw, wtf)=>{
    //run a function that can take any amount of time
    // this first function starts on the main stack
    // when successfully completed call the resolve function.
    // send back any data you want
    const data = {id:123};
    ftw(data);
    //if your function fails then call the reject function
    // it can also send back anything you want.
    const err = new Error('Forgot my lunch');
    wtf(err);

    //The Promise object will hold the results of the resolve or reject 
    //so they can be placed on the microtask queue
  })

  myPromise.then((data)=>{
      //this function is placed on the microtask queue along with the data
      //IF the promise function called resolve()
    }).catch((err)=>{
      //this function is placed on the microtask queue along with some data
      //IF the promise function called reject()
    })
*/
