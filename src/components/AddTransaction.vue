<template>
    <h3>Add new transaction</h3>
    <form action="" id="form" @submit.prevent="onSubmit">
        <div>
            <label for="text">Text</label>
            <input type="text" v-model="text" placeholder="Enter text..." id="text">
            <label for="amount">Amount</label>
            <input type="number" v-model="amount" placeholder="Enter amount..." id="amount">
            <label for="type">Type</label>
            <select v-model="transactionType" id="type">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <label for="date">Date</label>
            <input v-model="transactionDate" type="date" id="date">
        </div>
        <button class="btn">Add transaction</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification'

const text = ref('');
const amount = ref('');
const transactionType = ref('');
const transactionDate = ref('');

const emit = defineEmits([
    'transactionSubmitted'
])

const toast = useToast();

const onSubmit = () => {
    if (!text.value || !amount.value || !transactionDate.value) {
        toast.error('Please fill in all fields.');
        return;
    }

    const parsedAmount = parseFloat(amount.value);
    if (isNaN(parsedAmount)) {
        toast.error('Amount must be a valid number');
        return;
    }

    const transactionData = {
        text: text.value,
        amount: parseFloat(amount.value),
        transactionType: transactionType.value,
        transactionDate: transactionDate.value,
    };

    emit('transactionSubmitted', transactionData);
    text.value = '';
    amount.value = '';
    transactionType.value = '';
    transactionDate.value = '';
}
</script>

<style scoped>
.add-transaction {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-control {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-top: 20px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button.btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
}

/* Mobile-first responsive design */
@media screen and (min-width: 768px) {
  .add-transaction {
    max-width: 600px;
  }
}
</style>