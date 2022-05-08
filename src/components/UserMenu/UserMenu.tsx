import React, {useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";

const UserMenu = () => {
    const {isAuth, loading} = useTypedSelector(state => state.auth)
    useEffect(() => {
        console.log(isAuth)
    }, [isAuth])

    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1>{isAuth ? "YES" : "NO"}</h1>
        </div>
    );
};

export default UserMenu;