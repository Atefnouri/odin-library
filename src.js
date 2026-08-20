//init
const tableBody = document.getElementById("bookGrid");
const myButton = document.getElementById("addbook");
let bookTitle = document.getElementById("bookTitle");
let bookAuthor = document.getElementById("bookAuthor");
let bookPgnumber = document.getElementById("bookPgnumber");
let bookYear = document.getElementById("bookYear");
let isItRead = document.getElementById("isItRead");
let myLibrary = [];


//render the footer text 
let footer =  document.getElementById("footerContent");
footer.innerHTML =`© ${ new Date().getFullYear()} Atef Nouri. All rights reserved.`;


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
//alert("Book was added succsuflly") 
}

//enable addbutton functionaly
myButton.addEventListener('click',(event) =>{
event.preventDefault();
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


  innerContent+=` <div class="col-md-4">
							<div class="card border-0 rounded-0 shadow mb-4 mb-md-0">
								<img alt="" class="img-fluid" src="https://freefrontend.dev/assets/rectangle-wide.png">
								<div class="card-body text-center mt-3">
									<h5>${myLibrary[i].title}</h5>
									<div class="text-muted">
										By <b>${myLibrary[i].author} </b>
									</div>
									<!--<p class="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut.</p>-->
								</div>
							</div>
						</div>`;

    // if(myLibrary[i].isRead){
    
    //     innerContent+=`<tr>
    // <td>${myLibrary[i].title}</td>
    // <td>${myLibrary[i].author}</td>
    // <td>${myLibrary[i].page}</td>
    // <td>${myLibrary[i].year}</td>
    // <td><input type="checkbox" onclick="updateStatus('${myLibrary[i].id}')"  checked> </td>
    // <td><button onclick="deleteBook('${myLibrary[i].id}')">Delete</button></td>
    // </tr>`


    // }
    // else {
    // innerContent+=`<tr>
    // <td>${myLibrary[i].title}</td>
    // <td>${myLibrary[i].author}</td>
    // <td>${myLibrary[i].page}</td>
    // <td>${myLibrary[i].year}</td>
    // <td><input onclick="updateStatus('${myLibrary[i].id}')" type="checkbox"></td>
    // <td><button onclick="deleteBook('${myLibrary[i].id}')">Delete</button></td>
    // </tr>`

    // }
    


    tableBody.innerHTML = innerContent;
}

}



//populate the libaray 
// Sample real-world book data matching your function signature:
// addBookToLibrary(title, author, pages, year, isRead);

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, 1960, true);
addBookToLibrary("1984", "George Orwell", 328, 1949, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, 1925, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, 1937, true);










