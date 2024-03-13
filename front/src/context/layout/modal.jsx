import React from 'react';
import { useState } from 'react';
import styles from '../../style/modal.module.css';

const Modal = ({ children, title, openModal, setOpenModal }) => {

    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <>
            {openModal &&
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <span>
                                <h2>{title}</h2>
                            </span>
                            <button
                                title='Close'
                                className={styles.close}
                                onClick={handleClose}>&times;</button>
                        </div>
                        <div className={styles.body}>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default Modal;