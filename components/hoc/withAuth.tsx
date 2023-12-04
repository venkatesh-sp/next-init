// components/withAuth.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import AuthService from '@/services/AuthService';

const authservice = new AuthService();

const withAuth = (WrappedComponent: React.FC) => {
    const AuthWrapper: React.FC = (props) => {
        const router = useRouter();
        const token = cookie.get('accessToken');
        const [loading, setLoading] = useState(true);

        const validateToken = async () => {
            // Replace the following with your actual token validation logic,
            // for example, making a request to the server to validate the token.
            // const isValidToken = await api.validateToken(token);

            // For demonstration purposes, assume the token is valid if it exists.
            const isValidToken = !!token;

            if (!isValidToken) {
                // Redirect to the login page if the token is not valid or doesn't exist
                router.push('/login');
            }

            // Set loading to false after token validation
            setLoading(false);
        };

        useEffect(() => {
            // Call the asynchronous validation function only on the client side
            if (typeof window !== 'undefined') {
                validateToken();
            }
        }, []);

        // If the token doesn't exist, don't render the protected page
        if (!token || loading) {
            return <div>Loading...</div>;
        }

        // Render the wrapped component if the token is valid
        return <WrappedComponent {...props} />;
    };

    return AuthWrapper;
};

export default withAuth;
