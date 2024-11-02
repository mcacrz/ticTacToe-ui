<template>
  <div
    :data-test="props.id"
    :class="{position: true, font: true, highlight: props.showClass}"
    @click="props.clickFunction"
    :id="props.id"
  >
    <slot></slot>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const props = defineProps(['id', 'showClass', 'clickFunction']);
</script>