// store/useAuthStore.ts
import { create } from "zustand";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, signInWithGoogle, signInWithGithub, registerWithEmail, loginWithEmail } from "../firebase-config";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  registerEmail: (email: string, password: string) => Promise<void>;
  loginEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  loginWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const result = await signInWithGoogle();
      set({ user: result.user, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  loginWithGithub: async () => {
    try {
      set({ loading: true, error: null });
      const result = await signInWithGithub();
      set({ user: result.user, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  registerEmail: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const result = await registerWithEmail(email, password);
      set({ user: result.user, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  loginEmail: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const result = await loginWithEmail(email, password);
      set({ user: result.user, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, loading: false });
      // localStorage.removeItem("authUser"); // remove if using storage
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));

// 🔥 Keep Firebase user synced with Zustand
onAuthStateChanged(auth, (user) => {
  if (user) {
    useAuthStore.setState({ user, loading: false });
  } else {
    useAuthStore.setState({ user: null, loading: false });
  }
});
