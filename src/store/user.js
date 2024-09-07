import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    email: null,
  }),
  actions: {
    setEmail(email) {
      this.email = email;
    },
    getEmail() {
      return this.email;
    }
  }
});
