<template>
    <div class="book-container">
        <div class="book-card">
            <img class="book-cover" :src="this.mainImage" alt="Book Cover" />
            <h2 class="book-title">{{ this.oneBookData.title }}</h2>
            <p class="book-author">{{ this.oneBookData.author }}</p>
            <p class="book-isbn">ISBN: {{ this.oneBookData.isbn }}</p>
            <p class="book-price">Price: ${{ this.oneBookData.price }}</p>
            <p class="book-stock">
                Available Stock: {{ this.oneBookData.availableStock }}
            </p>
            <button class="purchase-button" @click="purchaseBook(this.bookId)">
                Purchase
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import bookLib from '../images/bookLib.jpg'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
    props: ['id'],

    data() {
        return {
            bookId: null,
            oneBookData: [],
            mainImage: '',
        }
    },
    computed() {},
    created() {
        this.bookId = this.$route.params.id
        this.mainImage = bookLib
    },
    methods: {
        async purchaseBook(id) {
            await axios
                .post(`http://localhost:8000/books/${id}/purchase`)
                .then((response) => {
                    // Handle the successful response
                    this.oneBookData = response.data.book
                    console.log(' onebookData', this.oneBookData)
                    toast('Purchase successful', {
                        autoClose: 6000,
                    })
                })
                .catch((error) => {
                    // Handle errors
                    console.error('Error fetching books:', error)
                })
        },
        async getBookData(id) {
            // Make a GET request to the books API endpoint
            await axios
                .get(`http://localhost:8000/books/${id}`)
                .then((response) => {
                    // Handle the successful response
                    this.oneBookData = response.data.book
                    console.log(' onebookData', this.oneBookData)
                })
                .catch((error) => {
                    // Handle errors
                    console.error('Error fetching books:', error)
                })
        },
    },
    mounted() {
        this.getBookData(this.bookId || this.id)
    },
}
</script>

<style scoped>
.book-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
        'Lucida Sans', Arial, sans-serif;
}

.book-card {
    max-width: 400px;
    border: 2px solid red;
    border-radius: 8px;
    width: 100%;
    background-color: rgb(216, 86, 86);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease-in-out;
    overflow: hidden;
    transform: scale(1.05);
    font-size: 2vw;
}

.book-cover {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 15px;
}

.book-title {
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: #333;
    background-color: #ffffff;
}

.book-author {
    color: #ffffff;
    margin-bottom: 10px;
}

.book-isbn,
.book-price,
.book-stock {
    margin-bottom: 10px;
    color: #ffffff;
}

.purchase-button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.purchase-button:hover {
    background-color: #45a049;
}
</style>
