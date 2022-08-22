<script></script>
<template>
    <div
        class="bg-white rounded-xl shadow-lg w-2/9 flex flex-col justify-center items-center max-w-xl mx-auto p-5 mt-10">
        <form class="w-full max-w-xl mx-auto px-5">
            <div class="flex flex-wrap -mx-3 mb-1">
                <!-- Name   -->
                <div class="w-full px-3 mb-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                        Name
                    </label>
                    <input
                        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        id="grid-name" type="text" placeholder="Name - Surname" v-model="name"
                        v-on:keyup="countLengthName" required />
                    <div>
                        <p class="text-sm text-right pl-2" :class="
                            lengthOfWordName <= 100 ? 'text-green-600' : 'text-red-600'
                        ">
                            {{ lengthOfWordName }} Characters
                        </p>
                    </div>
                </div>
            </div>
            <!-- Email   -->
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full px-3 mb-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                        Email
                    </label>
                    <input
                        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        id="grid-email" type="text" placeholder="Email" v-model="email" v-on:keyup="countLengthEmail"
                        required />
                    <br />
                    <div>
                        <p class="text-sm text-right pl-2" :class="
                            lengthOfWordEmail <= 100 ? 'text-green-600' : 'text-red-600'
                        ">
                            {{ lengthOfWordEmail }} Characters
                        </p>
                    </div>
                </div>
            </div>
            <!-- role -->
            <div class="px-2 mb-3">
                <div class="flex -mx-2">
                    <div class="w-1/3">
                        <div class="h-12">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-category">
                                Role
                            </label>
                            <div class="relative">
                                <select
                                    class="inline-flex justify-center w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    v-model="categoryId" id="grid-category" required>
                                    <option value="" disabled selected hidden>
                                        Please select role
                                    </option>
                                    <option>
                                        Student
                                    </option>
                                    <option>
                                        Admin
                                    </option>
                                    <option>
                                        Lecturer
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-10">
                    <button
                        class="inline-block bg-red-500 hover:bg-red-700 rounded-full px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8">
                        Cancel
                    </button>
                    <button
                        class="inline-block bg-green-500 hover:bg-green-700 rounded-full px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
                        type="submit">
                        Update
                    </button>
                </div>
            </div>
        </form>
    </div>



</template>
<style>
</style>