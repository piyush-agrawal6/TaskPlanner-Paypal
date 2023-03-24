import * as types from "./types";
import axios from "axios";

//send otp
export const registerUser = (userData) => async (dispatch) => {
  try {
    const data = await axios.post(
      `https://impossible-slippers-colt.cyclic.app/user/new`,
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
      `https://impossible-slippers-colt.cyclic.app/user/register`,
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
          task: data.data.task,
          sprint: data.data.sprint,
          allUsers: data.data.allUsers,
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
      `https://impossible-slippers-colt.cyclic.app/user/googleregister`,
      form
    );
    if (data.data.message === "user registered successfully") {
      dispatch({
        type: types.REGISTER_USER_SUCCESS,
        payload: {
          token: data.data.token,
          message: data.data.message,
          user: data.data.user,
          task: data.data.task,
          sprint: data.data.sprint,
          allUsers: data.data.allUsers,
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
      `https://impossible-slippers-colt.cyclic.app/user/update?id=${id}`,
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
      "https://impossible-slippers-colt.cyclic.app/user/login",
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

// Task Operations

//Create task
export const postTask = (FormData) => async (dispatch) => {
  try {
    const data = await axios.post(
      `https://impossible-slippers-colt.cyclic.app/task`,
      FormData
    );
    dispatch({ type: types.ADD_TASK_SUCCESS, payload: data.data.task });
  } catch (error) {
    console.log(error);
  }
};

//Create sprint
export const postSprint = (FormData) => async (dispatch) => {
  try {
    const data = await axios.post(
      `https://impossible-slippers-colt.cyclic.app/sprint`,
      FormData
    );
    console.log(data.data.sprint);
    dispatch({ type: types.ADD_SPRINT_SUCCESS, payload: data.data.sprint });
  } catch (error) {
    console.log(error);
  }
};

//get task
export const getTask = (organization) => async (dispatch) => {
  try {
    const data = await axios.get(
      `https://impossible-slippers-colt.cyclic.app/task?organization=${organization}`
    );
    console.log(data.data.Tasks);
    dispatch({ type: types.GET_TASK_SUCCESS, payload: data.data.Tasks });
  } catch (error) {
    console.log(error);
  }
};

//get sprint
export const getSprint = (organization) => async (dispatch) => {
  try {
    const data = await axios.get(
      `https://impossible-slippers-colt.cyclic.app/sprint?organization=${organization}`
    );
    console.log(data.data.Sprints);
    dispatch({ type: types.GET_SPRINT_SUCCESS, payload: data.data.Sprints });
  } catch (error) {
    console.log(error);
  }
};

//get assignees
export const getAssignee = (organization) => async (dispatch) => {
  try {
    const data = await axios.get(
      `https://impossible-slippers-colt.cyclic.app/user?organization=${organization}`
    );
    console.log(data.data.user);
    dispatch({ type: types.GET_USER_SUCCESS, payload: data.data.user });
  } catch (error) {
    console.log(error);
  }
};
