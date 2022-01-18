<template>
  <div class="container-fluid d-flex flex-column justify-content-center vh-100">
    <GradeEntryComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GradeEntryComponent from './components/GradeEntryComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    GradeEntryComponent
  }
});
</script>

<style>
  body {
    background-color:beige;
  }
</style>