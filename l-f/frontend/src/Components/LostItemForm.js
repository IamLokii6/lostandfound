import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar2 from './Navbar2';

function LostItemForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    mobileNumber: '',
    itemName: '',
    dateLost: '',
    location: '',
    description: '',
    category: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
for (const key in formData) {
  if (key === 'dateLost' && formData[key]) {
    data.append(key, new Date(formData[key]).toISOString());
  } else if (key === 'image') {
    data.append(key, formData[key]); // Append the image file
  } else {
    data.append(key, formData[key]);
  }
}


    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

    try {
      const response = await fetch('http://localhost:5000/api/lost-items', {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      toast.success('Item submitted successfully!'); // Show success message
      // Clear the form
      setFormData({
        studentName: '',
        rollNumber: '',
        mobileNumber: '',
        itemName: '',
        dateLost: '',
        location: '',
        description: '',
        category: '',
        image: null,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Navbar2/>
    <div className="container mt-5">
      <ToastContainer /> {/* Add ToastContainer to render toast notifications */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Post Lost Item</h5>
              <form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="mb-3">
                  <label htmlFor="studentName" className="form-label">Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="rollNumber" className="form-label">Roll Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="rollNumber"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="itemName" className="form-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="itemName"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dateLost" className="form-label">Date Lost</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateLost"
                    name="dateLost"
                    value={formData.dateLost}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Books">Books</option>
                    <option value="Stationery">Stationery</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Wallets">Wallets</option>
                    <option value="Keys">Keys</option>
                    <option value="ID Cards">ID Cards</option>
                    <option value="Bags">Bags</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={handleChange}
                  />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LostItemForm;
