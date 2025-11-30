import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../api';

const Login = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', form);
      if (res) {
        login(res.data.token);
        alert('Login successful!');
        navigate('/watchlist');
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  }
  

  return (
    <div className="container my-5 p-5 rounded-3 shadow" style={{ maxWidth: '20vw', border: '1px solid #ccc', color: "white" }}>
      <h2 className='text-center text-decoration-underline'>Login</h2>
      <br/>
      <h6 className='text-center'>Sign in to organize your watchlist more efficiently.</h6>

      <form className='my-5' onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder='Email' id="email" name="email" onChange={handleChange} required />

        <input type="password" className="form-control mb-3" placeholder='Password' id="password" name="password" onChange={handleChange} required />
        {error && <div className="alert alert-danger">{error}</div>}
        
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-50 mt-3 rounded">Login</button>
        </div>
      </form>
    </div>
  )
};

export default Login;