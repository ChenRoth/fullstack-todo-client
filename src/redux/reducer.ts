export interface IState {
    isLogged: boolean;
    isLoginPending: boolean;
}

export interface IAction {
    type: ActionType;
    payload: Record<string, any>;
}

export enum ActionType {
    LoginPending = 'LOGIN_PENDING',
    LoginSuccess = 'LOGIN_SUCCESS',
    LoginFail = 'LOGIN_FAIL',
}

const getInitialState = (): IState => {
    return {
        isLoginPending: false,
        isLogged: false,
    };
}

export const reducer = (state: IState = getInitialState(), action: IAction) => {
    switch (action.type) {
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