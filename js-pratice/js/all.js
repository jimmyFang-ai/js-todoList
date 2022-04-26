

let data = [
    {
        title: "我是卡片",
        imgUrl: " ./img/kin-shing-lai-XRG126ML3d4-unsplash (2).jpg"
    },
    {
        title: "我是卡片1",
        imgUrl: " ./img/kin-shing-lai-XRG126ML3d4-unsplash (2).jpg"
    },
    {
        title: "我是卡片2",
        imgUrl: " ./img/kin-shing-lai-XRG126ML3d4-unsplash (2).jpg"
    },
];

const productList = document.querySelector("#productList");

// 1. 取得產品列表
function getData() {
    let str = "";

    data.forEach((item) => {
        str += ` <li class="col ">
       <a class="d-block" href="https://www.google.com.tw/?hl=zh_TW">
           <div class="card">
               <img class="img-fluid" src="${item.imgUrl}"></img>
               <div class="card-body">
                   <h5  class="card-title">${item.title}</h5 >
                   <button  type="button"  class="btn btn-primary me-2" id="addCart">加入購物車</button>
                   <button type="button" class="btn" id="addCollect"><i class="bi bi-heart text-danger" id="heartIcon"></i></button>
               </div>
           </div>
       </a>
   </li>`
    })

    productList.innerHTML = str;
}
getData();

// 2. 產品列表綁定監聽事件
productList.addEventListener("click", function (e) {


    if (e.target.nodeName === "BUTTON") {

        // 加入購物車
        if (e.target.getAttribute("id") === "addCart") {
            e.preventDefault();
            alert("加入購物車");
            console.log(addCart);
        };

        // 加入收藏
        if (e.target.getAttribute("id") === "addCollect") {

            e.preventDefault();
            const heartIcon = e.target.firstChild;
            console.log(heartIcon);
            

            if (heartIcon.classList.contains("bi-heart")) {
                e.preventDefault();
                alert("加入收藏");
                heartIcon.classList.remove("bi-heart");
                heartIcon.classList.add("bi-heart-fill");
               
            } else {
                e.preventDefault();
                alert("移除收藏");
                heartIcon.classList.remove("bi-heart-fill");
                heartIcon.classList.add("bi-heart");
            };
        }
    };
})



