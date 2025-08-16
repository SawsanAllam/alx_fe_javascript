const quoteDisplay= document.getElementById('quoteDisplay');
const newQuote = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory= document.getElementById('newQuoteCategory');
const addQuote = document.getElementById('addQuote');


let quotes = [
  {
    text: "Those who don’t believe in magic will never find it.",
    category: "Inspiration"
  },
  {
    text: "Light tomorrow with today.",
    category: "Hope"
  },
  {
    text: "Every strike brings me closer to the next home run.",
    category: "Motivation"
  },
  {
    text: "Happiness depends upon ourselves.",
    category: "Philosophy"
  },
  {
    text: "The best way to predict the future is to create it.",
    category: "Success"
  }
];

 function showRandomQuote(){
 let randomIndex = Math.floor(Math.random() * quotes.length );
 let randomQuote = quotes[randomIndex];
 console.log(randomQuote);
 quoteDisplay.innerHTML= `${randomQuote.text}- ${randomQuote.category}`;
 
}


newQuote.addEventListener('click', showRandomQuote)

function createAddQuoteForm() {
    const formDiv = document.createElement("div");

    const textInput = document.createElement("input");
    textInput.placeholder = "Enter a new quote";
    textInput.id = "newQuoteText";

    const categoryInput = document.createElement("input");
    categoryInput.placeholder = "Enter quote category";
    categoryInput.id = "newQuoteCategory";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", function() {
        let newQuoteAdd = {
            text: textInput.value,
            category: categoryInput.value
        };
        if (newQuoteAdd.text && newQuoteAdd.category) {
            quotes.push(newQuoteAdd);
            textInput.value = "";
            categoryInput.value = "";
            alert("Quote added successfully!");
        } else {
            alert("Please fill both fields!");
        }
    });

    formDiv.appendChild(textInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);

    document.body.appendChild(formDiv);
}

// نستدعيها عشان الفورم يظهر
createAddQuoteForm();



// addQuote.addEventListener('click',function(){
//     let newQuoteAdd ={
//         text: newQuoteText.value,
//         category: newQuoteCategory.value
//     };
//     quotes.push(newQuoteAdd);
//     newQuoteText.value= '';
//     newQuoteCategory.value= '';
// })
 