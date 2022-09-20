const getTotalBooksCount = books => books.length

const getTotalAccountsCount = accounts => accounts.length

function getBooksBorrowedCount(books = []) {
  let booksBorrowed = 0;
  for (let i = 0; i < books.length; i++) {
    const first = books[i].borrows[0];
    if (!first["returned"]) booksBorrowed++
  }
  return booksBorrowed
}

function getMostCommonGenres(books) {
  let popularGenres = [{name: "test", count: 0}];
  for (let i = 0; i < books.length; i++) {
    const bookGenre = books[i].genre;
    const included = popularGenres.find((genre) => genre.name === bookGenre);
    if (included) {
      included.count++
    } else {
      popularGenres.push({name: bookGenre, count: 1})
    }
  }
  popularGenres.sort((genreA, genreB) => genreB.count - genreA.count)
  popularGenres.pop()
  while (popularGenres.length > 5) {
    popularGenres.pop()
  } 
  return popularGenres
}


function getMostPopularBooks(books) {
  const popularBooks = books.reduce((result, book, index) => {
      result[index] = {name: book.title, count: book.borrows.length}
      return result
  }, []);
  popularBooks.sort((bookA, bookB) => bookB.count - bookA.count)
  while (popularBooks.length > 5) {
    popularBooks.pop()
  }
  return popularBooks
}

// helper function to grab author's full name as string
function getAuthorName(book, authors) {
  const author = authors.find((author) => author.id === book.authorId)
  const {name} = author
  return `${name.first} ${name.last}`
}

// helper function to count book borrows for a given book
function getTotalBookBorrows(book) {
  const borrows = book["borrows"];
  const bookIdArray = borrows.map((borrow) => borrow["id"])
  return bookIdArray.length
}

function getMostPopularAuthors(books, authors) {
  let popularAuthors = [{name: "test", count: 0}]
  for (let i = 0; i < books.length; i++) {
    const bookBorrows = getTotalBookBorrows(books[i])
    const bookAuthor = getAuthorName(books[i], authors)
    const included = popularAuthors.find((author) => author.name === bookAuthor)
    if (included) {
      included.count += bookBorrows
    } else {
      popularAuthors.push({name: bookAuthor, count: bookBorrows})
    }
  }
  popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count)
  popularAuthors.pop()
  while (popularAuthors.length > 5) {
    popularAuthors.pop()
  } 
  return popularAuthors
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};