function Item(itemName,itemNumber, price){
  this.itemName = itemName;
  this.itemNumber = itemNumber;
  this.price = price;
}

//UI constructor
function UI(){} 

UI.prototype.addItemToList = function(item){
    const list = document.getElementById('item-list');

    //create tr table row element
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${item.itemName}</td>
    <td>${item.itemNumber}</td>
    <td>${item.price}</td>
    <td><a href = "#" class= "delete btn btn-primary btn-danger"> X</a></td>
    `;

    list.appendChild(row);
}

//clear fields

UI.prototype.clearFields = function(){
    document.getElementById('itemName').value ="";
    document.getElementById('itemNumber').value ="";
    document.getElementById('price').value ="";
}

//show alert

// UI.prototype.showAlert =function(message, className){
//     const div = document.createElement(div);
//     // add class name 
//     div.className = `alert ${className}`;
//     // add text
//     div.appendChild(document.createTextNode(message));
//     // get parent
//     const container =document.querySelector('.container');
//     // get form
//     const form = document.querySelector('#item-form');
//     //insert alert
//     container.insertBefore(div, form);
//     //timeout for 3sec
//     setTimeout(function(){
//         document.querySelector('.alert').remove();
//     },3000)
// }

UI.prototype.showAlert =function(message, className){

    var alert =` <div class="alert alert-${className}">${message}</div>`;

    const row= document.querySelector(".row");

    row.insertAdjacentHTML('beforeBegin',alert);

    setTimeout(()=>{document.querySelector('.alert').remove();},3000);
}
//delete items

UI.prototype.deleteItems = function(target){
    if(target.classList.contains("delete")){
           target.parentElement.parentElement.remove();
    }
}

//add event listener

document.getElementById('shopping-form').addEventListener('submit', 
function(e){

    //get form values
    const itemName = document.getElementById('itemName').value,
         itemNumber = document.getElementById('itemNumber').value,
         price = document.getElementById('price').value;
          

 //instantiate item
    const item = new Item(itemName,itemNumber, price);

// instantiate ui object
   const ui = new UI();
//validate
   if(itemName === " " || itemNumber ===''|| price === ''){
       ui.showAlert('please fill in the fields', 'warning');
   } else{
       // add item to list
   ui.addItemToList(item);

   ui.showAlert('Item has been added!','success');
 
   // clear fields
      ui.clearFields();
   }

    e.preventDefault();
});

//Event listener for delete

document.getElementById('item-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteItems(e.target);

    ui.showAlert('Item has been deleted!','danger');
    
  e.preventDefault();
});