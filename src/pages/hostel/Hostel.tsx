import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

type HostelType = {
  id: number;
  image: string;
  name: string;
  location: string;
  price: string;
  rating: string;
};

const Hostel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [hostels, setHostels] = useState<HostelType[]>([]);
  const [filteredHostels, setFilteredHostels] = useState<HostelType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hostels")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setHostels(response.data);
          setFilteredHostels(response.data);
        } else {
          console.error("Data is not an array:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching hostels:", error));
  }, []);

  useEffect(() => {
    filterHostels(searchQuery, locationFilter);
  }, [searchQuery, locationFilter, hostels]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationFilter(e.target.value);
  };

  const filterHostels = (query: string, location: string) => {
    let filtered = hostels.filter((hostel) =>
      hostel.name.toLowerCase().includes(query.toLowerCase())
    );

    if (location.trim() !== "") {
      filtered = filtered.filter((hostel) =>
        hostel.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredHostels(filtered);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search hostel name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={handleLocationChange}
            className="pl-10 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredHostels.length > 0 ? (
          filteredHostels.map((hostel) => (
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
          <div className="flex items-center gap-4">
            <Button size="lg" variant="text" loading={true}>
              Loading
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hostel;
