<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a href="/" class="navbar-brand">
                <img src="../assets/logo.png" alt="LOGO" class="logo">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Transaction History
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link to="/income" class="dropdown-item">Income</router-link></li>
                            <li><router-link to="/expenses" class="dropdown-item">Expenses</router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link to="/contact" class="nav-link">Contact Us</router-link>
                    </li>
                </ul>

                <ul class="navbar-nav">
                    <li v-if="!isLoggedIn" class="nav-item">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                    <li v-if="!isLoggedIn" class="nav-item">
                        <router-link to="/signup" class="nav-link">SignUp</router-link>
                    </li>
                    <li v-if="isLoggedIn" class="nav-item">
                        <router-link to="/profile" class="nav-link">Profile</router-link>
                    </li>
                    <li v-if="isLoggedIn" class="nav-item">
                        <router-link to="#" class="nav-link" v-on:click="logout">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            isLoggedIn: false, // Initially assuming user is not logged in
        };
    },
    created() {
        // Check if user is logged in
        this.isLoggedIn = this.checkLoginStatus();
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({ name: 'Login' });
        },
        checkLoginStatus() {
            return localStorage.getItem("user-info") !== null;
        }
    }
}
</script>

<style scoped>
.left {
    display: flex;
    align-items: center;
}

.right ul {
    display: flex;
    align-items: center;
}

.logo {
    width: 35px;
    height: 35px;
    border-radius: 5px;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
}

ul li {
    margin: 0 15px;
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 5px;
    cursor: pointer;
}

.nav-link:hover {
    color: yellow;
    background-color: #606060;
    border-radius: 5px;
}

.dropdown-menu {
    position: absolute;
    background-color: black;
    padding: 10px 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: none;
}

.dropdown-menu li a {
    color: white;
}

.dropdown-menu li a:hover {
    color: yellow;
    background-color: #606060;
    border-radius: 5px;
}

.nav-item.dropdown:hover .dropdown-menu {
    display: block;
}
</style>