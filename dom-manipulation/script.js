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
const categoryFilter = document.getElementById("categoryFilter");

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

// ============================
//  فلترة الكوتس حسب الكاتيجوري
// ============================
function populateCategories() {
  // نجيب كل الكاتيجوريز الفريدة
  const categories = ["all", ...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = "";
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // تحميل آخر فلتر محفوظ من localStorage
  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter && categories.includes(savedFilter)) {
    categoryFilter.value = savedFilter;
  } else {
    categoryFilter.value = "all";
  }
}

// فلترة الكوتس حسب الكاتيجوري
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes = selectedCategory === "all" 
    ? quotes 
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length > 0) {
    let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    let randomQuote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><small>- ${randomQuote.category}</small>`;
  } else {
    quoteDisplay.innerHTML = `<p>No quotes available in this category.</p>`;
  }
}

// عند الضغط على زر "Show New Quote"
newQuoteBtn.addEventListener("click", filterQuotes);

// ============================
//  الفورم لإضافة كوتس جديدة
// ============================
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
      populateCategories(); // تحديث الكاتيجوريز
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

// ============================
//  Export Quotes to JSON
// ============================
exportBtn.addEventListener("click", function () {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
});

// ============================
//  Import Quotes from JSON
// ============================
importFile.addEventListener("change", function (event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories(); // تحديث الكاتيجوريز بعد الاستيراد
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

// ============================
//  تحميل الفلتر + عرض أول كوت
// ============================
populateCategories();
filterQuotes();

 