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
    if (data.data.message === "user registered successfully") {
      dispatch({
        type: types.REGISTER_USER_SUCCESS,
        payload: {
          token: data.data.token,
          message: data.data.message,
          user: data.data.user,
          organization: data.data.user.organization,
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

//Register User by google sign in
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
          organization: data.data.user.organization,
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

//edit user
export const editUser = (id, userData) => async (dispatch) => {
  try {
    await axios.put(
      `https://impossible-slippers-colt.cyclic.app/user/update?id=${id}`,
      userData
    );
    dispatch({
      type: types.UPDATE_USER_SUCCESS,
      payload: userData.organization,
    });
  } catch (error) {
    console.log(error);
  }
};

//login
export const authLogin = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://impossible-slippers-colt.cyclic.app/user/login",
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//logout
export const authLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

// Task and sprint Operations

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
    dispatch({ type: types.GET_USER_SUCCESS, payload: data.data.user });
  } catch (error) {
    console.log(error);
  }
};

//delete sprint
export const deleteSprint = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `https://impossible-slippers-colt.cyclic.app/sprint/delete?id=${id}`
    );
    dispatch({ type: types.DELETE_SPRINT_SUCCESS, payload: id });
  } catch (error) {
    console.log(error);
  }
};

//delete task
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `https://impossible-slippers-colt.cyclic.app/task/delete?id=${id}`
    );
    dispatch({ type: types.DELETE_TASK_SUCCESS, payload: id });
  } catch (error) {
    console.log(error);
  }
};

//edit task
export const editTask = (id, taskData) => async (dispatch) => {
  try {
    let data = await axios.put(
      `https://impossible-slippers-colt.cyclic.app/task/update?taskid=${id}`,
      taskData
    );
    console.log(data);
    dispatch({
      type: types.EDIT_TASK_SUCCESS,
      payload: { item: data.data.task, id },
    });
  } catch (error) {
    console.log(error);
  }
};
