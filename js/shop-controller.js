'use strict';

function onInit() {
    doTrans();
    renderBooks();

}

function renderBooks() {

    var books = getBooks();
    var strHtml = books.map(book => {
        return `<tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${formatCurrency(book.price)}</td>
            <td>${book.rate}</td>
            <td><button data-trans="read" onclick="onReadBook('${book.id}')"></button></td>
            <td><button data-trans="update" onclick="onUpdateBook('${book.id}')"></button></td>
            <td><button data-trans="delete" onclick="onRemoveBook('${book.id}')"></button></td>
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
    const currPage = gPageIdx + 1;
    var elPageDisp = document.querySelector('.page-display');
    elPageDisp.innerHTML = `<span data-trans="page">Page</span> ${currPage} <span data-trans="out-of">out of </span>${totalPages}`;

    doTrans();
}

function renderModal(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal-book');
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('.modal-price').innerText = formatCurrency(book.price);
    elModal.querySelector('.img').innerHTML = `<img src="img/${book.name}.jpg" alt="${book.name}">`;
    elModal.querySelector('p').innerText = book.desc;
    var rateModalHtml = `<tr><td  data-trans="rate-modal">Rate the book:</td><td><button onclick="onUpdateRate('${book.id}',-1)">-</button></td><td>${book.rate}</td><td><button onclick="onUpdateRate('${book.id}',1)">+</button></td></tr>`;
    elModal.querySelector('.modal-rate').innerHTML = rateModalHtml;
    doTrans();
}


function onSetSort(sortBy) {
    // console.log('Sorting By:', sortBy);

    setSort(sortBy);
    getBooksSorted();
    renderBooks();
}


function onReadBook(bookId) {
    renderModal(bookId);
    var elModal = document.querySelector('.modal-book');
    elModal.classList.add('open');
}



function formatCurrency(num) {
        const usdToIls = 3.22;

    if (gCurrLang === 'he') {
        return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num*usdToIls);
    } else {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(num);
    }
}



function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
    renderBooks();
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
    var newPrice = (gCurrLang === 'en') ? +prompt('Enter new price?') : +prompt(' (USD) עדכן מחיר לכותר');
    if (newPrice <= 0) return;

    const updatedBook = updatePrice(bookId, newPrice);
    
    formatCurrency(newPrice);
    flashMsg(`You've successfully updated "${updatedBook.name}" price to ${ formatCurrency(newPrice)} `);
    renderBooks();
}


function onRemoveBook(bookId) {
    const removedBook = removeBook(bookId);
    renderBooks();
    flashMsg(`You've successfully deleted the book "${removedBook.name}" `);
}


function onCloseModal() {
    document.querySelector('.modal-book').classList.remove('open');
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
