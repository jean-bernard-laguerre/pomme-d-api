import React, { useEffect } from 'react';
import { useState } from 'react';

const useForm = (form, validation) => {

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState(form);
    const [valid, setValid] = useState(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSelectChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        setErrors(validation(values));
    }, [values]);

    useEffect(() => {
        setValid(Object.keys(errors).length === 0)
    }, [errors]);

    return { 
        handleChange,
        handleSelectChange, 
        values,
        valid, 
        errors 
    };
};

export default useForm;