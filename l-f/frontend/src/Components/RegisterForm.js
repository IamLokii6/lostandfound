import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:5000/register', {
        name,
        email,
        password,
      });
      toast.success('Successfully registered!');
      // Clear the form
      setName('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
    } catch (error) {
      setError(error.response ? error.response.data : 'Error registering user');
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
                    <form onSubmit={handleRegister}>
                      <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                      <div className="form-outline mb-4">
                        <input type="text" className="form-control form-control-lg" value={name} onChange={(e) => setName(e.target.value)} aria-label="Name" required />
                        <label className="form-label">Your Name</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" required />
                        <label className="form-label">Your Email</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" required />
                        <label className="form-label">Password</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" className="form-control form-control-lg" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} aria-label="Repeat Password" required />
                        <label className="form-label">Repeat Password</label>
                      </div>
                      {error && <p className="text-danger">{error}</p>}
                      <div className="d-grid">
                        <button type="submit" className="btn btn-success btn-lg gradient-custom-4 text-body" disabled={loading}>
                          {loading ? 'Registering...' : 'Register'}
                        </button>
                      </div>
                    </form>
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

export default RegisterForm;
