<template>
  <div class="book-container">
    <span v-if="oneBookData.length == 0" class="loader"></span>
    <div v-else class="book-card">
      <div class="book-main">
        <img class="book-cover" :src="this.mainImage" alt="Book Cover" />
      </div>
      <div class="book-details">
        <div class="book-d">
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
    </div>
    <h1 class="otherBooks" v-if="oneBookData.length !== 0">
      See Other Popluar Books
    </h1>
    <PopularBook v-if="oneBookData.length !== 0" />
  </div>
</template>

<script>
import axios from "axios";
import bookLib from "../images/bookLib.jpg";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import PopularBook from "./PopularBook.vue";

export default {
  props: ["id"],
  components: { PopularBook },
  data() {
    return {
      bookId: null,
      oneBookData: [],
      mainImage: "",
    };
  },
  watch: {
    id(val) {
      if (val && val !== null) {
        this.getBookData(val);
      } else {
        // do nothing//
      }
    },
  },
  computed() {},
  created() {
    this.bookId = this.$route.params.id;
    this.mainImage = bookLib;
  },
  methods: {
    async purchaseBook(id) {
      await axios
        .post(`https://booklistingapp.onrender.com/books/${id}/purchase`)
        .then((response) => {
          // Handle the successful response
          this.oneBookData = response.data.book;
          console.log(" onebookData", this.oneBookData);
          toast("Purchase successful", {
            autoClose: 6000,
          });
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching books:", error);
        });
    },
    async getBookData(id) {
      // Make a GET request to the books API endpoint
      await axios
        .get(`https://booklistingapp.onrender.com/books/${id}`)
        .then((response) => {
          // Handle the successful response
          this.oneBookData = response.data.book;
          console.log(" onebookData", this.oneBookData);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching books:", error);
        });
    },
  },
  mounted() {
    this.getBookData(this.bookId || this.id);
  },
};
</script>

<style scoped>
@import "../css/loader.css";

.book-container {
  justify-content: center;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
}

.book-container::before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: linear-gradient(45deg, #3498db, #2980b9, #3498db, #2980b9);
  transform: rotate(2deg);
  z-index: -1;
}

.book-card {
  border: 2px solid #3498db;
  border-radius: 8px;
  width: 100%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  overflow: hidden;
  transform: scale(1.05);
  font-size: 1.5rem;
  margin-bottom: auto;
  margin-right: 1vw;
  display: flex;
}
.book-main {
  margin-left: 5%;
}
.book-card:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}
.book-details {
  width: 100%;
  margin-left: 2%;
}
.book-d {
  margin-right: auto;
  float: left;
}

.book-title {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #ffffff;
  text-decoration: underline;
  padding: 10px;
  border-radius: 8px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
}
.otherBooks {
  text-decoration: underline;
  background-color: yellow;
  text-align: center;
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
  background-color: #2ecc71;
  color: #fff;
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.purchase-button:hover {
  background-color: #27ae60;
  transform: scale(1.05);
}

@media screen and (max-width: 600px) {
  .book-card {
    font-size: 1.2rem;
  }
}
</style>
