import React, { useState } from 'react';
import { useRouter } from 'next/router';

import cookie from 'js-cookie';

import AuthService from '@/services/AuthService';


const authservice = new AuthService();

const LoginForm: React.FC<any> = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await authservice.login({ username, password })
        authservice.setAccessToken(response.token)
        router.push("/")
    };

    React.useEffect(() => {
        const token = cookie.get('accessToken');
        if (token) {
            router.push("/")
        }
    }, []);

    return (
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
