import axios from 'axios';
import { Dispatch } from "redux";
import { LoginResponse } from "./models/loginResponse";
import { ITodo } from "./models/todo";
import { ActionType, IAction } from "./redux/reducer";
import { getToken, saveToken } from "./token";

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

            saveToken(token);

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

export function getTodosAction() {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({
            type: ActionType.GetTodosPending,
            payload: {}
        });

        try {
            const { data: todos } = await axios.get<ITodo[]>(`${SERVER_URL}/todos`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            });
            dispatch({
                type: ActionType.GetTodosSuccess,
                payload: {
                    todos,
                },
            });
        } catch (e) {
            dispatch({
                type: ActionType.GetTodosFail,
                payload: {},
            });
        }
    }
}

export function toggleCompleteAction(todoId: number) {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            await axios.put(`${SERVER_URL}/todos/${todoId}/toggle`, undefined, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            dispatch({
                type: ActionType.ToggleComplete,
                payload: {
                    todoId,
                }
            })
        } catch (e) {

        }
    }
}

export function deleteTodo(todoId: number) {
    return async (dispatch: Dispatch<IAction>) => {
        await axios.delete(`${SERVER_URL}/todos/${todoId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })

        dispatch({
            type: ActionType.DeleteTodo,
            payload: {
                todoId,
            },
        });
    }
}