import { create } from "zustand";
import axios from "axios";

const baseURL = "https://api.escuelajs.co/api/v1";

interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
  role: string;

}

interface UserStore {
  update: number;
  usersList: User[] | null;
  loading: boolean;
  fetchUsers: () => Promise<void>;
  createUser: (payload: Omit<User, "id">) => Promise<void>;
}

export const useUsers = create<UserStore>((set) => ({
  usersList: null,
  loading: false,
  update: 0,
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${baseURL}/users`);
      const data = await res.json();
      set({ usersList: data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  createUser: async (payload) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${baseURL}/users`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        set((state) => ({ update: state.update + 1 }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
