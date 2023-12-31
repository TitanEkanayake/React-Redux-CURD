import axios from "axios";
import { toast } from "react-toastify";

import {
  ADD_USER,
  DELETE_USER,
  FAIL_REQUEST,
  GET_USER_LIST,
  GET_USER_OBJ,
  LOGOUT_USER,
  MAKE_REQUEST,
  UPDATE_USER,
} from "./ActionType";
import { setUserObj } from "./userSlice";

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};
export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};
export const geUserList = (data) => {
  return {
    type: GET_USER_LIST,
    payload: data,
  };
};
export const deleteUser = () => {
  return {
    type: DELETE_USER,
  };
};
export const addUser = () => {
  return {
    type: ADD_USER,
  };
};
export const updateUser = () => {
  return {
    type: UPDATE_USER,
  };
};
export const getUserObj = (data) => {
  return {
    type: GET_USER_OBJ,
    payload: data,
  };
};
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const FetchUserList = () => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      const response = await axios.get("http://localhost:5000/users");
      const userlist = response.data;
      dispatch(geUserList(userlist));
    } catch (error) {
      dispatch(failRequest(error.message));
    }
  };
};

export const Removeuser = (code) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      await axios.delete(`http://localhost:5000/users/${code}`);
      dispatch(deleteUser());
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionAddUser = (data) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      await axios.post("http://localhost:5000/users", data);
      dispatch(addUser());

      toast.success("User Added successfully.");
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionUpdateUser = (data, code) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      await axios.patch(`http://localhost:5000/users/${code}`, data);
      dispatch(updateUser());
      toast.success("User Updated successfully.");
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FetchUserObj = (code) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      const res = await axios.get(`http://localhost:5000/users/${code}`);
      const userlist = res.data;
      dispatch(getUserObj(userlist));
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};
export const FetchLoggedinUserObj = (id) => {
  return async (dispatch) => {
    dispatch(makeRequest());

    try {
      const res = await axios.get(`http://localhost:5000/admins/${id}`);
      const userobj = res.data;
      dispatch(setUserObj(userobj));
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};
