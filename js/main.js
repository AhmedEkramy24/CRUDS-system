let title = document.getElementById("title");
let op = document.querySelectorAll(".operation input");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let submit = document.getElementById("create");
let mode = "create";
let tmp;
let searchMode = "title";
let inputs = [title, price, taxes, ads, discount, category, count];

let products = JSON.parse(localStorage.getItem("products")) || [];

if (products.length > 0) {
  showData();
}

// price operation
function getCount() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.classList.replace("bg-danger", "bg-success");
  } else {
    total.classList.replace("bg-success", "bg-danger");
  }
}
op.forEach((inp) => {
  inp.addEventListener("input", getCount);
});

// create product
submit.addEventListener("click", function () {
  let item = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
    count: count.value,
  };
  if (
    item.title != "" &&
    item.price != "" &&
    item.taxes != "" &&
    item.ads != "" &&
    item.discount != "" &&
    item.category != "" &&
    item.count != "" &&
    item.count < 101
  ) {
    if (mode == "create") {
      if (item.count > 1) {
        for (let i = 0; i < item.count; i++) {
          products.push(item);
        }
      } else {
        products.push(item);
      }
    } else {
      products[tmp] = item;
      mode = "create";
      submit.innerHTML = `create`;
      count.style.display = `block`;
      count.nextElementSibling.style.display = `block`;
    }
    clearForm();
    inputs.forEach((inp) => {
      inp.classList.remove("is-valid");
    });
  }
  localStorage.setItem("products", JSON.stringify(products));

  showData();
});

// read prouducts
function showData() {
  let table = ``;
  for (let i = 0; i < products.length; i++) {
    if (products[i]) {
      table += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button class="btn btn-warning btn-sm" onclick=update(${i})>update</button></td>
            <td><button class="btn btn-danger btn-sm"  onclick=deleteItem(${i})>delete</button></td>
        </tr>
        `;
    }
  }
  document.getElementById("show").innerHTML = table;
  if (products.length > 0) {
    let delAll = `<button onclick=deleteAll() class="btn btn-danger w-100 fw-bold mt-3">Delete All (${products.length})</button>`;
    document.querySelector(".delAll").innerHTML = delAll;
  } else {
    document.querySelector(".delAll").innerHTML = ``;
  }
}

// clear form after adding
function clearForm() {
  title.value = null;
  price.value = null;
  taxes.value = null;
  ads.value = null;
  discount.value = null;
  total.innerHTML = null;
  category.value = null;
  count.value = null;
  total.classList.replace("bg-success", "bg-danger");
}

//delete item
function deleteItem(index) {
  products.splice(index, 1);
  localStorage.products = JSON.stringify(products);
  showData();
}

// delet all products
function deleteAll() {
  localStorage.clear();
  products.splice(0);
  showData();
}

// update product data
function update(index) {
  title.value = products[index].title;
  price.value = products[index].price;
  taxes.value = products[index].taxes;
  ads.value = products[index].ads;
  discount.value = products[index].discount;
  getCount();
  total.innerHTML = products[index].total;
  category.value = products[index].category;
  count.style.display = `none`;
  count.nextElementSibling.style.display = `none`;
  submit.innerHTML = `Update`;
  mode = `update`;
  tmp = index;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// search

function getSearchValue(id) {
  let searchInp = document.getElementById("search");
  if (id == "by-title") {
    searchInp.nextElementSibling.innerHTML = `Search By Title`;
    searchMode = "title";
  } else {
    searchInp.nextElementSibling.innerHTML = `Search By Category`;
    searchMode = "category";
  }
  searchInp.focus();
}

function searchProducts(value) {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.includes(value)) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button class="btn btn-warning btn-sm" onclick=update(${i})>update</button></td>
            <td><button class="btn btn-danger btn-sm"  onclick=deleteItem(${i})>delete</button></td>
         </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.includes(value)) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button class="btn btn-warning btn-sm" onclick=update(${i})>update</button></td>
            <td><button class="btn btn-danger btn-sm"  onclick=deleteItem(${i})>delete</button></td>
         </tr>
        `;
      }
    }
  }
  document.getElementById("show").innerHTML = table;
}

// handle when user enter

title.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    title.blur();
    price.focus();
  }
});

price.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    price.blur();
    taxes.focus();
  }
});

taxes.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    taxes.blur();
    ads.focus();
  }
});

ads.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    ads.blur();
    discount.focus();
  }
});

discount.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    discount.blur();
    category.focus();
  }
});

category.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    category.blur();
    count.focus();
  }
});

count.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    count.blur();
    submit.click();
  }
});

// validation

inputs.forEach((inp) => {
  inp.addEventListener("blur", function () {
    if (inp.value != "") {
      inp.classList.remove("is-invalid");
      inp.classList.add("is-valid");
    } else {
      inp.classList.remove("is-valid");
      inp.classList.add("is-invalid");
    }
    if (inp.id == "count") {
      if (inp.value > 100) {
        inp.classList.remove("is-valid");
        inp.classList.add("is-invalid");
      }
    }
  });
});
