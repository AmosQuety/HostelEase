export interface Room {
  room_type: string;
  price: number;
  booked: number;
  free: number;
  hostelId: string;
}

export interface Hostel {
  _id: string;
  image: string;
  name: string;
  location: string;
  rating: string;
  rooms: {
    available: number;
    single: Room;
    double: Room;
  };
}
