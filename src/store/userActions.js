// userActions.js
import { useSetRecoilState } from 'recoil';
import { userState } from './atoms';
import axios from 'axios';

export const useUserActions = () => {
  const setUserState = useSetRecoilState(userState);

  // Register a new user
  const register = async (data) => {
    setUserState((prev) => ({ ...prev, loading: true }));
    try {
      console.log("API URL:", import.meta.env.VITE_API_URL);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUserState({
        loading: false,
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        message: response.data.message,
      });
    } catch (error) {
      setUserState((prev) => ({
        ...prev,
        loading: false,
        error: error.response.data.message,
      }));
    }
  };

  // Login user
  const login = async (data) => {
    setUserState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setUserState({
        loading: false,
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        message: response.data.message,
      });
    } catch (error) {
      setUserState((prev) => ({
        ...prev,
        loading: false,
        error: error.response.data.message,
      }));
    }
  };

  // Get user data
  const getUser = async () => {
    setUserState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/getuser`,
        {
          withCredentials: true,
        }
      );
      setUserState((prev) => ({
        ...prev,
        loading: false,
        isAuthenticated: true,
        user: response.data.user,
      }));
    } catch (error) {
      setUserState((prev) => ({
        ...prev,
        loading: false,
        error: error.response.data.message,
      }));
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      setUserState({
        loading: false,
        isAuthenticated: false,
        user: {},
        error: null,
        message: null,
      });
    } catch (error) {
      setUserState((prev) => ({
        ...prev,
        error: error.response.data.message,
      }));
    }
  };

  // Clear all errors
  const clearAllUserErrors = () => {
    setUserState((prev) => ({ ...prev, error: null }));
  };

  return {
    register,
    login,
    getUser,
    logout,
    clearAllUserErrors,
  };
};