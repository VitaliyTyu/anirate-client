import React from 'react';
import css from './Footer.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';


const Footer = () => {
    return (
      
        <footer className={css.footer} >
            <div className={css.container}>                                
                <div className={css.copyright}>
                    © 2022 AniRate  by <span>LOL</span>
                </div>    
            </div>   
        </footer>
    
    );
};

export default Footer; 