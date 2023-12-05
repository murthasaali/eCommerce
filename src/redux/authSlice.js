import { createSlice } from '@reduxjs/toolkit';
import avatar from "../shamil.jpg"
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    products:[],
    userToken:localStorage.getItem('usertoken')|| null,
    isSignIn: true,
    isAbout:false,
    isCollection:false,
    isCart:false,
    userId:localStorage.getItem('userId')||null,
    userName:localStorage.getItem('userName')||"",
    isLoading:true,
    wishlist:localStorage.getItem('wishlist')||[],
    isLogin: localStorage.getItem('isLogin') === 'true', // Retrieve boolean value from localStorage
    isAdmin: localStorage.getItem('isAdmin') === 'true', // Retrieve boolean value from localStorage
    img: localStorage.getItem('img') ||`${avatar}`// Retrieve boolean value from localStorage

  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save the token to local storage
    },
    setUsername: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem('userName', action.payload); // Save the token to local storage
    },
    setImg: (state, action) => {
      state.img = action.payload;
      localStorage.setItem('img', action.payload); // Save the token to local storage
    },
    
    clearImg: (state) => {
      state.img = "../shamil.jpg";
      localStorage.setItem('img'); // Save the token to local storage
    },
    clearuserName: (state) => {
      state.userName = "";
      localStorage.setItem('userName'); // Save the token to local storage
    },
    
    
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      localStorage.setItem('usertoken', action.payload); // Save the token to local storage
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
      
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
      
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
    clearUserId: (state) => {
      state.userToken = null;
      localStorage.removeItem('userId'); // Remove the user token from local storage
    },
    setIslogin: (state, action) => {
      state.isLogin = action.payload;
      localStorage.setItem('isLogin', action.payload.toString()); // Store as a string in localStorage
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
      localStorage.setItem('isAdmin', action.payload.toString()); // Store as a string in localStorage
    },
    clearIslogin: (state) => {
      state.isLogin = false;
      localStorage.removeItem('isLogin');
    },
    clearIsAdmin: (state,action) => {
      state.isAdmin = action.payload;
      localStorage.setItem('isAdmin',action.payload.toString());
    },
  
  }
});

export const {setImg,setUsername,clearuserName,clearImg,setIsAdmin,clearIsAdmin,collection, setToken, setUserToken, setProducts, setSignIn ,setIsabout,setIslogin,setIscart,setUserid,clearUserToken,clearIslogin ,clearUserId ,setIsLoading,setWishlist} = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUserToken = (state) => state.auth.userToken;
export const selectProducts = (state) => state.auth.products;
export const selectWishlist = (state) => state.auth.wishlist;
export const selectIsabout = (state) => state.auth.isAbout;
export const selectIslogin = (state) => state.auth.isLogin;
export const selectIscollection = (state) => state.auth.isCollection;
export const selectIscart = (state) => state.auth.isCart;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectUserid = (state) => state.auth.userId;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const seleectImg = (state) => state.auth.img;
export const selectUsername = (state) => state.auth.userName;

export default authSlice.reducer;
