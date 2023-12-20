<template>
  <div class="data-entry">
    <h1 class="entry-title">Data Entry for Exchange Rates</h1>

    <form @submit.prevent="submitExchangeRate" class="form">
      <div class="form-group">
        <label for="date" class="label">Date:</label>
        <input type="date" v-model="exchangeRate.date" class="input" />
      </div>

      <div class="form-group">
        <label for="rate" class="label">Exchange Rate:</label>
        <input type="number" step="0.0001" v-model="exchangeRate.rate" class="input" />
      </div>

      <div class="form-group">
        <button type="submit" class="submit-btn">Submit</button>
      </div>
    </form>

    <div class="exchange-rate-list">
      <h2 class="list-title">All Exchange Rates</h2>
      <ul class="rate-list">
        <li v-for="rate in allExchangeRates" :key="rate.id" class="rate-item">
          {{ rate.date }}: {{ rate.rate }}
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      exchangeRate: {
        date: "",
        rate: null,
      },
      allExchangeRates: [],
    };
  },
  mounted() {
    const authToken = localStorage.getItem("authToken");
    console.log("AUTH TOKEN:::::", authToken);

    // Redirect to home if the user is not authenticated
    if (!authToken || authToken === "undefined") {
      this.$router.push("/");
      return;
    }

    this.fetchAllExchangeRates();
  },
  methods: {
    // fetch API of stored exchangeRate
    fetchAllExchangeRates() {
      const apiUrl = "http://127.0.0.1:8000/api/list-all";
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.allExchangeRates = data.exchangeRates;
        })
        .catch((error) => {
          console.error("Error fetching all exchange rates:", error);
        });
    },

    // submit API
    submitExchangeRate() {
      if (!this.exchangeRate.date || !this.exchangeRate.rate) {
        alert("Please fill in all fields");
        return;
      }

      this.storeExchangeRate(this.exchangeRate);
    },


    storeExchangeRate(exchangeRate) {
      const apiUrl = "http://127.0.0.1:8000/api/store-data";
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exchangeRate),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("SUBMITTED SUCCESSFULLY:::::", data);

          // Clear the form after successful submission
          this.exchangeRate = { date: "", rate: null };

          // Fetch updated list of all exchange rates
          this.fetchAllExchangeRates();

          alert("Exchange rate submitted successfully!");
        })
        .catch((error) => {
          console.error("Error submitting exchange rate:", error);
        });
    },
  },
};
</script>

<style scoped>
.data-entry {
  max-width: 400px;
  margin: auto;
}

.entry-title {
  text-align: center;
}

.form {
  display: grid;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.label {
  margin-bottom: 5px;
}

.input {
  padding: 8px;
  font-size: 14px;
}

.submit-btn {
  cursor: pointer;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
}

.exchange-rate-list {
  margin-top: 20px;
}

.list-title {
  margin-bottom: 10px;
}

.rate-list {
  list-style: none;
  padding: 0;
}

.rate-item {
  margin-bottom: 8px;
  font-size: 14px;
}
</style>
