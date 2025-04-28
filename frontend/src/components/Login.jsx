
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const dispatch = useDispatch();
const [loginUser , {isLoading:loginLoading}] = useLoginUserMutation()
const navigate = useNavigate()



const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setMessage('Vänligen fyll i alla fält.');
    return;
  }

  try {
    const response = await loginUser({ email, password }).unwrap();
    const {token , user} = response;
    dispatch(setUser({user}))
    alert("Inloggning lyckades!");
    setMessage('');
    navigate("/");
  } catch (error) {
    setMessage(error?.data?.message || "Vänligen ange en giltig e-postadress och lösenord.");
  }
};


  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Vänligen logga in</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-postadress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {message && <p className="text-red-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
          >
            Logga in
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Har du inget konto?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Registrera dig här
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
