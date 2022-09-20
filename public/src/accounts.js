// returns account object that has the matching ID
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
  return accounts
}

// helper function to get array of borrower ids from a given book
function getBorrowIdsFromBook(book) {
  const borrows = book["borrows"];
  return borrows.map((borrow) => borrow["id"])
}

function getTotalNumberOfBorrows(account, books) {
  let numBorrows = 0;
  for (let i = 0; i < books.length; i++) {
    const borrows = getBorrowIdsFromBook(books[i]);
    if (borrows.includes(account.id)) numBorrows++
  }
  return numBorrows
}

//helper function to combine book and author objects
function addAuthorToBook(book, authors) {
  // locate book author
  const bookAuthor = authors.find((author) => author.id === book.authorId);
  const bookBorrows = book.borrows
  // make a temporary copy of book object
  const tempBook = {...book};
  // remove borrows key-value pair from tempBook object, will add back later with bookBorrows
  delete tempBook.borrows
  // create new object nesting author object between authorId and borrows
  const newObject = {
    ...tempBook,
    "author": bookAuthor,
    "borrows": bookBorrows
  }
  return newObject
}

// helper function to check if book has been returned
function bookHasBeenReturned(book, id) {
  const borrows = book["borrows"];
  for (let i = 0; i < borrows.length; i++) {
    if (borrows[i].id === id) return borrows[i].returned
  }
}

function getBooksPossessedByAccount(account, books, authors) {
  let accountBooks = []
  for (let i = 0; i < books.length; i++) {
    const borrows = getBorrowIdsFromBook(books[i]);
    if (borrows.includes(account.id) && !bookHasBeenReturned(books[i], account.id)) {
      const bookObject = addAuthorToBook(books[i], authors)
      accountBooks.push(bookObject)
    }
  }
  return accountBooks
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
