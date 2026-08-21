//init
const tableBody = document.getElementById("bookGrid");
const saveBookButton = document.getElementById("addbook");
let bookTitleInput = document.getElementById("bookTitle");
let bookAuthorInput = document.getElementById("bookAuthor");
let bookPnumberInput = document.getElementById("bookPgnumber");
let bookYearInput = document.getElementById("bookYear");
let isItReadInput = document.getElementById("isItRead");

let myLibrary = [];
const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

let bookThumbnailInput = document.getElementById("bookThumbnail");
let tempThumbnailURL = '';
//const thumbnailPreview = document.getElementById('thumbnailPreview');



//reteive image from local file 
if(bookThumbnailInput){
bookThumbnailInput.addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    // Generate a temporary local URL for the selected file
    tempThumbnailURL = URL.createObjectURL(file);
    //previewContainer.style.display = 'block';

    // Free up memory once the image element finishes loading
    /*thumbnailPreview.onload = function () {
      URL.revokeObjectURL(thumbnailPreview.src);
    };*/
  }
});
}



//render the footer text 
let footer =  document.getElementById("footerContent");
footer.innerHTML =`© ${ new Date().getFullYear()} Atef Nouri. All rights reserved.`;


//constructor
function Book(title,author,page,year,isRead,thumbnail) {

    if (!new.target) {
        throw Error("use always the new keyword");
    }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.page = page;
  this.year = year;
  this.isRead = isRead;
  //this.thumbnail === ''? this.thumbnail = "https://freefrontend.dev/assets/rectangle-wide.png" : this.thumbnail = thumbnail; 
  if(thumbnail === ''){
    this.thumbnail = "https://freefrontend.dev/assets/rectangle-wide.png";
  } else {
    this.thumbnail = thumbnail;
  } 
  
}

Book.prototype.toggleStatus = function(){
    this.isRead = !this.isRead;
    console.log(`the status of ${this.title} is now ${this.isRead}`);
}

Book.prototype.getInfo = function(){
console.log(`${this.id}, ${this.title},${this.author},${this.page},${this.year},${this.isRead}`)
}



function addBookToLibrary(title,author,page,year,isRead,thumbnail) {
let newBook = new Book(title,author,page,year,isRead,thumbnail);
 myLibrary.unshift(newBook);
 console.log(myLibrary);
displayLibrary();
//alert("Book was added succsuflly") 
}

//enable addbutton functionaly
if(saveBookButton){
saveBookButton.addEventListener('click',(event) =>{
event.preventDefault();
addBookToLibrary(bookTitle.value,bookAuthor.value,bookPgnumber.value,bookYear.value,isItRead.checked,tempThumbnailURL);
//reset forms 
bookTitle.value = '';
bookAuthor.value = '';
bookPgnumber.value = '';
bookYear.value = '';
isItRead.checked = false;
bookThumbnail.value = '';
  // Free up memory once the image element finishes loading
    /*thumbnailPreview.onload = function () {
      URL.revokeObjectURL(tempThumbnailURL);
    };*/
tempThumbnailURL = '';
toastBootstrap.show()
});}



updateStatus = (id) => {

console.log(`the ${id} to update`);

let booktoUpdate = myLibrary.find((x) => x.id === id );
  if(booktoUpdate){
        booktoUpdate.toggleStatus();
    }
displayLibrary();
}


deleteBook = (id) => {
    //confirm("Are you sure you want to delete this book?");
    if(!confirm("Are you sure you want to delete this book?")){
        return;
    }

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
    displayLibrary();
}


function displayLibrary(){

    let innerContent = "";
    let isReadBadge = "";

   for(let i=0;i<myLibrary.length;i++){

   //check if read 
   if(myLibrary[i].isRead){
    isReadBadge = `<span class="badge bg-success">Read</span>`;
   } else {
    isReadBadge = `<span class="badge text-bg-light">Not Read</span>`;
   }

  innerContent+=` <div class="col-md-4">
							<div class="card border-0 rounded-0 shadow mb-4 mb-md-0">
                            
								
                            <img alt="${myLibrary[i].title}" id="thumbnailPreview" class="img-thumbnail"
                            style="width: 450px; height: 150px; object-fit: cover;"    
                            src="${myLibrary[i].thumbnail}">
                                <div class="card-body text-center mt-3">
                                
									<h5>${myLibrary[i].title}</h5>
									<div class="text-muted">
										By <b>${myLibrary[i].author} </b>
									</div>
                                    ${isReadBadge}
                                 
                                   <button class="btn btn-info" onclick="updateStatus('${myLibrary[i].id}')">Mark as Read </button>
                                   <button class="btn btn-danger" onclick="deleteBook('${myLibrary[i].id}')">Delete</button>
								</div>
							</div>
						</div>`;
         if(tableBody){
            tableBody.innerHTML = innerContent;
         }
}

}



//populate the libaray 
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, 1960, true,'');
addBookToLibrary("1984", "George Orwell", 328, 1949, true,'');
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, 1925, false,'https://i.insider.com/518296d969beddd06d000001?width=640&format=jpeg');
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, 1937, true,'https://atolkienistperspective.wordpress.com/wp-content/uploads/2016/10/the-hobbit-book-cover-banner.jpg');










