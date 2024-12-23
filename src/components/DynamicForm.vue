<template>
    <div class="flex flex-col items-center justify-center py-8">
        <div class="flex justify-center bg-gray-100 border-2 rounded-lg p-3 w-1/4 h-auto shadow-lg">
            <div class="w-5/6">
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

                <!-- <div>
                    <label class="block">Hobbies </label>
                    <input class="border-2 rounded-lg h-9 w-full shadow-lg" type='text' v-model="newHobby" required>
                    <button class="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 "
                        @click="addHobby">Add</button>
                    <ul>
                        <li v-for="(hobby, index) in formData.hobby" :key="index">{{ hobby }}
                            <button class="text-red-500 hover:text-red-700" @click="removeHobby(hobby)">X</button>
                        </li>
                    </ul>
                </div> -->
                <div class="text-center">

                    <!-- <RouterLink to="/register-next"> -->
                    <button class="px-4 py-2 mt-3 bg-green-500 text-white rounded-lg hover:bg-green-600 "
                        :disabled="!formValid" @click="postUser" type="submit">Save</button>
                    <!-- </RouterLink> -->
                </div>
            </div>
        </div>
        <!-- <div class="mt-12 px-8 border-2 rounded-lg bg-gray-100 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-700 mb-4 text-center">Saved Users</h2>
            <div v-for="(user, index) in users" :key="index">
                <p class="text-base text-gray-700">Name: {{ user.name }}</p>
                <p class="text-base text-gray-700">Email: {{ user.email }}</p>
            </div>
        </div> -->

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import axios from 'axios'
import { ref, computed } from 'vue'
import RegistrationForm from './RegistrationForm.vue';
// const imgSrc = ref(null)
const router = useRouter();
const formSchema = ref([
    { name: 'username', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    {
        name: 'usertype',
        label: 'User Type',
        type: 'select',
        options: [
            { label: 'Student', value: 'student' },
            { label: 'Teacher', value: 'teacher' },
            { label: 'Administration', value: 'administration' }
        ]
    }
    // { name: 'phone', label: 'Phone', type: 'number' },
    // { name: 'comment', label: 'Comment', type: 'textarea' },
    // {
    //     name: 'gender', label: 'Gender', type: 'radio', options: [
    //         { label: 'male', value: 'male' },
    //         { label: 'female', value: 'female' }
    //     ]
    // },
])
const formData = ref({
    username: '',
    email: '',
    password: '',
    usertype: ''
    // phone: '',
    // comment: '',
    // hobby: [],
    // gender: ''
})

const users = ref([])
const newHobby = ref('')
const formValid = computed(() => {
    return (
        formData.value.username !== '' &&
        formData.value.email !== ''
        // formData.value.phone !== '' &&
        // formData.value.comment !== '' &&
        // formData.value.gender !== '' &&
        // formData.value.hobby !== '' &&
        // isPhoneValid.value === true
    );
});
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/;
const isEmailValid = computed(() => {
    return emailRegex.test(formData.value.email);
});
const isPhoneValid = ref(true)
// const isEmailValid = ref(false)

function addHobby() {
    formData.value.hobby.push(newHobby.value)
    newHobby.value = ''
}
function removeHobby(hobby) {
    formData.value.hobby = formData.value.hobby.filter(h => h !== hobby)
}

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
// function handleSubmit() {
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
//   }
</script>
