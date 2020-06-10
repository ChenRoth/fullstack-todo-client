import React, { ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { registerAction } from '../../actions';
import { IState } from '../../redux/reducer';
import { Redirect, Link } from 'react-router-dom';

interface RegisterPageProps {
    isLogged: boolean;
    register(username: string, password: string, email: string): void;
}

interface RegisterPageState {
    username: string;
    password: string;
    email: string;
}

export class _RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {
    state = {
        username: '',
        password: '',
        email: '',
    }

    render() {
        const { isLogged } = this.props;
        const { email, username, password } = this.state;

        if (isLogged) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Username</label>
                        {' '}
                        <input name="username" onChange={this.onChange} value={username} placeholder="username*" required />
                    </div>
                    <div>
                        <label>Password</label>
                        {' '}
                        <input name="password" onChange={this.onChange} type="password" placeholder="password*" value={password} required />
                    </div>
                    <div>
                        <label>Email</label>
                        {' '}
                        <input name="email" type="email" onChange={this.onChange} placeholder="email" value={email} />
                    </div>
                    <div>
                        <button type="submit">REGISTER</button>
                    </div>
                </form>
                <div>
                    ALREADY REGISTERED? <Link to="/login">CLICK HERE TO LOGIN</Link>
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
        const { username, password, email } = this.state;
        const { register } = this.props;
        register(username, password, email);
    }
}

const mapStateToProps = (state: IState) => ({
    isLogged: state.isLogged,
});

const mapDispatchToProps = (dispatch: any) => ({
    register: (username: string, password: string, email: string) => dispatch(registerAction(username, password, email)),
});

export const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(_RegisterPage); 