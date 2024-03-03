import {
     DECREMENT,
     INCREMENT,
     PUSHSEARCH
 } from "./type";

 export const increment = () => async dispatch => {

    //console.log('called')
    dispatch({
        type : INCREMENT
    })
 }

 export const decrement = () => async dispatch => {

    dispatch({
        type : DECREMENT
    })
 }

 export const pushSearch = (props) => async dispatch => {
    //console.log('called with ', props)
    dispatch({
        type : PUSHSEARCH,
        payload: props

    })
 }