import React, { useState, useEffect } from "react";
import { useSession } from '../components/SessionContext';
import axios from "axios";

export default function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useSession();

  useEffect(() => {
    // Fetch user information from the server/database if user is available
    const fetchUserInfo = async () => {
      const userId = user.id;
      console.log(userId);
      try {
        const response = await axios.get(`http://localhost:8000/profile/${userId}`);
        if (response.ok) {
          const data = await response.data;
          console.log(data);
          setUserInfo(data);
        } else {
          console.error("Failed to fetch user information:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

  
      fetchUserInfo();

  }, [user]); // Dependency array ensures this effect runs when user changes

  return (
    <div>
      <h1>Profile</h1>
      {userInfo ? (
        <div>
          <p>Student ID: {userInfo.studentId}</p>
          <p>First Name: {userInfo.firstName}</p>
          <p>Last Name: {userInfo.lastName}</p>
          {/* Display other user information as needed */}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}
