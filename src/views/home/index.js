import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner } from 'reactstrap';
import '../../styles/admin.scss'; 
import ParticlesBackground from '../../components/ParticlesBackground'; // Import the ParticlesBackground component

// Move userData outside the component to avoid unnecessary re-creation
const userData = {
  profileImage: "/admin_avatar.png",  // Replace with actual image path
  name: "Gavin Kyle Torres",
  role: "Admin",
  email: "gavinkyletorres692@gmail.com",
  phone: "(+63) 9683880788"
};

function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track the loading state

  useEffect(() => {
    setTimeout(() => {
      setUser(userData);
      setLoading(false);
    }, 1000); // Simulate API fetching delay
  }, []);

  return (
 
      <Container>
        {loading ? (
          <div className="text-center mt-5">
            <Spinner color="primary" />  {/* Loading spinner */}
            <h4>Loading user...</h4>
          </div>
        ) : (
          <Card className="profile-card mt-5 p-5">
            <div className="profile-img-container">
              <img
                src={user.profileImage || '/default-avatar.png'}
                alt="Profile"
                className="profile-img"
              />
            </div>
            <h1 className="custom-title">{user.name}</h1>
            <span className="label">{user.role}</span>
            <address className="contact-info">
              <a href={`mailto:${user.email}`} className="contact-link">
                {user.email}
              </a>
              <br />
              <a href={`tel:${user.phone}`} className="contact-link">
                {user.phone}
              </a>
            </address>
          </Card>
        )}
      </Container>
    
  );
}

export default Index;
