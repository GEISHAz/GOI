import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const [isLogin, setIsLogin] = useState(
        !!sessionStorage.getItem("accessToken")
    );

    useEffect(() => {
        const checkLoginStatus = () => {
            const accessToken = sessionStorage.getItem("accessToken");
            setIsLogin(!!accessToken);
        };

        checkLoginStatus();
    }, []);

    console.log(isLogin);

    return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;