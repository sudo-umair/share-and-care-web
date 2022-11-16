import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  address: null,
  phone: null,
  email: null,
  token: null,
  isLoggedIn: false,
};

const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  reducers: {
    setHospital: (state, action) => {
      const { name, address, email, contact, token } = action.payload;
      state.name = name;
      state.address = address;
      state.email = email;
      state.contact = contact;
      state.token = token;
      state.isLoggedIn = true;
    },

    removeHospital: (state) => {
      return initialState;
    },
  },
});

export const { setHospital, removeHospital } = hospitalSlice.actions;
export default hospitalSlice.reducer;
