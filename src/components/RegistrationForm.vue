<template>
    <div>
        <h1> Registration</h1>
        <div>
            <div>
                <label>Name: </label>
                <input type='text' v-model="user.name" placeholder="name" required>
            </div>
            <div>
                <label>Email: </label>
                <input type='email' v-model="user.email" required placeholder="email">
            </div>
            <div>
                <label>Phone Number: </label>
                <input type='number' v-model="user.phone" required placeholder="phone number" @input="validateNumber"
                    :class="{ 'invalid': !isPhonevalid }" />
                <p v-if="!isPhoneValid" style="color: red;">Phone number must be exactly 10 digits</p>

            </div>
            <div>
                <label>Comment: </label>
                <input type='textarea' v-model="user.comment" required placeholder="comment">
            </div>
            <div>
                <label>Hobby: </label>
                <input type='text' v-model="newHobby" required>
                <button @click="addHobby">Add</button>
                <ul>
                    <li v-for="(hobby, index) in user.hobby" :key="index">{{ hobby }}
                        <button @click="removeHobby(hobby)">X</button>
                    </li>
                </ul>
            </div>
            <!-- <div>
                <p>Age:</p>
                <input type="radio">
                <label>0-17</label>
                <input type="radio">
                <label>18-above</label>
            </div> -->
            <button @click="addUser" :disabled="!formValid" type="submit">Save</button>
        </div>
        <h2>Saved Users:</h2>
        <div v-for="(user, index) in users" :key="index">
            <p>user no.: {{ index + 1 }}</p>
            <p>Name: {{ user.name }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Phone Number: {{ user.phone }}</p>
            <p>Comment: {{ user.comment }}</p>
            <p>Hobby: {{ user.hobby }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const user = ref({
    name: '',
    email: '',
    phone: '',
    comment: '',
    hobby: []
})
const isPhoneValid = ref(true)
const users = ref([])
const newHobby = ref('')
const formValid = computed(() => {
    return (
        user.value.name !== '' &&
        user.value.email !== '' &&
        user.value.phone !== '' &&
        user.value.comment !== '' &&
        isPhoneValid.value
    );
});
function addUser() {
    users.value.push({ ...user.value })
    user.value.name = ''
    user.value.email = ''
    user.value.phone = ''
    user.value.comment = ''
    user.value.hobby = []
}
function addHobby() {
    user.value.hobby.push(newHobby.value)
    newHobby.value = ''
}
function removeHobby(hobby) {
    user.value.hobby = user.value.hobby.filter(h => h !== hobby)
}
function validateNumber() {
    const phone = user.value.phone
    const regex = /^[0-9]{10}$/
    isPhoneValid.value = regex.test(phone)
}
</script>

<style>
div {
    padding: 5px;
}
</style>