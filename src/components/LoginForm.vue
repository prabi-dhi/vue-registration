<template>
    <div class="flex flex-col items-center justify-center py-8">
        <div class="flex-col justify-center bg-gray-100 border-2 rounded-lg p-3 w-1/4 h-auto shadow-lg">
            <h1 class="text-2xl font-semibold text-gray-700 mb-6 text-center">LoginForm</h1>
            <div class="flex flex-col items-center justify-center ">
                <label class="block">Username </label>
                <input class="border-2 rounded-lg h-9 w-5/6 shadow-lg" type='text' v-model="formData.username" required>
            </div>
            <div class="flex flex-col items-center justify-center py-5">
                <label class="block">Password </label>
                <input class="border-2 rounded-lg h-9 w-5/6 shadow-lg" type='password' v-model="formData.password"
                    required>
            </div>
            <div class="text-center">
                <button class="px-4 py-2 mt-3 bg-green-500 text-white rounded-lg hover:bg-green-600 " @click="LoginUser"
                    type="submit">Login</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
const router = useRouter();

const formData = ref({
    username: '',
    password: ''
})
// const username = ref('')
// const password = ref('')
const errorMessage = ref('')
async function LoginUser() {
    try {
        console.log(formData.value)
        // axios.post('http://127.0.0.1:8000/api/token/')
        const response = await axios.post('http://127.0.0.1:8000/api/token/', formData.value)
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        console.log("Logged in successfully")
        router.push('/home')
        errorMessage.value = ''
    }
    catch (error) {
        if (error.response) {
            errorMessage.value = 'Invalid username or password';
        } else {
            errorMessage.value = 'An error occurred. Please try again later';
        }
    }
}
</script>