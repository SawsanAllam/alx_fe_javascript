// const quoteDisplay= document.getElementById('quoteDisplay');
// const newQuote = document.getElementById('newQuote');
// const newQuoteText = document.getElementById('newQuoteText');
// const newQuoteCategory= document.getElementById('newQuoteCategory');
// const addQuote = document.getElementById('addQuote');


// let quotes = [
//   {
//     text: "Those who don’t believe in magic will never find it.",
//     category: "Inspiration"
//   },
//   {
//     text: "Light tomorrow with today.",
//     category: "Hope"
//   },
//   {
//     text: "Every strike brings me closer to the next home run.",
//     category: "Motivation"
//   },
//   {
//     text: "Happiness depends upon ourselves.",
//     category: "Philosophy"
//   },
//   {
//     text: "The best way to predict the future is to create it.",
//     category: "Success"
//   }
// ];
//  let savedQuotes =localStorage.getItem("quotes");
// if (savedQuotes){
//    quotes= JSON.parse(savedQuotes);
// }else {
//     localStorage.setItem("quotes",JSON.stringify(quotes));


// }
 

//  function showRandomQuote(){
//  let randomIndex = Math.floor(Math.random() * quotes.length );
//  let randomQuote = quotes[randomIndex];
//  console.log(randomQuote);
//  quoteDisplay.innerHTML= `${randomQuote.text}- ${randomQuote.category}`;
 
// }


// newQuote.addEventListener('click', showRandomQuote)

// function createAddQuoteForm() {
//     const formDiv = document.createElement("div");

//     const textInput = document.createElement("input");
//     textInput.placeholder = "Enter a new quote";
//     textInput.id = "newQuoteText";

//     const categoryInput = document.createElement("input");
//     categoryInput.placeholder = "Enter quote category";
//     categoryInput.id = "newQuoteCategory";

//     const addButton = document.createElement("button");
//     addButton.textContent = "Add Quote";
    
//     addButton.addEventListener("click", function() {
//         let newQuoteAdd = {
//             text: textInput.value,
//             category: categoryInput.value
//         };
//         if (newQuoteAdd.text && newQuoteAdd.category) {
//             quotes.push(newQuoteAdd);


//             localStorage.setItem("quotes",JSON.stringify(quotes));



//             textInput.value = "";
//             categoryInput.value = "";
//             alert("Quote added successfully!");
//         } else {
//             alert("Please fill both fields!");
//         }
//     });

//     formDiv.appendChild(textInput);
//     formDiv.appendChild(categoryInput);
//     formDiv.appendChild(addButton);

//     document.body.appendChild(formDiv);
// }

// createAddQuoteForm();



// // addQuote.addEventListener('click',function(){
// //     let newQuoteAdd ={
// //         text: newQuoteText.value,
// //         category: newQuoteCategory.value
// //     };
// //     quotes.push(newQuoteAdd);
// //     newQuoteText.value= '';
// //     newQuoteCategory.value= '';
// // })
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");

let quotes = [
  { text: "Those who don’t believe in magic will never find it.", category: "Inspiration" },
  { text: "Light tomorrow with today.", category: "Hope" },
  { text: "Every strike brings me closer to the next home run.", category: "Motivation" },
  { text: "Happiness depends upon ourselves.", category: "Philosophy" },
  { text: "The best way to predict the future is to create it.", category: "Success" }
];

// 🔹 تحميل الكوتس من Local Storage
let savedQuotes = localStorage.getItem("quotes");
if (savedQuotes) {
  quotes = JSON.parse(savedQuotes);
} else {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// 🔹 حفظ الكوتس
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// 🔹 عرض كوت عشوائية
function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];

  // حفظ آخر كوت في Session Storage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));

  quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><small>- ${randomQuote.category}</small>`;
}

// 🔹 تحميل آخر كوت من Session Storage لو موجود
let lastQuote = sessionStorage.getItem("lastQuote");
if (lastQuote) {
  let parsedQuote = JSON.parse(lastQuote);
  quoteDisplay.innerHTML = `<p>"${parsedQuote.text}"</p><small>- ${parsedQuote.category}</small>`;
}

newQuoteBtn.addEventListener("click", showRandomQuote);

// 🔹 إنشاء فورم إضافة كوت جديدة
function createAddQuoteForm() {
  const formDiv = document.getElementById("formContainer");

  const textInput = document.createElement("input");
  textInput.placeholder = "Enter a new quote";
  textInput.id = "newQuoteText";

  const categoryInput = document.createElement("input");
  categoryInput.placeholder = "Enter quote category";
  categoryInput.id = "newQuoteCategory";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  addButton.addEventListener("click", function () {
    let newQuoteAdd = {
      text: textInput.value,
      category: categoryInput.value,
    };
    if (newQuoteAdd.text && newQuoteAdd.category) {
      quotes.push(newQuoteAdd);
      saveQuotes();
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
}

createAddQuoteForm();

// 🔹 Export Quotes to JSON
exportBtn.addEventListener("click", function () {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
});

// 🔹 Import Quotes from JSON
importFile.addEventListener("change", function (event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format!");
      }
    } catch (err) {
      alert("Error reading file!");
    }
  };
  fileReader.readAsText(event.target.files[0]);
});

 