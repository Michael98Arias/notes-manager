import { defineStore } from 'pinia';
import axios from 'axios';
import { UserRole } from '../enums/role.enum';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    role: UserRole.ANONYMOUS,
  }),

  getters: {
    isLoggedIn: (state) => state.authenticated,
    isStandardUser: (state) => state.role === UserRole.STANDARD_USER,
    isAnonymous: (state) => state.role === UserRole.ANONYMOUS,
  },

  actions: {
    login(token: string) {
      this.role = UserRole.STANDARD_USER;
      this.authenticated = true;

      localStorage.setItem('apiKey', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    logout() {
      this.role = UserRole.ANONYMOUS;
      this.authenticated = false;

      localStorage.removeItem('apiKey');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});
