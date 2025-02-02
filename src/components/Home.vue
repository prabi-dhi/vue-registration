<template>
    <div>
        <button @click="LogoutUser" class="btn-red mx-4">Logout</button>
        <div class="flex flex-col items-center justify-center h-screen">
            <div class="grid grid-cols-2 gap-10  w-4/6 h-4/6 text-center ">
                <div class="bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 ">
                    <h1 class="text-2xl font-bold">Check Students</h1>
                    <p class="mt-6 mb-4">Check out your students.</p>
                    <RouterLink to="/students"
                        class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
                        Browse Students
                    </RouterLink>
                </div>
                <div class="bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200 ">
                    <h1 class="text-2xl font-bold">Check Teachers</h1>
                    <p class="mt-6 mb-4">Check out your Teachers</p>
                    <RouterLink to="/teachers"
                        class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
                        Browse Teachers
                    </RouterLink>
                </div>
                <div class="bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200">
                    <h1 class="text-2xl font-bold">Check Grades</h1>
                    <p class="mt-6 mb-4">Check your students grade</p>
                    <RouterLink to="/grades"
                        class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
                        Browse Grades
                    </RouterLink>
                </div>
                <div class="bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-gray-200">
                    <h1 class="text-2xl font-bold">Check Subjects</h1>
                    <p class="mt-6 mb-4">Check Subjects</p>
                    <RouterLink to="/subjects"
                        class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
                        Browse Subjects
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

function LogoutUser() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    router.push('/login')
}
</script>