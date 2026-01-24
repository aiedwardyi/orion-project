
export type UserRole = 'VIP' | 'Team' | 'Media' | 'Delegate';

export type RequestStatus = 'Request' | 'Pending' | 'Approved' | 'Confirmed' | 'Completed';

export interface EventItem {
  id: string;
  title: string;
  time: string;
  location: string;
  status: RequestStatus;
  group?: 'active' | 'next' | 'later' | 'completed';
}

export interface TravelRequest {
  id: string;
  type: 'Flight' | 'Hotel' | 'Transport';
  status: RequestStatus;
  details: string;
  date: string;
}

export interface Flight {
  id: string;
  flightNo: string;
  departure: string;
  arrival: string;
  depTime: string;
  arrTime: string;
  status: RequestStatus;
  baggage?: string;
  checkInProcedure?: string;
  terminalInfo?: string;
}

export interface Hotel {
  id: string;
  name: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: RequestStatus;
  amenities?: string[];
  checkInProcedure?: string;
  assignedButler?: string;
}
