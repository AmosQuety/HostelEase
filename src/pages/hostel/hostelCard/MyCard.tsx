import React from "react";
import { useNavigate } from "react-router-dom";
import "./HostelCard.css";

type MyCardProps = {
  id: number;
  image: string;
  name: string;
  location: string;
  price: string;
};

const MyCard: React.FC<MyCardProps> = ({
  id,
  image,
  name,
  location,
  price,
}) => {
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    navigate(`/hostels/${id}`);
  };

  return (
    <div className="hostel-card">
      <div className="hostel-image-container">
        <img src={image} alt={name} className="hostel-image" />
      </div>
      <div className="hostel-details">
        <h3 className="hostel-name">{name}</h3>
        <p className="hostel-location">{location}</p>
        <p className="hostel-price">{price}</p>
        <button className="hostel-button" onClick={handleSeeMoreClick}>
          See More
        </button>
      </div>
    </div>
  );
};

export default MyCard;
