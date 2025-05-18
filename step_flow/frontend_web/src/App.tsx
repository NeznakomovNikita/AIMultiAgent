import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './features/auth/components/LoginForm';
import RegistrationForm from './features/auth/components/RegistrationForm';
import './App.css';

// Временный компонент для главной страницы/дашборда
const Dashboard = () => <h2>Главная страница (Дашборд)</h2>;
// Временный компонент для страницы "Не найдено"
const NotFound = () => <h2>Страница не найдена (404)</h2>;

function App() {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '20px', background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', gap: '15px' }}>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/login">Вход</Link>
            </li>
            <li>
              <Link to="/register">Регистрация</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
