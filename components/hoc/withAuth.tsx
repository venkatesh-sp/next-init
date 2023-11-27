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
        };

        React.useEffect(() => {
            // Call the asynchronous validation function
            validateToken();
        }, []);

        // Render nothing while token validation is in progress
        if (token === undefined) {
            return null;
        }

        // Render the wrapped component if the token is valid
        return <WrappedComponent {...props} />;
    };

    return AuthWrapper;
};

export default withAuth;
