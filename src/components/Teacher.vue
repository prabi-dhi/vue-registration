<template>
    <div>
        <div class="flex justify-center items-center p-5 ">
            <div v-if="teachers.length > 0">
                <table class="w-full table-auto border rounded-lg">
                    <thead class="bg-gray-300">
                        <tr>
                            <th class="px-8 py-2">Teacher Name</th>
                            <th class="px-8">Email</th>
                            <th class="px-8">Subject</th>
                            <th class="px-8">Action</th>
                        </tr>
                    </thead>
                    <tbody class="bg-gray-200">
                        <tr v-for="teacher in teachers">
                            <td class="px-8 py-2">{{ teacher.teacher_name }}</td>
                            <td class="px-8">{{ teacher.user_email }}</td>
                            <td class="px-8">{{ teacher.subject }}</td>
                            <td class="px-8"><button @click="deleteTeacher(teacher.id)"
                                    class="text-red-500 hover:text-red-700">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else> There are no teachers available.</div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';
const teachers = ref([])
onMounted(() => {
    axios.get('http://127.0.0.1:8000/teacher/')
        .then(response => {
            console.log(response.data)
            teachers.value = response.data;
        })
        .catch(e => {
            console.error("Error fetching teachers data", e);
        });
});

const deleteTeacher = (teacherId) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
        axios.delete(`http://127.0.0.1:8000/teacher/delete/${teacherId}`)
            .then(() => {
                teachers.value = teachers.value.filter(teacher => teacher.id !== teacherId);
            })
            .catch((error) => {
                console.error("There was an error deleting the teacher:", error);
            });
    }
};
</script>