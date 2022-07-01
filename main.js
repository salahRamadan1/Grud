var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var addBtn = document.getElementById("add");
var productCountInput = document.getElementById("productCount");
var upDate = document.getElementById("upDate");
var currentIndex = 0;
let numIndex = 0;
var productContainer;
if (localStorage.getItem("product") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("product"));
  disPlay(productContainer);
}

addBtn.addEventListener("click", function () {
  if (addBtn.innerHTML == "add Product") {
    addProduct();
  } else {
    edit();
  }
});

function upDateData(index) {
  
  productNameInput.value = productContainer[index].name;
  productCategoryInput.value = productContainer[index].category;
  productPriceInput.value = productContainer[index].price;
  productDescInput.value = productContainer[index].desc;
  addBtn.innerHTML = "edit";
}
function edit() {
  productContainer[currentIndex].name = productNameInput.value;
  productContainer[currentIndex].price = productPriceInput.value;
  productContainer[currentIndex].category = productCategoryInput.value;
  productContainer[currentIndex].desc = productDescInput.value;

  addBtn.innerHTML = "add Product";
  localStorage.setItem("product", JSON.stringify(productContainer));

  disPlay(productContainer);
  clear();
}
function addProduct() {
  var product = {
    name: productNameInput.value,
    count: productCountInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  productContainer.push(product);
  disPlay(productContainer);
  localStorage.setItem("product", JSON.stringify(productContainer));
  clear();
}
function disPlay(list) {
  var cartona = ``;
  for (var i = 0; i < list.length; i++) {
    cartona += `     <tr >
    <td>${i}</td> 
    <td>${list[i].name}</td>
    <td>${list[i].count}</td> 
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td>${list[i].desc}</td>
    <td>   
    <div class="d-flex">
       <p class="me-5 fs-3 iconCount" onclick="plusAndMinus(${i} , ${-1})">-</p>
        <p class="fs-3 iconCount" onclick="plusAndMinus(${i} , ${1})">+</p>
    </div>  
    </td>
    <th> <button class=" btn btn-dark" onclick="upDateData(${i})" > Update</button> </th>
    <th><button onclick="deleteProductNow(${i})"class=" btn btn-danger" >Delete</button> </th>
</tr>`;
  }
  document.getElementById("tableRow").innerHTML = cartona;
}
function plusAndMinus(numIndex ,x){
 
if(productContainer[numIndex].count == 0 && x ==  -1){
  productContainer[numIndex].count = 0 ;

}
else{

  productContainer[numIndex].count = Number( productContainer[numIndex].count )+ Number( x);
  disPlay(productContainer)
}


}
function deleteProductNow(index) {
  productContainer.splice(index, 1);
  disPlay(productContainer);
  localStorage.setItem("product", JSON.stringify(productContainer));
}
function clear() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
  productCountInput.value = ""
}
function searchProduct(term) {
  var searchProduct = [];
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      searchProduct.push(productContainer[i]);
    }
  }
  disPlay(searchProduct);
}
