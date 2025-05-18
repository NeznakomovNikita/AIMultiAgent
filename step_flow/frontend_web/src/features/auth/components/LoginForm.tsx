import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../store/authThunks'; // Предполагаемый thunk для логина
// import { AppDispatch } from '../../../app/store';

const LoginForm: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // dispatch(loginUser({ email, password }));
    console.log('Login attempt:', { email, password }); // Пока просто логируем
  };

  return (
    <div style={{ 
      background: '#e0e0e0', 
      padding: '20px', 
      borderRadius: '15px', 
      boxShadow: '9px 9px 16px #bebebe, -9px -9px 16px #ffffff' 
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Вход</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="login-email" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Email:</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: 'calc(100% - 22px)', 
              padding: '10px', 
              border: 'none', 
              borderRadius: '10px', 
              background: '#e0e0e0',
              boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff'
            }}
          />
        </div>
        <div>
          <label htmlFor="login-password" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Пароль:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: 'calc(100% - 22px)', 
              padding: '10px', 
              border: 'none', 
              borderRadius: '10px', 
              background: '#e0e0e0',
              boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff'
            }}
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            padding: '10px 15px', 
            border: 'none', 
            borderRadius: '10px', 
            background: '#e0e0e0', 
            color: '#333',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseDown={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.boxShadow = 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff';
          }}
          onMouseUp={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.boxShadow = '5px 5px 10px #bebebe, -5px -5px 10px #ffffff';
          }}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;