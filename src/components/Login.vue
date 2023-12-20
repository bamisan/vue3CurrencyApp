<template>
  <div class="login-container">

    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <input type="email" v-model="email" placeholder="Enter your email" required/>
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          placeholder="Enter your password"
          autocomplete="off"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>

  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const apiUrl = "http://127.0.0.1:8000/api/login";

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const token = data.token;
          localStorage.setItem("authToken", token);

          // Redirect to the home page or another protected route
          this.$router.push("/home");
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    },
  },
};
</script>


<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input {
  padding: 10px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 5px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>
