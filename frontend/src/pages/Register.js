import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../api';
import { AuthContext } from '../context/AuthContext';

const Register = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState(null);

    useEffect(() => {
    document.title = "Register";
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      login(res.data.token);
      navigate('/watchlist');
    } catch (err) {
      setError('Registration failed: ' + err.message);
    }
  }
  

  return (
    <div className="container my-5 p-5 rounded-3 shadow" style={{ maxWidth: '30vw', border: '1px solid #ccc', color: "white" }}>
      <h2 className='text-center text-decoration-underline'>Register</h2>
      <br/>
      <h6 className='text-center'>Create your account to to make the most out of "App".</h6>

      <form className='my-5' onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input className="form-control mb-3" id="firstName" name="firstName" onChange={handleChange} required />

        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input className="form-control mb-3" id="lastName" name="lastName" onChange={handleChange} required />

        <label htmlFor="email" className="form-label">Email</label>
        <input className="form-control mb-3" id="email" name="email" onChange={handleChange} required />

        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control mb-3" id="password" name="password" onChange={handleChange} required />

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-50 mt-3 rounded">Sign Up</button>
        </div>
      </form>
    </div>
  )
};

export default Register;