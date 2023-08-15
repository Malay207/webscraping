import React, { useState } from 'react'

const LoginForm = (props) => {
    const [data, setdata] = useState({
        email: '',
        password: ''
    })
    const handlechange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/data/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });
            const json = await response.json();
            localStorage.setItem('scrap', json.authToken);

        } catch (error) {
            console.log(error);

        }
        props.close();
    }
    return (
        <div>
            <form onSubmit={
                submit
            }>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={data.email} onChange={handlechange} required name='email' />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={data.password} onChange={handlechange} required minLength={6} name='password' />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form></div>
    )
}

export default LoginForm