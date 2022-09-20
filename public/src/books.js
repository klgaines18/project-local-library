function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const returnedBooks = books.filter((book) => book.borrows[0].returned);
  const checkedOutBooks = books.filter((book) => !book.borrows[0].returned);
  return [checkedOutBooks, returnedBooks]
}

// helper function to find account by ID
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function getBorrowersForBook({borrows = []}, accounts) {
  let bookBorrowers = []
  for (i = 0; i < borrows.length; i++) {
    const borrower = borrows[i]
    const account = findAccountById(accounts, borrower.id)
    const accountCopy = {...account}
    delete accountCopy.id
    bookBorrowers.push({
      ...borrower,
      ...accountCopy
    })
  }
  while (bookBorrowers.length > 10) {
    bookBorrowers.pop()
  }
  return bookBorrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
