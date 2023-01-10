import React, { useState } from 'react';

import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = (e) => {
        e.preventDefault();


        axios('https://nervous-pear-pumps.cyclic.app/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => {})
            .catch(err => { });

    };

    return (
        <div className="container-fluid center">
            
                <h1>Login</h1>
                <form onSubmit={e => { loginHandler(e); }} >
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                name="email"
                                type="email"
                                className="validate"
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                                value={email}
                            />
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                name="password"
                                type="password"
                                className="validate"
                                onChange={e => {
                                    setPassword(e.target.value);
                                }}
                                value={password}
                            />
                            <label for="password">Password</label>
                        </div>
                    </div>
                    <button  type="submit">Login</button>

                </form>
     </div>
       

    );
};

export default Login;
