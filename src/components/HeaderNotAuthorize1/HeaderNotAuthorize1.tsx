import React from "react";
import  css from "./headerNotAuthorize1.module.css"




function HeaderNotAuthorize1(){
    return(
        <div className="App">
            <header className={css.header} id="header">  
                <div className={css.container}>   
                    <div className={css.header_inner}>
                            <div className={css.header__logo}>AniRate</div>
                            <nav className={css.nav}>
                                <a className={css.nav__link}  href="#" >Поиск</a>
                                <a className={css.nav__link}  href="#">Войти</a>
                                <a className={css.nav__link}  href="#">Регистрация</a>
                            </nav>
                    </div>  
                </div>
            </header> 

             
        
        </div>
    );
}

export default HeaderNotAuthorize1;