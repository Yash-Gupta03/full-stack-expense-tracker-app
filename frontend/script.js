// Function invoked after the form is submitted
function savedata(e) {
  e.preventDefault();
  let price = document.getElementById("price").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  // Making values in the form null after submitting the form
  document.getElementById("price").value = null;
  document.getElementById("description").value = null;
  document.getElementById("category").value = null;

  // Creating object of the data
  const obj = {
    price: price,
    description: description,
    category: category,
  };
  // Storing object to local storage
  axios
    .post("http://localhost:3000/add-item", obj)
    .then((response) => {
      const newItem = response.data.newItemDetail;
      showDataOnScreen(newItem);
    })
    .catch((err) => console.log(err));
  // localStorage.setItem(obj.price, JSON.stringify(obj));
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/get-items")
    .then((res) => {
      for (let i = 0; i < res.data.allExpenses.length; i++) {
        showDataOnScreen(res.data.allExpenses[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function showDataOnScreen(expense) {
  const parentNode = document.getElementById("list");
  const createNewItemHtml = `<li id='${expense.id}'>${expense.price} - ${expense.description} - ${expense.category}
                                    <button onclick=deleteExpense('${expense.id}')>Delete</button>
                                    <button onclick=editExpense('${expense.id}','${expense.price}','${expense.description}','${expense.category}')>Edit</button>
                                </li>
                                `;
  //   console.log(createNewItemHtml);
  parentNode.innerHTML += createNewItemHtml;
  //   console.log(parentNode.innerHTML);
}

function editExpense(id, price, description, category) {
  document.getElementById("price").value = price;
  document.getElementById("description").value = description;
  document.getElementById("category").value = category;
  //   axios.put(
  //     `https://crudcrud.com/api/1c123dec5a7b48f6bb35caffe366acdd/bookingData/${user._id}`,
  //     {
  //       uname: "Yash_Gupta",
  //       email: "y@gmail.com",
  //       phone: 9685,
  //     }
  //   );
  deleteExpense(id);
}

function deleteExpense(expenseID) {
  // localStorage.removeItem(email)
  axios
    .delete(`http://localhost:3000/delete-item/${expenseID}`)
    .then((res) => {
      removeItemFromScreen(expenseID);
    })
    .catch((err) => console.log(err));
}

function removeItemFromScreen(expenseID) {
  const parentNode = document.getElementById("list");
  const elem = document.getElementById(expenseID);
  parentNode.removeChild(elem);
}

// const showDataOnScreen = (data) => {
//   let newElement = document.createElement("li"); //Creating list element
//   let deleteBtn = document.createElement("input"); //Creating delete button
//   let editBtn = document.createElement("input"); //Creating edit button
//   deleteBtn.className = "delete";
//   deleteBtn.type = "button";
//   deleteBtn.value = "Delete";
//   editBtn.className = "edit";
//   editBtn.type = "button";
//   editBtn.value = "Edit";
//   // let data = localStorage.getItem(obj.price); //Extracting data from local storage
//   newElement.appendChild(document.createTextNode(data));

//   //Adding data and button in the list
//   let parentEle = document.getElementById("list");
//   parentEle.appendChild(newElement);
//   newElement.appendChild(deleteBtn);
//   newElement.appendChild(editBtn);
// };

// Delete button function

// deleteBtn.onclick = function () {
//   axios.delete(`http://localhost:3000/delete-item/${obj.id}`);
//   // localStorage.removeItem(obj.price);
//   parentEle.removeChild(newElement);
// };

// // Edit button function
// editBtn.onclick = function () {
//   // localStorage.removeItem(obj.price);
//   parentEle.removeChild(newElement);
//   document.getElementById("price").value = obj.price;
//   document.getElementById("description").value = obj.description;
//   document.getElementById("category").value = obj.category;
// };
