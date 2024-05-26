<template>
  <div>
    <Header />
    <div class="main-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-sm-10 col-md-8 col-lg-6">
            <div class="card shadow p-4">
              <img class="logo" src="../assets/contact.jpeg" alt="Company Logo">
              <h1 class="text-center my-4">Contact Us</h1>
              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="fullName" class="form-label">Full Name</label>
                  <input type="text" class="form-control" id="fullName" v-model="fullName" name="fullName"
                    placeholder="Full Name">
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" v-model="email" name="email" placeholder="Email">
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label">Message</label>
                  <textarea class="form-control" id="message" v-model="message" name="message" rows="5"
                    placeholder="Your message"></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import axios from 'axios';

import { useToast } from 'vue-toastification';
const toast = useToast();

export default {
  name: 'ContactUs',
  components: {
    Header
  },
  data() {
    return {
      fullName: '',
      email: '',
      message: ''
    };
  },
  methods: {
    async submitForm() {

      if (!this.fullName.trim() || !this.email.trim() || !this.message.trim()) {
        toast.error("Please fill in the missing fields.");
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/contact', {
          fullName: this.fullName,
          email: this.email,
          message: this.message
        });

        if (response.status === 200) {
          toast.success('Message sent successfully!');

          // Reset form fields
          this.fullName = '';
          this.email = '';
          this.message = '';
        }

      } catch (error) {
        toast.error('Error sending message:', error);
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