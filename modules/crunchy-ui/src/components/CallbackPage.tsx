import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        
        if (window.location.pathname === '/callback' && urlParams.size <= 0) {            
            navigate('/');
        }
    }, [navigate]);

    return <></>;   
};
  
export default CallbackPage;