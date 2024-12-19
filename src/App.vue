<template>
    <Navigation />
    <!-- <DynamicForm @submit="handleSubmit" /> -->
    <RouterView />
</template>
<script setup>
import DynamicForm from './components/DynamicForm.vue';
import Navigation from './components/Navigation.vue';
// function handleSubmit() {
//     console.log("form is saved")
// }
</script>