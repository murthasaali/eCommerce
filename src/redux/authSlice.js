import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    products: [],
    userToken:localStorage.getItem('usertoken')|| null,
    isSignIn: true,
    isAbout:false,
    isLogin:localStorage.getItem('login')|| false,
    isCollection:false,
    isCart:false,
    userId:localStorage.getItem('userId')||null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save the token to local storage
    },
    
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      localStorage.setItem('usertoken', action.payload); // Save the token to local storage
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setUserid: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId',action.payload)
    },
    setSignIn: (state, action) => {
      state.isSignIn = action.payload;
    },
    setIsabout: (state, action) => {
      state.isAbout = action.payload;
    },
    setIslogin: (state, action) => {
      state.isLogin = action.payload;
      localStorage.setItem('login',action.payload)
    },
    setIscollection: (state, action) => {
      state.isCollection = action.payload;
    },
    setIscart: (state, action) => {
      state.isCart = action.payload;
    },
    clearUserToken: (state) => {
      state.userToken = null;
      localStorage.removeItem('usertoken'); // Remove the user token from local storage
    },
    clearIslogin:(state) => {
      state.isLogin = false;
      localStorage.removeItem('login'); // Remove the user token from local storage
    },
  }
});

export const {setIscollection, setToken, setUserToken, setProducts, setSignIn ,setIsabout,setIslogin,setIscart,setUserid,clearUserToken,clearIslogin} = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUserToken = (state) => state.auth.userToken;
export const selectProducts = (state) => state.auth.products;
export const selectIsabout = (state) => state.auth.isAbout;
export const selectIslogin = (state) => state.auth.isLogin;
export const selectIscollection = (state) => state.auth.isCollection;
export const selectIscart = (state) => state.auth.isCart;
export const selectUserid = (state) => state.auth.userId;

export default authSlice.reducer;
