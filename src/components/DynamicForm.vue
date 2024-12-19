<template>

    <div class="flex flex-col items-center justify-center py-8 bg-neutral-50">
        <div class="flex justify-center bg-gray-100 border-2 rounded-lg p-3 w-1/3 h-auto shadow-lg">
            <div class="w-5/6">
                <h1 class="text-2xl font-semibold text-gray-700 mb-6 text-center">Register</h1>
                <div v-for="(field, index) in formSchema" :key="index">
                    <label class="block">{{ field.label }}</label>
                    <!-- <input class="border-2 rounded-lg h-9 w-full" name="name" type="type"
                        v-model="formData[field.name]"> -->
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
                    <div v-else>
                        <input class="border-2 rounded-lg h-9 w-full shadow-lg" :name="field.name" :type="field.type"
                            v-model="formData[field.name]" />
                    </div>
                </div>
                <div>
                    <label class="block">Hobbies </label>
                    <input class="border-2 rounded-lg h-9 w-full shadow-lg" type='text' v-model="newHobby" required>
                    <button class="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 "
                        @click="addHobby">Add</button>
                    <ul>
                        <li v-for="(hobby, index) in formData.hobby" :key="index">{{ hobby }}
                            <button class="text-red-500 hover:text-red-700" @click="removeHobby(hobby)">X</button>
                        </li>
                    </ul>
                </div>
                <div class="text-center">
                    <button class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 "
                        @click="handleSubmit" type="submit" :disabled="!formValid">Save</button>


                </div>
            </div>
        </div>
        <div class="mt-12 px-8 border-2 rounded-lg bg-gray-100 shadow-lg">
            <h2 class="text-xl font-semibold text-gray-700 mb-4 text-center">Saved Users</h2>
            <div v-for="(user, index) in users" :key="index">
                <p class="text-base text-gray-700">Name: {{ user.name }}</p>
                <p class="text-base text-gray-700">Email: {{ user.email }}</p>
                <p class="text-base text-gray-700">Phone: {{ user.phone }}</p>
                <p class="text-base text-gray-700">Comment: {{ user.comment }}</p>
                <p class="text-base text-gray-700">Gender: {{ user.gender }}</p>
                <p class="text-base text-gray-700">Hobbies: {{ user.hobby.join(', ') }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['infoucus', 'submit'])
const formSchema = ref([
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'number' },
    { name: 'comment', label: 'Comment', type: 'textarea' },
    {
        name: 'gender', label: 'Gender', type: 'radio', options: [
            { label: 'male', value: 'male' },
            { label: 'female', value: 'female' }
        ]
    },
])
const formData = ref({
    name: '',
    email: '',
    phone: '',
    comment: '',
    hobby: [],
    gender: ''
})

const users = ref([])
const newHobby = ref('')
const formValid = computed(() => {
    return (
        formData.value.name !== '' &&
        formData.value.email !== '' &&
        formData.value.phone !== '' &&
        formData.value.comment !== '' &&
        formData.value.hobby !== ''
    );
});
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/;
function addHobby() {
    formData.value.hobby.push(newHobby.value)
    newHobby.value = ''
}
function removeHobby(hobby) {
    formData.value.hobby = formData.value.hobby.filter(h => h !== hobby)
}
function handleSubmit() {
    if (!emailRegex.test(formData.value.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!phoneRegex.test(formData.value.phone)) {
        alert('Phone number must be 10 digits.');
        return;
    }
    users.value.push({
        ...formData.value

    })
    emit('submit')
    formData.value = {
        name: '',
        email: '',
        phone: '',
        comment: '',
        hobby: [],
        gender: ''
    }
}
</script>
