export interface IState {
    counter: number;
    isLoadingValue: boolean;
}

export interface IAction {
    type: ActionType;
    payload: Record<string, any>;
}

export enum ActionType {
    IncrementStart = 'INCREMENT_START',
    IncrementSuccess = 'INCREMENT_SUCCESS',
}

const getInitialState = (): IState => {
    return {
        counter: 0,
        isLoadingValue: false,
    };
}

export const reducer = (state: IState = getInitialState(), action: IAction) => {
    switch (action.type) {
        case ActionType.IncrementStart: {
            return {
                ...state,
                isLoadingValue: true,
            }
        }
        case ActionType.IncrementSuccess: {
            const { value } = action.payload;
            return {
                ...state,
                counter: state.counter + value,
                isLoadingValue: false,
            }
        }
        default: {
            return state;
        }
    }
}