import React, {useState} from 'react';
import styles from '../../../style/header.module.css';

const Drawer = ({user}) => {

    const [open, setOpen] = useState(false);

    return (
        <div className={styles.drawer}>
            <div className={styles.drawer_header}>
                    <span
                        className={styles.brand}
                    >
                        {
                            user.currentUser ?
                            `${user.currentUser.username}`
                            :
                            'No user logged in'
                        }
                    </span>
                    <button className={styles.drawer_button}
                        onClick={() => setOpen(!open)}
                    >
                        <span className={styles.drawer_icon}>&#9776;</span>
                    </button>
            </div>
            { open && <div className={styles.drawer_content}>
                    
                    {
                        user.currentUser ?
                        <>
                            <button
                                className={styles.drawer_button}
                                onClick={() => window.location.href='./'}
                            >
                                Home
                            </button>
                            <button
                                className={styles.drawer_button}
                                onClick={() => window.location.href='./products'}
                            >
                                Products
                            </button>
                            <button
                                className={styles.drawer_button}
                                onClick={user.logout}
                            >
                                Logout
                            </button>
                        </>
                        :
                        <>
                            <button
                                className={styles.drawer_button}
                                onClick={() => window.location.href='./register'}
                            >
                                Register
                            </button>
                            <button
                                className={styles.drawer_button}
                                onClick={() => window.location.href='./login'}
                            >
                                Login
                            </button>
                        </>
                    }
            </div>}
        </div>
    )
};

export default Drawer;