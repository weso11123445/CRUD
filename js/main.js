//get total
//create product
// save localstorage
//clear inputs
//read
//count
//delete
//update
//search
//clean data

let title = document.querySelector('#title') ; 
let price = document.querySelector('#price'); 
let taxes = document.querySelector('#taxes') ;
let ads = document.querySelector('#ads') ; 
let discount = document.querySelector('#discount') ; 
let count = document.querySelector('#count') ;
let category = document.querySelector('#category')
let total = document.querySelector('#total');
let create = document.querySelector('#submit') ;
let getTotalinputs = document.querySelectorAll('.input input')


let mood= 'create' ; 
let tmp;


function getTotal(){
    if(price.value != '' ){
        let value = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = value ; 
        total.style.background = 'green' ; 
    } else{
        total.style.background = '#ff8d57';
        total.innerHTML = ''; 
    }
   
   
}





// Create Product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product) ;  

} else{
    dataPro = [] ;
}


create.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase() ,
        price:price.value ,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }

    if(title.value != '' && price.value !='' && count.value < 100){
        if(mood === 'create'){
            if(newPro.count > 1 ){
                for(let i = 0 ; i < newPro.count; i++){
                    dataPro.push(newPro) ;
                   
                }
            } else{
                dataPro.push(newPro) ;
               
            }
        } else{
            dataPro[tmp].title = title.value ; 
            dataPro[tmp].price = price.value ; 
            dataPro[tmp].taxes = taxes.value ; 
            dataPro[tmp].ads = ads.value ; 
            dataPro[tmp].discount = discount.value ;
            dataPro[tmp].count = count.value ;
            dataPro[tmp].category = category.value ;
            dataPro[tmp].total = total.innerHTML ;  
            create.innerHTML = 'Create'; 
            count.style.display = 'block' ; 
            mood = 'create' ; 
            
           
        }  
        clearData() ;   
    }
  
   localStorage.setItem('product',JSON.stringify(dataPro)) ; 

   showData() ; 
   getTotal();
}


// clear
function clearData(){
    title.value = '' ; 
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '' ;  
    count.value = '' ;
    category.value = '' ;
}

//read
function showData(){
    let table = '' ;
    for(let i=0 ; i< dataPro.length ; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick =updateData(${i}) id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>` ;

    } 

    document.getElementById('tbody').innerHTML = table ; 
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length> 0){
        btnDelete.innerHTML = `<button onclick ="deleteAll()">deleteAll(${dataPro.length})</button>`
    } else{
        btnDelete.innerHTML ='' ;
    }

}

showData() ; 


// Delete

function deleteData(i){
    dataPro.splice(i,1) ;
    localStorage.product = JSON.stringify(dataPro) ;
    showData() ; 
}

// DeleteAll
function deleteAll(){
    dataPro.splice(0) ; 
    localStorage.clear() ;
    showData() ;
}

//count 

console.log(typeof count.value) ;

// update
function updateData(u){
    title.value = dataPro[u].title ; 
    price.value = dataPro[u].price ; 
    taxes.value = dataPro[u].taxes ;
    ads.value = dataPro[u].ads ; 
    discount.value = dataPro[u].discount ;
    //count.value = dataPro[u].count ;
    count.style.display = 'none'; 
    category.value = dataPro[u].category ; 
    create.innerHTML = 'Update' ; 
    getTotal();
    mood = 'upadte' ;
    tmp = u ; 
    scroll({
        top:0 ,
        behavior:"smooth",
    })

}


// Search 
let searchMood = 'title' ; 
let search = document.getElementById('search') ; 
function getSearchMood(id){
    //let search = document.getElementById('search') ; 
    if(id == 'searchTitle'){
        searchMood = 'title' ; 
        search.placeholder = 'searchByTitle' ;
    } else {
        searchMood = 'category' ;
        search.placeholder = 'searchByCategory';      
       
    }
    search.focus() ; 
    search.value = '' ; 
    showData() ; 

}



function searchData(){
    let table = '' ; 
    if(searchMood == 'title'){
        for(let i=0 ; i<dataPro.length ; ++i){
            if(dataPro[i].title.includes(search.value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick =updateData(${i}) id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>` ;
        
            }

        }


    } else{
        for(let i=0 ; i<dataPro.length ; ++i){
            if(dataPro[i].category.includes(search.value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick =updateData(${i}) id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>` ;
        
            }

        }


    }
    document.getElementById('tbody').innerHTML = table ; 
}