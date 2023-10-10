const renderPlayer = (stepElem, value) => {
  stepElem.textContent = '';
  stepElem.textContent = value;
};

const getCell = (tbody, x, y) => tbody.querySelector(`[data-line='${x}'][data-cell='${y}']`);

const renderCell = (cell, value) => {
  cell.textContent = value;
};

const renderWin = (win, value) => {
  win.textContent = '';
  win.textContent = value;
};

const render = (elements, path, value) => {
  const { currentStep, tbody, win } = elements;
  if (path === 'player') {
    renderPlayer(currentStep, value);
  }
  if (path.includes('field')) {
    const x = path.split('.')[1];
    const y = path.split('.')[2];
    renderCell(getCell(tbody, x, y), value);
  }
  if (path === 'win') {
    renderWin(win, value);
  }
};

export default render;
