'use strict';

const STORAGE_KEY = 'booksDB';
const PAGE_SIZE = 3;
var gBooks = [];
var gSortBy;
var gPageIdx = 0;
var gPageAmount;
var gSortDir = 'asc';


_createBooks();
_setPageAmount();

function setPage(currPage) {
    if (currPage === 'NEXT') {
        gPageIdx++;
        if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx--;
    }
    else if (currPage === 'PREV') {
        gPageIdx--;
        if (gPageIdx * PAGE_SIZE <= 0) gPageIdx = 0;
    }
    else gPageIdx = +currPage;
}

// function setPrevPage() {
//     gPageIdx--;
//     if (gPageIdx * PAGE_SIZE <= 0) {
//         gPageIdx = 0;
//     }
//     // console.log('gPageIdx prev',gPageIdx);
// }

// function setNextPage() {
//     gPageIdx++;
//     if (gPageIdx * PAGE_SIZE >= gBooks.length) {
//         gPageIdx--;
//     }
//     // console.log('gPageIdx next',gPageIdx);
// }

function _setPageAmount() {
    gPageAmount = Math.ceil(gBooks.length / PAGE_SIZE);
}

function getBooks() {
    const startIdx = gPageIdx * PAGE_SIZE;
    // 0-3
    // 3-6
    // 7-9
    var books = gBooks.slice(startIdx, startIdx + PAGE_SIZE);
    return books;
}

function getBooksSorted() {
    var changeDir = gSortDir === 'desc' ? -1 : 1;
    if (gSortBy === 'AZ') {
        console.log('sort', changeDir);
        gBooks.sort((a, b) => {
            return (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1) * changeDir;
        });
    } else if (gSortBy === 'PRICE') {
        gBooks.sort((a, b) => a.price - b.price) * changeDir;
    } else if (gSortBy === 'RATE') { gBooks.sort((a, b) => a.rate - b.rate) * changeDir; };
}

function setSort(sortBy) {
    gSortBy = sortBy;
    gSortDir = gSortDir === 'asc' ? 'desc' : 'asc';
}

function updateRate(bookId, diff) {
    const book = getBookById(bookId);
    const newRate = book.rate += diff;
    if (newRate > 10) book.rate = 10;
    if (newRate < 0) book.rate = 0;

    _saveBooksToStorage();
}

function updatePrice(bookId, newPrice) {
    const book = getBookById(bookId);
    book.price = newPrice;

    _saveBooksToStorage();
    return book;
}

function addBook(name, price) {
    gBooks.unshift(_createBook(name, price));
    _saveBooksToStorage();
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id);
    const removedBook = gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
    return removedBook[0]
}

function getBookById(bookId) {
    return gBooks.find((book) => bookId === book.id);
}

function _createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY);
    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('Atomic Habits', getRandomIntInclusive(50, 150)),
            _createBook('Good Vibes Good Life', getRandomIntInclusive(50, 150)),
            _createBook('It Ends With Us', getRandomIntInclusive(50, 150)),
            _createBook('The Song Of Achilles', getRandomIntInclusive(50, 150)),
            _createBook('Ugly Love', getRandomIntInclusive(50, 150))
        ];
        _saveBooksToStorage();
    }
}

function _createBook(name, price) {
    return {
        id: makeId(),
        name,
        price,
        imgUrl: '',
        rate: 0,
        desc: makeLorem(),
    };
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}