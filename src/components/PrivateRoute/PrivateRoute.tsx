import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../redux/reducer';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    isLogged: boolean;
}

class _PrivateRoute extends React.Component<PrivateRouteProps> {
    render() {
        const {isLogged, ...rest} = this.props;
        if (!isLogged) {
            return <Redirect to="/login"/>
        }
        return <Route {...rest}/>
    }
} 


const mapStateToProps = (state: IState) => ({
    isLogged: state.isLogged,
});

export const PrivateRoute = connect(mapStateToProps)(_PrivateRoute);