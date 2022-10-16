// 真是闲的蛋疼 0.0....

function renderData() {
  let homeDanmuArr = [
    {
      img: "http://120.48.121.186/medias/logo.png", //图片
      info: "欢迎访问bamboo主题", //文字
      href: "https://yuang01.github.io/", //链接
      close: true, //显示关闭按钮
      speed: 15, //延迟,单位秒,默认6
      color: "#42b983", //颜色,默认白色
      old_ie_color: "#000000", //ie低版兼容色,不能与网页背景相同,默认黑色
    },
    {
      img: "http://120.48.121.186/medias/logo.png", //图片
      info: "bamboo主题在国内可以访问http://120.48.121.186", //文字
      href: "http://120.48.121.186", //链接
      close: true, //显示关闭按钮
      speed: 15, //延迟,单位秒,默认6
      color: "blue", //颜色,默认白色
      old_ie_color: "#000000", //ie低版兼容色,不能与网页背景相同,默认黑色
    },
    {
      img: "https://tva3.sinaimg.cn/large/9bd9b167ly1fzjxy6gwesj20b40b40sx.jpg", //图片
      info: "🐂🐂🐂🐂🍺🍺🍺🍺", //文字
      href: "https://happy-roy.github.io/", //链接
      close: true, //显示关闭按钮
      speed: 10, //延迟,单位秒,默认6
      color: "red", //颜色,默认白色
      old_ie_color: "#000000", //ie低版兼容色,不能与网页背景相同,默认黑色
    },
  ];
  
  for (var i = 0; i < 20; i++) { // 生成 20 个 {}, 前三个已经写好，后面17个，通过请求api赋值
    homeDanmuArr[i] = homeDanmuArr[i] ? homeDanmuArr[i] : {speed: 12};
  }
  return homeDanmuArr;
}
function homeDanmuFn() {
  let data = renderData();
  //每条弹幕发送间隔
  let homelooper_time = 3 * 1000;
  let items = data;
  //弹幕总数
  let total = data.length;
  //是否首次执行
  let run_once = true;
  //弹幕索引
  let index = 0;
  //先执行一次
  barrager();
  async function barrager() {
    if (run_once) {
      //如果是首次执行,则设置一个定时器,并且把首次执行置为false
      homelooper = setInterval(barrager, homelooper_time);
      run_once = false;
    }
    //发布一个弹幕
    const responseImg = await fetch('https://api.btstu.cn/sjtx/api.php?lx=c1&format=json');
    const imgJson = await responseImg.json();
    const responseInfo = await fetch('https://api.vvhan.com/api/ian?type=json');
    const infoJson = await responseInfo.json();
    // 随机头像api
    items[index].img = imgJson.imgurl;
    // 随机一言
    index > 2 && (items[index].info = infoJson.ishan);
    $("body").barrager(items[index]);
    //索引自增
    index++;
    //所有弹幕发布完毕，清除计时器。
    if (index == total) {
      clearInterval(homelooper);
      return false;
    }
  }
}
homeDanmuFn();

document.addEventListener('pjax:send', function (e) {
  if (homelooper) {
    clearInterval(homelooper);
    $.fn.barrager.removeAll();
  }
})
