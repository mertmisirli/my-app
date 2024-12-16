import React, { useState } from 'react';
import '../styles/Profile.css';  // Add custom styling (optional)
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  // Example user data (Replace with dynamic data from API or state)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "A passionate software developer who loves learning new technologies and building impactful products.",
    profilePicture: "https://via.placeholder.com/150",
    location: "New York, USA",
    joinedDate: "January 2022",
    followers: 1200,
    following: 300,
    skills: ["JavaScript", "React", "Node.js", "CSS", "HTML"],
    recentActivity: [
      "Started a new project: Personal Portfolio",
      "Completed a React Tutorial",
      "Contributed to Open Source: Project X"
    ],
    contact: {
      phone: "+1 123 456 7890",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe"
    },
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (

    <>
      <Header />
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="email">{user.email}</p>
            <p className="location">{user.location}</p>
            <p className="joined">Joined: {user.joinedDate}</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="profile-bio">
          <h3>About Me</h3>
          <p>{user.bio}</p>
        </div>

        {/* Skills Section */}
        <div className="profile-skills">
          <h3>Skills</h3>
          <ul>
            {user.skills.map((skill, index) => (
              <li key={index} className="skill-item">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Activity Section */}
        <div className="profile-activity">
          <h3>Recent Activity</h3>
          <ul>
            {user.recentActivity.map((activity, index) => (
              <li key={index} className="activity-item">
                {activity}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="profile-contact">
          <h3>Contact Information</h3>
          <p><strong>Phone:</strong> {user.contact.phone}</p>
          <p><strong>GitHub:</strong> <a href={user.contact.github} target="_blank" rel="noopener noreferrer">{user.contact.github}</a></p>
          <p><strong>LinkedIn:</strong> <a href={user.contact.linkedin} target="_blank" rel="noopener noreferrer">{user.contact.linkedin}</a></p>
        </div>

        {/* Statistics Section */}
        <div className="profile-stats">
          <div className="stat">
            <h4>Followers</h4>
            <p>{user.followers}</p>
          </div>
          <div className="stat">
            <h4>Following</h4>
            <p>{user.following}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="profile-footer">
          <button className="edit-profile-btn" onClick={handleEditClick}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
