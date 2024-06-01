import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAuth } from '../../AuthContext'; 

const Login = () => {
  const { isAuthenticated, login } = useAuth(); 
  const navigate = useNavigate();

  const handleLoginSubmit = (token) => {
    login(token); 
    navigate('/cashcards'); 
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
