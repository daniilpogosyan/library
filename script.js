function Book(title ='dabook', author, pageCount, isRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;
}

Book.prototype.info = function() {
  const getReadStatus = (isRead) => {
    if (isRead)   return 'read already';
    return 'not read yet';
  }
  const isReadStr = getReadStatus(this.isRead);

  return `${this.title}, by ${this.author}, ${this.pageCount} pages, ${isReadStr}`;
}


const booksDB = [];

const showNewBookFormBtn = document.querySelector('.add-book__button');
showNewBookFormBtn.addEventListener('click', showNewBookForm);

const hideNewBookFormBtn = document.querySelector('.new-book-form__close-form-btn');
hideNewBookFormBtn.addEventListener('click', hideNewBookForm);


const deleteBookBtns = document.querySelectorAll(".button__delete");
const addBookBtn = document.querySelector(".new-book-form__add-btn");
addBookBtn.addEventListener('click', () => {
  const book = getBookfromForm();
  addBookToDB(book, booksDB);
  addDOMBookToList(book);
  hideNewBookForm();
})

function getBookfromForm() {
  const form = document.querySelector('.new-book-form');
  const inputs = form.querySelectorAll('.new-book-form__input');
  const book = new Book();
  inputs.forEach((input) => {
    book[input.getAttribute("name")] = input.value;
  });
  book.id = Math.floor((Math.random() * 100000));

  const isReadStatus = form.querySelector('.new-book-form__input[name="isRead"]').checked;
  book.isRead = isReadStatus? 'Read' : 'Not Read';
  return book;
}
function addBookToDB(book, DB) {
  DB.push(book);
}

function setBtnsListenerstoBook(bookId) {
  deleteBtn = document.querySelector(`.button__delete[data-id="${bookId}"]`).addEventListener(
    'click', () => {
      deleteBookFromDOM(bookId);
      deleteBookFromDB(bookId);
    });
}
function createDOMBook (book) {
  const DOMBook = document.createElement("li");
  DOMBook.classList.add("book-wrapper");
  DOMBook.dataset.id = book.id;
  const isRead = 
  DOMBook.innerHTML = `
          <article class="book">
            <div class="book__buttons">
              <button data-id="${book.id}" class="book__button button__edit"></button>
              <button data-id="${book.id}" class="book__button button__delete"></button>
            </div>
            <div class="book__info">
              <h2 class="book__title">${book.title}</h2>
              <p class="book__author">${book.author}</p>
              <p class="book__page-count">${book.pageCount}</p>
            </div>
            <p class="book__isread">${book.isRead}</p>
          </article>`;
  return DOMBook;
}
function displayBooksDB(booksDB) {
  const bookList = document.querySelector(".book-list");
  booksDB.forEach((book) => addDOMBookToList(book));
}
function addDOMBookToList(book) {
  const DOMBook = createDOMBook(book);
  document.querySelector(".book-list").appendChild(DOMBook);
  setBtnsListenerstoBook(DOMBook.dataset.id);
}

function deleteBookFromDB(bookId) {
  const index = booksDB.findIndex((book) => {
    return book.id == bookId;
  });
  booksDB.splice(index, 1);
}

function deleteBookFromDOM(bookId) {
    const book = document.querySelector(`.book-wrapper[data-id="${bookId}`)
    book.remove();  
}


function hideNewBookForm() {
  document.querySelector('.new-book-window').classList.remove('new-book-window--isshown');
}

function showNewBookForm() {
  document.querySelector('.new-book-window').classList.add('new-book-window--isshown');
}