class Book{
    constructor(itemName,itemNumber, price){
        this.itemId = Math.floor(Math.random()*10000);
        this.itemName = itemName;
        this.itemNumber = itemNumber;
        this.price = price;}
    
}

class UI{

   addItemToList(item){
    const list = document.getElementById('item-list');
    //create tr table row element
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${item.itemName}</td>
    <td>${item.itemNumber}</td>
    <td>${item.price}</td>
    <td><a href="#" data-id="${item.itemId}" class="btn btn-danger btn-sm delete">Delete</a></td>
    `;

    list.appendChild(row);

   }
   showAlert(message,className){
    var alert =` <div class="alert alert-${className}">${message}</div>`;

    const row= document.querySelector(".row");

    row.insertAdjacentHTML('beforeBegin',alert);

    setTimeout(()=>{document.querySelector('.alert').remove();},3000);

}


   deleteItem(target){
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
 }

   }

   clearFields(){
    document.getElementById('itemName').value ="";
    document.getElementById('itemNumber').value ="";
    document.getElementById('price').value ="";

   }

}




//local storage class
class Store {

    static getItems(){
        let items;

        if(localStorage.getItem('items')===null){
            items=[];
        }else{
            items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
    }

    static displayItems(){
        const items = Store.getItems();

        items.forEach(item => {
            const ui = new UI();
            ui.addCourseToList(item);
        });
    }

    static addItems(item){
        const items = Store.getItems();
        items.push(item);
        localStorage.setItem('items',JSON.stringify(items));
    }

    static deleteItems(element){
        if(element.classList.contains('delete')){
            const id = element.getAttribute('data-id');
        
            const items = Store.getItems();

            items.forEach((item,index)=>{
                if(item.itemId == id){
                    items.splice(index,1);
                }
            });

            localStorage.setItem('items',JSON.stringify(items));
        }
    }

}


  

//Dom load event
document.addEventListener('DOMContentLoaded', Store.displayItems);

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
   if(itemName === "" ||itemNumber ===''||price === ''){
       ui.showAlert('please fill in the fields', 'warning');
   } else{
       // add item to list
   ui.addItemToList(item);
   //add item to local storage

   Store.addItems(item);

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

    Store.deleteItems(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Item has been deleted!','danger');
    
  e.preventDefault();
});
