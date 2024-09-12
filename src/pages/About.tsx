import { useEffect, useState } from "react";

interface User {
  uid: string;
  email: string;
  displayName: string;
}

const About: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null); // Track any error messages

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user data...");
        const response = await fetch(
          "http://localhost:5000/api/users/getUser?email=amosnabasa256@gmail.com"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid content type. Expected JSON.");
        }

        const data: User = await response.json();
        console.log("User data fetched:", data);
        setUser(data);
      } catch (error: any) {
        console.error("Error fetching user:", error.message);
        setError(error.message); // Set error state if fetch fails
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>About User</h1>
      <p>UID: {user.uid}</p>
      <p>Email: {user.email}</p>
      <p>Display Name: {user.displayName}</p>
    </div>
  );
};

export default About;
