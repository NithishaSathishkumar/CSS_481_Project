import React, { useState } from 'react';
import styles from '../Styling/ProfilePage.module.css';

function ProfilePage() {
  const [name, setName] = useState('Daniel Jackson');
  const [username, setUsername] = useState('danieljackson');
  const [email, setEmail] = useState('daniel.jackson@example.com');
  const [profileImage, setProfileImage] = useState('./assets/profile.png');
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the changes, perhaps send to server
    console.log('Profile updated:', { name, username, email, profileImage });
    // Implement actual save logic here
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.editProfileForm} onSubmit={handleSubmit}>
        <div className={styles.profileImageContainer}>
          <img
            src={previewImage || profileImage}
            className={styles.profileImage}
            alt="Profile"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className={styles.profileField}>
          <label className={styles.fieldLabel}>Name:</label>
          <input
            type="text"
            className={styles.fieldInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.profileField}>
          <label className={styles.fieldLabel}>Username:</label>
          <input
            type="text"
            className={styles.fieldInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.profileField}>
          <label className={styles.fieldLabel}>Email:</label>
          <input
            type="email"
            className={styles.fieldInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.saveButton}>Save Changes</button>
      </form>
    </div>
  );
}

export default ProfilePage;
