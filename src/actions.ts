import axios from 'axios';
import moment from 'moment';
import { Dispatch } from "redux";
import { LoginResponse } from "./models/loginResponse";
import { ITodo } from "./models/todo";
import { ActionType, IAction } from "./redux/reducer";
import { getToken, saveToken } from "./token";
import { AddTodoResponse } from './models/addTodoResponse';

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
                    todos: todos.map(todo => ({...todo, dueDate: new Date(todo.dueDate), creationDate: new Date(todo.creationDate)})),
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

export function addTodoAction(description: string, dueDate: Date) {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({
            type: ActionType.AddTodoPending,
            payload: {}
        });

        try {
            const creationDate = new Date();

            const { data: { todoId } } = await axios.post<AddTodoResponse>(`${SERVER_URL}/todos`, {
                description,
                dueDate: moment(dueDate).format('YYYY-MM-DD HH:mm'),
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            const todo: ITodo = {
                id: todoId,
                complete: false,
                dueDate,
                description,
                creationDate,
            }

            dispatch({
                type: ActionType.AddTodoSuccess,
                payload: {
                    todo,
                }
            });
        } catch (e) {
            dispatch({
                type: ActionType.AddTodoFail,
                payload: {}
            });
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