<template>
    <div class="main-container">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-10 col-md-8 col-lg-6">
                    <div class="card shadow p-4">
                        <img class="logo" src="../assets/logo.png" alt="Company Logo">
                        <h1 class="text-center my-4">Login</h1>
                        <form>
                            <div class="mb-3">
                                <input type="email" class="form-control" v-model="email" id="email" placeholder="Enter email">
                            </div>
                            <div class="mb-3">
                                <input type="password" class="form-control" v-model="password" id="password" placeholder="Password">
                            </div>
                            <button type="submit" v-on:click="login" class="btn btn-primary btn-block">Login</button>
                            <p class="mt-3 text-center">Don't have an account? <router-link to="/signup">Signup</router-link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { useToast } from 'vue-toastification';
const toast = useToast();

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async login(event) {
            event.preventDefault();

            if (!this.email.trim() || !this.password.trim()) {
                toast.error("Please enter both email and password.");
                return;
            }

            let result = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`);

            if (result.status === 200 && result.data.length > 0) {
                localStorage.setItem("user-info", JSON.stringify(result.data[0]));
                toast.success("User logged in successfully!")
                this.$router.push({ name: 'Dashboard' });
            } else {
                toast.error("Login failed. Invalid credentials.")
            }
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            this.$router.push({name: 'Dashboard'})
        }
    }

}
</script>

<style scoped>
.main-container {
    background-color: #f8f9fa;
    /* Light grey background */
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.container {
    width: 100%;
}

.card {
    background-color: #fff;
    /* White card background */
    border-radius: 10px;
}

.logo {
    display: block;
    margin: 0 auto;
    width: 100px;
    margin-bottom: 20px;
}

.form-control {
    height: 38px;
    /* Smaller height */
    border-color: #ced4da;
    /* Grey border color */
    font-size: 14px;
    /* Adjust font size */
}

.input-group-text {
    background-color: #e9ecef;
    /* Light grey background for country code */
    border-color: #ced4da;
    /* Grey border color */
    color: #495057;
    /* Text color */
}

.btn-primary {
    background-color: #007bff;
    /* Primary blue color */
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    /* Darker blue on hover */
    border-color: #0056b3;
}

.form-control:focus {
    border-color: #ced4da;
    /* Grey border color */
    box-shadow: none;
    /* Remove box-shadow */
}

/* Responsive Styles */
@media (min-width: 576px) {
    .card {
        padding: 30px;
    }
}

@media (min-width: 768px) {
    .card {
        padding: 40px;
    }
}

@media (min-width: 992px) {
    .card {
        padding: 50px;
    }
}
</style>