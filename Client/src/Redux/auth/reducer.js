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
  organization: "default",
  task: [],
  sprint: [],
  allUsers: [],
};
export function authReducer(state = initialState, { type, payload }) {
  switch (type) {
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
        task: payload.task,
        sprint: payload.sprint,
        allUsers: payload.allUsers,
        organization: payload.organization,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          user: { ...state.data.user, organization: payload },
        },
        organization: payload,
      };
    case types.EDIT_TASK_SUCCESS:
      return {
        ...state,
        task: [
          ...state.task.map((elem) => {
            if (elem._id === payload.id) {
              return payload.item;
            }
            return elem;
          }),
        ],
      };
    case types.AUTH_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        data: {
          isAuthenticated: false,
        },
      };
    case types.ADD_TASK_SUCCESS: {
      return { ...state, task: [...state.task, payload] };
    }
    case types.ADD_SPRINT_SUCCESS: {
      return { ...state, sprint: [...state.sprint, payload] };
    }
    case types.GET_SPRINT_SUCCESS: {
      return { ...state, sprint: payload };
    }
    case types.GET_USER_SUCCESS: {
      return { ...state, allUsers: payload };
    }
    case types.GET_TASK_SUCCESS: {
      return { ...state, task: payload };
    }
    case types.DELETE_SPRINT_SUCCESS: {
      return {
        ...state,
        sprint: [
          ...state.sprint.filter((elem) => {
            return elem._id !== payload;
          }),
        ],
      };
    }
    case types.DELETE_TASK_SUCCESS: {
      return {
        ...state,
        task: [
          ...state.task.filter((elem) => {
            return elem._id !== payload;
          }),
        ],
      };
    }
    default:
      return state;
  }
}
