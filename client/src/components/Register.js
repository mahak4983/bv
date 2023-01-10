import React, { useState } from 'react';
import axios from "axios";


const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    

    const loginHandler = (e) => {
        e.preventDefault();


        axios('/api/v1/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:name,
                email: email,
                password: password,
                address:address
            })
        })
            .then(res => { })
            .catch(err => { });

    };

    return (
        <div className="container-fluid center">

            <h1>Register</h1>
            <form onSubmit={e => { loginHandler(e); }} >
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            name="name"
                            type="string"
                            className="validate"
                            onChange={e => {
                                setName(e.target.value);
                            }}
                            value={name}
                        />
                        <label for="name">Name</label>
                    </div>
                </div>
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
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            name="address"
                            type="string"
                            className="validate"
                            onChange={e => {
                                setAddress(e.target.value);
                            }}
                            value={address}
                        />
                        <label for="address">address</label>
                    </div>
                </div>
                <button type="submit">Register</button>

            </form>
        </div>


    );
};

export default Register;
