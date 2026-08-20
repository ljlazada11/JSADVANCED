const txtFname = document.getElementById("txtFname");
const txtMname = document.getElementById("txtMname");
const txtLname = document.getElementById("txtLname");
const txtAge = document.getElementById("txtAge");

const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClear = document.getElementById("btnClear");
const btnClearItems = document.getElementById("btnClearItems");

const sortBy = document.getElementById("sortBy");
const sortOrder = document.getElementById("sortOrder");

let records = JSON.parse(localStorage.getItem("records")) || [
    {fname:"Gloria",mname:"Macapagal",lname:"Arroyo",age:88},
    {fname:"Andres",mname:"Rizal",lname:"Bonifacio",age:35},
    {fname:"Rodrigo",mname:"Roa",lname:"Duterte",age:66},
    {fname:"Dora",mname:"The",lname:"Explorer",age:10},
    {fname:"Marlon",mname:"Marsado",lname:"Timogan",age:28}
];

let editIndex = -1;

displayRecords();

btnInsertUpdate.onclick = function(){

    const fname = txtFname.value.trim();
    const mname = txtMname.value.trim();
    const lname = txtLname.value.trim();
    const age = txtAge.value;

    if(fname=="" || lname=="" || age==""){
        alert("Please complete the required fields.");
        return;
    }

    const person={
        fname,
        mname,
        lname,
        age
    };

    if(editIndex==-1){
        records.push(person);
    }else{
        records[editIndex]=person;
        editIndex=-1;
        btnInsertUpdate.innerText="Insert";
    }

    clearInputs();
    displayRecords();
};

btnClear.onclick = clearInputs;

btnClearItems.onclick = function(){

    if(confirm("Clear all records?")){
        records=[];
        displayRecords();
        localStorage.removeItem("records");
    }

};

document.getElementById("myLanguages").onclick=function(){

    localStorage.setItem("records",JSON.stringify(records));
    alert("Saved to Local Storage.");

};

sortBy.onchange=sortRecords;
sortOrder.onchange=sortRecords;

function displayRecords(){

    const table=document.getElementById("tblRecords");

    table.innerHTML=`
        <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Action</th>
        </tr>
    `;

    records.forEach((person,index)=>{

        table.innerHTML+=`
        <tr>
            <td>${person.fname}</td>
            <td>${person.mname}</td>
            <td>${person.lname}</td>
            <td>${person.age}</td>
            <td>
                <button onclick="deleteRecord(${index})">Delete</button>
                <button onclick="editRecord(${index})">Edit</button>
            </td>
        </tr>`;
    });

}

function clearInputs(){

    txtFname.value="";
    txtMname.value="";
    txtLname.value="";
    txtAge.value="";

    editIndex=-1;
    btnInsertUpdate.innerText="Insert";

}

window.deleteRecord=function(index){

    if(confirm("Delete this record?")){
        records.splice(index,1);
        displayRecords();
    }

};

window.editRecord=function(index){

    const person=records[index];

    txtFname.value=person.fname;
    txtMname.value=person.mname;
    txtLname.value=person.lname;
    txtAge.value=person.age;

    editIndex=index;
    btnInsertUpdate.innerText="Update";

};

function sortRecords(){

    const property=sortBy.value=="first" ? "fname":"lname";

    records.sort((a,b)=>{

        if(sortOrder.value=="za"){
            return b[property].localeCompare(a[property]);
        }

        return a[property].localeCompare(b[property]);

    });

    displayRecords();

}
