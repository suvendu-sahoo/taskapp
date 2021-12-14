import React, { useState, useRef  } from "react";
import { Link, useNavigate   } from "react-router-dom";
import Swal from 'sweetalert2';

import UserService from "../Services/User";

const Login = (props) => {
    const [user, setUser] = useState({ email: '', password: '' });
    
    let navigate = useNavigate();

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setUser({ email: '', password: '' });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        Swal.showLoading();

        UserService
        .login(user)
        .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.data));
            navigate('/task');
        })
        .catch((error) => {
            Swal.fire({icon: 'error', title: 'Oops...', text: error.response.data.message});
        });
    };

    return (
        <section className="vh-100">
            <div className="mask d-flex align-items-center h-100">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Login</h2>
                                    <form onSubmit={onSubmit}>
                                        <div className="form-outline mb-4">
                                            <label htmlFor="email" className="form-label">Email:</label>
                                            <input type="email" name="email" onChange={onChange} className="form-control form-control-lg" placeholder="Enter Email" required />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label htmlFor="password" className="form-label">Password:</label>
                                            <input type="password" name="password" onChange={onChange} className="form-control form-control-lg" placeholder="Enter Password" required/>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-success btn-block btn-lg gradient-custom-4" type="submit">Login</button>
                                        </div>
                                        <p className="text-center text-muted mt-5 mb-0">Don't have an account?&nbsp;
                                            <a href="#!" className="fw-bold text-body">
                                                <u><Link to="/register">Register</Link></u>
                                            </a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;