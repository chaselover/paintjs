// canvas : 영역안의 pixel을 다루는 기능
const canvas = document.getElementById("jsCanvas");
// context는 canvas안의 pixel을 control하는 요소(객체)
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// canvas는 pixel manipulate size와 css size두개를 가짐.
// window에 pixel을 다루는 size를 알려주기 위한 코드
canvas.width = CANVAS_SIZE;
canvas.height= CANVAS_SIZE;

let painting = false;
let filling = false;

// canvas, context객체 관련 정보는 mdn검색하면 다나옴
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;



function startPainting(){
  painting = true;
}

function stopPainting(){
  painting = false;
}

// mouse 좌표 찾아주는 event....client(window에서의 X,Y),,,offset(캔버스 안에서 X,Y)
// 좌표감지, 선을 그림.(offset, path)
function onMouseMove(event) {
  // console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  // console.log(x,y);
  if(!painting){
    // path(line)이 시작돼 move to의 좌표로 부터 line to의 좌표로 까지 (클릭event시)이어짐.
    ctx.beginPath();
    ctx.moveTo(x,y);
// lineTo 는 점과 점을 이어줌(마우스를 움직이는 내내)
// stroke는 path에 선을 긋는 행위.
// fill, closePath(선분) 등등에 대해서도 알아보기.(path를 정하는 방법)
  } else {
    ctx.lineTo(x,y);
    ctx.stroke()
  }
}

function handleColorClick(event){
  // console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  // console.log(color);클릭시 컬러변경확인
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event){
  // console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else{
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)

  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

// console.log(Array.from(colors));
// array.from()은 객체로부터 array를 만드는 메소드.
// 여기서 color는 배열안의 each div를 나타냄. 컬러라서 컬러가 x potato해도 작동.
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if(range){
  range.addEventListener("input", handleRangeChange)
}

if(mode){
  mode.addEventListener("click", handleModeClick)
}