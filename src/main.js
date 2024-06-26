import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App.vue';
import router from './routers';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';


const app = createApp(App);
app.use(Toast);
app.use(router);
app.mount('#app');
