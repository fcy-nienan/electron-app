
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
});
window.electronAPI.show_update_dialog((_event, value) => {
    console.log(value);
    console.log(_event);
    if (value){
        alert("开始显示进度条--开始更新!")
    }
})