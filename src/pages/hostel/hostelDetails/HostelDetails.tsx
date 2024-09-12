import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./HostelDetails.css";
import Suggestions from "./Suggestions/Suggestions";
import { toast } from "react-toastify";

type RoomDetailsType = {
  price: string;
  booked: number;
  free: number;
};

type RoomType = {
  available: number;
  single: RoomDetailsType;
  double: RoomDetailsType;
};

type HostelType = {
  id: number;
  image: string;
  name: string;
  location: string;
  rating: string;
  rooms: RoomType;
};

type HostelDetailsProps = {
  hostels: HostelType[];
};

const HostelDetails: React.FC<HostelDetailsProps> = ({ hostels }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const hostel = hostels.find((h) => h.id === parseInt(id!));

  if (!hostel) {
    return <div>Hostel not found</div>;
  }

  const HandleBook = (roomType: string) => {
    const hostel = hostels.find((h) => h.id === parseInt(id!));

    if (!hostel) {
      toast.error("Hostel not found");
      return;
    }

    const isFull =
      roomType === "Single"
        ? hostel.rooms.single.free <= 0
        : hostel.rooms.double.free <= 0;

    if (isFull) {
      toast.error("Sorry, rooms are full");
    } else {
      navigate("/checkout", { state: { roomType } });
    }
  };

  return (
    <div className="hostel-details-page">
      <div className="hostel-main-container flex flex-col md:flex-row gap-8">
        <div className="hostel-details-container flex-1 p-6 border border-gray-200 bg-white rounded-lg shadow-md">
          <img
            src={hostel.image}
            alt={hostel.name}
            className="hostel-image w-full object-cover rounded-lg mb-4"
          />
          <div className="details text-center">
            <h2 className="text-3xl font-bold mb-2">{hostel.name}</h2>
            <p className="text-lg text-gray-600 mb-1">
              Location: {hostel.location}
            </p>
            <p className="text-lg text-gray-600">Rating: {hostel.rating}</p>
          </div>
        </div>
        <Suggestions />
      </div>
      <div className="rooms mt-10 p-6 border border-gray-200 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">
          Rooms Available: {hostel.rooms.available}
        </h3>
        <div className="room-type grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="single bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Single Rooms</h3>
            <p className="text-lg text-gray-600 mb-1">
              Booked: {hostel.rooms.single.booked}
            </p>
            <p className="text-lg text-gray-600 mb-1">
              Free: {hostel.rooms.single.free}
            </p>
            <p className="text-lg text-gray-600 mb-1">
              Price: {hostel.rooms.single.price}
            </p>
            <button
              onClick={() => HandleBook("Single")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Book Double Room
            </button>
            {hostel.rooms.single.free <= 0 && (
              <p className="text-red-500 mt-2">Rooms full</p>
            )}
          </div>
          <div className="double bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Double Rooms</h3>
            <p className="text-lg text-gray-600 mb-1">
              Booked: {hostel.rooms.double.booked}
            </p>
            <p className="text-lg text-gray-600 mb-1">
              Free: {hostel.rooms.double.free}
            </p>
            <p className="text-lg text-gray-600 mb-1">
              Price: {hostel.rooms.double.price}
            </p>

            <button
              onClick={() => HandleBook("Double")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Book Double Room
            </button>
            {hostel.rooms.double.free <= 0 && (
              <p className="text-red-500 mt-2">Rooms full</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;
