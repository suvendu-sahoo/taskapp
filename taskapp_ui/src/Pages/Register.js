import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import UserService from '../Services/User';

const Register = (props) => {
    const [user, setUser] = useState({ name: '', email: '', password: '' });

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    
    let navigate = useNavigate();

    const resetForm = () => {
        setUser({ name: '', email: '', password: '' });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        Swal.showLoading();

        UserService
        .register(user)
        .then((response) => {
            Swal.fire({ icon: 'success', title: 'Success!', text: response.data.message });
            navigate('/');
        })
        .catch((error) => {
            Swal.fire({icon: 'error', title: 'Oops...', text: error.response.data.message});
        });;
    };

    return (
        <section className="vh-100">
            <div className="mask d-flex align-items-center h-100 ">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Register</h2>
                                    <form onSubmit={ onSubmit }>
                                        <div className="form-outline mb-4">
                                            <label htmlFor="name" className="form-label">Name:</label>
                                            <input type="text" name="name" onChange={ onChange } className="form-control form-control-lg" placeholder="Enter Name" required />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label htmlFor="email" className="form-label">Email:</label>
                                            <input type="email" name="email" onChange={ onChange } className="form-control form-control-lg" placeholder="Enter Email" required />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label htmlFor="password" className="form-label">Password:</label>
                                            <input type="password" name="password" onChange={ onChange } className="form-control form-control-lg" placeholder="Enter Password" required />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-success btn-block btn-lg gradient-custom-4" type="submit">Register</button>
                                        </div>
                                        <p className="text-center text-muted mt-5 mb-0">Already have an account?&nbsp;
                                            <a href="#!" className="fw-bold text-body">
                                                <u><Link to="/">Login</Link></u>
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

export default Register;