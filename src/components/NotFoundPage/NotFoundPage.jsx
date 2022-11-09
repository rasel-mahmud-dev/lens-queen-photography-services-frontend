import React from 'react';
import { useNavigate, useRouteError } from "react-router-dom";
import Button from "../Button/Button.jsx";

const NotFoundPage = () => {
    
    const error = useRouteError();
    const navigate = useNavigate();
  
    return (
        <div>
            <div className="flex justify-center items-center h-screen">
            <div className="text-center text-dark-800  text-xl">
                <h1 className="text-dark-800 font-bold text-6xl">Oops!</h1>
                <p className="my-6 font-medium text-dark-700">Sorry, an unexpected error has occurred.</p>
                <p className="text-dark-500 italic font-semibold text-3xl">
                    <i>{error.statusText || error.message}</i>
                </p>
                <div className="mt-6">
                    <Button className="btn-primary mx-auto" onClick={() => navigate(-1)}>Go to back</Button>
                </div>
            </div>
        </div>
  </div>
    );
};

export default NotFoundPage;
