import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL} from './types'
import axios from 'axios'

export const getUserProfile = () => async (dispatch,getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })
    const {auth : {userInfo}} = getState()
    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }
    const { data } = await axios.get('/users/profile',config)
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


export const updateUserProfile = (user)=>async(dispatch,getState)=>{
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })
    const {auth : {userInfo}} = getState()
    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }
    const { data } = await axios.put('/users/profile',user,config)
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