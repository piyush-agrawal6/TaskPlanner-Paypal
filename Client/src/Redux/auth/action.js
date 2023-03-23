import * as types from "./types";
import axios from "axios";

//send otp
export const registerUser = (userData) => async (dispatch) => {
  try {
    const data = await axios.post(
      `https://shy-lion-snaps.cyclic.app/user/new`,
      userData
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

//Register User
export const checkOTP = (form) => async (dispatch) => {
  try {
    const data = await axios.post(
      `https://shy-lion-snaps.cyclic.app/user/register`,
      form
    );
    console.log(data.data);
    if (data.data.message === "user registered successfully") {
      dispatch({
        type: types.REGISTER_USER_SUCCESS,
        payload: {
          token: data.data.token,
          message: data.data.message,
          user: data.data.user,
          cart: data.data.cart,
          order: data.data.order,
        },
      });
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

//Register User
export const googleRegister = (form) => async (dispatch) => {
  try {
    const data = await axios.post(
      `https://shy-lion-snaps.cyclic.app/user/googleregister`,
      form
    );
    if (data.data.message === "user registered successfully") {
      dispatch({
        type: types.REGISTER_USER_SUCCESS,
        payload: {
          token: data.data.token,
          message: data.data.message,
          user: data.data.user,
          cart: data.data.cart,
          order: data.data.order,
        },
      });
    }
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const editUser = (userData, id) => async (dispatch) => {
  try {
    const data = await axios.put(
      `https://shy-lion-snaps.cyclic.app/user/update?id=${id}`,
      userData
    );
    console.log(data.data);
    dispatch({
      type: types.UPDATE_USER_SUCCESS,
      payload: {
        token: data.data.token,
        message: data.data.message,
        user: data.data.user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const authLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_USER_REQUEST });
    const res = await axios.post(
      "https://shy-lion-snaps.cyclic.app/user/login",
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const authLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

//Cart Operations

//get cart products
export const getCartProducts = (id) => async (dispatch) => {
  try {
    const data = await axios.get(
      `https://shy-lion-snaps.cyclic.app/cart?userId=${id}`
    );
    dispatch({
      type: types.GET_CART_SUCCESS,
      payload: data.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};

//add to cart
export const addToCart = (cartData) => async (dispatch) => {
  try {
    const data = await axios.post(
      `https://shy-lion-snaps.cyclic.app/cart`,
      cartData
    );
    dispatch({
      type: types.ADD_TO_CART_SUCCESS,
      payload: cartData,
    });
    console.log(data.data);
  } catch (error) {
    console.log(error);
  }
};
