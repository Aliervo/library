(() => { //module wrapper to keep the global scope clean
//Firebase setup~~~~~~~~~~~~~~~~~~~~~~~~
var firebaseConfig = {
  apiKey: "AIzaSyAjb6PZBq1aRXAALomqPU4SPPeWAY0zc70",
  authDomain: "odinprojectlibraryapp.firebaseapp.com",
  databaseURL: "https://odinprojectlibraryapp.firebaseio.com",
  projectId: "odinprojectlibraryapp",
  storageBucket: "odinprojectlibraryapp.appspot.com",
  messagingSenderId: "141145543751",
  appId: "1:141145543751:web:b9bc341cdbfa0e03fdcd62"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//End of firebase setup~~~~~~~~~~~~~~~~~

const MY_LIBRARY = firebase.database().ref("myLibrary");

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

function addBookToLibrary(title, author, pages, read) {
  const BOOK = new Book(title, author, pages, read);
  const PUSH_EVENT = MY_LIBRARY.push();
  const KEY = PUSH_EVENT.key;

  PUSH_EVENT.set(BOOK);
  renderBook(KEY);
}

function removeBookFromLibrary(bookCard) {
  const ID = bookCard.getAttribute("id");

  BODY.removeChild(bookCard);
  MY_LIBRARY.child(ID).off();
  MY_LIBRARY.child(ID).remove();
}

function renderBook(book) {
  const BOOK_DIV = document.createElement("div");
  const TITLE    = document.createElement("h1");
  const AUTHOR   = document.createElement("p");
  const PAGES    = document.createElement("p");
  const DELETE   = document.createElement("button");
  const READ_IT  = document.createElement("button");


  BOOK_DIV.setAttribute("id", book);
  BOOK_DIV.setAttribute("class", "book");

  MY_LIBRARY.child(book).on("value", snapshot => {
    TITLE.textContent  = snapshot.val().title;
    AUTHOR.textContent = `Author: ${snapshot.val().author}`;
    PAGES.textContent  = `Pages: ${snapshot.val().pages}`;
  });

  READ_IT.textContent = "Read it?";
  READ_IT.addEventListener("click", () => {
    MY_LIBRARY.child(book + "/read").set(true);
    BOOK_DIV.removeChild(READ_IT);
  });

  DELETE.textContent = "Delete";
  DELETE.setAttribute("class", "delete");
  DELETE.addEventListener("click", () => removeBookFromLibrary(BOOK_DIV));

  BOOK_DIV.appendChild(DELETE);
  BOOK_DIV.appendChild(TITLE);
  BOOK_DIV.appendChild(AUTHOR);
  BOOK_DIV.appendChild(PAGES);

  MY_LIBRARY.child(book).once("value").then(snapshot => {
    if (snapshot.val().read === false) BOOK_DIV.appendChild(READ_IT);
  });

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

MY_LIBRARY.once("value").then(snapshot => {
  Object.keys(snapshot.val()).forEach((key) => renderBook(key));
});
})();
