const grid = document.querySelector('#grid');
const defaultGridSize = 15;
const gridBorderStyle = '1px solid green';
let etchColor = 'black';
let isMouseHeld = false;
//user choice for hsl. Used to keep track of gradient
let userH = 0;
let userS = 0;
let userL = 0;
const gridOn = document.querySelector('input[id=gridOn]');
const gridSize = document.querySelector('#gridSize');
//used as l value in hsl color function
const gradArr = [
	'50',
	'45',
	'40',
	'35',
	'30',
	'25',
	'20',
	'15',
	'10',
	'5',
	'0',
]

document.body.onmousedown = () => isMouseHeld = true;
document.body.onmouseup = () => isMouseHeld = false;

//always create a square
function createGrid(rows) {
	grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
	grid.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < rows; j++) {
			grid.innerHTML += `<div id='${i}-${j}' class='gridSquare' data-gradient=0></div>`;
		}
	}	
}

function addGridListeners() {
	const squares = document.querySelectorAll('.gridSquare');
	squares.forEach(square => {
		//check for grid on init (separate from eventlistener)
		if (gridOn.checked) {square.style.border = gridBorderStyle;}
		square.addEventListener('mouseover', (e) => {gridListenerFun(e);})
	});
}

function gridListenerFun(e) {
	const random = document.querySelector('input[id=random]');
	const gradient = document.querySelector('input[id=gradient]');
	const holdMode = document.querySelector('input[id=holdMode]');
	if (random.checked) {
		etchColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;		
		//maybe make this hsl so it's compatible with gradient mode
	}	
//uses global gridArr to set bg color
	if (gradient.checked) {
		g = e.target.dataset.gradient;
		if (random.checked) {
			userH = Math.floor(Math.random()*101);
			userS = Math.floor(Math.random()*101);
		}
		e.target.style.background = `hsl(${userH}, ${userS}%, ${gradArr[g]}%)`; 
		if (g < 10) {
			e.target.dataset.gradient = Number(g) + 1;
		}
	}
		
	if (holdMode.checked && isMouseHeld) {
		e.target.style.background = etchColor;
	}
	else if (!holdMode.checked && !gradient.checked) {
		e.target.style.background = etchColor;
	}
}




function resetGrid(size) {
	grid.innerHTML = '';
	etchColor = 'black';
	gridSize.value = size;
	createGrid(size);	
	addGridListeners();
	console.log(etchColor);
}



//initial grid setup
resetGrid(defaultGridSize);


//functions for options div
const reset = document.querySelector('#reset');
reset.addEventListener('click', () => resetGrid(defaultGridSize));

gridOn.addEventListener('change', () => {
	const squares = document.querySelectorAll('.gridSquare');
	if(gridOn.checked) {
		squares.forEach(square => square.style.border = gridBorderStyle);		
	}
	else {
		squares.forEach(square => square.style.border = '');		
	}
});

const random = document.querySelector('input[id=random]');
random.addEventListener('change', () => {
	if(!random.checked) {etchColor = 'black';}
});

//color buttons
const colors = document.querySelectorAll('.color');
colors.forEach(
	color => color.addEventListener('click', (e) => {
			etchColor = getComputedStyle(e.target).backgroundColor;
		})
);

const colorPicker = document.querySelector('#colorPicker');
colorPicker.addEventListener('change', (e) => etchColor = e.target.value);

gridSize.addEventListener('change', (e) => resetGrid(e.target.value));
