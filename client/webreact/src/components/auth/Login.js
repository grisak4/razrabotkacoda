import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const [login, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);  // Состояние для отслеживания ошибки
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setHasError(false);
                navigate('/admin');
            } else {
                console.log('Ошибка входа:', data.message || 'Произошла ошибка');
                setHasError(true);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setHasError(true);
        }
    };

    return (
        <div className='gradient'>
            <div className='container'>
                <div className='form-header'>
                    Sign In
                </div>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='username'>
                        <input
                            type='text'
                            placeholder='username or email'
                            value={login}
                            onChange={(e) => setUsername(e.target.value)}
                            className={hasError ? 'input-error' : ''}
                        />
                    </div>
                    <div className='password'>
                        <input
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={hasError ? 'input-error' : ''}
                        />
                    </div>
                    <div>
                        <input type='submit' value='Sign In' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
