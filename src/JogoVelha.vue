<template>
  <div class="form">
    <div class="players">
      <div>
        <h3>Jogador 1</h3>
        <select data-test="p1Symbol" v-model="p1Symbol">
          <option value="X" selected>X</option>
          <option value="O">O</option>
        </select>
      </div>
      <div>
        <h3>Jogador 2</h3>
        <select data-test="p2Symbol" v-model="p2Symbol">
          <option value="X" selected>X</option>
          <option value="O">O</option>
        </select>
      </div>
    </div>
    <button ref="startButton" data-test="startButton" @click="startGame()">COMEÇAR</button>
  </div>
  <div class="board">
    <div class="line" v-for="(line, lineIndex) in board" :key="lineIndex">
      <Square
        v-for="(position, positionIndex) in line"
        :key="positionIndex"
        :id="position.id"
        :showClass="highlightPositions[position.id]"
        :clickFunction="clickHandler"
      >
        {{ positions[position.id] }}
      </Square>
    </div>
  </div>
  <div class="messages">{{ messages }}</div>
</template>

<script setup>
  //IMPORTS
  import { ref } from 'vue';
  import ticTacToe from '@mcacrz/tictactoe'
  import Square from './components/Square.vue';

  //PROPS
  const props = defineProps(['whoPlayFirst']);

  //STATIC VARIABLES
  const beginMessage = 'Escolha seu símbolo e então clique no botão COMEÇAR';

  const board = [
    [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }],
    [{ id: 'p4' }, { id: 'p5' }, { id: 'p6' }],
    [{ id: 'p7' }, { id: 'p8' }, { id: 'p9' }]
  ]

  //STATE VARIABLES
  const positions = ref({
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    p5: null,
    p6: null,
    p7: null,
    p8: null,
    p9: null,
  })

  const highlightPositions = ref({
    p1: false,
    p2: false,
    p3: false,
    p4: false,
    p5: false,
    p6: false,
    p7: false,
    p8: false,
    p9: false,
  });

  const p1Symbol = ref('X');
  const p2Symbol = ref('X');
  const playerTurn = ref(null);

  const messages = ref(beginMessage);

  const game = ref(null);

  const startButton = ref(null);

  const disable = ref(false);

  //SECONDARY FUNCTIONS
  const setMessage = (message = '') => messages.value = message;

  const newGame = () => game.value = ticTacToe();

  const disableStartButton = () => startButton.value.disabled = true;

  const cleanBoard = () => {
    for (let position in positions.value) {
      positions.value[position] = null;
    }
  }

  const clickHandler = (event) => {
    if(game.value !== null && !game.value.isFinish()) {
      movePlayer(event);
      return;
    }
  }

  const highlightWinnerRule = (rule) => {
    const highlight = (positions) => {
      for (const position of positions.values()) {
        highlightPositions.value[position] = true;
      }
    }
    const winnerRules = {
      'Horizontal Top' : () => highlight(['p1', 'p2', 'p3']),
      'Horizontal Middle' : () => highlight(['p4', 'p5', 'p6']),
      'Horizontal Bottom': () => highlight(['p7', 'p8', 'p9']),
      'Vertical Left' : () => highlight(['p1', 'p4', 'p7']),
      'Vertical Middle' : () => highlight(['p2', 'p5', 'p8']),
      'Vertical Right' : () => highlight(['p3', 'p6', 'p9']),
      'Diagonal Left Right' : () => highlight(['p1', 'p5', 'p9']),
      'Diagonal Right Left' : () => highlight(['p3', 'p5', 'p7'])
    }

    return winnerRules[rule]();
  }

  const downLightPositions = () => {
    for (let position in highlightPositions.value) {
      highlightPositions.value[position] = false;
    }
  }

  //PRIMARY FUNCTIONS
  const startGame = () => {
    if (p1Symbol.value === p2Symbol.value) return alert('O jogo não poderá iniciar enquanto cada jogador não escolher um símbolo diferente');

    cleanBoard();

    playerTurn.value = props.whoPlayFirst();

    setMessage(`Jogada do ${playerTurn.value}`);

    newGame();

    downLightPositions();

    disableStartButton();

    return true;
  }

  const movePlayer = (event) => {
    const playersSymbol = (playerTurn.value === 'P1') ? p1Symbol.value : p2Symbol.value;
    const position = event.target.id;
    
    if (positions.value[position] !== null || game.value === null) return;

    game.value.move(playersSymbol, position);

    positions.value[position] = playersSymbol;

    if (!game.value.isFinish()) {
      playerTurn.value = playerTurn.value === 'P1' ? 'P2' : 'P1';
      setMessage(`Jogada do ${playerTurn.value}`);
      return;
    }

    startButton.value.disabled = false;

    disable.value = true;

    if (game.value.isFinish().rule === 'Draw') {
      setMessage('O jogo empatou');
      return;
    }

    highlightWinnerRule(game.value.isFinish().rule);

    return setMessage(`O jogador ${playerTurn.value} venceu!`);
  }
</script>