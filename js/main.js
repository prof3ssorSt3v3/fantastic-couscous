document.addEventListener('DOMContentLoaded', init); //call a function to start things off

const provinces = [
  { short: 'ON', full: 'Ontario' },
  { short: 'NS', full: 'Nova Scotia' },
  { short: 'BC', full: 'British Columbia' },
  { short: 'AB', full: 'Alberta' },
  { short: 'MB', full: 'Manitoba' },
]; //data that normally comes from outside the page

function init() {
  //the initial function to set up the page
  //control the sequence of functions with .then() chains
  Promise.resolve()
    .then(populateDropDown) //add each function to the microtask queue IN ORDER
    .then(populateDataList)
    .then(() => {
      addListeners('provinceList'); //if we need to pass a param to the function do this
    })
    .catch((err) => {
      //there was an error at some point in these three functions
    });
  // populateDropDown();
  // populateDataList();
  // addListeners();
}

//async means we are allowed to use await
async function altInit() {
  try {
    await populateDropDown(); //await means add this thing to the microtask queue
    //next line will not run until the microtask function is finished
    await populateDataList();
    await addListeners('provinceList');
  } catch (err) {
    //handle the error... tell the user
  }
}

function addListeners(id) {
  //add all the event listeners to the page in its initial state
  console.log(id);
  //user types in the <input>
  document.getElementById('provinceList').addEventListener('input', handleInput);
  //user uses arrow keys and enter to select from the list OR clicks on item in the list
  document.getElementById('provinceList').addEventListener('change', handleInputChange);
  //submit the form #formPlace
  document.getElementById('formPlace').addEventListener('submit', handleFormSubmit);
  //change the selection in the dropdown list #places
  document.getElementById('selectPlaces').addEventListener('change', handleSelectChange);
  //click on the h3#title
  document.getElementById('title').addEventListener('click', handleTitleClick);
  // return f1;
}
function handleInputChange(ev) {
  console.log(ev.type);
  const input = ev.target;
  console.log({ input }); //to see all the properties in the <input> element
}

function handleInput(ev) {
  console.log(ev.type);
}

function populateDataList() {
  //add the options to the datalist#provinceData
  const datalist = document.getElementById('provinceData'); // <select>

  const df = document.createDocumentFragment();
  provinces.forEach(({ short, full }) => {
    //runs once for each item in provinces
    // {short, full} saves us from writing item.short and item.full
    const option = document.createElement('option');
    option.value = short;
    option.text = full;
    df.append(option);
  });
  datalist.append(df); //do the append to the page AFTER the loop
}

function populateDropDown() {
  //build all the <option> elements inside #places
  const select = document.getElementById('selectPlaces'); // <select>
  //get rid of the first option
  select.querySelectorAll('option')[0]?.remove();
  select.querySelector('option')?.remove(); //nullish coalescing operator
  //get rid of all the options
  select.innerHTML = '';
  const df = document.createDocumentFragment();
  provinces.forEach(({ short, full }) => {
    //runs once for each item in provinces
    // {short, full} saves us from writing item.short and item.full
    const option = document.createElement('option');
    option.value = short;
    option.text = full;
    df.append(option);
  });
  select.append(df); //do the append to the page AFTER the loop
}

function handleFormSubmit(ev) {
  //get the currently selected item and add it to #data
  console.log(ev.type);
  //http://127.0.0.1:9014/index.html?places=AB - querystring added
  ev.preventDefault(); //stop the page from reloading...
  //need to get the select
  const select = ev.target.querySelector('#selectPlaces');
  addItemToSection(select.value, select.selectedOptions[0].text);
}

function handleSelectChange(ev) {
  //get the currently selected item and add it to #data
  const select = ev.target;
  console.log(ev.type);
  console.log({ select }); //select
  // console.log(ev.target); //select
  console.log(select.selectedIndex); //2
  console.log(select.selectedOptions[0]); //<option>
  console.log(select.selectedOptions[0].value); //<option value="value">
  console.log(select.selectedOptions[0].text); //<option>text</option>
  console.log(select.value);
  addItemToSection(select.value, select.selectedOptions[0].text);
}

function handleTitleClick(ev) {
  //display the selected item inside #data
  const section = document.getElementById('data');
  console.log(ev.type);
  section.innerHTML = '';
}

function addItemToSection(value, text) {
  //create a paragraph with the value and text and add to #data
  const section = document.getElementById('data');
  section.innerHTML += `<p>${value} ${text}</p>`;
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
    });


  //Promise example for loading an image
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.src = url;

      // img.onload = () => resolve(img);
      img.addEventListener('load', () => resolve(img));
      img.onerror = (err) => reject(new Error(`Failed to load image at: ${url}`));
    });
  }

  // Usage:
  loadImage('https://picsum.photos/300/300')
    .then((img) => {
      //resolve was called
      document.body.appendChild(img);
    })
    .catch((error) => {
      //reject was called
      console.error(error);
    });

  //Article / Tutorial on how to use Promises with callbacks like Geolocation
  https://dev.to/prof3ssorst3v3/you-can-convert-your-callbacks-to-promises-141n
*/
