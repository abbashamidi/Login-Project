<template>
    <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="loginUser">
            <div>
                <label for="username">Username:</label>
                <input v-model="username" type="text" id="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input v-model="password" type="password" id="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import { useStore } from 'vuex'; // Import useStore to access Vuex

export default {
    name: 'LoginForm',
    setup() {
        const username = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const router = useRouter(); // Initialize router
        const store = useStore(); // Access the Vuex store

        // Computed property to get error message from Vuex store
        const vuexErrorMessage = computed(() => store.state.auth.errorMessage);

        const loginUser = async () => {
            try {
                // Dispatch the login action in Vuex
                await store.dispatch('loginUser', {
                    username: username.value,
                    password: password.value
                });

                errorMessage.value = 'Logged in successfully!';

                // Navigate to the dashboard after a delay (or directly)
                setTimeout(() => {
                    router.push({ name: 'Dashboard' });
                }, 2000);

            } catch (error) {
                errorMessage.value = vuexErrorMessage.value || 'Login failed: Invalid credentials';
            }
        };

        return {
            username,
            password,
            errorMessage,
            loginUser
        };
    }
};
</script>


<style scoped>
.login-form {
    width: 300px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    margin-top: 10px;
    padding: 10px;
    width: 100%;
}
</style>