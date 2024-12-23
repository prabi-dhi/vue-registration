<template>
    <div class="flex flex-col items-center justify-center py-8">
        <PopUp v-if="isPopupVisible" @submit="uploadFile" @close="closePopup"></PopUp>
        <div class="flex justify-center bg-gray-50 border-2 rounded-lg p-3 w-1/3 h-auto shadow-lg">
            <div class="text-center">
                <label class="block text-xl font-semibold text-gray-700 mt-5"> Upload Profile Picture</label>
                <input class="block py-5" type="file" ref="file" @change="handleFileChange">

                <button class="bg-green-500 hover:bg-green-600 mt-2 mb-5 py-2 px-10 rounded-xl text-white shadow-md"
                    type="button" @click="showPopup" :disabled="!formValid">
                    Submit
                </button>
            </div>
            <div v-if="imgSrc">
                <img :src="imgSrc" alt="Uploaded Image" class="w-32 h-32" />
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import PopUp from './PopUp.vue';
const filedata = ref(null)
const imgSrc = ref(null)
const isPopupVisible = ref(false)
function showPopup() {
    isPopupVisible.value = true
}
function closePopup() {
    isPopupVisible.value = false
}
// import { useRouter } from 'vue-router'

// const identity = ref([])
const props = defineProps({
    formData: Object
});
// const emit = defineEmits(['fileselected'])
function handleFileChange(event) {
    filedata.value = event.target.files[0]
    handleFileSelected(filedata.value)
}
function handleFileSelected(file) {
    const reader = new FileReader()
    reader.onload = () => {
        imgSrc.value = reader.result
    }
    reader.readAsDataURL(file)
}
function uploadFile(file) {
    // handleFileSelected(filedata.value)
    filedata.value = null
    imgSrc.value = null
    closePopup();
}
const formValid = computed(() => {
    return (
        imgSrc.value !== null)
})

// const formData = ref({})

// onMounted(() => {
//   // Access route state
//   formData.value = $route.state
// })
// const props = defineProps({
//   formData: {
//     type: Object,
//     required: true,
//   },
// });
</script>