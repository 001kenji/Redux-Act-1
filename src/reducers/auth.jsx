import { 
    INCREMENT,
    DECREMENT,
    PUSHSEARCH
 } from "../action/type";

const initialState = {
    count : 0,
    searchHistry : []
}
export default function (state= initialState, action) {

    const {type, payload} = action
    switch (type) {
        case INCREMENT:
            //console.log('called +', state.count)
            return {
                ...state,
                count : state.count + 1
            }
        case DECREMENT:
            //console.log('called -', state.count)
            return {
                ...state,
                count : state.count - 1
            }

        case PUSHSEARCH:
            state.searchHistry.push(payload)
            //console.log('called -', state.count)
            return {
                ...state,
                
            }
    
        default:
            return{
                ...state
            }
            
    }
    
}