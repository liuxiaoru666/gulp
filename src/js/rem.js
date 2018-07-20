
// 获取屏幕宽度(viewport宽度)
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;

// 获取html的DOM
let htmlDom = document.getElementsByTagName('html')[0];
//假设在750px的设计图上1rem==100px
// 设置html的fontsize
htmlDom.style.fontSize = htmlWidth / 7.5 + 'px';

window.addEventListener('resize', (e) => {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    htmlDom.style.fontSize = htmlWidth / 7.5 + 'px';
});