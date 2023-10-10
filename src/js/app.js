import onChange from 'on-change';
import render from './view';

const initState = () => ({
  player: null,
  step: 0,
  win: null,
  field: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
});

const initElements = () => ({
  tbody: document.querySelector('tbody'),
  currentStep: document.querySelector('#currentStep'),
  win: document.querySelector('#win'),
});

const updateStep = (state, currentStep) => {
  switch (currentStep) {
    case 'X':
      state.player = 'O';
      break;
    case 'O':
      state.player = 'X';
      break;
    default:
      throw new Error(`Unknown step ${currentStep}`);
  }
};

const updateCellFromField = (state, x, y) => {
  const { field } = state;
  if (typeof field[x][y] === 'number') {
    field[x][y] = state.player;
    updateStep(state, state.player);
  }
};

const isWin = (field, step) => {
  const checks = [
    `${field[0][0]}${field[0][1]}${field[0][2]}`,
    `${field[1][0]}${field[1][1]}${field[1][2]}`,
    `${field[2][0]}${field[2][1]}${field[2][2]}`,
    `${field[0][0]}${field[1][0]}${field[2][0]}`,
    `${field[0][1]}${field[1][1]}${field[2][1]}`,
    `${field[0][2]}${field[1][2]}${field[2][2]}`,
    `${field[0][0]}${field[1][1]}${field[2][2]}`,
    `${field[0][2]}${field[1][1]}${field[2][0]}`,
  ];

  for (let i = 0; i < checks.length; i += 1) {
    const check = checks[i];
    if (check === 'XXX') {
      return 'Победил X';
    }
    if (check === 'OOO') {
      return 'Победил O';
    }
  }
  if (step === 9) {
    return 'Ничья на барабане!';
  }
  return null;
};

const app = () => {
  const state = initState();
  const elements = initElements();
  const watcherState = onChange(
    state,
    (path, value) => render(elements, path, value, state.player),
  );
  watcherState.player = 'X';
  elements.tbody.addEventListener('click', (e) => {
    watcherState.step += 1;
    const { target } = e;
    const x = target.dataset.line;
    const y = target.dataset.cell;
    updateCellFromField(watcherState, x, y);
    watcherState.win = isWin(watcherState.field, watcherState.step);
    console.log(state.win);
  });
};

export default app;
