import { ITodo } from "../models/todo";

export interface IState {
    isLogged: boolean;
    isLoginPending: boolean;
    todos: ITodo[];
    isLoadingTodos: boolean;
}

export interface IAction {
    type: ActionType;
    payload: Record<string, any>;
}

export enum ActionType {
    LoginPending = 'LOGIN_PENDING',
    LoginSuccess = 'LOGIN_SUCCESS',
    LoginFail = 'LOGIN_FAIL',
    GetTodosPending = 'GET_TODOS_PENDING',
    GetTodosSuccess = 'GET_TODOS_SUCCESS',
    GetTodosFail = 'GET_TODOS_FAIL',
    ToggleComplete = 'TOGGLE_COMPLETE',
    DeleteTodo = 'DELETE_TODO',
}

const getInitialState = (): IState => {
    return {
        todos: [],
        isLoadingTodos: false,
        isLoginPending: false,
        isLogged: false,
    };
}

export const reducer = (state: IState = getInitialState(), action: IAction) => {
    switch (action.type) {
        case ActionType.DeleteTodo: {
            const {todoId} = action.payload;
            const modifiedTodos = state.todos.slice();
            const index = modifiedTodos.findIndex(todo => todo.id === todoId);
            modifiedTodos.splice(index, 1);
            return {
                ...state,
                todos: modifiedTodos
            }
        }

        case ActionType.GetTodosPending: {
            return {
                ...state,
                isLoadingTodos: true,
            }
        }

        case ActionType.GetTodosSuccess: {
            const {todos} = action.payload;
            return {
                ...state,
                todos,
                isLoadingTodos: false,
            };
        }

        case ActionType.GetTodosFail: {
            return {
                ...state,
                isLoadingTodos: false,
            }
        }

        case ActionType.ToggleComplete: {
            const {todoId} = action.payload;
            const modifiedTodos = state.todos.slice();
            const index = modifiedTodos.findIndex(todo => todo.id === todoId);
            const todo = modifiedTodos[index];
            modifiedTodos[index] = {...todo, complete: !todo.complete};
            return {
                ...state,
                todos: modifiedTodos
            }
        }

        case ActionType.LoginPending: {
            return {
                ...state,
                isLoginPending: true
            };
        }

        case ActionType.LoginSuccess: {
            return {
                ...state,
                isLogged: true,
                isLoginPending: false,
            };
        }
        case ActionType.LoginFail: {
            return {
                ...state,
                isLoginPending: false,
            };
        }
        default: {
            return state;
        }
    }
}