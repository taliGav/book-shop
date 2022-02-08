var gCurrLang = 'en';

var gTrans = {
    title: {
        en: 'Manage your books ONLINE',
        he: 'נהל את הספרים שלך באופן מקוון',
    },
    'title-id': {
        en: 'Id',
        he: 'ספרור',
    },
    'title-book': {
        en: 'Title',
        he: 'כותר',
    },
    'title-price': {
        en: 'Price',
        he: 'עלות'
    },
    'title-rate': {
        en: 'Rate',
        he: 'דירוג',
    },
    'title-actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    read: {
        en: 'Read',
        he: 'עיין בכותר',
    },
    update: {
        en: 'Update',
        he: 'עדכן מחיר',
    },
    delete: {
        en: 'Delete',
        he: 'מחק',
    },
    'add-inventory': {
        en: 'Add a book to the inventory:',
        he: 'הוסף כותר למלאי:'
    },
    'add-new-book': {
        en: 'Enter book title',
        he: 'הכנס שם כותר'
    },
    'add-new-book-price': {
        en: 'Set a price',
        he: 'קבע מחיר'
    },
    'add-new-book-btn': {
        en: 'Add',
        he: 'בצע'
    },
    page: {
        en: 'Page',
        he: 'עמוד'
    },
    'out-of': {
        en: 'out of ',
        he: 'מתוך '
    },
    'prev-page': {
        en: 'Prev Page',
        he: 'העמוד הקודם'
    },
    'next-page': {
        en: 'Next Page',
        he: 'העמוד הבא'
    },
    'book-desc': {
        en: 'Book Description ',
        he: 'תקציר העלילה'
    },
    'rate-modal': {
        en: 'Rate the book: ',
        he: 'דרג את הכותר: '
    },
    exit: {
        en: 'Close',
        he: 'סגירה'
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        console.dir(el)
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            // el.setAttribute('placeholder', txt)
            //THE SAME!
            el.placeholder = txt
        } else el.innerText = txt
    })
}

function setLang(lang) {
    gCurrLang = lang;
    console.log('gCurrLang',gCurrLang);
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };
    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}