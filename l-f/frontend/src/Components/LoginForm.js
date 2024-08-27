import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      toast.success('Login successful');
      localStorage.setItem('token', response.data.token);
      navigate('/main'); // Use the route path without the file extension
    } catch (error) {
      setError(error.response ? error.response.data : 'Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <section className="vh-100 bg-image" style={{ backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')` }}>
        <div className="mask">
          <div className="container h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-6">
                <div className="card" style={{ borderRadius: '12px' }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Login</h2>
                    <form onSubmit={handleLogin}>
                      <div className="form-outline mb-4">
                        <input 
                          type="email" 
                          id="loginEmail" 
                          className="form-control form-control-sm" 
                          style={{ width: '500px', height: '45px' }} 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          aria-label="Email" 
                          required 
                        />
                        <label className="form-label" htmlFor="loginEmail">Your Email</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input 
                          type="password" 
                          id="loginPassword" 
                          className="form-control form-control-sm" 
                          style={{ width: '500px', height: '45px' }} 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          aria-label="Password" 
                          required 
                        />
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                      </div>
                      {error && <p className="text-danger">{error}</p>}
                      <div className="d-grid">
                        <button 
                          type="submit" 
                          className="btn btn-success btn-lg text-body" 
                          style={{ 
                            width: '500px', height: '45px',
                            background: 'linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1))'
                          }} 
                          disabled={loading}
                        >
                          {loading ? 'Logging in...' : 'Login'}
                        </button>
                      </div>
                    </form>
                    <p className="text-center text-muted mt-4 mb-0">
                      Don't have an account? <a href="/register">Register</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginForm;
