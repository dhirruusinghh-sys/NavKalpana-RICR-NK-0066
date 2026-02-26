import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/health'; // Apna backend URL yahan daalein

const HealthApp = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profileData, setProfileData] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    user_id: '',
    age: '',
    biological_sex: 'Male',
    height_cm: '',
    weight_kg: '',
    activity_level: 'Sedentary',
    experience_level: 'Beginner',
    primary_goal: 'Weight Loss'
  });

  // Search state
  const [searchUserId, setSearchUserId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Health profile saved successfully!' });
        setFormData({
          user_id: '',
          age: '',
          biological_sex: 'Male',
          height_cm: '',
          weight_kg: '',
          activity_level: 'Sedentary',
          experience_level: 'Beginner',
          primary_goal: 'Weight Loss'
        });
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to connect to server' });
    } finally {
      setLoading(false);
    }
  };

  const handleGetProfile = async (e) => {
    e.preventDefault();
    if (!searchUserId) {
      setMessage({ type: 'error', text: 'Please enter User ID' });
      return;
    }

    setLoading(true);
    setMessage('');
    setProfileData(null);

    try {
      const response = await fetch(`${API_URL}/${searchUserId}`);
      const data = await response.json();

      if (response.ok) {
        setProfileData(data);
      } else {
        setMessage({ type: 'error', text: data.message || 'Profile not found' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch profile' });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '30px',
      fontSize: '28px',
      fontWeight: 'bold'
    },
    tabs: {
      display: 'flex',
      marginBottom: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    tab: {
      flex: 1,
      padding: '15px',
      border: 'none',
      backgroundColor: '#fff',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.3s',
      color: '#7f8c8d'
    },
    activeTab: {
      backgroundColor: '#3498db',
      color: '#fff'
    },
    card: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#34495e',
      fontWeight: '600',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '2px solid #e0e6ed',
      borderRadius: '8px',
      fontSize: '16px',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
      outline: 'none'
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '2px solid #e0e6ed',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      outline: 'none'
    },
    button: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#27ae60',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px'
    },
    buttonHover: {
      backgroundColor: '#229954'
    },
    message: {
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px',
      textAlign: 'center',
      fontWeight: '500'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px'
    },
    resultCard: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '10px',
      borderLeft: '4px solid #3498db',
      marginBottom: '15px'
    },
    resultTitle: {
      color: '#7f8c8d',
      fontSize: '14px',
      marginBottom: '5px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    resultValue: {
      color: '#2c3e50',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    calculationsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginTop: '20px'
    },
    calcCard: {
      backgroundColor: '#e8f6f3',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      border: '2px solid #1abc9c'
    },
    calcValue: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#16a085',
      marginBottom: '5px'
    },
    calcLabel: {
      color: '#7f8c8d',
      fontSize: '14px',
      textTransform: 'uppercase'
    },
    sectionTitle: {
      color: '#2c3e50',
      marginBottom: '20px',
      fontSize: '20px',
      borderBottom: '2px solid #ecf0f1',
      paddingBottom: '10px'
    },
    searchBox: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px'
    },
    searchInput: {
      flex: 1,
      padding: '12px',
      border: '2px solid #e0e6ed',
      borderRadius: '8px',
      fontSize: '16px'
    },
    searchButton: {
      padding: '12px 24px',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🏥 Health Profile Manager</h1>
      
      <div style={styles.tabs}>
        <button 
          style={{
            ...styles.tab,
            ...(activeTab === 'create' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('create')}
        >
          Create Profile
        </button>
        <button 
          style={{
            ...styles.tab,
            ...(activeTab === 'view' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('view')}
        >
          View Profile
        </button>
      </div>

      {message && (
        <div style={{
          ...styles.message,
          ...(message.type === 'success' ? styles.successMessage : styles.errorMessage)
        }}>
          {message.text}
        </div>
      )}

      {activeTab === 'create' ? (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Create Health Profile</h2>
          <form onSubmit={handleCreateProfile}>
            <div style={styles.grid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>User ID</label>
                <input
                  type="text"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter User ID"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter Age"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Biological Sex</label>
                <select
                  name="biological_sex"
                  value={formData.biological_sex}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Height (cm)</label>
                <input
                  type="number"
                  name="height_cm"
                  value={formData.height_cm}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Height in cm"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Weight (kg)</label>
                <input
                  type="number"
                  name="weight_kg"
                  value={formData.weight_kg}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Weight in kg"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Activity Level</label>
                <select
                  name="activity_level"
                  value={formData.activity_level}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="Sedentary">Sedentary</option>
                  <option value="Light">Light</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Active">Active</option>
                  <option value="Very Active">Very Active</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Experience Level</label>
                <select
                  name="experience_level"
                  value={formData.experience_level}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Primary Goal</label>
                <select
                  name="primary_goal"
                  value={formData.primary_goal}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              style={styles.button}
              disabled={loading}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#229954'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
            >
              {loading ? 'Saving...' : '💾 Save Health Profile'}
            </button>
          </form>
        </div>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>View Health Profile</h2>
          
          <form onSubmit={handleGetProfile} style={styles.searchBox}>
            <input
              type="text"
              value={searchUserId}
              onChange={(e) => setSearchUserId(e.target.value)}
              style={styles.searchInput}
              placeholder="Enter User ID to search"
              required
            />
            <button 
              type="submit" 
              style={styles.searchButton}
              disabled={loading}
            >
              {loading ? 'Loading...' : '🔍 Search'}
            </button>
          </form>

          {profileData && (
            <div>
              <h3 style={styles.sectionTitle}>Profile Details</h3>
              <div style={styles.grid}>
                <div style={styles.resultCard}>
                  <div style={styles.resultTitle}>Age</div>
                  <div style={styles.resultValue}>{profileData.profile.age} years</div>
                </div>
                <div style={styles.resultCard}>
                  <div style={styles.resultTitle}>Sex</div>
                  <div style={styles.resultValue}>{profileData.profile.biological_sex}</div>
                </div>
                <div style={styles.resultCard}>
                  <div style={styles.resultTitle}>Height</div>
                  <div style={styles.resultValue}>{profileData.profile.height_cm} cm</div>
                </div>
                <div style={styles.resultCard}>
                  <div style={styles.resultTitle}>Weight</div>
                  <div style={styles.resultValue}>{profileData.profile.weight_kg} kg</div>
                </div>
                <div style={styles.resultCard}>
                  <div style={styles.resultTitle}>Activity Level</div>
                  <div style={styles.resultValue}>{profileData.profile.activity_level}</div>
                </div>
                <div style={styles.resultCard}>
                  <div style={styles.resultTitle}>Experience</div>
                  <div style={styles.resultValue}>{profileData.profile.experience_level}</div>
                </div>
                <div style={styles.resultCard}>
                  <div style={styles.resultTitle}>Primary Goal</div>
                  <div style={styles.resultValue}>{profileData.profile.primary_goal}</div>
                </div>
              </div>

              <h3 style={{...styles.sectionTitle, marginTop: '30px'}}>Calculated Metrics</h3>
              <div style={styles.calculationsGrid}>
                <div style={styles.calcCard}>
                  <div style={styles.calcValue}>{profileData.calculated.bmi}</div>
                  <div style={styles.calcLabel}>BMI</div>
                </div>
                <div style={{...styles.calcCard, backgroundColor: '#fef9e7', borderColor: '#f1c40f'}}>
                  <div style={{...styles.calcValue, color: '#d4ac0d'}}>
                    {profileData.calculated.maintenanceCalories}
                  </div>
                  <div style={styles.calcLabel}>Maintenance Calories</div>
                </div>
                <div style={{...styles.calcCard, backgroundColor: '#fdedec', borderColor: '#e74c3c'}}>
                  <div style={{...styles.calcValue, color: '#c0392b'}}>
                    {profileData.calculated.suggestedCalories}
                  </div>
                  <div style={styles.calcLabel}>Suggested Calories</div>
                </div>
              </div>

              <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#e8f8f5',
                borderRadius: '8px',
                borderLeft: '4px solid #1abc9c'
              }}>
                <strong style={{color: '#16a085'}}>💡 Recommendation:</strong>
                <p style={{margin: '5px 0 0 0', color: '#2c3e50'}}>
                  Based on your goal of <strong>{profileData.profile.primary_goal}</strong>, 
                  you should consume <strong>{profileData.calculated.suggestedCalories} calories/day</strong>.
                  {profileData.profile.primary_goal === 'Weight Loss' && 
                    ' This creates a deficit of 500 calories from your maintenance level.'}
                  {profileData.profile.primary_goal === 'Muscle Gain' && 
                    ' This adds a surplus of 300 calories to your maintenance level.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthApp;