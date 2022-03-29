
//取得 DOM 元素節點
const textInput = document.querySelector("#textInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");

// 宣告 變數todoData 並賦予空陣列 用來儲存待辦事項資料
let todoData = [];



// 1.新增功能
// 在 新增按鈕綁定監聽事件
addBtn.addEventListener("click", addTodo);
function addTodo(e) {
    // 取消 a 標籤默認行為
    // e.preventDefault();

    // 設置防呆，避免使用者誤填空資料
    if (textInput.value.trim() === "") {
        alert("請填寫正確資料")
        return;
    }

    // 組物件資料
    let todoObj = {
        // 填寫欄的值
        text: textInput.value,
        // id:時間搓
        id: new Date().getTime(),
        // checked 狀態
        checked: ""
    };

    // 將組好的物件推送到 全域變數 todoData 的第一筆資料
    todoData.unshift(todoObj)

    // 清除填寫欄為
    textInput.value = "";

    // 更新狀態
    updateTodoList();
};

//  優化功能
textInput.addEventListener("keyup",function(e) {
  
    // 如果是輸入完資料按下Enter的話就執行新增代辦
    if(e.key === "Enter") {
        addTodo();
    };
})


// 2. 渲染畫面
function renderTodoData(arr) {
    // 宣告 變數 str 並賦予空字串，用來儲存組好的字串樣板
    let str = "";

    // todoData 跑 forEach 將物件資料填入字串樣板中
    arr.forEach((item) => {
        str += `<li data-id=${item.id}>
        <label class="checkbox" for="">
          <input type="checkbox" ${item.checked} />
          <span>${item.text}</span>
        </label>
        <a href="#" class="delete" id="deleteBtn"></a>
      </li>`;
    });

    // 將字串模板顯示在畫面上
    todoList.innerHTML = str;
};

//3. 切換狀態及刪除單筆
// 將 todoList 綁定事件監聽，當點擊時產生click 事件，並觸發執行函式。
todoList.addEventListener("click", function (e) {

    //宣告 變數 id 並賦予從 li 標籤內的取出data-id的值，因為在 html 標籤元素取出的值都是字串必須轉型成數字
    let id = parseInt(e.target.closest("li").getAttribute("data-id"));

    // 流程判斷，因為li 內 有刪除按鈕及切換按鈕要判斷是點擊到哪個
    // 刪除功能
    // 判斷是否點擊到刪除按鈕
    if (e.target.getAttribute("id") === "deleteBtn") {
        // 取消 a 標籤默認行為
        e.preventDefault();

        // 篩選是否點擊到的刪除按鈕，li的data-id 與 todoData 內的id 是否依樣

        // 找出id 符合的第一筆資料，並回傳索引位置
        let index = todoData.findIndex((item) => {
            return item.id === id;
        });

        // 刪除 當前索引位置的一筆資料
        todoData.splice(index, 1);

    } else {
        // 如果點擊到是切換按鈕就先跑forEach 比對id 是否一樣
        todoData.forEach((item) => {
            // 判斷 item.id 與 id 是否一樣
            if (item.id === id) {
                // 如果是的話，在判斷目前 checked 狀態
                if (item.checked === "checked") {
                    // 如果已經被打勾的話就取消
                    item.checked = "";
                } else {
                    // 如果已經被取消的話就打勾
                    item.checked = "checked";
                }
            }
        });
    };

    // 更新狀態
    updateTodoList();
});


// 4. 切換tab 及 修改狀態
// 取得  tab的 列表 DOM 標籤元素並綁定監聽
const tabGroup = document.querySelector("#tab-group");

// 宣告 變數 toggleStatus 並並賦予預設值為"all"
let toggleStatus = "all";

tabGroup.addEventListener("click", changeTab);
function changeTab(e) {

    //  將變數toggleStatus 賦予從 點擊到不同的 tab 取出data-tab的值，並回傳到全域變數toggleStatus
    toggleStatus = e.target.getAttribute("data-tab");

    // 判斷點擊到是否是LI
    if (e.target.nodeName === "LI") {
        //如果是li 透過querySelectorAl 取出所有li的標籤元素節點，並回傳類陣列
        let allTab = document.querySelectorAll("#tab-group li");

        //移除所有li 的active ，透過類陣列跑forEach移除active 樣式
        allTab.forEach((item) => {
            item.classList.remove("active");
        });

        //點擊到對應的 li 再增加 active 樣式
        e.target.classList.add("active");
    };

    // 更新狀態
    updateTodoList();
};


// 5. 更新代辦列表
function updateTodoList() {
    // 宣告變數 showData 並賦予空陣列，用來儲存 篩選的陣列資列
    let showData = [];

    // 流程判斷 三個按鈕不同顯示狀態
    if (toggleStatus === "all") {
        // 如果點擊到 全部的狀態按鈕，就把所有的資料都顯示出來
        showData = todoData;
    } else if (toggleStatus === "work") {
        // 如果點擊到 待完成的狀態按鈕，就把未打勾的篩選出來
        showData = todoData.filter((item) => {
            return item.checked === "";
        });
    } else {
        // 如果點擊到 已完成的狀態按鈕，就把打勾的篩選出來
        showData = todoData.filter((item) => {
            return item.checked === "checked";
        });
    };


    // 修改未完成數量
    
    // 取出 未完成項目的DOM 標籤元素
    const workNum = document.querySelector("#workNum");

    // 計算 未完成狀態
    let todoLength =  todoData.filter((item) => {
        return item.checked === "";
    });

    // 顯示在畫面上
    workNum.textContent = todoLength.length;


    // 渲染畫面
    renderTodoData(showData);
};


// 6. 刪除已完成項目
// 取得 清除已完成項目的 DOM 標籤元素
const deleteDone = document.querySelector("#deleteDone");
// deleteDone 綁定監聽事件
deleteDone.addEventListener("click",function(e){
    // 取消 a 標籤預設樣式
    e.preventDefault();

    // 刪除已完成
    // 篩選 沒被checked 的資料回傳到 todoData
    todoData = todoData.filter((item) => {
        return item.checked !== "checked";
    })

    //更新狀態
    updateTodoList();
})



