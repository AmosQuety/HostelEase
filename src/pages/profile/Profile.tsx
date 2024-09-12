import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Initialize Firebase (make sure to replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyDXyns4U2VnYZAP9QtJKQeEONQBX8lakvk",
  authDomain: "amos-b3f77.firebaseapp.com",
  projectId: "amos-b3f77",
  storageBucket: "amos-b3f77.appspot.com",
  messagingSenderId: "267977807588",
  appId: "1:267977807588:web:fa2be9e20bfbb905c0bef1",
  measurementId: "G-2TBQCYTYBV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface UserProfile {
  name: string;
  email: string;
  photoURL: string;
  createdAt: string;
  lastSignIn: string;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken();
          console.log("ID Token:", idToken); // Log the ID Token

          const response = await fetch(
            "http://localhost:5000/api/users/profile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );

          console.log("Response:", response); // Log response object
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("User Profile Data:", data); // Log profile data
          setUserProfile(data);
          // Store photoURL in local storage
          localStorage.setItem("userPhotoURL", data.photoURL || "");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.message as string);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="overflow-hidden">
      <Card className="p-6 bg-white shadow-lg rounded-lg">
        <Typography className="text-3xl font-bold mb-4 text-center bg-blue-400 text-white py-2 rounded-lg">
          Profile Details
        </Typography>
        <div className="grid grid-cols-2 gap-4">
          {/* <div className="flex flex-col bg-red-200 rounded-lg p-4">
            <Typography className="text-lg font-medium text-blue-gray-600 mb-2">
              Profile Picture
            </Typography>
            <img
              src={userProfile.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          </div> */}
          {Object.entries(userProfile).map(
            ([key, value], index) =>
              key !== "photoURL" && (
                <div
                  key={key}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "bg-red-200" : "bg-deep-orange-100"
                  } rounded-lg p-4`}
                >
                  <Typography className="text-lg font-medium text-blue-gray-600 mb-2">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </Typography>
                  <Typography className="text-lg font-normal text-blue-gray-900">
                    {value}
                  </Typography>
                </div>
              )
          )}
        </div>
      </Card>
    </div>
  );
};

export default Profile;
