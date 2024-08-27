import React, { useEffect, useState } from 'react';
import './DisplayItems.css';

function LostItemsList() {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedCardId, setExpandedCardId] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); // State to track the search term

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/lost-items');
        if (!response.ok) {
          throw new Error('Failed to fetch lost items');
        }
        const data = await response.json();
        setLostItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);

  const handleCardClick = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = lostItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lost Items</h2>
      <div className="row mb-4">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search by item name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="row">
        {filteredItems.length === 0 ? (
          <p>No lost items found</p>
        ) : (
          filteredItems.map(item => (
            <div key={item._id} className="col-md-4 mb-4">
              <div 
                className={`card1 ${expandedCardId === item._id ? 'expanded' : ''}`} 
                onClick={() => handleCardClick(item._id)}
              >
                <img 
                  src={item.image ? `http://localhost:5000/${item.image}` : '/path/to/placeholder-image.png'} 
                  className="card-img-top" 
                  alt={item.itemName || 'Placeholder'} 
                />
                <div className="card-body">
                  <h5 className="card-title">{item.itemName}</h5>
                  <p className="card-text">
                    <strong>Student Name:</strong> {item.studentName} <br />
                    <strong>Roll Number:</strong> {item.rollNumber} <br />
                    <strong>Mobile Number:</strong> {item.mobileNumber} <br />
                    <strong>Date Lost:</strong> {new Date(item.dateLost).toLocaleDateString()} <br />
                    <strong>Location:</strong> {item.location} <br />
                    <strong>Description:</strong> {item.description} <br />
                    <strong>Category:</strong> {item.category}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LostItemsList;
