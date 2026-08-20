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
function sortLeters() {

    const select = document.getElementById("sortSelect").value;
    const property = document.getElementById("sortProperty").value;

    arrRecords.sort((a, b) => {
        let comparison = 0;

        if (property === "age") {
   
            comparison = a.age - b.age;
        } else {

            comparison = a[property].localeCompare(b[property]);
        }

        return direction === "desc" ? comparison * -1 : comparison;
    });

    iterateRecords();
}

function clearResults() {

    document.getElementById("results").innerHTML = "";
}

