import React, { ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import {loginAction} from '../../actions';
import { IState } from '../../redux/reducer';
import { Redirect } from 'react-router-dom';

interface LoginPageProps {
    isLogged: boolean;
    login(username: string, password: string): void;
}

interface LoginPageState {
    username: string;
    password: string;
}

export class _LoginPage extends React.Component<LoginPageProps, LoginPageState> {    
    state = {
        username: '',
        password: '',
    }

    render() {
        const {isLogged} = this.props;
        const {username, password} = this.state;

        if (isLogged) {
            return <Redirect to="/"/>;
        }

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input name="username" onChange={this.onChange} value={username} required/>
                    <input name="password" onChange={this.onChange} type="password" value={password} required/>
                    <button type="submit">LOGIN</button>
                </form>
            </div>
        )
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        this.setState<any>({
            [key]: e.target.value
        });
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const {username, password} = this.state;
        const {login} = this.props;
        login(username, password);
    }
}

const mapStateToProps = (state: IState) => ({
    isLogged: state.isLogged,
});

const mapDispatchToProps = (dispatch: any) => ({
    login: (username: string, password: string) => dispatch(loginAction(username, password)),
});

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(_LoginPage); 