var bookName = document.getElementById('BookName');
var bookUrl = document.getElementById('BookUrl');
var tableContent = document.getElementById('tableContent');
var btnSubmit = document.getElementById('btnSubmit');
var alert = document.getElementById('alert');

console.log(localStorage.AllBooks);
if (localStorage.AllBooks !== null && undefined) {
    var books = JSON.parse(localStorage.AllBooks);
} else {
    var books = [];
}

// inputs validation

//REgex pattern
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

bookName.addEventListener('input', function () {
    validate(bookName, nameRegex);
});

bookUrl.addEventListener('input', function () {
    validate(bookUrl, urlRegex);
});

function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        console.log('asc');
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        console.log('asc');
    }
}

// function test(id) {
//     console.log(id);

//     var element = document.getElementById(id);
//     console.log(element.value.length, element.value.length > 2);
//     if (element.value.length > 2) {
//         element.classList.add('is-valid');
//         element.classList.remove('is-invalid');
//     } else {
//         element.classList.add('is-invalid');
//         element.classList.remove('is-valid');
//     }
// }

// Create the new bookmark
function addBook() {
    if (
        bookName.classList.contains('is-valid') &&
        bookUrl.classList.contains('is-valid')
    ) {
        var newBook = {
            siteName: bookName.value,
            siteUrl: bookUrl.value,
        };
        books.push(newBook);
        bookName.classList.remove('is-valid');
        bookUrl.classList.remove('is-valid');

        alert.classList.remove('alert', 'alert-danger');
        alert.innerHTML = '';

        clearInput();
    } else {
        btnSubmit;
        alert.innerHTML = `invalid Site Name or Url
        Site must contain at least 3 characters
        Site URL must be a valid one
        `;
        alert.classList.add('alert', 'alert-danger');
    }
    localStorage.setItem('AllBooks', JSON.stringify(books));

    displayBookmarks();

    console.log('casc');
}
// clear inputs
function clearInput() {
    bookName.value = '';
    bookUrl.value = '';
}
// display bookmarks
function displayBookmarks() {
    // var allBooks = books.map(
    //     (book, i) =>
    //         `<tr>
    //         <td>${i}</td>
    //         <td>${book.siteName}</td>
    //         <td>asd</td>
    //         <td>asda</td>
    //     </tr>`
    // );
    var allBooks = '';
    for (var i = 0; i < books.length; i++) {
        allBooks += `<tr>
           <td>${i}</td>
           <td>${books[i].siteName}</td>
                        
            <td><a   class="btn btn-success" href="${books[i].siteUrl}"  target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
            <td><button class="btn btn-danger" onclick="deleteBook(${i})"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
          
        </tr>`;
    }
    console.log(allBooks);
    tableContent.innerHTML = allBooks;
}
displayBookmarks();

function deleteBook(index) {
    console.log(index);
    books.splice(index, 1);
    displayBookmarks();
    localStorage.AllBooks = JSON.stringify(books);
}
