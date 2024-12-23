<template>
    <div>
        Thank you for registering.
        <!-- <ul v-if="users">
            <li v-for="user in users">
                <p>{{ user.username }}</p>
            </li>
        </ul> -->
    </div>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';
const users = ref([])
onMounted(() => {
    axios.get('http://127.0.0.1:8000/user/')
        .then(response => {
            users.value = response.data;
        })
        .catch(e => {
            console.error(e);
        });
});

</script>