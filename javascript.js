const libraryDisplay = document.querySelector(".library-display");
const button1 = document.querySelector(".btn-1");
const button2 = document.querySelector(".btn-2");
const button3 = document.querySelector(".btn-3");
const form = document.getElementById("formElement");

let myLibrary = [];

//function Book(title, author, pages, read) {
// the constructor...
//  this.title = title;
//  this.author = author;
//  this.pages = pages;
//  this.read = read;
//  this.info = function () {
//    return (
//      title + " " + "by" + " " + author + "," + " " + pages + " " + "pages"
//    );
//  };
// }

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info() {
    return (
      this.title +
      " " +
      "by" +
      " " +
      this.author +
      "," +
      " " +
      this.pages +
      " " +
      "pages"
    );
  }
  readStatus() {
    if (this.read == false) {
      this.read = true;
    } else {
      this.read = false;
    }
    renderDisplay();
  }
}

//Book.prototype.readStatus = function () {
//  if (this.read == false) {
//    this.read = true;
//  } else {
//    this.read = false;
//  }

//  renderDisplay();
// };

function renderDisplay() {
  // remove previous divs
  removeAllChildNodes(libraryDisplay);

  // create new grid-divs
  for (let i = 0; i < myLibrary.length; i++) {
    const divs = document.createElement("div");
    divs.className = "grid-div";
    //divs.setAttribute("id", myLibrary.indexOf(myLibrary[i]));
    libraryDisplay.appendChild(divs);
    divs.textContent = myLibrary[i].info();

    divs.dataset.indexNumber = myLibrary.indexOf(myLibrary[i]);

    // button to remove books from library
    const removeBook = document.createElement("button");
    removeBook.className = "remove-book";
    divs.appendChild(removeBook);
    removeBook.textContent = "Remove";

    removeBook.addEventListener("click", removeFunction);

    function removeFunction() {
      myLibrary.splice(divs.dataset.indexNumber, 1);
      renderDisplay();
    }

    // button to change read status of the books
    let readStts = document.createElement("button");
    readStts.className = "read-status";
    divs.appendChild(readStts);
    readStts.textContent = "";

    if (myLibrary[i].read == false) {
      readStts.textContent = "Not read";
      readStts.classList.add("btn-red");
    } else {
      readStts.textContent = "Read";
      readStts.classList.add("btn-green");
    }

    readStts.addEventListener("click", readFunction);

    function readFunction() {
      myLibrary[divs.dataset.indexNumber].readStatus();
    }
  }
}

function addBookToLibrary(event) {
  // create book objects
  let bookTitle = document.getElementById("book-title").value;
  let bookAuthor = document.getElementById("book-author").value;
  let bookPages = document.getElementById("pages").value;
  let bookStatus = document.getElementById("book-status");

  if (bookStatus.checked == false) {
    bookStatus = false;
  } else {
    bookStatus = true;
  }

  // Check if any of the required fields are empty
  if (!bookTitle || !bookAuthor || !bookPages) {
    alert("Please fill in all required fields.");
    return; // Do not proceed with adding the book
  }

  const myBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);

  myLibrary.push(myBook);
  console.log(myLibrary);
  renderDisplay();

  // Reset the form
  form.reset();

  // stop the form from submitting to the server
  event.preventDefault();

  form.style.display = "none";
}

button3.addEventListener("click", addBookToLibrary, false);

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

button1.addEventListener("click", () => {
  if (form.style.display === "" || form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
});

button2.addEventListener("click", () => {
  form.style.display = "none";
});
