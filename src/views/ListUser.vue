<script setup>


</script>

<template>
    <div class="bg-cover">
        <div class="w-full rounded-lg p-100 justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-10">
            <div class="bg-white rounded-xl p-7 shadow-lg text-left">

                <table>
                    <thead class="text-sm font-bold text-gray-700 uppercase bg-gray-50 w-full">
                        <th scope="col" class="px-3 py-3 w-1/3">Name</th>
                        <th class="px-3 py-3 w-1/3">Email</th>
                        <th class="px-3 py-3 w-1/3">Role</th>
                    </thead>
                    <tbody>
                        <tr class="bg-white text-sm border-b">
                            <th scope="row" class="px-3 py-3 w-1/3">Test</th>
                            <th class="px-3 py-3 w-1/3">Test</th>
                            <th class="px-3 py-3 w-1/3">Student</th>
                            <th>
                                <router-link :to="{ name: 'editUser' }">

                                    <svg width="1em" height="1em" viewBox="0 0 16 16">
                                        <g fill="none" stroke="currentColor" strokeLinecap="round"
                                            strokeLinejoin="round" strokeWidth="1.5">
                                            <circle cx="8" cy="2.5" r=".75"></circle>
                                            <circle cx="8" cy="8" r=".75"></circle>
                                            <circle cx="8" cy="13.5" r=".75"></circle>
                                        </g>
                                    </svg>
                                </router-link>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<style>
</style>
