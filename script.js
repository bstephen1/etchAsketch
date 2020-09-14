const grid = document.querySelector('#grid');
const defaultGridSize = 15;
const gridBorderStyle = '1px solid green';
let etchColor = 'black';
let isMouseHeld = false;

document.body.onmousedown = () => isMouseHeld = true;
document.body.onmouseup = () => isMouseHeld = false;

//always a square
function createGrid(rows) {
	grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
	grid.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
	console.log(grid.style);

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < rows; j++) {
			grid.innerHTML += `<div id='${i}-${j}' class='gridSquare'></div>`;
		}
	}	
}

function addGridListeners() {
	const squares = document.querySelectorAll('.gridSquare');
	squares.forEach(square => square.addEventListener('mouseover', (e) => {gridListenerFun(e);}));
}

function gridListenerFun(e) {
	const random = document.querySelector('input[id=random]');
	const gradient = document.querySelector('input[id=gradient]');
	const holdMode = document.querySelector('input[id=holdMode]');
	etchColor = 'black';
	if (random.checked) {
		etchColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;		
		//maybe make this hsl so it's compatible with gradient mode
	}	
//**********************************
	if (gradient.checked) {
		if (etchColor.indexOf('hsl') == -1) {
			etchColor = `hsl(0, 0%, 100%)`;
			console.log(etchColor);
		}	
//this is not hitting 
		else {
			const colorSplit = etchColor.split(' ');
			//get last value
			//decrease by 10%
			//save as new value
			console.log(colorSplit);
		}
	}
//**********************************
	if (holdMode.checked && isMouseHeld) {
		e.target.style.background = etchColor;
	}
	else if (!holdMode.checked) {
		e.target.style.background = etchColor;
	}
}


function resetGrid() {
	grid.innerHTML = '';
	createGrid(defaultGridSize);	
	addGridListeners();
}


//initial grid setup
resetGrid();


//functions for options div
const reset = document.querySelector('#reset');
reset.addEventListener('click', resetGrid);

const gridOn = document.querySelector('input[id=gridOn]');
gridOn.addEventListener('change', () => {
	const squares = document.querySelectorAll('.gridSquare');
	if(gridOn.checked) {
		squares.forEach(square => square.style.border = gridBorderStyle);		
	}
	else {
		squares.forEach(square => square.style.border = '');		
	}
});
