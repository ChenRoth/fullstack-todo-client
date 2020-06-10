import React from 'react';
import { connect } from 'react-redux';
import { incrementAsyncAction, incrementSyncAction } from '../../actions';
import { IState } from '../../redux/reducer';

interface ICounterProps {
    currentValue: number;
    isLoading: boolean;
    incrementSync(value: number): void;
    incrementAsync(): void;
}

// this is the presentational ("dumb") component which doesn't have a direct reference to redux
// it receives data (state) and behavior (dispatch actions) as props from the container ("smart") component
class _Counter extends React.Component<ICounterProps> {
    render() {
        const { currentValue, isLoading, incrementAsync, incrementSync } = this.props;
        return (
            <div>
                <p>current value is {currentValue}</p>
                <button disabled={isLoading} onClick={() => incrementSync(1)}>SYNC INCREMENT</button>
                <button
                    style={{ width: 200 }}
                    disabled={isLoading}
                    onClick={incrementAsync}>
                    {isLoading ? 'LOADING...' : 'ASYNC INCREMENT'}
                </button>
            </div>
        )
    }
}


// this is a function which receives the redux state and returns props to be passed to the presentational component (_Counter)
// this way, we can create data props that are derived from redux state
const mapStateToProps = (state: IState) => ({
    currentValue: state.counter,
    isLoading: state.isLoadingValue,
});

// this is a function which receives the redux dispatch fn and returns props to be passed to the presentational component (_Counter)
// this way, we can create behavior props that can dispatch actions to the redux reducer
const mapDispatchToProps = (dispatch: any) => ({
    incrementSync: (value: number) => dispatch(incrementSyncAction(value)),
    incrementAsync: () => dispatch(incrementAsyncAction()),
});

// this is the container ("smart") component which wraps the presentational component above
// it does so by using react-redux's connect(mapStateToProps, mapDispatchToProps) to create an HOC (higher order component)
// around _Counter
// the rest of the app doesn't know about _Counter, it only "sees" Counter (the container component)
export const Counter = connect(mapStateToProps, mapDispatchToProps)(_Counter);