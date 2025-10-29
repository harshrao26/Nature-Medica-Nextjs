import { createSlice } from '@reduxjs/toolkit';

const USER_STORAGE_KEY = 'naturemedica_user';

// Load user from localStorage
const loadUserFromStorage = () => {
  if (typeof window === 'undefined') return { user: null, isAuthenticated: false };

  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return { user: null, isAuthenticated: false };

    const user = JSON.parse(stored);
    return {
      user,
      isAuthenticated: true
    };
  } catch (error) {
    console.error('Error loading user from storage:', error);
    return { user: null, isAuthenticated: false };
  }
};

// Save user to localStorage
const saveUserToStorage = (user) => {
  if (typeof window === 'undefined') return;

  try {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      saveUserToStorage(action.payload);
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      saveUserToStorage(null);
    },

    hydrateUser: (state) => {
      const stored = loadUserFromStorage();
      state.user = stored.user;
      state.isAuthenticated = stored.isAuthenticated;
    },

    // NEW: Update user profile
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload
        };
        saveUserToStorage(state.user);
      }
    }
  }
});

export const { setUser, logout, hydrateUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
