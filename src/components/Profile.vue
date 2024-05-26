<template>
  <Header />
  <div class="main-container">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-10 col-md-8 col-lg-6">
          <div class="card shadow p-4">
            <img class="logo" src="../assets/profile.png" alt="Company Logo">
            <h1 class="text-center my-4">Profile</h1>
            <form @submit.prevent="updateProfile">
              <div class="mb-3">
                <label for="fullName" class="form-label">First Name: </label>
                  <input type="text" class="form-control" id="firstName" v-model="firstName" name="firstName"
                    placeholder="First Name">
              </div>
              <div class="mb-3">
                <label for="fullName" class="form-label">Last Name: </label>
                  <input type="text" class="form-control" id="lastName" v-model="lastName" name="lastName"
                    placeholder="Last Name">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email: </label>
                  <input type="email" class="form-control" id="email" v-model="email" name="email"
                    placeholder="Email">
              </div>
              <div class="mb-3">
                <label for="phoneNumber" class="form-label">Phone Number</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">+61</span>
                  </div>
                  <input type="tel" class="form-control" id="phoneNumber" v-model="phoneNumber" name="phoneNumber"
                    placeholder="Mobile Number">
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from './Header.vue';

import { useToast } from 'vue-toastification';
const toast = useToast();

export default {
  name: 'Profile',
  components: {
    Header
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    };
  },
  methods: {
    async updateProfile() {

      if (!this.firstName.trim() || !this.lastName.trim() || !this.email.trim() || !this.phoneNumber.trim()) {
        toast.error("Please enter new credentials to update.");
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/profile', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber
        });

        toast.success("Profile Updated!");
        console.log('Response:', response);

        this.$router.push({ name: 'Dashboard' });

        if (response.status === 200) {
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
          this.email = response.data.email;
          this.phoneNumber = response.data.phoneNumber;
        }

      } catch (error) {
        toast.error('Error updating profile:', error);
      }
    }
  }
};
</script>

<style scoped>
.main-container {
  background-color: #f8f9fa;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.container {
  width: 100%;
}

.card {
  background-color: #fff;
  border-radius: 10px;
}

.logo {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: auto;
  border-radius: 50%;
  background-color: black;
}

.form-control {
  height: 38px;
  border-color: #ced4da;
  font-size: 14px;
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.input-group-text {
  background-color: #e9ecef;
  border-color: #ced4da;
  color: #495057;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

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