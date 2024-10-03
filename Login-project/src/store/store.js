import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: {
      username: "",
    },
    isLoggedIn: false,
    errorMessage: "", // Store error message
  },
  mutations: {
    SET_USER(state, username) {
      state.user.username = username;
      state.isLoggedIn = true;
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
    CLEAR_ERROR_MESSAGE(state) {
      state.errorMessage = "";
    },
  },
  actions: {
    async loginUser({ commit }, credentials) {
      try {
        // Make API request
        const response = await axios.post("http://localhost:3000/login", {
          username: credentials.username,
          password: credentials.password,
        });

        const token = response.data.token;

        // Store the token in localStorage
        localStorage.setItem("authtoken", token);

        // Commit mutation to set the user info in the store
        commit("SET_USER", credentials.username);

        // Clear any previous error messages
        commit("CLEAR_ERROR_MESSAGE");
      } catch (error) {
        // Handle login error
        commit("SET_ERROR_MESSAGE", "Invalid login credentials.");
        throw new Error("Login failed");
      }
    },
  },
  getters: {
    getUsername: (state) => state.user.username,
    isLoggedIn: (state) => state.isLoggedIn,
    errorMessage: (state) => state.errorMessage,
  },
});
