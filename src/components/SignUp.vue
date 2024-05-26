<template>
    <div class="main-container">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-10 col-md-8 col-lg-6">
                    <div class="card shadow p-4">
                        <img class="logo" src="../assets/logo.png" alt="Company Logo">
                        <h1 class="text-center my-4">Sign Up</h1>
                        <form @submit.prevent="validateForm">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="firstName" v-model="firstName" name="firstName" placeholder="First Name" required>
                                <span class="error" v-if="!firstNameValid">Please enter your first name.</span>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="lastName" v-model="lastName" name="lastName" placeholder="Last Name" required>
                                <span class="error" v-if="!lastNameValid">Please enter your last name.</span>
                            </div>
                            <div class="mb-3">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">+61</span>
                                    </div>
                                    <input type="tel" class="form-control" id="phoneNumber" v-model="phoneNumber" name="phoneNumber" placeholder="Mobile Number" required pattern="[0-9]{10}">
                                    <span class="error" v-if="!phoneNumberValid">Please enter a valid phone number.</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <input type="email" class="form-control" v-model="email" id="email" placeholder="Enter email" required>
                                <span class="error" v-if="!emailValid">Please enter a valid email address.</span>
                            </div>
                            <div class="mb-3">
                                <input type="password" class="form-control" v-model="password" id="password" placeholder="Password" required>
                                <span class="error" v-if="!passwordValid">Password must be at least 8 characters long.</span>
                            </div>
                            <div class="mb-3">
                                <input type="password" class="form-control" v-model="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required>
                                <span class="error" v-if="!passwordMatch">Passwords do not match.</span>
                            </div>
                            <button type="submit" v-on:click="signUp" class="btn btn-primary btn-block">Sign Up</button>
                            <p>
                                <p class="mt-3 text-center">Already have an account? <router-link to="/login">Login</router-link></p>
                            </p>
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
    name: 'SignUp',
    data()
    {
        return {
            firstName:'',
            lastName:'',
            phoneNumber:'',
            email:'',
            password:'',
            confirmPassword:'',
            firstNameValid: true,
            lastNameValid: true,
            phoneNumberValid: true,
            emailValid: true,
            passwordValid: true,
            passwordMatch: true
        };
    },
    methods: {
        validateForm() {
            this.firstNameValid = this.firstName.trim() !== '';
            this.lastNameValid = this.lastName.trim() !== '';
            this.phoneNumberValid = /^[0-9]{10}$/.test(this.phoneNumber);
            this.emailValid = /\S+@\S+\.\S+/.test(this.email);
            this.passwordValid = this.password.length >= 8;
            this.passwordMatch = this.password === this.confirmPassword;

            // Return true if all fields are valid, false otherwise
            return this.firstNameValid && this.lastNameValid && this.phoneNumberValid && this.emailValid && this.passwordValid && this.passwordMatch;
        },
        async signUp(event) {
            event.preventDefault();

            const formIsValid = this.validateForm();

            if (!formIsValid) {
                toast.error("Please fix the errors in the form.");
                return; 
            }

            let result = await axios.post("http://localhost:3000/users", {
                firstName: this.firstName,
                lastName: this.lastName,
                phoneNumber: this.phoneNumber,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword
            });

            if (result.status === 201) {
                localStorage.setItem("user-info", JSON.stringify(result.data));
                toast.success("User signed in successfully!")
                this.$router.push({name: 'Dashboard'})
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

.form-control:focus {
    border-color: #80bdff;
    /* Blue border color on focus */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    /* Blue shadow on focus */
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
  border-color: #ced4da; /* Grey border color */
  box-shadow: none; /* Remove box-shadow */
}

.error {
    color: red;
    font-size: 0.8rem;
}

.error.active {
    display: block;
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