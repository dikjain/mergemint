'use client';

import { OAuthProvider } from 'appwrite';
import { account } from '../lib/appwrite';

const Login = () => {

  const loginWithGitHub = () => {
    try {
      const response =  account.createOAuth2Session(
        OAuthProvider.Github,
        'http://localhost:3000/dashboard',
        'http://localhost:3000/login'     
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div  className='flex flex-col  bg-white items-center justify-center h-screen'>
        <h1 className='text-2xl font-bold text-black'  >Login</h1>
      <button onClick={loginWithGitHub} className='bg-blue-500 text-white p-2 rounded-md'>Login with GitHub</button>
    </div>
  )
}

export default Login;