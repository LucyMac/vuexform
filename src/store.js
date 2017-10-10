import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userQuery: {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      age: '',
      dob: '',
      query: ''
    }
  },
  actions: {
    updateUserInput: ({ commit }, payload) => {
      commit('saveUserInput', payload);
    }
  },
  mutations: {
    saveUserInput: (state, data) => {
      state.userQuery = data
    }
  }
});
