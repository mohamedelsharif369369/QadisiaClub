let title = document.getElementById('title');
let age = document.getElementById('age');
//let taxes = document.getElementById('taxes');
//let ads = document.getElementById('ads');
//let discount = document.getElementById('discount');
//let total = document.getElementById('total');
//let count = document.getElementById('count');
let category = document.getElementById('category');
let nots = document.getElementById('nots');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

// get total

//function getTotal()
//{
    //if(price.value != ''){
        //let result = (+price.value + +ads.value) - +discount.value;
        //total.innerHTML = result;
        //total.style.background = '#040';
    //}else{
        //total.innerHTML = '';
        //total.style.background = '#a00d02';
    //}
//}


// create product

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}


submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        age:age.value,
        //taxes:taxes.value,
        //ads:ads.value,
        nots:nots.value.toLowerCase(),
        //total:total.innerHTML,
        //count:count.value,
        category:category.value.toLowerCase(),
    }

// count
    if(title.value != '' && age.value != ''){
        if(mood === 'create'){
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'انشاء';
            //count.style.display = 'block';
        }
    clearData()
    }
    
    
    
    

    // save localStorage

    localStorage.setItem('product', JSON.stringify(dataPro))
    //clearData()
    showData()
}


// clear inputs Data

function clearData(){
    title.value = '';
    age.value = '';
   // taxes.value = '';
    //ads.value = '';
   //discount.value = '';
   // total.innerHTML = '';
    category.value = '';
    nots.value = '';
    
}


// read

function showData(){
    //getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].age}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].nots}</td>
            <td><button onclick="updateData(${i})"  id="update">تعديل</button></td>
            <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">حذف الجميع (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}
showData()


// delete

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}



// update

function updateData(i){
    title.value = dataPro[i].title;
    age.value = dataPro[i].age;
    //count.style.display = 'none';
    nots.value = dataPro[i].nots;

    category.value = dataPro[i].category;
    submit.innerHTML = 'تعديل';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

// search

function searchData(value){
    let table = '';
    if(searchMood == 'title'){
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].age}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].nots}</td>
            <td><button onclick="updateData(${i})"  id="update">تعديل</button></td>
            <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
        </tr>
        `;
            }
        }
    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].age}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].nots}</td>
            <td><button onclick="updateData(${i})"  id="update">تعديل</button></td>
            <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
        </tr>
        `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
