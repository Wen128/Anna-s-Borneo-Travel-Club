<template>
    <div>
        <h1 class="text-2xl font-bold text-blue-700">Dashboard</h1>

        <div class="flex w-full my-5">
            <div class="bg-green-200 w-full h-28 rounded-lg px-3 py-2 mr-4 shadow-md flex flex-col justify-around">
                <p class="text-gray-600">Total Members</p>
                <h1 class="mb-2 text-gray-800 font-bold text-4xl">{{totalMembers}}</h1>
            </div>
            <div class="bg-blue-200 w-full h-28 rounded-lg px-3 py-2 mr-4 shadow-md flex flex-col justify-around">
                <p class="text-gray-600">Total Employees</p>
                <h1 class="mb-2 text-gray-800 font-bold text-4xl">{{totalEmployees}}</h1>
            </div>
            <div class="bg-orange-200 w-full h-28 rounded-lg px-3 py-2 mr-4 shadow-md flex flex-col justify-around">
                <p class="text-gray-600">Total Reservations</p>
                <h1 class="mb-2 text-gray-800 font-bold text-4xl">{{totalReservations}}</h1>
            </div>
            <div class="bg-red-200 w-full h-28 rounded-lg px-3 py-2 mr-4 shadow-md flex flex-col justify-around">
                <p class="text-gray-600">Total Revenue</p>
                <h1 class="mb-2 text-gray-800 font-bold text-4xl">RM{{totalRevenue}}</h1>
            </div>
        </div>

        <h1 class="text-xl font-bold text-blue-700 mt-10">Top Reserved Attractions</h1>

        <div class="grid grid-cols-7 w-full mb-1 mt-3 font-semibold text-gray-500">
            <h1 class="col-span-2 px-3">Name</h1>
            <h1 class="col-span-3">Description</h1>
            <h1>Entry Fees</h1>
            <h1>Number of Reservation</h1>
        </div>

        <div v-for="attraction in topAttractions" class="grid grid-cols-7 w-full h-20 bg-white mb-4 content-center px-3 shadow-lg shadow-gray-100 rounded-md">
            <div class="col-span-2 flex items-center">
                <div class="flex flex-col">
                <h1 class="font-semibold">
                    {{ attraction.Name }}
                </h1>

                </div>
            </div>
            
            <div class="col-span-3 flex items-center">
                {{ attraction.Description }}
            </div>

            <div class="flex items-center">
                RM{{ attraction.EntryFees }}
            </div>

            <div class="flex items-center">
                {{ attraction.NumberofReservation }}
            </div>


        </div>

        <div class="w-1/3">
            <h1 class="text-xl font-bold text-blue-700 mt-10 mb-6">Membership Distribution</h1>
            <canvas id="membershipPieChart" width="20" height="20"></canvas>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, render } from 'vue';
import axios  from 'axios';
import { Chart, registerables } from 'chart.js';


// Register components for Chart.js
Chart.register(...registerables);

    //for top section
    const totalMembers = ref(0);
    const totalEmployees = ref(0);
    const totalReservations = ref(0);
    const totalRevenue = ref(0);

    //for chart
    const totalFree = ref(0);
    const totalPremium = ref(0);


    const topAttractions = ref([])

    const getTotalMembers = async () => {
        await axios.get('http://localhost:3000/members')
        .then(
            (response) => {
            totalMembers.value = response.data.length;
            totalFree.value = response.data.filter(member => member.MembershipType == 'free').length;
            totalPremium.value = response.data.filter(member => member.MembershipType == 'premium').length;

            console.log(totalFree.value)
            console.log(totalPremium.value)
        renderPieChart();

            }
        )
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    const getTotalEmployees = () => {
        axios.get('http://localhost:3000/employees')
        .then((response) => totalEmployees.value = response.data.length).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    const getTotalReservation = () => {
        axios.get('http://localhost:3000/reservations')
        .then((response) => totalReservations.value = response.data.length).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    const getTotalRevenue = () => {
        axios.get('http://localhost:3000/reservations').
        then((response) => {
            const data = response.data; // Assuming data.value contains an array of objects
            const totalCostSum = data.reduce((sum, item) => sum + (parseFloat(item.TotalCost) || 0), 0);
            totalRevenue.value = totalCostSum;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    };

    const getTopAttraction = () => {
    axios.get('http://localhost:3000/attractions')
        .then((response) => {
            const data = response.data;
            // Sort the data by NumberOfReservation in descending order and take the top 5
            topAttractions.value = data
                .sort((a, b) => b.NumberofReservation - a.NumberofReservation)
                .slice(0, 5);
            console.log(topAttractions.value); // Output the top 5 attractions
        })
        .catch((error) => {
            console.error('Error fetching attractions:', error);
        });
};


    const renderPieChart = () => {
      const ctx = document.getElementById('membershipPieChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Free Members', 'Premium Members'],
          datasets: [
            {
              data: [totalFree.value, totalPremium.value],
              backgroundColor: ['#3e62ab', '#57a2d7'], // Colors for the segments
              hoverBackgroundColor: ['#34569c', '#4787b4'], // Colors on hover
            },
          ],
        },
        options: {
        width: 10,
        height: 10,
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        },
      })
    };


    onMounted(()=> {
        getTotalMembers();
        getTotalEmployees();
        getTotalReservation();
        getTotalRevenue();

        getTopAttraction();
    })
</script>