// apiUrl
const apiUrl = "https://vue3-course-api.hexschool.io/";
const apiPath = "veganfoodtw2";

// 全域變數
// 產品 data
let productsData = [];
// 我的最愛資料
let favoriteData = JSON.parse(localStorage.getItem("favoriteItem")) || [];


// 產品列表 dom
const productList = document.querySelector("#productList");
// 我的最愛 dom
const favoriteList = document.querySelector("#favoriteList");

// 1. 初始化
function init() {
  getProductData();
  getFavoriteData();
};
init();


// 產品 - 取得產品列表
function getProductData() {
  axios.get(`${apiUrl}api/${apiPath}/products`)
    .then(function (response) {
      productsData = response.data.products;
      renderProductsList(productsData);
      renderAddBtn();
    })

    .catch(function (error) {
      console.log(error.response.data);
    })
}

// 產品 - 渲染產品列表
function renderProductsList(arr) {
  let str = "";

  arr.forEach((item) => {
    if (item.category === "主餐") {
      str += `<li class="col" data-product-id="${item.id}">
      <a class="d-block" href="https://www.google.com.tw/?hl=zh_TW">
          <div class="card mb-3">
              <img class="img-fluid" src="${item.imageUrl}"></img>
              <div class="card-body">
                  <h5  class="card-title text-dark fw-bold">${item.title}</h5 >
                  <button  type="button"  class="btn btn-outline-primary me-2" id="addCart">加入購物車</button>
                  <button type="button" class="btn btn-outline-danger  shadow-none addFavoriteBtn" id="addFavoriteBtn" ><i class="bi bi-heart"  data-favorite-id=${item.id}></i></button>
              </div>
          </div>
      </a>
  </li>`
    }
  });

  // 呈現產品列表
  productList.innerHTML = str;
}

//產品 - 產品列表綁定監聽事件

productList.addEventListener("click", function (e) {
  e.preventDefault();

  let productId = e.target.closest("li").dataset.productId;

  // 點到不是按鈕就中斷
  if (e.target.nodeName !== "BUTTON") { return };

  // 加入購物車
  if (e.target.getAttribute("id") === "addCart") {
    e.preventDefault();
    alert("加入購物車");
  };

  // 加入我的最愛
  if (e.target.getAttribute("id") === "addFavoriteBtn") {
    e.preventDefault();

    // 產品列表跑 forEach 將 id 取出來與 productId 比對，符合的話加入我的最愛
    productsData.forEach((productItem) => {

      if (productItem.id !== productId) { return; }

      // 切換愛心樣式
      // 點擊到加入我的最愛時，沒有實心愛心就加上並新增一筆資料到favoriteData
      if (e.target.children[0].classList.contains("bi-heart")) {

        // 加入我的愛心
        addFavorites(productItem, productId);
        toggleAddFavorite(productId);
      } else {
        // 有實心愛心就從 favoriteData移除一筆資料

        delFavorite(productId)
        toggleAddFavorite(productId);
      }

      // 將資料寫入 localStorage
      localStorage.setItem("favoriteItem", JSON.stringify(favoriteData));
      getFavoriteData();
    });
  };
});

// 我的最愛  - 加入我的最愛
function addFavorites(productItem, productId) {
  // 先查找 favoriteData資料的 id 與 產品列表的 id 是一樣的，有的話就回傳 true
  favoriteData.find((favorite) => {
    return favorite.id === productId;
  });

  // 要避免重複加入，所以用some功能比對是否有重複id
  if (favoriteData.some((favorite) => favorite.id === productId)) {
    return alert('重複加入');
  };

  alert("已加入最愛");
  favoriteData.push(productItem);
};


// 我的最愛 - 切換按鈕
function toggleAddFavorite(id) {
  const addFaBtn = document.querySelector(`#addFavoriteBtn i[data-favorite-id=${id}]`);
  console.log(addFaBtn);

  addFaBtn.classList.toggle("bi-heart");
  addFaBtn.classList.toggle("bi-heart-fill");
}

// 我的最愛 - 渲染切換按鈕
function renderAddBtn() {
  if (favoriteData === null) return;
  favoriteData.forEach((fav) => toggleAddFavorite(fav.id));
  console.log(favoriteData);
}


// 我的最愛 - 取得最愛列表
function getFavoriteData() {

  let str = "";

  favoriteData.forEach((item) => {
    str += `<li class="row   align-items-center text-center mb-3" data-favorite-id=${item.id}>
    <div class="col-4">
      <img class="img-fluid" src="${item.imageUrl}" alt="pic">
    </div>
    <div class="col-4">
      <h4 class="fw-bold">${item.title}</h4>
    </div>
    <div class="col-4">
      <button class="btn btn-danger" id="delFavoriteBtn">刪除</button>
    </div>
  </li>`;
  });

  favoriteList.innerHTML = str;
};


// 我的最愛 - 移除單筆最愛
favoriteList.addEventListener("click", function (e) {
  e.preventDefault();

  let favoriteId = e.target.closest("li").dataset.favoriteId;

  if (e.target.getAttribute("id") === "delFavoriteBtn") {

    delFavorite(favoriteId)
    toggleAddFavorite(favoriteId);
  }
});


//我的最愛 - 移除單筆最愛
function delFavorite(id) {

  if (!favoriteData) { return };

  // 取得我的最愛列表內的 單一品項 id
  const delFavoriteIndex = favoriteData.findIndex(
    (favorite) => favorite.id === id
  );

  console.log(delFavoriteIndex);
  if (delFavoriteIndex === -1) return;
  favoriteData.splice(delFavoriteIndex, 1);

  // 將我的最愛資料 寫入 localStorage
  localStorage.setItem("favoriteItem", JSON.stringify(favoriteData));

  // 重新取得我的最愛資訊
  getFavoriteData();
}


