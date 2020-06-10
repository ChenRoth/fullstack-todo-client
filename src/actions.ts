import { ActionType, IAction } from "./redux/reducer";
import { Dispatch } from "redux";

// this is a sync action creator
// we don't use it directly, but instead invoke it in order to create an action object
// which we can pass as an argument to redux dispatch function
export function incrementSyncAction(value: number) {
    // for sync actions, we simply return an action object
    return {
        type: ActionType.IncrementSuccess,
        payload: {
            value,
        }
    };
}

// this is an async action creator
export function incrementAsyncAction() {
    // for async actions, we actually return a callback function that receives a dispatch function as an argument
    // this way, redux hands over its dispatch function to us to decide when exactly to dispatch
    return async (dispatch: Dispatch<IAction>) => {
    
        // this is a sync action that we dispatch to inform the state we're about to perform an async action
        // we can use this to make the UI when to start showing a "loading" indicator to the user
        dispatch({
            type: ActionType.IncrementStart,
            payload: {},
        });

        // this simulates an async operation, such as an HTTP request
        const value = await new Promise(res => {
            setTimeout(() => res(5), 2000);
        });

        // this is the actual action that we dispatch with the result of the async operation
        // we'll use this action to update the state with the value and also signal that the "loading" is complete        
        dispatch({
            type: ActionType.IncrementSuccess,
            payload: {
                value,
            }
        });
    }
}