// // import React, { useState } from 'react'
// // import { Link } from 'react-router-dom'

// // const Login = () => {
// //   const [message, setMessage]= useState('');
// //   const [email,setEmail]= useState('');
// //   const [password, setPassword] =useState('');
// //   const handleLogin = async(e)=>{
// //     e.preventDefault();
// //     const data = {
// //       email,
// //       password
// //     }
// //     console.log(data)
// //   }
// //   return (
// //     <section className='h-screen flex items-center justify-center'>
// //       <div className='max-w-sm border shadow bg-white mx-auto p-8'>
// //         <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
// //         <form onSubmit={ handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
// // <input type="text" name="email" id="email" 
// // onChange={(e) => setEmail(e.target.value)}
// // placeholder="Email Adress" required 
// // className='w-full bg-gray-100 focus:outline-none px-5 py-3'/>

// // <input type="password" name="password" id="password"
// // onChange={(e) => setPassword(e.target.value)}
// // placeholder="Password" required 
// // className='w-full bg-gray-100 focus:outline-none px-5 py-3'/>
// // {
// // message && <p className='text-red-500'>{message}</p>
// // }
// // <button type='submit' className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'>Login</button>
// //         </form>
// //         <p className='my-5 italic text-sm text-center'>Dont have an account? <Link to="/register" className='text-red-700 px-1 underline'>Register</Link> here.</p>
// //       </div>
// //     </section>
// //   )
// // }

// // export default Login


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../App'; 

// const Login = () => {
//   const [message, setMessage] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const data = { email, password };
//     console.log(data);

//     if (!email || !password) {
//       setMessage('Vänligen fyll i alla fält.');
//     } else {
//       setMessage('');
//     }
//   };

//   return (
//     <section className="login-section">
//       <div className="login-card">
//         <h2 className="login-title">Vänligen logga in</h2>
//         <form onSubmit={handleLogin} className="login-form">
//           <input
//             type="text"
//             name="email"
//             id="email"
//             placeholder="E-postadress"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Lösenord"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {message && <p className="error-message">{message}</p>}
//           <button type="submit">Logga in</button>
//         </form>
//         <p className="register-text">
//           Har du inget konto?{' '}
//           <Link to="/register" className="register-link">
//             Registrera dig här
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    console.log(data);

    if (!email || !password) {
      setMessage('Vänligen fyll i alla fält.');
    } else {
      setMessage('');
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
