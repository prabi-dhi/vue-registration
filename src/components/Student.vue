<template>
    <div>
        <div class="flex justify-center items-center p-5 ">
            <div v-if="students.length > 0">
                <table class="w-full table-auto border rounded-lg">
                    <thead class="bg-gray-300">
                        <tr>
                            <th class="px-8 py-2">Student Name</th>
                            <th class="px-8">Class Enrolled</th>
                            <th class="px-8">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-gray-200">
                        <tr v-for="student in students" :key="student.id">
                            <td class="px-8 py-2">{{ student.student_name }}</td>
                            <td class="px-8">{{ student.class_enrolled }}</td>
                            <td class="px-8"><button @click="editStudent(student)"
                                    class="text-green-500 hover:text-green-700">Edit</button>
                                <button @click="deleteStudent(student.id)"
                                    class="px-5 text-red-500 hover:text-red-700">Delete</button>

                            </td>

                        </tr>
                    </tbody>
                </table>
                <!-- <div v-if="editMode">
                    <h3>Edit Student</h3>
                    <form @submit.prevent="updateStudent">
                        <label for="student_name">Student Name</label>
                        <input type="text" id="student_name" v-model="studentToEdit.student_name" required />

                        <label for="class_enrolled">Class Enrolled</label>
                        <input type="text" id="class_enrolled" v-model="studentToEdit.class_enrolled" required />

                        <button type="submit">Save </button>
                        <button type="button" @click="cancelEdit">Cancel</button>
                    </form>
                </div> -->
            </div>
            <div v-else> There are no students available</div>

        </div>
    </div>
</template>


<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';
const students = ref([]);
// const loading = ref(true);

const editMode = ref(false);
const studentToEdit = ref({
    id: null,
    student_name: '',
    class_enrolled: ''
});
// onMounted(() => {
//     axios.get('http://127.0.0.1:8000/student/')
//         .then(response => {
//             console.log(response.data)
//             students.value = response.data;
//         })
//         .catch(e => {
//             console.error("Error fetching students data", e);
//         });
// });

const fetchStudents = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/student/')
        console.log(response.data)
        students.value = response.data;
    } catch (e) {
        console.error("Error fetching students data", e);
    }
}

onMounted(() => {
    fetchStudents();
});

const deleteStudent = async (id) => {
  try {   
    const token = localStorage.getItem('access_token');
    await axios.delete(`http://127.0.0.1:8000/student/delete/${id}/`,{
        headers: {
        'Authorization': `Bearer ${token}` 
    }
    });

    students.value = students.value.filter(student => student.id !== id);
    
    console.log(`Student with ID ${id} deleted successfully.`);
  } catch (e) {
    console.error("Error deleting student", e);
  }
};


</script>