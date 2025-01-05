<script setup>
import { ref, onMounted, toRaw } from 'vue';
import axios from 'axios';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-responsive';
import 'datatables.net-select';

DataTable.use(DataTablesCore);

// Reactive data for the table
const data = ref([]);

// Columns definition (without the actions column)
const columns = [
  { data: 'MemberID', title: 'Member ID' },
  { data: 'EmployeeID', title: 'Employee ID' },
  { data: 'AttractionID', title: 'Attraction ID' },
  { data: 'Date', title: 'Date' },
  { data: 'Time', title: 'Time' },
  { data: 'NumberOfVisitors', title: 'Number Of Visitors' },
  { data: 'TotalCost', title: 'Total Cost' },
  { data: null, render: '#actions', title: 'Actions' }, // Add this column for actions
];

// Table options
const options = {
  layout: {
    topStart: 'buttons',
  },
  responsive: true,
  select: true,
};

// Reactive state for the sidebar
const showSidebar = ref(false);


// Initialize selectedReservation as an empty object
const selectedReservation = ref(null);  
const editReservation = ref({});

// State for showing delete confirmation
const showDeleteConfirm = ref(false);
const reservationToDelete = ref(null);

const edit = ref(false);

// Fetch data from the API when the component is mounted
onMounted(() => {
  axios
    .get('https://anna-s-borneo-travel-club.onrender.com/reservations') // Update with your actual API endpoint
    .then((response) => {
      data.value = response.data; // Update the data with the API response
      console.log(data.value);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});

// Function to add a new reservation (for POST request)
const addReservation = () => {
  console.log(editReservation.value); // Log the object directly for debugging
  axios
    .post('https://anna-s-borneo-travel-club.onrender.com/reservations', editReservation.value) // No need to stringify
    .then((response) => {
      console.log(response);
      data.value.push(editReservation.value);
      showSidebar.value = false;
    })
    .catch((error) => {
      console.error('Error adding reservation:', error);
    });
};


// Function to update an existing reservation (for PUT request)
const updateReservation = () => {
  axios
    .put(`https://anna-s-borneo-travel-club.onrender.com/reservations/${selectedReservation.value}`, editReservation.value)
    .then(() => {
      const index = data.value.findIndex(
        (reservation) => reservation.ReservationID === selectedReservation.value
      );
      data.value[index] = editReservation.value;
      showSidebar.value = false;
      console.log(editReservation.value)
    })
    .catch((error) => {
      console.error('Error updating reservation:', error);
    });
};

// Function to delete reservation (for DELETE request)
const deleteReservation = () => {
  axios
    .delete(`https://anna-s-borneo-travel-club.onrender.com/reservations/${reservationToDelete.value}`)
    .then(() => {
      data.value = data.value.filter((reservation) => reservation.ReservationID !== reservationToDelete.value);
      showDeleteConfirm.value = false;
      reservationToDelete.value=null
    })
    .catch((error) => {
      console.error('Error deleting member:', error);
    });
};

// Handle edit button click
const handleEdit = (reservation) => {
  console.log(reservation)
  selectedReservation.value = toRaw(reservation.cellData).ReservationID; 
  editReservation.value = data.value.find((reservation) => reservation.ReservationID == selectedReservation.value);
  console.log("editreservation", editReservation.value)
  showSidebar.value = true;
  edit.value = true;
};

// Handle delete button click
const handleDelete = (reservation) => {
  reservationToDelete.value = toRaw(reservation.cellData).ReservationID;
  showDeleteConfirm.value = true;
  console.log(memberToDelete.value);
};

// Handle cancel delete
const cancelDelete = () => {
  showDeleteConfirm.value = false;
};
</script>

<template>
  <div>
    <div class="w-full flex justify-between">
      <h1 class="text-2xl font-bold text-blue-700">Reservations List</h1>
      <!-- Add Reservation Button -->
      <button @click="showSidebar = true, edit=false" class="btn btn-primary cursor-pointer mb-4 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Reservation</button>

    </div>

    <!-- DataTable -->
     <div class="overflow-x-auto">
       <DataTable
         :columns="columns"
         :options="options"
         :data="data"
         class="display wrap w-full overflow-x-auto"
         width="100%"
       >
       <template #actions="item">
   
         <!-- Edit Button -->
         <button @click="handleEdit(item)" class="btn btn-warning mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

         </button>
         <!-- Delete Button -->
         <button @click="handleDelete(item)" class="btn btn-danger">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

         </button>
   
   </template>
       </DataTable>

     </div>

    <!-- Sidebar for Add/Update -->
    <div class="sidebar" v-show="showSidebar">
      <div class="sidebar-content">
        <h3 class="mb-4">{{ edit ? 'Edit Reservation' : 'Add Reservation' }}</h3>
        <form @submit.prevent="edit ? updateReservation() : addReservation()">
          <label for="MemberID">Member ID</label>
          <input v-model="editReservation.MemberID" id="MemberID" type="text" required />

          <label for="EmployeeID">Employee ID</label>
          <input v-model="editReservation.EmployeeID" id="EmployeeID" type="text" required />

          <label for="AttractionID">Attraction ID</label>
          <input v-model="editReservation.AttractionID" id="AttractionID" type="text" required />

          <label for="Date">Date</label>
          <input v-model="editReservation.Date" id="Date" type="date" required />

          <label for="Time">Time</label>
          <input v-model="editReservation.Time" id="Time" type="time" required />

          <label for="NumberOfVisitors">Number Of Visitors</label>
          <input v-model="editReservation.NumberOfVisitors" id="NumberOfVisitors" type="text" required />

          <label for="TotalCost">Total Cost</label>
          <input v-model="editReservation.TotalCost" id="TotalCost" type="text" required />



          <div class="flex justify-between">

            <button type="submit" class="flex-1 btn btn-primary bg-blue-400 py-3 rounded-md hover:bg-blue-500 hover:text-white mr-2">Save</button>
            <button @click="showSidebar = false, edit=false" type="button" class="flex-1 btn btn-secondary bg-gray-200 py-3 rounded-md hover:bg-gray-500 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Popup -->
<div v-show="showDeleteConfirm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white rounded-lg shadow-lg p-6 w-80">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to delete this Reservation?</h3>
    <div class="flex justify-end space-x-4">
      <button @click="deleteReservation" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200">
        Yes, Delete
      </button>
      <button @click="cancelDelete" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200">
        Cancel
      </button>
    </div>
  </div>
</div>
  </div>
</template>

<style>
@import 'datatables.net-dt';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-responsive-dt';
@import 'datatables.net-select-dt';
</style>

<style scoped>
/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  right: 350px;
  width: 350px;
  height: 100%;
  background-color: white;
  box-shadow: -4px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
}
.sidebar-content {
  max-height: 90%;
  overflow-y: auto;
}
.sidebar.show {
  transform: translateX(0);
}
.sidebar input {
  display: block;
  margin-bottom: 15px;
  padding: 8px;
  width: 100%;
  background-color: rgb(245, 244, 244);
  border-radius: 10px;
}

.sidebar input:focus{
  outline-color: aliceblue;
  background-color: aliceblue;
  
}

.sidebar button {
  margin-top: 10px;
}

/* Confirmation Popup */
.confirmation-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.popup-content button {
  margin: 5px;
}
</style>
