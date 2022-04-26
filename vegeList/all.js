// JSON 檔案網址
const url = "https://shannon945.github.io/farm_produce/data.json";
const productsList = document.querySelector(".showList");
let data = [];

// 1. 撈取資料
function getData() {
    // 串接api
    axios.get(url)
        .then(function (response) {
            // console.log(response.data);

            // 將取的陣列資料賦予到全域變數 data
            data = response.data;

            // // 渲染畫面
            // renderData();
        })
        .catch(function (error) {
            console.error(error.data);
        })
};
getData();

// 2.渲染畫面
function renderData(arr) {
    // 宣告變數 str 並賦予空字串，用來組字串模板
    let str = "";

    // 將data 的陣列資料跑forEach並把物件資料寫入字串模板
    arr.forEach((item) => {
        str += `<tr>
        <td>${item.作物名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
        </tr>`;
    });

    // 將字串樣板顯示在畫面上
    productsList.innerHTML = str;
};

// 3.篩選資料
// 取得按鈕群組的 DOM標籤元素並綁定監聽事件
const btnGroup = document.querySelector("#btn-group");

btnGroup.addEventListener("click", changeTab);
function changeTab(e) {

    // 判斷點擊到是否是BUTTON
    if (e.target.nodeName === "BUTTON") {


        // 取出data-type的值
        let type = e.target.getAttribute("data-type");


        // 按鈕增加active 樣式
        // 取的所有按鈕列表
        const allBtns = document.querySelectorAll("#btn-group button");


        // 將回傳的按鈕類陣列跑forEach 先將 active 樣式先移除
        allBtns.forEach((item) => {
            item.classList.remove("active");
        });


        // 流程判斷，點擊到符合的種類按鈕將資料篩選出來
        if (type === "N04") {
            filterType(type);
            // 增加acitve 樣式 點擊到相對應的種類代碼
            e.target.classList.add("active");
        } else if (type === "N05") {
            filterType(type);
            // 增加acitve 樣式 點擊到相對應的種類代碼
            e.target.classList.add("active");
        } else {
            filterType(type);
            // 增加acitve 樣式 點擊到相對應的種類代碼
            e.target.classList.add("active");
        }
    };
};

// 4.優化篩選邏輯
function filterType(type) {

    // 宣告 變數 filterData ，用來儲存篩選後的資料
    let filterData = [];

    filterData = data.filter((item) => {
        return item.種類代碼 === type;
    });

    // 渲染畫面
    renderData(filterData);
};

// 5. 搜尋資料
// 取得 DOM 標籤元素
const searchGroup = document.querySelector("#searchGroup");

// searchBtn 綁定監聽 並取出輸入欄位的值
searchGroup.addEventListener("click", searchCrop);
function searchCrop(e) {
    //   判斷點擊到是否是按鈕
    if (e.target.getAttribute("id") === "searchBtn") {

        //選取 crop DOM 標籤元素節點
        const crop = document.querySelector("#crop");

        // 宣告變數 filterData並賦予空陣列
        let filterData = [];

        // 設置防呆避免誤填
        if (crop.value.trim() !== "") {
            filterData = data.filter((item) => {
                return item.作物名稱.match(crop.value.trim());
            });
        } else {
            alert("請輸入作物名稱！");
            return;
        };


        //判斷 filterData 長度等於零
        if (filterData.length === 0) {
            //等於零的情況下
            //將節點 productsList 透過 innerHTML 的方式賦予以下 HTML 標籤字串
            // '<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>'
            productsList.innerHTML = '<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>';
        } else {
            //不等於零的情況下執行函式 renderData 並帶入參數 filterData
            renderData(filterData);
        }
    };
};

// 6. 排序資料
// 選取 js-select DOM 標籤元素
const jsSeclet = document.querySelector("#js-select");

// jsSeclet 綁定監聽事件
jsSeclet.addEventListener("click", function (e) {
    // 使用swich 作流程判斷
    switch (e.target.value) {
        case "依上價排序":
            selectChange("上價");
            break;
        case "依中價排序":
            selectChange("中價");
            break;
        case "依下價排序":
            selectChange("下價");
            break;
        case "依平均量排序":
            selectChange("平均量");
            break;
        default:
            selectChange("交易量");
            break;
    };
});

function selectChange(value) {
    // sort 排序
    data.sort((a, b) => {
        return a[value] - b[value];
    });

    renderData(data);
};

// 7. 進階排序資料
// 取得js-sort-advanced DOM 標籤元素並綁定監聽事件
const sortAdvanced = document.querySelector("#sortAdvanced");

sortAdvanced.addEventListener("click", function (e) {
    // 判斷是否點擊到 上下鍵符號 i
    if (e.target.nodeName === "I") {

       
        // 取出 data-price 的值
        let sortPrice = e.target.getAttribute("data-price");

        // 取出 data-sort 的值
        let sortCaret = e.target.getAttribute("data-sort");


        // 撰寫 if else 流程判斷，判斷點擊到是 up還是 down

        //    如果是 "up"
        if (sortCaret === "up") {
            //  使用 sort 排序
            data.sort((a, b) => {
                // 大 → 小 排列
                return b[sortPrice] - a[sortPrice];
            })
        } else {
            // 如果是"down"
            data.sort((a, b) => {
                // 大 → 小
                return a[sortPrice] - b[sortPrice];
            })
        };
    };


    // 渲染畫面 
    renderData(data);
});


