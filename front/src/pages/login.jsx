import React, { useEffect } from 'react';
import AuthContext from '../context/authContext';
import { useState, useContext } from 'react';
import { BASE_URL } from '../services/config'
import styles from '../style/form.module.css';
import useForm from '../hooks/useForm';

const validateForm = (form) => {

    let errors = {}
    let fields = ['email', 'password']

    fields.forEach((field) => {
        if(form[field] == '' || form[field] == undefined) {
            errors[field] = 'This field is required'
        }
    })
    return errors
}

const Login = () => {

    const user = useContext(AuthContext)
    const [valid, setValid] = useState(false)

    const form = useForm({
        email: '',
        password: '',
    }, validateForm)

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${BASE_URL}login`, {
            method: 'POST',
            body: JSON.stringify(form.values),
        })
            .then((response) => response.json())
            .then((auth) => {
                if (auth.status == 1){
                    user.login(auth.data)
                    window.location.href = "./"
            }
        })
    };

    return (
        <section className={`${styles.container} ${styles.login}`}>
            <h2>Login</h2>
            <form className={styles.form}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={form.handleChange}
                    placeholder="Email"
                />
                {form.errors.email && (
                    <p className={styles.error}>{form.errors.email}</p>
                )}
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={form.handleChange}
                    placeholder="Password"
                />
                {form.errors.password && (
                    <p className={styles.error}>{form.errors.password}</p>
                )}
                <button
                    title='Login to your account'
                    disabled={!form.valid}
                    onClick={handleSubmit}>Login</button>
            </form>
            <div>
                <span>
                    Not registered yet?&nbsp; 
                    <a href="./register">Register</a>
                </span>
            </div>
        </section>
    );
};

export default Login;