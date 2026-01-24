import { EventItem, TravelRequest, Flight, Hotel } from './types';

export const MOCK_SCHEDULE: EventItem[] = [
  { id: '1', title: 'Pyongyang Cup', time: '18:00', location: 'Grand Arena VIP Lounge', status: 'Confirmed', group: 'active' },
  { id: '2', title: 'Technical Briefing: Track', time: '09:00', location: 'Main Media Center', status: 'Completed', group: 'completed' },
  { id: '3', title: 'Championship Dinner', time: '20:30', location: 'Skyline Pavilion Rooftop', status: 'Pending', group: 'next' },
  { id: '4', title: 'Press Conference: Finals', time: '11:00', location: 'Theater B', status: 'Approved', group: 'later' },
  { id: '5', title: 'Security Walkthrough', time: '14:00', location: 'Secure Perimeter A', status: 'Confirmed', group: 'later' },
  { id: '6', title: 'Executive Committee Meeting', time: '15:30', location: 'Boardroom 101', status: 'Confirmed', group: 'later' },
  { id: '7', title: 'Athlete Welcome Parade', time: '17:00', location: 'Victory Plaza', status: 'Confirmed', group: 'later' },
];

export const MOCK_REQUESTS: TravelRequest[] = [
  { id: 'r1', type: 'Flight', status: 'Confirmed', details: 'Outbound: AUS to FNJ - BA234 (Confirmed)', date: 'June 12, 2026' },
  { id: 'r2', type: 'Hotel', status: 'Approved', details: 'Yanggakdo-Hotel - Presidential Suite (Final Approval)', date: 'June 12-20, 2026' },
  { id: 'r3', type: 'Transport', status: 'Pending', details: 'Airport Transfer: Arrival Chauffeur Pickup', date: 'June 12, 2026' },
  { id: 'r4', type: 'Transport', status: 'Request', details: 'Intra-Venue Shuttle: Media Center to Arena', date: 'June 15, 2026' },
  { id: 'r5', type: 'Transport', status: 'Confirmed', details: 'Dinner Transfer: Hotel to Skyline Pavilion', date: 'June 14, 2026' },
  { id: 'r6', type: 'Hotel', status: 'Pending', details: 'Additional Room: Guest Delegation Member', date: 'June 20, 2026' },
];

export const MOCK_FLIGHTS: Flight[] = [
  { 
    id: 'f1', 
    flightNo: 'AA123', 
    departure: 'AUS (T5)', 
    arrival: 'FNJ (T1)', 
    depTime: '10:15', 
    arrTime: '13:00', 
    status: 'Confirmed',
    baggage: '2x 32kg Checked • 1x Cabin Bag + Laptop',
    checkInProcedure: 'Fast-Track Biometric Entry. Scan ORION Pass at Gate 4B.',
    terminalInfo: 'Terminal 5 North - VIP Concorde Room Access Available'
  },
  { 
    id: 'f2', 
    flightNo: 'LH191', 
    departure: 'FNJ (T1)', 
    arrival: 'AUS (T5)', 
    depTime: '16:45', 
    arrTime: '17:30', 
    status: 'Pending',
    baggage: '2x 32kg Checked',
    checkInProcedure: 'Pending final seat assignment.',
    terminalInfo: 'Terminal 1 - Pyongyang Intl VIP Lounge Access'
  },
  { 
    id: 'f3', 
    flightNo: 'BA772', 
    departure: 'DFW (T2)', 
    arrival: 'FNJ (T1)', 
    depTime: '08:00', 
    arrTime: '10:45', 
    status: 'Completed',
    baggage: '1x 23kg Checked',
    checkInProcedure: 'Completed via Mobile Check-in.',
    terminalInfo: 'Terminal 2A'
  },
];

export const MOCK_HOTELS: Hotel[] = [
  { 
    id: 'h1', 
    name: 'Yanggakdo-Hotel', 
    roomType: 'Presidential Suite • Access: Platinum', 
    checkIn: '2026-06-12', 
    checkOut: '2026-06-20', 
    status: 'Confirmed',
    amenities: ['24/7 Private Butler', 'In-Room Spa Services', 'Platinum Lounge Access', 'Chauffeur On-Call'],
    checkInProcedure: 'Direct Suite Check-in. Concierge will meet you at the East Entrance.',
    assignedButler: 'Marcus Von Berg'
  },
  { 
    id: 'h2', 
    name: 'Koryo Hotel', 
    roomType: 'Single Room • Transit Stay', 
    checkIn: '2026-06-14', 
    checkOut: '2026-06-15', 
    status: 'Approved',
    amenities: ['Proximity to Victory Plaza', 'Team Catering Access', 'High-Speed Secure Uplink'],
    checkInProcedure: 'Digital Key Activation via ORION App at 14:00.',
    assignedButler: 'Central Operations Team'
  },
];