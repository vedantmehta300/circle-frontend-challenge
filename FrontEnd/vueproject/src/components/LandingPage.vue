<template>
  <div class="landing-page">
    <div class="other-books-list">
      <!-- Filter options -->
      <div class="filters">
        <div class="filter-item">
          <label for="availableStock">Available Stock:</label>
          <input type="number" v-model="availableStock" />
        </div>

        <div class="filter-item">
          <label for="Price">Price:</label>
          <input type="number" v-model="Price" />
        </div>

        <button class="apply-button" @click="applyFilters">
          Reset Filters
        </button>
      </div>
    </div>

    <h1 class="sticky">Welcome to our Bookstore!</h1>

    <div class="books-list">
      <span v-if="bookData.length == 0" class="loader"></span>
      <div v-else v-for="book in bookData" :key="book.id" class="book-card">
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
import book1 from "../images/book1.jpg";
import book2 from "../images/book2.jpg";
import book3 from "../images/book3.jpg";
import book4 from "../images/book4.jpg";
import book6 from "../images/book6.jpg";
import book7 from "../images/book7.jpg";
import book8 from "../images/book8.jpg";
import book9 from "../images/book9.jpg";

// import Router from 'vue-router'
export default {
  props: ["id"],

  data() {
    return {
      bookData: [],
      filterData: [],
      availableStock: null,
      Price: null,
      idBook: null,
    };
  },
  watch: {
    async Price(val) {
      await this.fetchBooks();
      if (val === null) {
        if (this.availableStock) {
          this.bookData = this.bookData.filter((e) => {
            return e.availableStock >= this.availableStock;
          });
        } else {
          await this.fetchBooks();
        }
      } else {
        if (this.availableStock) {
          this.bookData = this.bookData.filter((e) => {
            return e.price >= val && e.availableStock >= this.availableStock;
          });
        } else {
          this.bookData = this.bookData.filter((e) => {
            return e.price >= val;
          });
        }
      }
    },
    async availableStock(val) {
      await this.fetchBooks();
      if (val === null) {
        if (this.Price) {
          this.bookData = this.bookData.filter((e) => {
            return e.price >= this.Price;
          });
        } else {
          await this.fetchBooks();
        }
      } else {
        if (this.Price) {
          this.bookData = this.bookData.filter((e) => {
            return e.price >= this.Price && e.availableStock >= val;
          });
        } else {
          this.bookData = this.bookData.filter((e) => {
            console.log(e.availableStock >= val);
            return e.availableStock >= val;
          });
        }
      }
    },
  },
  methods: {
    getRandomBookCover() {
      const covers = [book1, book2, book3, book4, book6, book7, book8, book9];
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
    applyFilters() {
      this.availableStock = null;
      this.Price = null;
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
@import "../css/loader.css";

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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: hsla(0, 0%, 0%, 0);
}

.books-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 2vw;
}

.book-card {
  /* border: 2px solid #3498db; */
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  /* background: linear-gradient(135deg, #3498db, #2980b9); */
  margin-left: auto;
  margin-right: auto;
}

.book-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.book-cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 2px solid #3498db;
}

.book-details {
  padding: 15px;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 7vw;
  font-weight: bold;
  color: #ffffff;
  border: 3px solid #3498db;
  background-color: #2980b9;
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
  font-size: 1rem;
  color: rgb(118, 118, 118);
}

.book-details h2 {
  background-color: rgb(192, 205, 150);
}

.see-book-button {
  background-color: #27ae60; /* Green */
  color: #fff; /* White text */
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 90%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.see-book-button:hover {
  background-color: #218c53;
  transform: scale(1.05);
}

.filters {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.filter-item {
  margin-right: 15px;
}

.filter-item label {
  margin-right: 5px;
}

.filter-item input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60px;
}

.apply-button {
  padding: 10px 15px;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
}

.apply-button:hover {
  background-color: #45a049;
}
</style>
