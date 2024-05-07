'use server';

import { AxiosError } from 'axios';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { LoginData } from './app/login/page';
import { RegisterData } from './app/register/page';
import apiClient from './services/apiClient';
import { strict } from 'assert';

const secretKey = 'cat123';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 hour from now')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256']
  });
  return payload;
}

export async function login(formData: LoginData) {
  // Verify credentials && get the user
  let user = {
    email: formData.email,
    password: formData.password
  };

  try {
    const res = await apiClient.post('/auth', user);
    // @ts-ignore
    const payload = res.data;
    payload.token = res.headers['x-auth-token'];

    // Create the session
    const expires = new Date(Date.now() + 3600 * 1000);
    const session = await encrypt({ payload, expires });

    // Save the session in a cookie
    cookies().set('session', session, { expires, httpOnly: true });
    return {
      status: true,
      data: res.data
    };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return {
        status: false,
        data: err.response?.data
      };
    }
  }
}

export async function signup(formData: RegisterData) {
  // Verify credentials && get the user
  let user = {
    username: formData.username,
    email: formData.email,
    password: formData.password
  };

  try {
    const res = await apiClient.post('/users', user);
    // @ts-ignore
    const payload = res.data;
    payload.token = res.headers['x-auth-token'];

    // Create the session
    const expires = new Date(Date.now() + 3600 * 1000);
    const session = await encrypt({ payload, expires });
    // Save the session in a cookie
    cookies().set('session', session, { expires, httpOnly: true });
    return {
      status: true,
      data: res.data
    };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return {
        status: false,
        data: err.response?.data
      };
    }
  }
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) });
}

type Session = {
  payload: {
    _id: string;
    email: string;
    token: string;
  };
  expires: number;
};

export async function getSession(): Promise<Session | null> {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  // TODO - valdiate if the cookie is legit
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 3600 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires
  });
  return res;
}

type MessageRequest = {
  text: string;
  sender: string;
  conversationId: string;
};

export async function sendMessage(payload: MessageRequest) {
  console.log('sa payload=', payload);

  try {
    const res = await apiClient.post('/messages', payload);
    return {
      status: true,
      data: res.data
    };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return {
        status: false,
        data: err.response?.data
      };
    }
  }
}
