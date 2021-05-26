const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

let painting = false;


// canvas, context객체 관련 정보는 mdn검색하면 다나옴
ctx.strokeStyle = "black";
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
    ctx.beginPath();
    ctx.moveTo(x,y);
// lineTo 는 점과 점을 이어줌
  } else {
    ctx.lineTo(x,y);
    ctx.stroke()
  }
}

// click하면 painting되는 함수
function onMouseDown(event){
  // console.log(event);
  painting = true;
}



if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
