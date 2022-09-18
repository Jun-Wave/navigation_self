function textToImg(name) {
  let fsize = 18;//图片中字体的大小
  if(name.length===4) {
    fsize = 14;
  }else if(name.length===3) {
    fsize = 16;
  }else if(name.length===2 || name.length === 1) {
    fsize = 18;
  }else if(name.length>4) {
    fsize = 14;
    name = name.substr(0,4)+".";
  } 
  
  const x = 30;//开始绘制文本的 x 坐标位置
  const y = 30;//开始绘制文本的 y 坐标位置
  const fontWeight = "bold";//字体加粗
  const canvas = document.createElement("canvas");  //创建canvas元素
  canvas.width = 60;//画布宽度
  canvas.height = 60;//画布高度
  const context = canvas.getContext("2d");//2d画图
  context.fillStyle = getBgColor();//获取背景颜色
  context.fillRect(0, 0, canvas.width, canvas.height);//(x,y,宽度,高度)
  context.fillStyle = "#FFF";//背景颜色
  context.font = fontWeight + " " + fsize + "px sans-serif";//字体加粗、大小
  context.textAlign = "center";//字体水平居中
  context.textBaseline = "middle";//字体垂直居中
  context.fillText(name, x, y);//text to img
  return canvas.toDataURL("image/png");
}
function getBgColor() {
  const bgArr = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#eca0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
  const color = bgArr[Math.floor(Math.random() * bgArr.length)];
  return color
}

export default textToImg;