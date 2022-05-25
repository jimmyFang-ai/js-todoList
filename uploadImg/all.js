const url = "https://vue3-course-api.hexschool.io";
const path = "veganfoodcoverimg";



const fileInput = document.querySelector("#file");


fileInput.addEventListener("change", upload);
function upload() {
    // 選取到檔案資料
    const file = fileInput.files[0];
    // 建立實體傳統表單方法
    const formData = new FormData();
    // 透過append 增加欄位
    formData.append('file-to-upload', file);

    // // Cookie 取出來
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token;
    axios.post(`${url}/api/${path}/admin/upload`, formData)
        .then(res => {
            console.log(res);
        });
}