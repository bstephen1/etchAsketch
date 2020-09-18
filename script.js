const grid = document.querySelector('#grid');
const defaultGridSize = 15;
const gridBorderStyle = '1px solid green';
let etchColor = 'black';
let isMouseHeld = false;
//user choice for rgb. Used to keep track of color for gradient
let userR = 0;
let userG = 0;
let userB = 0;
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
			grid.innerHTML += `<div id='${i}-${j}' class='gridSquare' data-gradient=0 data-counter=1></div>`;
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
	}	
//uses global gridArr to set bg color
	if (gradient.checked) {
		g = e.target.dataset.gradient;
		//reset for random so g always represents current random color, not just initial color
		if (random.checked) {g = 0;}
		if (etchColor.match(/^#/)) {
			console.log('convert hex color');
			userR = parseInt(etchColor.charAt(1) + etchColor.charAt(2), 16);	
			userG = parseInt(etchColor.charAt(3) + etchColor.charAt(4), 16);	
			userB = parseInt(etchColor.charAt(5) + etchColor.charAt(6), 16);	
		}
		else {
			splitColor = etchColor.split(' ');
			console.log(splitColor);
			if (splitColor != '') {
				userR = splitColor[0].match(/\d/g).join('');
				userG = splitColor[1].match(/\d/g).join('');
				userB = splitColor[2].match(/\d/g).join('');
			}
		}
		if (g == 0) {
			//this is the amount subtracted each pass
			//value of 0 means it hasn't been set yet
			e.target.dataset.gradient = [Math.floor(userR * 0.1),
																	 Math.floor(userG * 0.1), 
																	 Math.floor(userB * 0.1) ];
			
		}
		let gradient = e.target.dataset.gradient.split(',');
		let counter = e.target.dataset.counter;
		console.log('grad ' + gradient);
		let colorArr = [userR, userG, userB];
		console.log('before ' + colorArr);
		for(let i = 0; i < 3; i++) {
			colorArr[i] - gradient[i]*counter >= 0 ? colorArr[i] = colorArr[i] - gradient[i] * counter
																		 : colorArr[i] = '0';
		}
		e.target.dataset.counter++;
		if ((holdMode.checked && isMouseHeld) || !holdMode.checked) {
			e.target.style.background = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
		}
		console.log(e.target.style.background);
		console.log('counter ' + e.target.dataset.counter);
		
	}
	if (!gradient.checked) {	
		if (holdMode.checked && isMouseHeld) {
			e.target.style.background = etchColor;
		}
		else if (!holdMode.checked) {
			e.target.style.background = etchColor;
		}
	}
}




function resetGrid(size) {
	grid.innerHTML = '';
	etchColor = 'rgb(0, 0, 0)';
	gridSize.value = size;
	createGrid(size);	
	addGridListeners();
	console.log(etchColor);
}



//initial grid setup
resetGrid(defaultGridSize);


//functions for options div
const reset = document.querySelector('#reset');
reset.addEventListener('click', () => resetGrid(gridSize.value));

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
	if(!random.checked) {etchColor = '#000000';}
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
