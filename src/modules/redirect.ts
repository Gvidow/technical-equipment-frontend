import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
    const navigate = useNavigate();

    const customNavigate = (url: string) => {
        navigate(url);
    };

    return customNavigate;
};
