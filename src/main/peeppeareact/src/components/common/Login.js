import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAuth } from '../../AuthContext';

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (credentials) => {
    await login(credentials);
    navigate('/home'); // Adjust the path to your desired page
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>You are already logged in</p>
      ) : (
        <LoginForm onSubmit={handleLoginSubmit} />
      )}
    </div>
  );
};

export default Login;
