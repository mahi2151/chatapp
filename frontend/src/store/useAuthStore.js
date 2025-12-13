import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "john", _id: "12345", age: 25 },
  isLoggedIn: false,
    isLoading: false,

  login: () => {
    console.log("Logged In");
    set({ isLoggedIn: true, isLoading: true });
  },
}));
