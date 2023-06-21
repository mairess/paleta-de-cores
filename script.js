// 1 - Adicione à página o título "Paleta de Cores" e uma paleta contendo quatro cores distintas.
const title = document.createElement('h1');
const parent = document.querySelector('body');
title.id = 'title';
title.innerText = 'Paleta de Cores';
parent.appendChild(title);

const colorPalette = document.createElement('ul');
colorPalette.id = 'color-palette';
parent.appendChild(colorPalette);

const creatSquares = (classNameToPass) => {
  const newSquare = document.createElement('li');
  newSquare.className = classNameToPass;
  return newSquare;
};

const addColor = (parentElement, child) => parentElement.appendChild(child);
addColor(colorPalette, creatSquares('color red selected'));
addColor(colorPalette, creatSquares('color green'));
addColor(colorPalette, creatSquares('color yellow'));
addColor(colorPalette, creatSquares('color blue'));

const pixelBoardSection = document.createElement('section');
pixelBoardSection.id = 'pixel-board';
parent.appendChild(pixelBoardSection);

// 2 - Adicione à página um quadro contendo 25 pixels, sendo que cada elemento do quadro de pixels possua 40 pixels de largura, 40 pixels de altura e seja delimitado por uma borda preta de 1 pixel
const pixelsBoard = document.getElementById('pixel-board');
const size = 5;
for (let index = 0; index < size; index += 1) {
  const row = document.createElement('div');
  row.className = 'row';

  for (let j = 0; j < size; j += 1) {
    const square = creatSquares('pixel');
    square.className = 'pixel';
    row.appendChild(square);
  }

  pixelsBoard.appendChild(row);
}

// 3 - Crie uma função para selecionar uma cor na paleta de cores
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

const selectColor = (event) => {
  const element = document.querySelector('.selected');
  element.classList.remove('selected');
  event.target.classList.add('selected');
};

red.addEventListener('click', selectColor);
green.addEventListener('click', selectColor);
yellow.addEventListener('click', selectColor);
blue.addEventListener('click', selectColor);

// 4 - Crie uma função que permita preencher um pixel do quadro com a cor selecionada na paleta de cores
const pixelBoardarray = [];
const elements = document.querySelectorAll('.pixel');
for (let index = 0; index < elements.length; index += 1) {
  elements[index].addEventListener('click', (event) => {
    const selected = document.querySelector('.selected');
    const computedStyle = getComputedStyle(selected);
    const backgroundColor = computedStyle.getPropertyValue('background-color');
    const evento = event;
    evento.target.style.backgroundColor = backgroundColor;
    pixelBoardarray[index] = backgroundColor;
    localStorage.setItem('pixelBoard', JSON.stringify(pixelBoardarray));
  });
}

const storedBackgroundColor = localStorage.getItem('pixelBoard');
const parsedBackgroundColor = JSON.parse(storedBackgroundColor);
if (storedBackgroundColor) {
  for (let index = 0; index < elements.length; index += 1) {
    const storedColor = parsedBackgroundColor[index];
    if (storedColor) {
      elements[index].style.backgroundColor = storedColor;
    }
  }
}

// 5 - Crie um botão que, ao ser clicado, limpa o quadro preenchendo a cor de todos seus pixels com branco
const resetButton = document.createElement('button');
resetButton.id = 'clear-board';
resetButton.innerText = 'Limpar';
colorPalette.insertAdjacentElement('afterend', resetButton);

const reset = () => {
  for (let index = 0; index < elements.length; index += 1) {
    elements[index].style.backgroundColor = 'white';
  }
};

resetButton.addEventListener('click', reset);

// 6 - Adicione um botão para gerar cores aleatórias para a paleta de cores
const randomColorButton = document.createElement('button');
randomColorButton.id = 'button-random-color';
randomColorButton.innerText = 'Cores aleatórias';
resetButton.insertAdjacentElement('afterend', randomColorButton);

const generateRandomColor = () => {
  const hexadecimals = 'ABCDEF0123456789';
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    color += hexadecimals[Math.ceil(Math.random() * 16)];
  }
  return color;
};

const SetRandomColor = () => {
  const colors = document.getElementsByClassName('color');
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].style.backgroundColor = generateRandomColor();
  }
};

randomColorButton.addEventListener('click', SetRandomColor);
