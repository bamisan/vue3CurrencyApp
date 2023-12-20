<template>
  <div>
    <h1 class="title">currencyApplication</h1>

    <div class="date-selector">
      <label for="date">Select Date:</label>
      <input type="date" v-model="selectedDate" @change="fetchExchangeRates" />
    </div>

    <div class="currency-selector">
      <label for="currency">Select Currency:</label>
      <select v-model="selectedCurrency" @change="fetchExchangeRates">
        <option value="USD">Dollar</option>
        <option value="GBP">Pounds</option>
        <option value="EUR">Euro</option>
      </select>
    </div>

    <div v-if="exchangeRates" class="exchange-rates">
      <h2>
        exchange Rates For {{ selectedDate }} is
        {{ exchangeRates.current_rate }}
      </h2>
      <p class="average-rate">
        weekly Average: {{ exchangeRates.average_rate }}
      </p>
      <h3>last 7 Days:</h3>
      <ul class="rate-list">
        <li
          v-for="rate in exchangeRates.rates"
          :key="rate.date"
          class="rate-item"
        >
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
      selectedDate: new Date().toISOString().split("T")[0],
      selectedCurrency: "USD",
      exchangeRates: null,
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

    this.fetchExchangeRates();
  },
  methods: {
    fetchExchangeRates() {
      const apiUrl = `http://127.0.0.1:8000/api/weekly-exchange-rates/${this.selectedDate}/${this.selectedCurrency}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data, 100);
          this.exchangeRates = data;
        })
        .catch((error) => {
          console.error("Error fetching exchange rates:", error);
        });
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.date-selector {
  margin-bottom: 20px;
}

.exchange-rates {
  border: 1px solid #941b1b;
  padding: 15px;
  margin-top: 20px;
}

.average-rate {
  font-weight: bold;
}

.rate-list {
  list-style-type: none;
  padding: 0;
}

.rate-item {
  margin-bottom: 8px;
}
</style>
