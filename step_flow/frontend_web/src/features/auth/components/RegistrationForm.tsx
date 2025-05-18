import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { registerUser } from '../store/authThunks'; // Предполагаемый thunk для регистрации
// import { AppDispatch } from '../../../app/store';
import styles from './RegistrationForm.module.css'; // Импортируем наш CSS-модуль

const RegistrationForm: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Для отображения ошибок

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Сбрасываем ошибку при новой попытке
    if (password !== confirmPassword) {
      setError("Пароли не совпадают, лошара!"); // Ну а хули
      return;
    }
    // dispatch(registerUser({ email, password }));
    console.log('Registration attempt:', { email, password }); // Пока просто логируем
    // Здесь можно добавить логику успешной регистрации, например, редирект или сообщение
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Регистрация</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="register-email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="register-password" className={styles.label}>Пароль:</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            placeholder="••••••••"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className={styles.label}>Подтвердите пароль:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
            placeholder="••••••••"
          />
        </div>
        {error && <p className={styles.alert}>{error}</p>} 
        <button
          type="submit"
          className={styles.button}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;