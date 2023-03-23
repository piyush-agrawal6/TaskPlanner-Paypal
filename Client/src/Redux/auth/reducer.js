import * as types from "./types";
const TOKEN = localStorage.getItem("token");
const initialState = {
  userLogin: { loading: false, error: false, message: "" },
  userRegister: { loading: false, error: false, message: "" },
  data: {
    isAuthenticated: !!TOKEN,
    token: TOKEN,
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  cart: [],
  order: [],
};
export function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.LOGIN_USER_REQUEST:
      return {
        ...state,
        userLogin: { loading: true, error: false },
      };
    case types.LOGIN_USER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        userLogin: { loading: false, error: false, message: payload.message },
        data: {
          isAuthenticated: true,
          token: payload.token,
          user: payload.user,
        },
      };
    case types.LOGIN_USER_ERROR:
      return {
        ...state,
        userLogin: { loading: false, error: true, message: "Error" },
      };
    case types.REGISTER_USER_REQUEST:
      return {
        ...state,
        userRegister: { loading: true, error: false },
      };
    case types.REGISTER_USER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        userRegister: {
          loading: false,
          error: false,
          message: payload.message,
        },
        data: {
          isAuthenticated: true,
          token: payload.token,
          user: payload.user,
        },
        cart: payload.cart,
        order: payload.order,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: {
          isAuthenticated: true,
          token: payload.token,
          user: payload.user,
        },
      };
    case types.REGISTER_USER_ERROR:
      return {
        ...state,
        userRegister: { loading: false, error: true, message: "Error" },
      };
    case types.AUTH_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        data: {
          isAuthenticated: false,
          token: null,
          user: null,
        },
      };
    case types.GET_CART_SUCCESS: {
      return { ...state, cart: payload };
    }
    case types.ADD_TO_CART_SUCCESS: {
      return { ...state, cart: [...state.cart, payload] };
    }
    default:
      return state;
  }
}
