import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

 export const AdminUpdate = () => {
  const { id } = useParams(); // Get user ID from URL params
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/users/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  return (
    <section>
      <h1>Edit User</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </section>
  );
};

