import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../redux/reducer';
import { logoutAction } from '../../actions';
import './Header.css';

interface HeaderProps {
    isLogged: boolean;
    logout(): void;
}

class _Header extends React.Component<HeaderProps> {
    render() {
        const {logout, isLogged} = this.props;
        return (
            <header className="header">
                <h4>Welcome to the Amazing TODO App!</h4>
                <div style={{flex: 1}}></div>
                {isLogged ? <button onClick={logout}>LOG OUT</button> : null}
            </header>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    isLogged: state.isLogged,
});

const mapDispatchToProps = (dispatch: any) => ({
    logout: () => dispatch(logoutAction()),
});

export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header);