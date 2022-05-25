
// DOM
const categoryBtnList = document.querySelector("#btn-group");
const categoryBtns = document.querySelectorAll("#btn-group button");
const searchGroup = document.querySelector("#searchGroup");
const cropInput = document.querySelector("#crop");
const select = document.querySelector("#js-select");
const sortAdvanced = document.querySelector("#sortAdvanced");
const productsList = document.querySelector(".showList");

// apiUrl
const url = "https://shannon945.github.io/farm_produce/data.json";


// Data 資料
let data = [];
// 篩選種類資料
let filterData = [];


// 取得遠端資料
function getData() {
    axios.get(url)
        .then((res) => {
            data = res.data;
        })
        .catch((error) => {
            console.error(error);
        })
};

getData();

// 選染畫面
function renderData(arr) {
    let str = "";

    if (arr.length === 0) {
        str += `<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>`;
    } else {
        arr.forEach((item) => {
            str += `<tr>
            <td>${item['作物名稱']}</td>
            <td>${item['市場名稱']}</td>
            <td>${item['上價']}</td>
            <td>${item['中價']}</td>
            <td>${item['下價']}</td>
            <td>${item['平均價']}</td>
            <td>${item['交易量']}</td>
            </tr>`;
        });
    };

    productsList.innerHTML = str;
};


// 篩選種類按鈕
function changeBtn(e) {

    // 判斷點擊不是按鈕就中斷
    if (e.target.nodeName !== "BUTTON") return;

    // 取出埋在按鈕的data-type
    let vegeType = e.target.dataset.type;

    //先把按鈕的 active 樣式移除，再把點到的按鈕加上 active樣式
    categoryBtns.forEach((item) => {
        item.classList.remove("active");
    });

    e.target.classList.add("active");

    // 點擊到符合的種類按鈕將資料篩選出來
    filterData = data.filter((item) => item['種類代碼'] === vegeType);

    // 呈現 篩選過的種類資料
    renderData(filterData);

    // 預設為 排序篩選
    select.value = "";
};


// 搜尋功能
searchGroup.addEventListener("click", function (e) {

    // 判斷點擊到是否是搜尋按鈕
    if (e.target.getAttribute("id") !== "searchBtn") return;

    const searchStr = cropInput.value.trim();
    // 設置防呆避免誤填
    if (searchStr === "") {
        return alert("請填寫正確資料");
    } else {
        // 確定有填寫資料後，去篩選符合的作物名稱回傳到 filterData
        filterData = data.filter((item) => {
            return item['作物名稱'].match(searchStr);
        });
    };

    // 送出資料搜尋後，清除種類按鈕樣式
    categoryBtns.forEach((item) => {
        item.classList.remove("active");
    });

   
    // 將搜尋後的結果資料呈現在畫面上
    renderData(filterData);
    // 預設為 排序篩選
    select.value = "";
    // 清除填寫欄位
    cropInput.value = "";
});


// 排序功能
function sortData(e) {

    // 判斷是否點擊到 上下鍵符號 i
    if (e.target.nodeName === "I") {

        // 取出 data-price 的值
        let sortPrice = e.target.dataset.price;

        // 取出 data-sort 的值
        let sortCaret = e.target.dataset.sort;

        // 預設為 排序篩選
        select.value = sortPrice;

        if (sortCaret === "up") {
            //  使用 sort 排序
            filterData.sort((a, b) => {
                //  大 → 小
                return b[sortPrice] - a[sortPrice];
            });
            renderData(filterData);
        } else {
            filterData.sort((a, b) => {
                //    小 → 大
                return a[sortPrice] - b[sortPrice];
            });
            renderData(filterData);
        };
    } else if (e.target.nodeName === "SELECT") {
        // 如果點擊到是 select 
        const selectStr = e.target.value;

        filterData.sort((a, b) => {
            return b[selectStr] - a[selectStr];
        });
        console.log(filterData);
        renderData(filterData);
    };
};


// 監聽事件
categoryBtnList.addEventListener("click", changeBtn);
select.addEventListener("change", sortData);
sortAdvanced.addEventListener("click", sortData);
