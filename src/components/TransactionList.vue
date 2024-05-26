<template>
    <h3>Transactions</h3>
    <ul id="list" class="list">
        <li v-for="transaction in paginatedTransactions" :key="transaction.id"
            :class="transaction.transactionType === 'income' ? 'plus' : 'minus'">
            <!-- {{ transaction.text }} <span>${{ transaction.amount }}</span>  -->
            <div class="transaction-details">
                {{ transaction.text }} 
                <span>${{ transaction.amount }}</span>
            </div>
            <div class="action-buttons">
                <button v-if="isAuthenticated" @click="toggleLike(transaction)" :class="{ 'liked': transaction.liked }" class="like-btn">
                    <span v-if="transaction.liked">❤️</span><span v-else>♡</span>
                </button>
                <button v-if="isAuthenticated" @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
            </div>
        </li>
    </ul>

    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
            <li class="page-item">
                <button class="page-link" @click="prevPage" :disabled="currentPage === 1">Previous</button>
            </li>
            <li class="page-item" v-for="page in pageCount" :key="page">
                <a class="page-link" :class="{ active: currentPage === page }" @click="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item">
                <button class="page-link" @click="nextPage" :disabled="currentPage === pageCount">Next</button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { defineProps, ref, computed, onMounted } from 'vue';
const emit = defineEmits('transactionDeleted')

const props = defineProps({
    transactions: {
        type: Array,
        required: true
    }
});

const isAuthenticated = ref(false);

onMounted(() => {
    isAuthenticated.value = checkAuthentication();
});

const checkAuthentication = () => {
    return localStorage.getItem("user-info") !== null;
};

const deleteTransaction = (id) => {
    emit('transactionDeleted', id);
};

const toggleLike = (transaction) => {
    transaction.liked = !transaction.liked; // Toggle like state
};

const currentPage = ref(1);
const itemsPerPage = 3;

const paginatedTransactions = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return props.transactions.slice(startIndex, startIndex + itemsPerPage);
});

const pageCount = computed(() => {
    return Math.ceil(props.transactions.length / itemsPerPage);
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
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

:root {
    --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

* {
    box-sizing: border-box;
}

body {
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    font-family: 'Lato', sans-serif;
    font-size: 18px;
}

.container {
    margin: 30px auto;
    width: 400px;
}

h1 {
    letter-spacing: 1px;
    margin: 0;
}

h3 {
    border-bottom: 1px solid #bbb;
    padding-bottom: 10px;
    margin: 40px 0 10px;
}

h4 {
    margin: 0;
    text-transform: uppercase;
}

.inc-exp-container {
    background-color: #fff;
    box-shadow: var(--box-shadow);
    padding: 20px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
}

.inc-exp-container>div {
    flex: 1;
    text-align: center;
}

.inc-exp-container>div:first-of-type {
    border-right: 1px solid #dedede;
}

.money {
    font-size: 20px;
    letter-spacing: 1px;
    margin: 5px 0;
}

.list .money.plus {
    color: #2ecc71;
}

.list .money.minus {
    color: #c0392b;
}

label {
    display: inline-block;
    margin: 10px 0;
}

input[type='text'],
input[type='number'] {
    border: 1px solid #dedede;
    border-radius: 2px;
    display: block;
    font-size: 16px;
    padding: 10px;
    width: 100%;
}

.btn {
    cursor: pointer;
    background-color: #9c88ff;
    box-shadow: var(--box-shadow);
    color: #fff;
    border: 0;
    display: block;
    font-size: 16px;
    margin: 10px 0 30px;
    padding: 10px;
    width: 100%;
}

.btn:focus,
.delete-btn:focus {
    outline: 0;
}

.list {
    list-style-type: none;
    padding: 0;
    margin-bottom: 40px;
}

.list li {
    background-color: #fff;
    box-shadow: var(--box-shadow);
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 10px;
    margin: 10px 0;
}

.transaction-details {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.transaction-details span {
    margin-left: auto;
}

.list li.plus {
    border-right: 5px solid #2ecc71;
}

.list li.minus {
    border-right: 5px solid #c0392b;
}

.delete-btn {
    cursor: pointer;
    background-color: #e74c3c;
    border: 0;
    color: #fff;
    font-size: 20px;
    line-height: 20px;
    padding: 2px 5px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.list li:hover .delete-btn {
    opacity: 1;
}

.action-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
}

.like-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    transition: color 0.3s;
}

.like-btn.liked {
    color: #e74c3c;
}

.page-link.active {
    font-weight: bold;
}
</style>