const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClearItems = document.getElementById("btnClearItems");
const btnClear = document.getElementById("btnClear");
const tblRecords = document.getElementById("tblRecords");

let arrRecords = new Array();
const tblTHsLabels = ["First Name", "Middle Name", "Last Name", "Age", "Action"];


if(arrRecords.length == 0) {
    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";
} else {
    document.getElementById("status").style.display = "none";
}

btnInsertUpdate.addEventListener("click", () => {

    const inputTxt = document.getElementsByTagName("input");

    if(btnInsertUpdate.value == "insert") {

        for(const txt of inputTxt) {
            if(txt.value == " " || txt.value == "") {
                alert("Please complete all the text inputs!");
                return;
            }
        }

        let infoRecord = {
            fname: inputTxt[0].value,
            mname: inputTxt[1].value,
            lname: inputTxt[2].value,
            age:   parseInt(inputTxt[3].value)      
        };
    
        for(const txt of inputTxt) {
            txt.value = "";
        }
      
        arrRecords.push(infoRecord);
    
        iterateRecords();
    
        console.log(inputTxt);
        console.log(infoRecord);
        console.log(arrRecords);

    } else {

        for(const txt of inputTxt) {
            if(txt.value == " " || txt.value == "") {
                alert("Please complete all the text inputs!");
                return;
            }
        }

        arrRecords[parseInt(btnInsertUpdate.value)].fname = inputTxt[0].value;
        arrRecords[parseInt(btnInsertUpdate.value)].mname = inputTxt[1].value;
        arrRecords[parseInt(btnInsertUpdate.value)].lname = inputTxt[2].value;
        arrRecords[parseInt(btnInsertUpdate.value)].age = parseInt(inputTxt[3].value)  ;
        
        iterateRecords();

        for(const txt of inputTxt) {
            txt.value = "";
        }

        btnInsertUpdate.innerHTML = "Insert";
        btnInsertUpdate.value = "insert";
    }


});

btnClear.addEventListener("click", () => {
    const inputTxt = document.getElementsByTagName("input");

    for(const txt of inputTxt) {
        txt.value = "";
    }

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";
});

btnClearItems.addEventListener("click", () => {
    arrRecords = [];

    while(tblRecords.hasChildNodes()) {
        tblRecords.removeChild(tblRecords.firstChild);
    }

    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";
    localStorage.removeItem("names");

});


function iterateRecords() {
    // const tblTHs = new Array();

    while(tblRecords.hasChildNodes()) {
        tblRecords.removeChild(tblRecords.firstChild);
    }

    if(!(arrRecords.length == 0)) {

        document.getElementById("status").style.display = "none";

        const tblHeaderRow = document.createElement("tr");
        const tblHeader = document.createElement("thead");
        tblHeaderRow.style.borderTop = "1px solid black";
        tblHeaderRow.style.borderBottom = "1px solid black";

        //Generate 4 Theads
        for(let i=0 ; i < 5 ; i++) {
            const tblTHs = document.createElement("th");
            tblTHs.style.padding = "5px";

            if(i != 4) {
                tblTHs.style.borderRight = "1px solid black";
            }

            tblTHs.innerHTML = tblTHsLabels[i];
            tblHeaderRow.appendChild(tblTHs);
        }

        tblHeader.appendChild(tblHeaderRow);
        tblRecords.appendChild(tblHeader);

        //Generate Records
        const tblBody = document.createElement("tbody");
    
        arrRecords.forEach((rec, i)=> {

            const tblRow = document.createElement("tr");
            const tbdataFname = document.createElement("td");
            const tbdataMname = document.createElement("td");
            const tbdataLname = document.createElement("td");
            const tbdataAge= document.createElement("td");
            const tbdataActionBtn= document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnUpdate = document.createElement("button");
            
            tbdataFname.style.borderRight = "1px solid black";
            tbdataFname.style.padding = "10px";

            tbdataMname.style.borderRight = "1px solid black";
            tbdataMname.style.padding = "10px";

            tbdataLname.style.borderRight = "1px solid black";
            tbdataLname.style.padding = "10px";

            tbdataAge.style.borderRight = "1px solid black";
            tbdataAge.style.padding = "10px";

            tbdataActionBtn.style.padding = "10px";

            tblRow.style.borderBottom = "1px solid black";

            tbdataFname.innerHTML = rec.fname;
            tbdataMname.innerHTML = rec.mname;
            tbdataLname.innerHTML = rec.lname;
            tbdataAge.innerHTML = rec.age;

            btnDelete.innerHTML = "Delete";
            btnDelete.setAttribute("onclick", `deleteData(${i})`);
            btnDelete.style.marginRight = "5px";

            btnUpdate.innerHTML = "Edit";
            btnUpdate.setAttribute("value", "update");
            btnUpdate.setAttribute("onclick", `updateData(${i})`);
            btnUpdate.style.marginRight = "5px";

            tbdataActionBtn.appendChild(btnDelete);
            tbdataActionBtn.appendChild(btnUpdate);

            tblRow.appendChild(tbdataFname);
            tblRow.appendChild(tbdataMname);
            tblRow.appendChild(tbdataLname);
            tblRow.appendChild(tbdataAge);
            tblRow.appendChild(tbdataActionBtn);

            tblBody.appendChild(tblRow);
        });

        tblRecords.appendChild(tblBody);



    } else {
        document.getElementById("status").style.display = "inline";
        document.getElementById("status").innerHTML = "No Records...";
    }
}

function deleteData(i) {
    arrRecords.splice(i,1);
    iterateRecords();
}

function updateData(i) {
    const inputTxt = document.getElementsByTagName("input");

    inputTxt[0].value = arrRecords[i].fname;
    inputTxt[1].value = arrRecords[i].mname;
    inputTxt[2].value = arrRecords[i].lname;
    inputTxt[3].value = arrRecords[i].age;

    btnInsertUpdate.innerHTML = "Update";
    btnInsertUpdate.value = `${i}`;
}


function SortLetters() {
    // 1. Exit early if there are no items to sort
    if (arrRecords.length === 0) return;

    // 2. Read the values of both dropdowns
    const properties = document.getElementById("sortProperties").value;
    const select = document.getElementById("sortSelect").value;

    // 3. Sort the master array
    arrRecords.sort((a, b) => {
        let comparison = 0;

        if (properties === "age") {
            // Numbers sorting logic
            comparison = a.age - b.age;
        } else {
            // Text strings sorting logic
            comparison = a[properties].localeCompare(b[properties]);
        }

        // 4. Invert the result if the user chose Descending (Z-A)
        return direction === "desc" ? comparison * -1 : comparison;
    });

    // 5. Refresh your UI table using your existing function
    iterateRecords();
}



// 1. Run this function whenever you change data (Add, Edit, Delete)
function save() {
    localStorage.setItem("names", JSON.stringify(arrRecords));
    console.log("Data saved successfully!");
    alert("Saved Succesfully");
}

// 2. Run this function ONCE right when the script loads to restore your data
function loadOnPageStart() {
    const storedData = localStorage.getItem("names");
    
    // Check if localStorage actually has data before parsing
    if (storedData) {
        arrRecords = JSON.parse(storedData);
        console.log("Restored records from storage:", arrRecords);
    } else {
        arrRecords = []; // Fallback to an empty array if storage is clean
    }

    // Immediately render the loaded rows onto the screen
    iterateRecords();
}

// Execute the load function right away when the script executes
loadOnPageStart();