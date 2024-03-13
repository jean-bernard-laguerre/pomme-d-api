import React, { useEffect } from 'react';
import { useState } from 'react';
import { BASE_URL } from '../services/config';
import styles from '../style/form.module.css';
import useForm from '../hooks/useForm';

const validateForm = (form) => {
            
    let errors = {}
    let fields = ['email', 'username', 'password']

    fields.forEach((field) => {
        if(form[field] == '' || form[field] == undefined) {
            errors[field] = 'This field is required'
        }
    })
    return errors
}

const Register = () => {

    const form = useForm({
        email: '',
        username: '',
        password: '',
    }, validateForm)
    

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${BASE_URL}register`, {
            method: 'POST',
            body: JSON.stringify(form.values),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 1){
                    window.location.href = "./login"
            }
        })
    };


    return (
        <section className={`${styles.container} ${styles.login}`}>
            <h2>Create your account</h2>
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

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={form.handleChange}
                    placeholder="Username"
                />
                {form.errors.username && (
                    <p className={styles.error}>{form.errors.username}</p>
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
                    title='Create your account'
                    disabled={!form.valid}
                    onClick={handleSubmit}
                >
                    Register
                </button>
            </form>
        </section>
    )
};

export default Register;