const MY_LIBRARY = [];

const BODY = document.querySelector("body");
const NEW_BOOK_BUTTON = document.querySelector("button");

NEW_BOOK_BUTTON.addEventListener("click", toggleForm);

const ADD_BOOK_FORM = document.getElementById("bookForm");
const ADD_BOOK_BUTTON = ADD_BOOK_FORM.elements[4];

ADD_BOOK_BUTTON.addEventListener("click", processForm);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.finishedReading = function() {
  this.read = true;
}

function addBookToLibrary(title, author, pages, read) {
  const BOOK = new Book(title, author, pages, read);
  MY_LIBRARY.push(BOOK);
  renderBook(BOOK);
}

function removeBookFromLibrary(bookCard) {
  const INDEX = bookCard.getAttribute("id").slice(4);

  BODY.removeChild(bookCard);
  MY_LIBRARY.splice(INDEX, 1);

  const BOOK_CARDS = [...document.querySelectorAll(".book")];
  BOOK_CARDS.forEach(card => {
    card.setAttribute("id", `book${BOOK_CARDS.indexOf(card)}`);
  });
}

function renderBook(book) {
  const BOOK_DIV = document.createElement("div");
  const TITLE = document.createElement("p");
  const DELETE = document.createElement("button");
  const READ_IT = document.createElement("button");

  BOOK_DIV.setAttribute("id", `book${MY_LIBRARY.length -1}`);
  BOOK_DIV.setAttribute("class", "book");

  TITLE.textContent = book.title;

  DELETE.textContent = "Delete";
  DELETE.addEventListener("click", () => removeBookFromLibrary(BOOK_DIV));

  READ_IT.textContent = "Read it?";
  READ_IT.addEventListener("click", () => {
    book.finishedReading();
    BOOK_DIV.removeChild(READ_IT);
  });

  BOOK_DIV.appendChild(TITLE);
  BOOK_DIV.appendChild(DELETE);
  if (book.read === false) BOOK_DIV.appendChild(READ_IT);
  BODY.insertBefore(BOOK_DIV, NEW_BOOK_BUTTON);
}

function toggleForm() {
  const FORM = document.querySelector("form");
  FORM.classList.toggle("hidden");
}

function processForm() {
  const TITLE  = ADD_BOOK_FORM.elements[0].value;
  const AUTHOR = ADD_BOOK_FORM.elements[1].value;
  const PAGES  = ADD_BOOK_FORM.elements[2].value;
  const READ   = ADD_BOOK_FORM.elements[3].checked;

  addBookToLibrary(TITLE, AUTHOR, PAGES, READ);
  ADD_BOOK_FORM.reset();
  toggleForm();
}
