<template>
  <JogoVelha :whoPlayFirst="propFunction"/>
</template>

<script setup>
  import { ref } from 'vue';
  import JogoVelha from './JogoVelha.vue';

  const chooseWhoBegins = () => {
    let playerNumber = 0;
    
    while (playerNumber <= 0) { playerNumber = Math.floor(Math.random() * 3) };

    return (playerNumber === 1) ? 'P1' : 'P2';
  };

  const mockChooseWhoBegins = () => 'P1';

  const propFunction = ref(import.meta.env.VITE_ENVIRONMENT == 'production' ? chooseWhoBegins : mockChooseWhoBegins);
</script>