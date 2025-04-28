
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser,{isLoading}] = useRegisterUserMutation()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!username || !email || !password) {
      setMessage("Vänligen fyll i alla fält.");
      return;
    }
  
    const data = { username, email, password };
  
    try {
      await registerUser(data).unwrap();
      alert("Registrering lyckades!");
      setMessage('');
      navigate('/login');
    } catch (error) {
      console.log(error);
      setMessage(error?.data?.message || "Registrering misslyckades");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Registrera konto</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
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
          {message && (
            <p className={`text-sm ${message === 'Registrering skickad!' ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
          >
            Registrera
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Har du redan ett konto?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Logga in här
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
