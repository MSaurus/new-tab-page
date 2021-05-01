import {storage} from './main.js'


export let loadQuote = () => {
  if (storage.getItem("quoteIndex") === null) {
    storage.setItem("quoteIndex", 0);
  }

  if(hasOneDayPassed()){
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let index = parseInt(storage.getItem("quoteIndex"));
  
      storage.setItem("quoteText", data[index].text)
      storage.setItem("quoteAuthor", data[index].author)
      storage.setItem("quoteIndex", index + 1)
    });
  }

  let quoteText = document.getElementById("quoteText");
  let quoteAuthor = document.getElementById("quoteAuthor");

  // can write storage.quoteText but this is more obvious what is happening
  let quote = storage.getItem("quoteText")
  let author = storage.getItem("quoteAuthor")

  quoteText.textContent = "''" + quote + "''"
  if (author !== "null" ){
    quoteAuthor.textContent = "— " + author
  }

}

let hasOneDayPassed = () =>{
  let date = new Date().toLocaleDateString();
  if (storage.getItem("date") === null) {
    storage.setItem("date", date);
  }

  if(storage.getItem("date") === date){
    return false;
  }

  storage.setItem("date", date);

  return true;
}
