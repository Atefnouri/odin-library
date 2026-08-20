//init
const tableBody = document.getElementById("tablebody");
const myButton = document.getElementById("addbook");
let bookTitle = document.getElementById("bookTitle");
let bookAuthor = document.getElementById("bookAuthor");
let bookPgnumber = document.getElementById("bookPgnumber");
let bookYear = document.getElementById("bookYear");
let isItRead = document.getElementById("isItRead");
let myLibrary = [];

//constructor
function Book(title,author,page,year,isRead) {

    if (!new.target) {
        throw Error("use always the new keyword");
    }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.page = page;
  this.year = year;
  this.isRead = isRead;
}

Book.prototype.toggleStatus = function(){
    this.isRead = !this.isRead;
    console.log(`the status of ${this.title} is now ${this.isRead}`);
}

Book.prototype.getInfo = function(){
console.log(`${this.id}, ${this.title},${this.author},${this.page},${this.year},${this.isRead}`)
}



function addBookToLibrary(title,author,page,year,isRead) {
let newBook = new Book(title,author,page,year,isRead);
 myLibrary.push(newBook);
 console.log(myLibrary);
displayLibrary(); 
}

//enable addbutton functionaly
myButton.addEventListener('click',(event) =>{
event.preventDefault();-
addBookToLibrary(bookTitle.value,bookAuthor.value,bookPgnumber.value,bookYear.value,isItRead.checked);
});



updateStatus = (id) => {

console.log(`the ${id} to update`);

let booktoUpdate = myLibrary.find((x) => x.id === id );
  if(booktoUpdate){
        booktoUpdate.toggleStatus();
    }
console.log(myLibrary);
displayLibrary();
}

deleteBook = (id) => {

   console.log(`the ${id} to delete`);
    //find index or by id
    let indexToDelete = myLibrary.findIndex((x) => x.id === id );
      //delete it 
    if(indexToDelete > -1 && myLibrary.length > 1 ){

        myLibrary.splice(indexToDelete,1);

    } else if(indexToDelete > -1 && myLibrary.length === 1 ){
        myLibrary = [];
        myLibrary.length = 0;
        tableBody.innerHTML = ""; 
    }
    console.log(myLibrary.length);
    //call the dsiplay function to refresh the view 
    console.log(myLibrary);
    displayLibrary();
}


function displayLibrary(){

    let innerContent = "";

   for(let i=0;i<myLibrary.length;i++){

    if(myLibrary[i].isRead){
    
        innerContent+=`<tr>
    <td>${myLibrary[i].title}</td>
    <td>${myLibrary[i].author}</td>
    <td>${myLibrary[i].page}</td>
    <td>${myLibrary[i].year}</td>
    <td><input type="checkbox" onclick="updateStatus('${myLibrary[i].id}')"  checked> </td>
    <td><button onclick="deleteBook('${myLibrary[i].id}')">Delete</button></td>
    </tr>`
    }
    else {
    innerContent+=`<tr>
    <td>${myLibrary[i].title}</td>
    <td>${myLibrary[i].author}</td>
    <td>${myLibrary[i].page}</td>
    <td>${myLibrary[i].year}</td>
    <td><input onclick="updateStatus('${myLibrary[i].id}')" type="checkbox"></td>
    <td><button onclick="deleteBook('${myLibrary[i].id}')">Delete</button></td>
    </tr>`

    }
    


    tableBody.innerHTML = innerContent;
}

}



