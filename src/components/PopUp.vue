<template>
    <div>
        <div class="fixed inset-0 bg-opacity-20 bg-gray-700 flex justify-center items-center">
            <div class="bg-purple-100 rounded-3xl shadow-lg flex flex-col justify-between w-1/5 h-auto">
                <h1 class="text-center text-xl font-semibold text-gray-700 mt-5">Are you sure?</h1>
                <section class="px-4 py-6">
                    <p name="body" class="text-center"> Click 'yes' to complete registration. </p>
                </section>
                <div class="flex space-x-10 justify-center mb-4">
                    <RouterLink to="/showdata">
                        <button @click="handleYes"
                            class=" shadow-lg px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600">Yes</button>
                    </RouterLink>
                    <button @click="handleClose"
                        class=" shadow-lg px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import ShowData from './ShowData.vue';

const emit = defineEmits()
function handleYes() {
    emit('submit')
}
function handleClose() {
    emit('close')
}
</script>
