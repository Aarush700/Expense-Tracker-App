<!-- Dashboard.vue -->
<template>
    <Header />
    <div class="dashboard-container">
        <div class="left-column">
            <Balance :total="+total" />
            <IncomeExpenses :income="income" :expenses="expenses" />
            <TransactionList :transactions="transactions" @transaction-deleted="handleTransactionDeleted" />
        </div>
        <div class="right-column">
            <AddTransaction @transaction-submitted="handleTransactionSubmitted" />
            <div class="currency-converter card">
                <h2>Currency Converter</h2>
                <select v-model="selectedCurrency" class="currency-select">
                    <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
                </select>
                <p>1 {{ baseCurrency }} = {{ currencyRates[selectedCurrency] }} {{ selectedCurrency }}</p>
                <div class="converted-values">
                    <p>Total: {{ convertedTotal }} {{ selectedCurrency }}</p>
                    <p>Income: {{ convertedIncome }} {{ selectedCurrency }}</p>
                    <p>Expenses: {{ convertedExpenses }} {{ selectedCurrency }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from './Header.vue';
import Balance from './Balance.vue';
import IncomeExpenses from './IncomeExpenses.vue';
import TransactionList from './TransactionList.vue';
import AddTransaction from './AddTransaction.vue';

import { useToast } from 'vue-toastification';
import { ref, computed, onMounted } from 'vue';

const toast = useToast();
const transactions = ref([]);

const baseCurrency = 'AUD';

const currencyRates = ref({
    EUR: null,
    GBP: null,
    JPY: null,
    USD: null
});

const currencies = ['EUR', 'GBP', 'JPY', 'USD', 'INR', 'CAD', 'NZD', 'CNY'];
let selectedCurrency = ref('USD');

// Fetch currency conversion rates from API
onMounted(async () => {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await response.json();
        currencyRates.value = data.rates;
    } catch (error) {
        console.error('Error fetching currency conversion rates:', error);
        toast.error('Failed to fetch currency conversion rates');
    }
});

onMounted(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (savedTransactions) {
        transactions.value = savedTransactions;
    }
});

const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
        if (transaction.transactionType === 'income') {
            return acc + parseFloat(transaction.amount);
        } else if (transaction.transactionType === 'expense') {
            return acc - parseFloat(transaction.amount);
        }
        return acc;
    }, 0).toFixed(2);
});

const income = computed(() => {
    return transactions.value.filter((transaction) => transaction.transactionType === "income")
        .reduce((acc, transaction) => {
            return acc + parseFloat(transaction.amount);
        }, 0).toFixed(2);
});

const expenses = computed(() => {
    return transactions.value.filter((transaction) => transaction.transactionType === "expense")
        .reduce((acc, transaction) => {
            return acc + parseFloat(transaction.amount);
        }, 0).toFixed(2);
});

const convertedTotal = computed(() => {
    return (total.value * currencyRates.value[selectedCurrency.value]).toFixed(2);
});

const convertedIncome = computed(() => {
    return (income.value * currencyRates.value[selectedCurrency.value]).toFixed(2);
});

const convertedExpenses = computed(() => {
    return (expenses.value * currencyRates.value[selectedCurrency.value]).toFixed(2);
});

const handleTransactionSubmitted = (transactionData) => {
    transactions.value.push({
        id: generateUniqueId(),
        text: transactionData.text,
        amount: transactionData.amount,
        transactionType: transactionData.transactionType,
        transactionDate: transactionData.transactionDate
    });
    savedTransactionsToLocalStorage();
    toast.success('Transaction added');
};

const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000);
};

const handleTransactionDeleted = (id) => {
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id);
    savedTransactionsToLocalStorage();
    toast.success('Transaction deleted');
};

const savedTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
};
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: 1fr; 
  gap: 20px; 
  max-width: 1100px; 
  margin: 50px auto;
  align-items: center;
}

.left-column {
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.right-column {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.currency-converter {
  margin-top: 20px;
}

.card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.currency-select {
  margin-bottom: 10px;
}

.converted-values p {
  margin: 5px 0;
}
/* Mobile-first responsive design */
@media screen and (min-width: 768px) {
  .dashboard-container {
    grid-template-columns: 1fr 1fr; /* Two equal columns on larger screens */
  }
}
</style>