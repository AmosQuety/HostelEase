// HostelList.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Hostel {
  id: number;
  name: string;
  location: string;
  rating: string;
  image: string;
  // Add other properties as needed
}

const HostelList: React.FC = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hostels")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setHostels(response.data);
        } else {
          console.error("Data is not an array:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching hostels:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Hostel List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hostels.length > 0 ? (
          hostels.map((hostel) => (
            <div
              key={hostel.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={hostel.image}
                alt={hostel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {hostel.name}
                </h2>
                <p className="text-gray-600">{hostel.location}</p>
                <p className="text-yellow-500">
                  {"⭐".repeat(Math.round(parseFloat(hostel.rating)))} (
                  {hostel.rating})
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hostels available</p>
        )}
      </div>
    </div>
  );
};

export default HostelList;
