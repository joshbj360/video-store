<template>
    <div class="text-center text-[28px] mb-4 font-bold">Sign up</div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Full name"
            v-model:input="name"
            inputType="text"
            :autoFocus="true"
            :error="errors && errors.name ? errors.name[0] : ''"
        />
    </div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Email address"
            v-model:input="email"
            inputType="email"
            :error="errors && errors.email ? errors.email[0] : ''"
        />
    </div>

    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Password"
            v-model:input="password"
            inputType="password"
            :error="errors && errors.password ? errors.password[0] : ''"
        />
    </div>
    <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

    <div class="px-6 pb-2 mt-6">
        <button 
            :disabled="(!name || !email || !password)"
            :class="(!name || !email || !password) ? 'bg-gray-200' : 'bg-[#F02C56]'"
            @click="register()" 
            class="w-full text-[17px] font-semibold text-white bg-[#F02C56] py-3 rounded-sm"
        >
            Sign up
        </button>
    </div>
</template>

<script setup>
const { $userStore, $generalStore } = useNuxtApp()

let name = ref(null)
let email = ref(null)
let password = ref(null)
let errors = ref(null)

const register = async () => {
    errors.value = null

    try {
        await $userStore.register({
            name: name.value,
            email: email.value,
            password: password.value,
        })
        await $userStore.getUser()
        await $generalStore.getRandomUsers('suggested')
        await $generalStore.getRandomUsers('following')
        $generalStore.isLoginOpen = false
    } catch (error) {
        console.log(error)
        errors.value = error.message
    }
}
</script>