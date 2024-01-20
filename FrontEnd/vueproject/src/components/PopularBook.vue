<!-- OtherBooksList.vue -->

<template>
  <div class="other-books-list">
    <div class="book-listings">
      <div v-for="otherBook in bookData" :key="otherBook.id" class="book-card">
        <img :src="getRandomBookCover()" class="book-cover" alt="Book Cover" />
        <div class="book-details">
          <h3>{{ otherBook.title }}</h3>
          <p class="author">{{ otherBook.author }}</p>
          <p class="price">$ {{ otherBook.price }}</p>
          <button class="see-book-button" @click="clicker(otherBook.id)">
            See Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import book1 from "../images/book1.jpg";
import book2 from "../images/book2.jpg";
import book3 from "../images/book3.jpg";
import book4 from "../images/book4.jpg";
import book6 from "../images/book6.jpg";
import book7 from "../images/book7.jpg";
import book8 from "../images/book8.jpg";
import book9 from "../images/book9.jpg";
export default {
  props: {
    books: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    this.fetchBooks();
  },
  data() {
    return {
      bookData: [],
    };
  },
  computed: {},
  methods: {
    async fetchBooks() {
      // Make a GET request to the books API endpoint
      await axios
        .get("https://booklistingapp.onrender.com/books/")
        .then((response) => {
          // Handle the successful response
          //   this.bookData = response.data.books;
          this.bookData = response.data.books.filter((e) => {
            return e.availableStock >= 9;
          });
          console.log("bookData", this.bookData);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching books:", error);
        });
    },
    getRandomBookCover() {
      const covers = [book1, book2, book3, book4, book6, book7, book8, book9];
      return covers[Math.floor(Math.random() * covers.length)];
    },
    clicker(key) {
      this.$router.push(`/books/${key}`);
    },
  },
};
</script>

<style scoped>
.book-listings {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.book-card {
  border: 2px solid #3498db;
  border-radius: 8px;
  overflow: hidden;
  width: 150px; /* Set the width to create square boxes */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.book-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.book-cover {
  width: 100%;
  height: 100px; /* Set the height to create square boxes */
  object-fit: cover;
  border-bottom: 2px solid #3498db;
}

.book-details {
  padding: 10px;
  text-align: center;
}

h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1rem;
  color: #ffffff;
}

.author,
.price {
  margin: 5px 0;
  font-size: 0.8rem;
  color: #ffffff;
}

.see-book-button {
  background-color: #27ae60; /* Green */
  color: #fff; /* White text */
  padding: 5px 10px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.see-book-button:hover {
  background-color: #218c53; /* Darker Green on hover */
  transform: scale(1.05);
}
</style>
