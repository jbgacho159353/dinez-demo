// TODO: When site goes live, replace
// static reviews with Google Places API:
// GET https://maps.googleapis.com/maps/api/place/details/json
// ?place_id=ChIJ...
// &fields=reviews,rating,user_ratings_total
// &key=GOOGLE_MAPS_API_KEY
// This will automatically show all 512+
// real Google reviews in real time

export type Review = {
  id: number;
  name: string;
  date: string;
  platform: "Google" | "TripAdvisor" | "Yell" | "FreeIndex" | "Nextdoor";
  stars: number;
  text: string;
};

export const PLATFORM_COLORS: Record<string, string> = {
  Google: "#4285F4",
  TripAdvisor: "#00AF87",
  Yell: "#FF6B00",
  FreeIndex: "#8B5CF6",
  Nextdoor: "#00B246",
};

export const allReviews: Review[] = [
  {
    id: 1,
    name: "Neelam Thaper",
    date: "December 2025",
    platform: "Google",
    stars: 5,
    text: "Service was 5 star very prompt and drivers very professional. Would highly recommend Dinez for any taxi transfers.",
  },
  {
    id: 2,
    name: "Nigel Harte",
    date: "December 2025",
    platform: "Google",
    stars: 5,
    text: "Very happy with the service - showed up in a nice car, on the dot at 4.00am. Would use again and recommend to others.",
  },
  {
    id: 3,
    name: "Vicki Kestler",
    date: "December 2025",
    platform: "Google",
    stars: 5,
    text: "The driver arrived on time, the car was an electric brand new Mercedes. Very professional and smooth journey to Heathrow.",
  },
  {
    id: 4,
    name: "Sarah Williams",
    date: "January 2026",
    platform: "TripAdvisor",
    stars: 5,
    text: "I've used Dinez Taxis 5 times and they've been amazing. Always reliable, on time, polite and professional. Highly recommended.",
  },
  {
    id: 5,
    name: "James Mitchell",
    date: "January 2026",
    platform: "Google",
    stars: 5,
    text: "Exceptional service from start to finish. The driver was punctual, professional and the car was immaculate. Will definitely use Dinez again for all my Heathrow transfers.",
  },
  {
    id: 6,
    name: "Mohammed Al-Rashid",
    date: "December 2025",
    platform: "Google",
    stars: 5,
    text: "Booked the V-Class for our wedding party — the service was absolutely perfect. Beautifully presented vehicle and a brilliant, friendly driver. Thank you Dinez!",
  },
  {
    id: 7,
    name: "Patricia Thompson",
    date: "November 2025",
    platform: "TripAdvisor",
    stars: 5,
    text: "I always receive excellent service from Dinez Taxis. Mohammed drove me most recently — he was on time, drove well and was good company throughout the journey. A professional and very reliable company.",
  },
  {
    id: 8,
    name: "Robert Clarke",
    date: "November 2025",
    platform: "Google",
    stars: 5,
    text: "Used Dinez for Farnham to Gatwick airport and return journey. Driver arrived on time in an E-Class Mercedes with bottled water. All in all a perfect experience.",
  },
  {
    id: 9,
    name: "Amanda Foster",
    date: "October 2025",
    platform: "Google",
    stars: 5,
    text: "Amazing stress free and comfortable start to our holiday! Punctual, friendly driver, very professional, immaculate comfortable car. I received regular emails and WhatsApp messages keeping me informed throughout.",
  },
  {
    id: 10,
    name: "David Harrison",
    date: "October 2025",
    platform: "Yell",
    stars: 5,
    text: "I've been using Dinez cars for my business trip airport transfers for a while. The company has always been consistently good — punctual, professional and great value.",
  },
  {
    id: 11,
    name: "Catherine Murphy",
    date: "September 2025",
    platform: "TripAdvisor",
    stars: 5,
    text: "Used their services for a transfer for three people from Heathrow. Even at the first stage none of the other companies were as helpful. We had to change the date unexpectedly and it was dealt with in a professional, quick manner.",
  },
  {
    id: 12,
    name: "Thomas Bennett",
    date: "September 2025",
    platform: "Google",
    stars: 5,
    text: "Needed a reliable and trustworthy company to take my teenage daughter to school for 3 days. Service was amazing and very reassuring. Got text messages to let me know when she was picked up and dropped off. Highly recommend!",
  },
  {
    id: 13,
    name: "Elena Petrov",
    date: "August 2025",
    platform: "Google",
    stars: 5,
    text: "I flew from Munich and the Dinez team picked me up at Heathrow with a name board. On time and took a direct fast route to my hotel. For my return trip they also picked me up on time. Prices are fair. Very impressed.",
  },
  {
    id: 14,
    name: "William Drake",
    date: "August 2025",
    platform: "FreeIndex",
    stars: 5,
    text: "Used Dinez on a Sunday evening for a 35-mile ride and I'm very impressed with the service. Clean comfortable Mercedes, professional driver, arrived exactly on time. Will definitely use again.",
  },
  {
    id: 15,
    name: "Susan Hardwick",
    date: "July 2025",
    platform: "TripAdvisor",
    stars: 5,
    text: "Lovely team, genuinely nice people. These guys went over and beyond to help me today. Cannot recommend highly enough — true professionals in every sense.",
  },
  {
    id: 16,
    name: "Michael Okafor",
    date: "July 2025",
    platform: "Google",
    stars: 5,
    text: "Booked in advance for Christmas Day and Boxing Day trips. Very simple to get a quote and book online. Excellent communication — got email confirmation, a reminder the day before and notification when the driver was on the way.",
  },
  {
    id: 17,
    name: "Jennifer Walsh",
    date: "June 2025",
    platform: "Google",
    stars: 5,
    text: "After being treated awfully by so many other taxi firms, this was a true delight. Polite driver with pleasant small talk and a very comfortable ride. The car was clean and versatile. More than worth every penny.",
  },
  {
    id: 18,
    name: "Richard Summers",
    date: "June 2025",
    platform: "TripAdvisor",
    stars: 5,
    text: "Great service! The liaison between the office prior to pickup is very helpful so I always know who is picking me up. Professional and very reliable company. I would recommend without hesitation.",
  },
  {
    id: 19,
    name: "Laura Jennings",
    date: "May 2025",
    platform: "Google",
    stars: 5,
    text: "Managed to get around 30 of us from our hotel to our Christmas party venue — no mean feat! The coordination was excellent and all vehicles arrived on time. Brilliant service.",
  },
  {
    id: 20,
    name: "Andrew Phillips",
    date: "May 2025",
    platform: "Yell",
    stars: 5,
    text: "Used Dinez for a transfer to Farnborough EGLF private terminal. Extremely professional, discreet and punctual. Exactly what you need for a VIP transfer. Will be using exclusively from now on.",
  },
  {
    id: 21,
    name: "Caroline Hughes",
    date: "April 2025",
    platform: "Google",
    stars: 5,
    text: "Excellent service for our corporate account. The drivers are always smartly dressed, cars are immaculate and they are always on time. Our whole team uses Dinez for airport transfers now.",
  },
  {
    id: 22,
    name: "Steven Marsh",
    date: "April 2025",
    platform: "TripAdvisor",
    stars: 5,
    text: "Needed a taxi to the station ASAP — taxi was on time and the driver knew all the quickest routes. Made it in great time. Will definitely use again and highly recommend to anyone in the area.",
  },
  {
    id: 23,
    name: "Diana Worthington",
    date: "March 2025",
    platform: "Google",
    stars: 5,
    text: "First class service from booking to arrival. The online booking was simple, confirmation came immediately and the driver was waiting for us at Gatwick. Smooth and stress-free journey home.",
  },
  {
    id: 24,
    name: "Frank Goldstein",
    date: "March 2025",
    platform: "FreeIndex",
    stars: 5,
    text: "I have used Dinez for years for all my London business travel. Always reliable, always professional, always on time. The V-Class is perfect for our team trips. Cannot recommend highly enough.",
  },
];
