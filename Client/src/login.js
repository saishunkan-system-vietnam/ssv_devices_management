import React, {useState} from 'react';
import signin from './api/signin';

function Login(props) {
    const [username, setUserName] = useState('');
    const [passwd, setPasswd] = useState('');

    function handleLogin(event) {
        event.preventDefault();
        let params = {};
        params.username = username;
        params.passwd = passwd;
        signin.signin(params).then(responseJson => {
            if (responseJson['0'] === 200) {
                localStorage.setItem('newUser', responseJson['payload']['userName']);
                localStorage.setItem('Token', responseJson['payload']['token']);
                props.history.push('/dashboard');
            } else if(responseJson['0'] === 902) {
                localStorage.setItem('newUser', responseJson['payload']['userName']);
                localStorage.setItem('Token', responseJson['payload']['token']);
                props.history.push('/user/update');
            } else {
                props.history.push('/');
            }
        });
    }

    function onChangeUsername(event) {
        setUserName(event.target.value);
    }

    function onChangePassword(event) {
        setPasswd(event.target.value);
    }

    return (
        <div className="page-wrapper">
            <div className="page-content--bge5">
                <div className="container">
                    <div className="login-wrap">
                        <div className="login-content">
                            <div className="login-logo">
                                <img src="./images/icon/saishunkan-system-vietnam-logo.jpg" alt="CoolAdmin" />
                            </div>
                            <div className="login-form">
                                <form action="" method="post">
                                    <div className="form-group">
                                        <label>User name</label>
                                        <input className="au-input au-input--full" type="text" name="username"
                                               placeholder="User name" onChange={(event) => {
                                            onChangeUsername(event)
                                        }}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input className="au-input au-input--full" type="password" name="passwd"
                                               placeholder="Password" onChange={(event) => {
                                            onChangePassword(event)
                                        }}/>
                                    </div>
                                    <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit"
                                            onClick={(event) => {
                                                handleLogin(event);
                                            }}>sign in
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;