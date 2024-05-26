<template>
    <Header />
    <div class="expense-container">
        <h2>Expenses</h2>
        <div class="filter-section">
            <div class="filter-item">
                <label for="dateFilter">Date:</label>
                <input type="text" v-model="dateFilter" id="dateFilter" placeholder="YYYY-MM-DD">
            </div>
            <div class="filter-item">
                <label for="descriptionFilter">Description:</label>
                <input type="text" v-model="descriptionFilter" id="descriptionFilter" placeholder="Search description">
            </div>
            <div class="filter-item">
                <label for="amountFilter">Amount:</label>
                <input type="text" v-model="amountFilter" id="amountFilter" placeholder="Enter amount">
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in paginatedTransactions" :key="transaction.id">
                        <td>{{ transaction.transactionDate }}</td>
                        <td>{{ transaction.text }}</td>
                        <td class="expense-amount"
                            :style="{ color: transaction.transactionType === 'income' ? 'green' : 'red' }">{{
            formatCurrency(transaction.amount) }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="filteredTransactions.length === 0" class="no-results">
                No transactions found.
            </div>
        </div>
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <button class="page-link" @click="prevPage" :disabled="currentPage === 1">Previous</button>
                </li>
                <li class="page-item" v-for="page in pageCount" :key="page">
                    <a class="page-link" :class="{ active: currentPage === page }" @click="changePage(page)">{{ page
                        }}</a>
                </li>
                <li class="page-item">
                    <button class="page-link" @click="nextPage" :disabled="currentPage === pageCount">Next</button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import Header from './Header.vue';
import { ref, computed } from 'vue';

// Get transactions from local storage
const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

// Filter transactions to get only expenses
const expenseTransactions = ref(savedTransactions.filter(transaction => transaction.transactionType === "expense"));

// Define filter variables
const dateFilter = ref('');
const descriptionFilter = ref('');
const amountFilter = ref('');

// Filter function
const filterTransactions = (transactions) => {
  return transactions.filter(transaction => {
    // Filter by date
    const dateMatch = dateFilter.value === '' || transaction.transactionDate.includes(dateFilter.value);

    // Filter by description (case-insensitive)
    const descriptionMatch = descriptionFilter.value === '' || transaction.text.toLowerCase().includes(descriptionFilter.value.toLowerCase());

    // Filter by amount
    const amountMatch = amountFilter.value === '' || transaction.amount === parseFloat(amountFilter.value);

    return dateMatch && descriptionMatch && amountMatch;
  });
};

// Computed property for filtered transactions
const filteredTransactions = computed(() => {
  return filterTransactions(expenseTransactions.value);
});

const formatCurrency = (amount) => {
    return `$${Math.abs(amount).toFixed(2)}`; // Display amount as positive
};

const currentPage = ref(1);
const itemsPerPage = 5; // Adjust as needed

const paginatedTransactions = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return filteredTransactions.value.slice(startIndex, startIndex + itemsPerPage);
});

const pageCount = computed(() => {
    return Math.ceil(filteredTransactions.value.length / itemsPerPage);
});

const changePage = (page) => {
    currentPage.value = page;
};

const nextPage = () => {
    if (currentPage.value < pageCount.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

</script>

<style scoped>
/* Add custom styling for the table */
.expense-container {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.table th,
.table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.table th {
    background-color: #343a40;
    color: white;
}

.expense-amount {
    font-weight: bold;
}

.search-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 10px;
}

.no-results {
    color: red;
    margin-top: 10px;
}

.filter-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-item {
  flex: 0 0 calc(33.33% - 10px);
}

.filter-item label {
  display: block;
  margin-bottom: 5px;
}

.filter-item input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
