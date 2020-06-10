import { ActionType, IAction } from "./redux/reducer";
import { Dispatch } from "redux";
import axios from 'axios';
import { LoginResponse } from "./models/loginResponse";
import { LOCAL_STORAGE_TOKEN_KEY } from "./consts";

const SERVER_URL = 'http://localhost:4000';

export function loginAction(username: string, password: string) {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({
            type: ActionType.LoginPending,
            payload: {}
        });

        try {
            const { data: { token } } = await axios.post<LoginResponse>(`${SERVER_URL}/users/login`, {
                username,
                password,
            });

            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

            dispatch({
                type: ActionType.LoginSuccess,
                payload: {}
            });
        } catch (e) {
            dispatch({
                type: ActionType.LoginFail,
                payload: {}
            });
        }

    }
}