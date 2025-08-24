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
const syncStatus = document.getElementById("syncStatus");

let quotes = [
  { id: 1, text: "Those who don’t believe in magic will never find it.", category: "Inspiration" },
  { id: 2, text: "Light tomorrow with today.", category: "Hope" },
  { id: 3, text: "Every strike brings me closer to the next home run.", category: "Motivation" },
  { id: 4, text: "Happiness depends upon ourselves.", category: "Philosophy" },
  { id: 5, text: "The best way to predict the future is to create it.", category: "Success" }
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
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = "";
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter && categories.includes(savedFilter)) {
    categoryFilter.value = savedFilter;
  } else {
    categoryFilter.value = "all";
  }
}

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
      id: Date.now(), // unique ID
      text: textInput.value,
      category: categoryInput.value,
    };
    if (newQuoteAdd.text && newQuoteAdd.category) {
      quotes.push(newQuoteAdd);
      saveQuotes();
      populateCategories();
      syncWithServer("POST", newQuoteAdd); // Sync with server
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
//  Export / Import
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

importFile.addEventListener("change", function (event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
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
//  Sync with Mock Server
// ============================
// هنا بنستخدم JSONPlaceholder كـ API وهمي
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; 

async function syncWithServer(method = "GET", data = null) {
  try {
    syncStatus.textContent = "🔄 Syncing...";

    if (method === "GET") {
      let response = await fetch(SERVER_URL);
      let serverData = await response.json();

      // Conflict Resolution → server data takes precedence
      let serverQuotes = serverData.slice(0, 5).map((item, index) => ({
        id: item.id,
        text: item.title,
        category: "Server"
      }));

      // دمج: بيانات السيرفر تحل محل البيانات المحلية
      quotes = [...quotes, ...serverQuotes];
      quotes = Array.from(new Map(quotes.map(q => [q.id, q])).values()); // remove duplicates
      saveQuotes();
      populateCategories();
      filterQuotes();

      syncStatus.textContent = "✅ Synced with server";
    }

    if (method === "POST" && data) {
      await fetch(SERVER_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      syncStatus.textContent = "✅ Data sent to server";
    }

  } catch (error) {
    syncStatus.textContent = "⚠️ Sync failed!";
  }
}

// Sync أول مرة
syncWithServer("GET");

// Sync كل 30 ثانية
setInterval(() => syncWithServer("GET"), 30000);

// ============================
//  Init
// ============================
populateCategories();
filterQuotes();

 