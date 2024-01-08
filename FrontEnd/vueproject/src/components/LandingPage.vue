<template>
  <div class="landing-page">
    <h1 class="sticky">Welcome to our Bookstore!</h1>
    <div class="backImage"></div>

    <div class="books-list">
      <div v-for="book in bookData" :key="book.id" class="book-card">
        <img :src="getRandomBookCover()" alt="Book Cover" class="book-cover" />
        <div class="book-details">
          <h2>{{ book.title }}</h2>
          <p class="author"><strong>Author:</strong> {{ book.author }}</p>
          <p class="isbn"><strong>ISBN:</strong> {{ book.isbn }}</p>
          <p class="price"><strong>Price:</strong> ${{ book.price }}</p>
          <p class="stock">
            <strong>Available Stock:</strong>
            {{ book.availableStock }}
          </p>
          <router-link
            :to="'/books/' + book.id"
            @click="handleLinkClick(book.id)"
            class="see-book-button"
            >See the book</router-link
          >
          <!-- :to = "pathRoute" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import book2 from "../images/book2.jpg";
import book3 from "../images/book3.jpg";
import book4 from "../images/book4.jpg";

// import Router from 'vue-router'
export default {
  props: ["id"],

  data() {
    return {
      bookData: [],

      idBook: null,
    };
  },
  methods: {
    getRandomBookCover() {
      const covers = [book2, book3, book4];
      return covers[Math.floor(Math.random() * covers.length)];
    },
    handleLinkClick(key) {
      // Your method logic here
      this.idBook = key;
      console.log("idbook is printed", this.idBook);
    },

    async fetchBooks() {
      // Make a GET request to the books API endpoint
      await axios
        .get("https://booklistingapp.onrender.com/books/")
        .then((response) => {
          // Handle the successful response
          this.bookData = response.data.books;
          console.log("bookData", this.bookData);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching books:", error);
        });
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
.backImage {
  background-image: url("../images/book5.jpg");
  height: 100vmin;
}
.sticky {
  position: sticky;
  top: 0;
  font-size: 4vw;
}

.landing-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.books-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 2vw;
}

.book-card {
  border: 2px solid red;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  background-color: rgb(216, 86, 86);
  margin-left: auto;
  margin-right: auto;
}

.book-card:hover {
  transform: scale(1.05);
}

.book-cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 2px solid red;
}

.book-details {
  padding: 15px;
  align-items: center;
}

h1 {
  text-align: center;
  font-size: 7vw;
  font-weight: bold;
  color: #ffffff;
  border: 3px solid red;
  background-color: brown;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #000000;
}

.author,
.isbn,
.price,
.stock {
  margin: 5px 0;
  font-size: 1.5rem;
  color: #ffffff;
}
.book-details h2 {
  background-color: #ffffff;
}

.see-book-button {
  background-color: #3f00ee; /* Sky Blue */
  color: #fff; /* White text */
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 90%;
}
</style>
