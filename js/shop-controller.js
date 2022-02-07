'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    
    var books = getBooks();
    var strHtml = books.map(book => {
        return `<tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>${book.rate}</td>
            <td><button onclick="onReadBook('${book.id}')">Read</button></td>
            <td><button onclick="onUpdateBook('${book.id}')">Update</button></td>
            <td><button onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`;
    });
    document.querySelector('tbody').innerHTML = strHtml.join('');

    var pagesStr = '';
    for (var i = 0; i < gPageAmount; i++) {
        pagesStr += `<button onclick="onCurrPage('${i}')">${i + 1}</button>`;
    }
    var elPageBtns = document.querySelector('.page-btns');
    elPageBtns.innerHTML = pagesStr;

    const totalPages = gPageAmount;
    const currPage = gPageIdx+1;
    var elPageDisp = document.querySelector('.page-display');
    elPageDisp.innerHTML = `Page ${currPage} out of ${totalPages}`;
}

function onSetSort(sortBy) {
    // console.log('Sorting By:', sortBy);

    setSort(sortBy);
    getBooksSorted();
    renderBooks();
}

function onReadBook(bookId) {
    renderModal(bookId);
    var elModal = document.querySelector('.modal');
    elModal.classList.add('open');
}

function renderModal(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('h4 span').innerText = book.price;
    elModal.querySelector('.img').innerHTML = `<img src="img/${book.name}.jpg" alt="${book.name}">`;
    elModal.querySelector('p').innerText = book.desc;
    var rateModalHtml = `<tr><td>Rate the book:</td><td><button onclick="onUpdateRate('${book.id}',-1)">-</button></td><td>${book.rate}</td><td><button onclick="onUpdateRate('${book.id}',1)">+</button></td></tr>`;
    elModal.querySelector('table').innerHTML = rateModalHtml;
}

function onUpdateRate(bookId, value) {
    updateRate(bookId, value);
    renderModal(bookId);
    renderBooks();
}

function onAddBook() {
    const bookName = document.querySelector('input[name=newBookTitle]').value;
    const bookPrice = document.querySelector('input[name=newBookPrice]').value;
    if (bookName && bookPrice) {
        addBook(bookName, bookPrice);
        renderBooks();
        flashMsg(`You've successfully added the book "${bookName}" to the list `);
    }

    document.querySelector('input[name=newBookTitle]').value = '';
    document.querySelector('input[name=newBookPrice]').value = '';
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('Enter new price?');
    if (newPrice <= 0) return;
    const updatedBook = updatePrice(bookId, newPrice);
    renderBooks();
    flashMsg(`You've successfully updated "${updatedBook.name}" price to ${newPrice} `);
}

function onRemoveBook(bookId) {
    const removedBook = removeBook(bookId);
    renderBooks();
    flashMsg(`You've successfully deleted the book "${removedBook.name}" `);
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open');
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg');
    el.innerText = msg;
    el.classList.add('open');
    setTimeout(() => { el.classList.remove('open'); }, 3000);
}

function onCurrPage(currPage) {
    setPage(currPage);
    renderBooks();
}

// function onNextPage() {
//     setNextPage();
//     renderBooks();
// }

// function onPrevPage() {
//     setPrevPage();
//     renderBooks();
// }




// function onSetSortBy() {
//     const prop = document.querySelector('.sort-by').value
//     const isDesc = document.querySelector('.sort-desc').checked

//     const sortBy = {}
//     sortBy[prop] = (isDesc)? -1 : 1;

//     // Shorter Syntax:
//     // const sortBy = {
//     //     [prop] : (isDesc)? -1 : 1
//     // }
//     setCarSort(sortBy)
//     renderCars();
// }
