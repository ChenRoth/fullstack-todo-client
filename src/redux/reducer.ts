export interface IState {
    
}

export interface IAction {
    type: ActionType;
    payload: Record<string, any>;
}

export enum ActionType {
    
}

const getInitialState = (): IState => {
    return {
      
    };
}

export const reducer = (state: IState = getInitialState(), action: IAction) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}