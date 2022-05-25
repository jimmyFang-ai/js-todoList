
// DOM 
const addBtn = document.querySelector("#addBtn");
const textInput = document.querySelector("#textInput");
const workNum = document.querySelector("#workNum");
const todoWrap = document.querySelector("#todoWrap");
const todoList = document.querySelector("#todoList");
const tabGroup = document.querySelector("#tab-group");
const allTab = document.querySelectorAll("#tab-group li");
const delAllDone = document.querySelector("#delAllDone");


// 代辦事項資料
let todoData = JSON.parse(localStorage.getItem("todoItem")) || [];
//  tab 按鈕狀態
let tabStatus = "";


// 初始化狀態
renderTodoData(todoData);


// 新增功能 - 加入代辦事項
function addTodo(e) {
    //取消預設 a 標籤往上滾動
    // e.preventDefault();

    // 設置防呆裝置，避免使用者誤填
    if (textInput.value.trim() === "") {return alert("請填寫正確資料")};

    // 組代辦物件資料
    let todoObj = {
        text: textInput.value.trim(),
        id: new Date().getTime(),
        checked: false, //預設為不打勾為false
    };

    // 將資料新增到todoData
    todoData.unshift(todoObj);
    // 清空填寫欄位資料
    textInput.value = "";
    // 新增完資料後，tab 狀態為 all
    tabStatus = "all";

    // 更新狀態
    updateTodoList();
};


// 渲染功能 - 將資料呈現在畫面
function renderTodoData(arr) {
    let str = "";

    // 代辦事項資料為空時，就隱藏列表，反之就出現
    if (todoData.length === 0) {
        todoWrap.classList.add("d-none");
    } else {
        todoWrap.classList.remove("d-none");
    };

    // 將todoData 資料跑迴圈帶上資料內容
    arr.forEach((item) => {
        str += `<li data-id=${item.id}>
        <label class="checkbox" for="inputval">
          <input type="checkbox" id="inputval" ${item.checked ? "checked" : ""} />
          <span>${item.text}</span>
        </label>
        <a href="#" class="delete" id="delTodoBtn"></a>
      </li>`
    });


    // 將資料寫入localStorage
    localStorage.setItem("todoItem", JSON.stringify(todoData));


    // 將資料呈現在 代辦清單
    todoList.innerHTML = str;

    // 將待完成數量呈現在畫面上
    workNum.textContent = todoData.filter((item) => item.checked !== true).length;
};

// //  優化功能
textInput.addEventListener("keyup", function (e) {

    // 如果是輸入完資料按下Enter的話就執行新增代辦
    if (e.key === "Enter") { addTodo() };
});


// 功能整合 - checked & delete
todoList.addEventListener("click", function (e) {

    // 取出 li 的 data-id
    let todoId = parseInt(e.target.closest("li").dataset.id);

    // 刪除功能 - 刪除單一代辦事項
    if (e.target.getAttribute("id") === "delTodoBtn") {
        e.preventDefault();

        // 篩選出 id 不相同的資料回傳到 todoData ， id相同的就被剃除
        todoData = todoData.filter((item) => item.id !== todoId);
    } else {
        // 如果點擊到是切換按鈕就先跑forEach 比對id 是否一樣
        todoData.forEach((item) => {
            // 判斷 item.id 與 id 是否一樣
            if (item.id === todoId) {
                // 切換打勾狀態，判斷如果是未打勾狀態就加上 checked，反之就取消打勾
                item.checked ? (item.checked = false) : (item.checked = true);
            }
        })
    }

    // 更新狀態
    updateTodoList();
})


// 切換狀態 - tab 切換
function changeTab(e) {

    //點擊不同tab 取出對應的 data-tab 的值
    tabStatus = e.target.dataset.tab;

    // 將所有的 tab 移除 active ，再次點擊時再加上 active
    allTab.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");

    // 更新狀態
    updateTodoList();
};

// 更新代辦資料狀態
function updateTodoList() {

    // 預設  newTodoData 為 todoData
    let newTodoData = todoData;

    // 流程判斷 三個按鈕不同顯示狀態
    if (tabStatus === "all") {
        // 如果點擊到全部的狀態按鈕就加上active，把其他按鈕取消active
        allTab.forEach((item, index) => {
            item.classList.remove("active");
            if (index === 0) {
                item.classList.add("active");
            };
        });
    } else if (tabStatus === "work") {
        // 如果點擊到 待完成的狀態按鈕，就把未打勾的篩選出來
        newTodoData = todoData.filter((item) => item.checked !== true);
    } else {
        // 如果點擊到 已完成的狀態按鈕，就把打勾的篩選出來
        newTodoData = todoData.filter((item) => item.checked !== false);
    };


    // 呈現 newTodoData 資料到畫面上
    renderTodoData(newTodoData);
};

// 刪除已完成 - 刪除已完成事項
delAllDone.addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.getAttribute("id") === "delAllDone") {
        // 如果點擊到刪除已完成事項按鈕，就把打勾的事項篩選掉，回傳未打勾的資料到 todoData
        todoData = todoData.filter((item) => item.checked !== true);
    };

    // 更新狀態
    updateTodoList();
});


// 監聽事件
addBtn.addEventListener("click", addTodo);
tabGroup.addEventListener("click", changeTab);
