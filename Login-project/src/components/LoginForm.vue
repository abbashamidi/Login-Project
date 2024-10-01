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
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import axios from 'axios';

export default {
    name: 'LoginForm',
    setup() {
        const username = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const router = useRouter(); // Initialize router

        const loginUser = async () => {
            try {
                const response = await login(username.value, password.value);
                errorMessage.value = 'Logged in successfully!';
                const token = response.data.token;
                storeTokens(token);

                setTimeout(() => {
                    router.push({ name: 'Dashboard' });
                }, 2000);

            } catch (error) {
                errorMessage.value = 'Login failed: Invalid credentials';
            }
        };

        const storeTokens = (token) => {
            localStorage.setItem('authtoken', token);
        };

        const login = async (username, password) => {
            const response = await axios.post('http://localhost:3000/login', {
                username,
                password
            });
            return response;
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