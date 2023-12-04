import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import cookie from 'js-cookie';
import { Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Eye } from '@styled-icons/bootstrap/Eye';
import { EyeSlash } from '@styled-icons/bootstrap/EyeSlash';

import AuthService from '@/services/AuthService';

const authservice = new AuthService();

const validateLoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .test('valid-email', 'Email must contain @ and end with .com', (value) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }),
  password: Yup.string().required('Password is required'),
});

const validateEmailSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .test('valid-email', 'Email must contain @ and end with .com', (value) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }),
});

const LoginForm: React.FC<any> = () => {
  const router = useRouter();
  const [tenant, setTenant] = useState<any>(undefined);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  }: any = useForm({
    resolver: yupResolver(!tenant ? validateEmailSchema : validateLoginSchema),
  });

  const searchTenant = async ({ email }: any) => {
    try {
      const response = await authservice.searchTenant({ email });
      setTenant(response);
      cookie.set('tenantID', response.ID);
      cookie.set('tenant', response.Slug);
    } catch (error: any) {
      setError('email', { type: 'custom', message: error.error });
    }
  };

  const removeSubdomain = (hostname: string) => {
    // Split the hostname into parts using dots as separators
    const parts = hostname.split('.');

    // Check if there is a subdomain (more than one part)
    if (parts.length > 1) {
      // Remove the first part (subdomain) and join the remaining parts
      return parts.slice(1).join('.');
    }

    // No subdomain, return the original hostname
    return hostname;
  };
  const handleLogin = async ({ email, password }: any) => {
    const response = await authservice.login({ email, password });
    authservice.setAccessToken(response.token);
    const { protocol, hostname, port } = window.location;

    let url = `${protocol}//${tenant.Slug}.${removeSubdomain(hostname)}`;

    if (port) {
      url += `:${port}/`;
    } else {
      url += '/';
    }

    router.push(url);
  };

  React.useEffect(() => {
    const token = cookie.get('accessToken');
    const tenantId = cookie.get('tenantID');
    const tenant = cookie.get('tenant');
    if (!tenant || !tenantId || !token) {
      authservice.purgeAuth();
      cookie.remove('tenantID');
      cookie.remove('tenant');
      router.push('/login');
      return;
    }
    if (token) {
      router.push('/');
    }
  }, []);

  return (
    <div className="pt-5 mx-auto mt-auto">
      <Image src="/assets/logo.svg" alt="" className="img-fluid" height={150} width={150} />
      <h2 className="mt-4 fw-bolder">Welcome to RSSL</h2>
      {!tenant ? (
        <form onSubmit={handleSubmit(searchTenant)}>
          <div>
            <label className="mt-2">
              Email
              <span className="ms-1" style={{ color: 'red', fontWeight: 'bold' }}>
                *
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter email address"
              {...register('email', {
                required: true,
              })}
              className={`form-control mt-2 ${errors.email ? 'is-invalid' : ''}`}
              style={{ width: '380px', height: '54px' }}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div>
            <Button
              type="submit"
              className="f-16 mt-2"
              style={{
                width: '380px',
                height: '55px',
                background: '#283891',
                border: '#00AEEF',
                borderRadius: '12px',
                fontSize: '16px',
              }}
            >
              Continue
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label className="mt-2">Tenant</label>
            <input
              type="text"
              disabled
              {...register('tenant')}
              placeholder={tenant?.Slug}
              className="form-control mt-2"
              style={{ width: '380px', height: '54px' }}
            />
          </div>
          <div>
            <label className="mt-2">Email</label>
            <input
              type="text"
              disabled
              {...register('email', {
                required: true,
              })}
              placeholder={watch('email')}
              className="form-control mt-2"
              style={{ width: '380px', height: '54px' }}
            />
          </div>
          <div>
            <label className="mt-2">
              Password
              <span className="ms-1" style={{ color: 'red', fontWeight: 'bold' }}>
                *
              </span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: true,
              })}
              className="form-control mt-2"
              style={{ width: '380px', height: '54px' }}
            />
            <i onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye width="20" height="20" className="tenanterror-icon" />
              ) : (
                <EyeSlash width="20" height="20" className="tenanterror-icon" />
              )}
            </i>
          </div>
          <Button type="submit" className="px-4 py-3 lh-13">
            Login
          </Button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
