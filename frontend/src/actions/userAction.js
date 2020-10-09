import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST_ADMIN, USER_UPDATE_SUCCESS_ADMIN,
  USER_UPDATE_FAIL_ADMIN
} from './types'
import axios from 'axios'

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })
    const {
      auth: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }
    const { data } = await axios.get('/users/profile', config)
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })
    const {
      auth: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }
    const { data } = await axios.put('/users/profile', user, config)
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const usersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      auth: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }

    const { data } = await axios.get('/users', config)
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      auth: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }

    const { data } = await axios.delete(`/users/${id}`, config)
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST_ADMIN,
    })

    const {
      auth: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/users/${user._id}`, user, config)

    dispatch({ type: USER_UPDATE_SUCCESS_ADMIN })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL_ADMIN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
