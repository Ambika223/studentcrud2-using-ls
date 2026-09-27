const stdForm = document.getElementById("stdForm")
const fullnameControl = document.getElementById("fullname")
const ageControl = document.getElementById("age")
const emailControl = document.getElementById("email")
const contactControl = document.getElementById("contact")
const addstdBtn = document.getElementById("addstdBtn")
const updatestdBtn = document.getElementById("updatestdBtn")
const stdContainer = document.getElementById("stdContainer")


let editId = null;

// let stdsArr = [
//     {
//         stdId: '1',
//         fullname: "Reshma Pradha",
//         age: "20",
//         email: "rp@gmail.com",
//         contact: "3421567890"
//     },

//     {
//         stdId: '2',
//         fullname: "Abhishek Gupta",
//         age: "22",
//         email: "agn@gmail.com",
//         contact: "5421567890"
//     }
// ];


// Get data from localStorage

// localStorage.setItem("stdsArr", JSON.stringify(stdsArr));
let stdsJSON = localStorage.getItem("stdsArr");
console.log(stdsJSON);
if (stdsJSON) {
    stdsArr = JSON.parse(stdsJSON);
}
else {
    localStorage.setItem("stdsArr", JSON.stringify(stdsArr));
}
// console.log(stdsArr);


function snackBar(msg, icon) {
    Swal.fire({
        title: msg,
        icon: icon,
        timer: 3000
    })
}
function createstdtrs(arr) {
    let res = ``;
    arr.forEach((std, i) => {
        res += `
        <tr id="${std.stdId}">
        <td>${i + 1}</td>
        <td>${std.fullname}</td>
        <td>${std.age}</td>
        <td>${std.email}</td>
        <td>${std.contact}</td>
         <td class="text-center"><i onclick="onEdit(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"
                                            role="button"></i></td>
                                    <td class="text-center"><i onclick="onRemove(this)" class="fa-solid fa-trash-can fa-2x text-danger"
                                            role="button"></i></td>
                                            </tr>`
    })
    stdContainer.innerHTML = res;
}
createstdtrs(stdsArr);

//ADD STUDENT
function onstdAdd(eve) {
    eve.preventDefault();
    let STD_OBJ = {
        fullname: fullnameControl.value,
        age: ageControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: Date.now().toString()
    }
    stdsArr.push(STD_OBJ);
    localStorage.setItem("stdsArr", JSON.stringify(stdsArr))
    stdForm.reset();
    // createstdtrs(stdsArr);
    let tr = document.createElement("tr");
    tr.id = STD_OBJ.stdId;
    tr.innerHTML = `
    <td>${stdsArr.length}</td>
    <td>${STD_OBJ.fullname}</td>
    <td>${STD_OBJ.age}</td>
    <td>${STD_OBJ.email}</td>
    <td>${STD_OBJ.contact}</td>
    <td class="text-center"><i onclick="onEdit(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"
                                            role="button"></i></td>
                                    <td class="text-center"><i onclick="onRemove(this)" class="fa-solid fa-trash-can fa-2x text-danger"
                                            role="button"></i></td>
    `
    stdContainer.append(tr);
    snackBar(`New student with  ${STD_OBJ.fullname} added successfully`, 'success')

}


//EDIT
function onEdit(ele) {
    let EDIT_ID = ele.closest('tr').id;
    let EDIT_OBJ = stdsArr.find(s => s.stdId == EDIT_ID);
    localStorage.setItem('EDIT_ID', EDIT_ID)
    fullnameControl.value = EDIT_OBJ.fullname;
    ageControl.value = EDIT_OBJ.age;
    emailControl.value = EDIT_OBJ.email;
    contactControl.value = EDIT_OBJ.contact;
    addstdBtn.classList.add('d-none');
    updatestdBtn.classList.remove('d-none');

}

//UPDATE
function onstdUpdate() {
    let UPDATE_ID = localStorage.getItem('EDIT_ID');
    let UPDATE_OBJ = {
        fullname: fullnameControl.value,
        age: ageControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: UPDATE_ID
    }
    stdForm.reset();
    let getIndex = stdsArr.findIndex(s => s.stdId == UPDATE_ID)
    stdsArr[getIndex] = UPDATE_OBJ;

    let tr = document.getElementById(UPDATE_ID).children;
    // console.log(tr)
    tr[1].innerText = UPDATE_OBJ.fullname;
    tr[2].innerText = UPDATE_OBJ.age;
    tr[3].innerText = UPDATE_OBJ.email;
    tr[4].innerText = UPDATE_OBJ.contact;
    snackBar(`Student with  ${UPDATE_OBJ.fullname} updated successfully`, 'success')

    localStorage.removeItem('EDIT_ID');
    addstdBtn.classList.remove('d-none');
    updatestdBtn.classList.add('d-none');
}

//DELETE

function onRemove(ele) {
    let DELETE_ID = ele.closest('tr').id;
    Swal.fire({
        title: `Are you sure, you want to remove student with id ${DELETE_ID}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    })
    let getIndex = stdsArr.findIndex(s => s.stdId === DELETE_ID);
    stdsArr.splice(getIndex, 1);
    ele.closest('tr').remove();
    snackBar(`Student with ${DELETE_ID} deleted successfully`, 'success');
    localStorage.setItem("stdsArr", JSON.stringify(stdsArr))
}
stdForm.addEventListener("submit", onstdAdd)
updatestdBtn.addEventListener("click", onstdUpdate);