<template>
    <div class="flex flex-col items-center justify-center py-8">
        <div class="flex justify-center bg-gray-100 border-2 rounded-lg p-3 w-1/4 h-auto shadow-lg">
            <div class="w-5/6">
                <p v-if="formValid" class="text-red-500 text-center">Please enter valild email</p>
                <h1 class="text-2xl font-semibold text-gray-700 mb-6 text-center">Register</h1>
                <div v-for="(field, index) in formSchema" :key="index">
                    <label class="block">{{ field.label }}</label>
                    <div v-if="field.type === 'radio'">
                        <div v-for="(option, index) in field.options" :key="index" class="inline-block mr-4">
                            <input type="radio" :value="option.value" v-model="formData.gender" :name="field.name"
                                :checked="formData.gender === option.value" />
                            <label :for="option.value">{{ option.label }}</label>
                        </div>
                    </div>
                    <div v-else-if="field.type === 'textarea'">
                        <textarea class="w-full shadow-lg" :name="field.name" v-model="formData.comment"></textarea>
                    </div>
                    <div v-else-if="field.type === 'select'">
                        <select class="border-2 rounded-lg h-9 w-full shadow-lg" v-model="formData[field.name]"
                            :name="field.name">
                            <option v-for="(option, index) in field.options" :key="index" :value="option.value">{{
                                option.label }}</option>
                        </select>
                    </div>
                    <div v-else>
                        <input class="border-2 rounded-lg h-9 w-full shadow-lg" :name="field.name" :type="field.type"
                            v-model="formData[field.name]" />
                    </div>

                </div>


                <div class="text-center">

                    <!-- <RouterLink to="/register-next"> -->
                    <button class="px-4 py-2 mt-3 bg-green-500 text-white rounded-lg hover:bg-green-600 "
                        :disabled="!formValid" @click="postUser" type="submit">Save</button>
                    <!-- </RouterLink> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import axios from 'axios'
import { ref, computed } from 'vue'
import RegistrationForm from './RegistrationForm.vue';
const router = useRouter();
const formSchema = ref([
    { name: 'username', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    {
        name: 'user_type',
        label: 'User Type',
        type: 'select',
        options: [
            { label: 'Student', value: 'STUDENT' },
            { label: 'Teacher', value: 'TEACHER' },
            { label: 'Administration', value: 'ADMINISTRATION' }
        ]
    }
])
const formData = ref({
    username: '',
    email: '',
    password: '',
    user_type: ''
})

const users = ref([])
const newHobby = ref('')
const formValid = computed(() => {
    return (
        formData.value.username !== '' &&
        formData.value.email !== '' &&
        formData.value.password !== '' &&
        formData.value.user_type !== ''
    );
});
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isEmailValid = computed(() => {
    return emailRegex.test(formData.value.email);
});
// const isPhoneValid = ref(true)

// function addHobby() {
//     formData.value.hobby.push(newHobby.value)
//     newHobby.value = ''
// }
// function removeHobby(hobby) {
//     formData.value.hobby = formData.value.hobby.filter(h => h !== hobby)
// }

function postUser() {
    console.log("Posting user data:", formData.value);

    axios.post('http://127.0.0.1:8000/register/', formData.value)
    .then(response => {
        console.log('User saved successfully:', response.data);
        router.push({ name: 'register-next', state: formData.value });
    })
    .catch(e => {
        console.error('Error saving user:', e);
    })
    
}
</script>
<!-- // function handleSubmit() {
//     if (!emailRegex.test(formData.value.email)) {
//         alert('Please enter a valid email address.');
//         return;
//     }
//     if (!phoneRegex.test(formData.value.phone)) {
//         alert('Phone number must be 10 digits.');
//         isPhoneValid.value = false

//     }
//     users.value.push({
//         ...formData.value

//     })
//     console.log(formData.value)
//     formData.value = {
//         username: '',
//         email: '',
//         // phone: '',
//         // comment: '',
//         // hobby: [],
//         // gender: ''
//     }
// }

// const router = useRouter()

// function handleSubmit() {
//   // Perform validation if needed and then navigate
//   if (formValid.value) {
//     router.push({
//       name: 'register-next',
//       state: formData.value
//     })
//   } -->
