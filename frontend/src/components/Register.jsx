import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Make sure this is pointing to the correct CSS file

const Register = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { username,email, password };
    console.log("Registering user:", data);

    // Dummy validation
    if (!email || !password) {
      setMessage("Vänligen fyll i alla fält.");
    } else {
      setMessage("Registrering skickad!");
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        <h2 className="login-title">Registrera konto</h2>
        <form onSubmit={handleRegister} className="login-form">
        <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            required
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-postadress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {message && <p className="error-message">{message}</p>}
          <button type="submit">Registrera</button>
        </form>
        <p className="register-text">
          Har du redan ett konto?
          <Link to="/login" className="register-link">
            Logga in här
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
