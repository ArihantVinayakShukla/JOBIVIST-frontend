// atoms.js
import { atom } from 'recoil';

// Atom for user state
export const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
});

// Atom for jobs state
export const jobsState = atom({
  key: 'jobsState',
  default: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
  },
});

// Atom for applications state
export const applicationsState = atom({
  key: 'applicationsState',
  default: {
    applications: [],
    loading: false,
    error: null,
    message: null,
  },
});

// Atom for update profile state
export const updateProfileState = atom({
  key: 'updateProfileState',
  default: {
    loading: false,
    error: null,
    isUpdated: false,
  },
});