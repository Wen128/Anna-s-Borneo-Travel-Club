<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <div class="flex ">
    <div class="flex flex-col w-80 min-h-screen fixed top-0 left-0 bg-[#4B34A8] text-white px-2 text-lg font-semibold rounded-tr-3xl">

      <img src="/img/logo.png" alt="logo">

     <RouterLink to="/" class="w-full p-2 hover:bg-violet-900  my-1 rounded-md">Home</RouterLink>
     <RouterLink to="/members" class="w-full p-2 hover:bg-violet-900  my-1 rounded-md">Members</RouterLink>
     <RouterLink to="/employees" class="w-full p-2 hover:bg-violet-900  my-1 rounded-md">Employees</RouterLink>
     <RouterLink to="/attractions" class="w-full p-2 hover:bg-violet-900  my-1 rounded-md">Attractions</RouterLink>
     <RouterLink to="/locations" class="w-full p-2 hover:bg-violet-900  my-1 rounded-md">Locations</RouterLink>
     <RouterLink to="/reservations" class="w-full p-2 hover:bg-violet-900  my-1 rounded-md">Reservations</RouterLink>
    </div>
    <div class="p-6 bg-gray-50 w-full h-screen">

      <RouterView class="ml-80 pb-6"/>
    </div>
  </div>
</template>
