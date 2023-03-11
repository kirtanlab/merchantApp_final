 import * as tabaActionTypes from "./tabActions";

 const initialState = {
    isTradeModalVisible: false,
 }

 const tabReducer = (state = initialState, action) => {
    switch(action.type) {
        case tabaActionTypes.SET_TRADE_MODEL_VISIBILITY:
            return{
                ...state,
                isTradeModalVisible: action.payload.isVisible
            }
            default: 
                return state
    }
 }

 export default tabReducer;