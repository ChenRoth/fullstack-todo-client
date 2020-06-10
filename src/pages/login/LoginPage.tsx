import React, { ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../../actions';
import { IState } from '../../redux/reducer';
import { Redirect, Link } from 'react-router-dom';

// LoginPage is wrapped with the WithRouter HOC (see the end of the file)
// this injects extra props into LoginPage, such as the `history` prop
// we define LoginPageProps to extend RouteComponentProps so Typescript would know we're using the WithRouter and should have extra props
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
        const { isLogged } = this.props;
        const { username, password } = this.state;

        if (isLogged) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>
                            Username
                            </label>
                        {' '}
                        <input name="username" onChange={this.onChange} value={username} placeholder="username" required />

                    </div>
                    <div>
                        <label>
                            Password
                        </label>
                        {' '}
                        <input name="password" onChange={this.onChange} type="password" placeholder="password" value={password} required />
                    </div>
                    <div>
                        <button type="submit">LOGIN</button>
                    </div>
                </form>
                <div>
                    NOT REGISTERED YET? <Link to="/register">CLICK HERE TO REGISTER</Link>
                </div>
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
        const { username, password } = this.state;
        const { login } = this.props;
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