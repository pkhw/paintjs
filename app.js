const canvas = document.getElementById('jsCanvas')
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName('JsColor')
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const INITIAL_COLOR = ''
const CANVAS_SIZE = 700
const saveBtn = document.getElementById('jsSave')

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = '2.5'

let painting = false;
let filling = false;

function startPainting() {
	painting = true;
}

function stopPainting() {
	painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
	const y = event.offsetY;
	if(!painting){
		ctx.beginPath()
		ctx.moveTo(x, y)
	}else {
		ctx.lineTo(x,y)
		ctx.stroke()
	}
}



function onMouseUp() {
	stopPainting()
}

function handleCanvasClick() {
 if(filling) {
	ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
 }
}

function handleCM(event) {
	event.preventDefault()
}

if(canvas){
  canvas.addEventListener('mousemove', onMouseMove)
	canvas.addEventListener('mousedown', startPainting)
	canvas.addEventListener('mouseup', stopPainting)
	canvas.addEventListener('mouseleave', stopPainting)
	canvas.addEventListener('click', handleCanvasClick)
	canvas.addEventListener('contextmenu', handleCM)
}

function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
} 

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick))

function handleRangeChange(event) {
	const size = event.target.value
	ctx.lineWidth = size;
}

if(range) {
	range.addEventListener('input', handleRangeChange)
}

function handleModeClick() {
	if(filling === true) {
		filling = false;
		mode.innerText = 'Fill'
	}else {
		filling = true;
		mode.innerText = 'Paint'

	}
}

function handleSaveClick() {
	const image = canvas.toDataURL()
	const link = document.createElement('a')
	link.href = image
	link.download = 'PaingJS[????]'
	link.click()
}

if(mode) {
	mode.addEventListener('click', handleModeClick)
}

if(saveBtn){
	saveBtn.addEventListener('click', handleSaveClick)
}