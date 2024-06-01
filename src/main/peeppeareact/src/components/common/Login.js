import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAuth } from '../../AuthContext'; 

const Login = () => {
  const { isAuthenticated, login } = useAuth(); 
  const navigate = useNavigate();

  const handleLoginSubmit = (credentials) => {
    login(credentials); 
    navigate('/cashcards'); // Adjust the path to your desired page
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
