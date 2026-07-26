import { nanoid } from 'nanoid';

const KEYS = {
  PACKAGES: 'qt_packages',
  BOOKINGS: 'qt_bookings',
  INQUIRIES: 'qt_inquiries',
  NEWSLETTER: 'qt_newsletter',
  SETTINGS: 'qt_settings',
  AUTH: 'qt_auth',
  VERSION: 'qt_db_version'
};

const SEED_DATA = {
  [KEYS.PACKAGES]: [
    {
      id: nanoid(),
      title: 'Bali Paradise Retreat',
      destination: 'Bali, Indonesia',
      region: 'asia',
      durationDays: 7,
      price: 1299,
      rating: 4.9,
      reviews: 128,
      description: 'Experience the ultimate tropical getaway with our Bali Paradise Retreat. Immerse yourself in the rich culture, stunning landscapes, and serene beaches of the Island of the Gods. This package includes stays in luxury eco-resorts, guided temple tours, and private beach access.',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      featured: true,
      itinerary: [
        { day: 1, title: 'Arrival & Welcome', activities: 'Transfer to Ubud eco-resort. Welcome dinner with traditional Balinese dance.' },
        { day: 2, title: 'Cultural Heart of Bali', activities: 'Visit the Sacred Monkey Forest, Tegallalang Rice Terrace, and Tirta Empul Temple.' },
        { day: 3, title: 'Mount Batur Sunrise', activities: 'Early morning hike to Mount Batur. Afternoon at leisure for spa treatments.' },
        { day: 4, title: 'Transfer to Seminyak', activities: 'Journey to the coast. Sunset at Tanah Lot temple.' },
        { day: 5, title: 'Beach Day & Beach Club', activities: 'Free day to surf or relax. Evening at a premium beach club.' },
        { day: 6, title: 'Nusa Penida Day Trip', activities: 'Speedboat to Nusa Penida to visit Kelingking Beach and Broken Beach.' },
        { day: 7, title: 'Departure', activities: 'Morning yoga, breakfast, and transfer to Ngurah Rai International Airport.' }
      ]
    },
    {
      id: nanoid(),
      title: 'Swiss Alps Adventure',
      destination: 'Zermatt, Switzerland',
      region: 'europe',
      durationDays: 5,
      price: 2499,
      rating: 4.8,
      reviews: 86,
      description: 'Discover the majestic Swiss Alps with breathtaking views of the Matterhorn. Perfect for winter sports enthusiasts and nature lovers alike. Enjoy world-class skiing, cozy chalets, and traditional Swiss fondue.',
      imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80',
      featured: true,
      itinerary: [
        { day: 1, title: 'Arrival in Zermatt', activities: 'Scenic train ride to the car-free village. Check-in to luxury chalet.' },
        { day: 2, title: 'Matterhorn Glacier Paradise', activities: 'Cable car ride to the highest viewing platform in Europe.' },
        { day: 3, title: 'Skiing / Hiking', activities: 'Full day of skiing or guided winter hiking. Evening fondue dinner.' },
        { day: 4, title: 'Gornergrat Railway', activities: 'Ride the historic cog railway for panoramic mountain views.' },
        { day: 5, title: 'Departure', activities: 'Souvenir shopping and departure transfer.' }
      ]
    },
    {
      id: nanoid(),
      title: 'Santorini Sunset Getaway',
      destination: 'Santorini, Greece',
      region: 'europe',
      durationDays: 6,
      price: 1899,
      rating: 4.9,
      reviews: 215,
      description: 'Wander through the iconic white-washed streets of Oia, sail across the caldera at sunset, and taste exquisite local wines in this romantic Greek island escape.',
      imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
      featured: false,
      itinerary: [
        { day: 1, title: 'Arrival', activities: 'Transfer to cliffside boutique hotel. Sunset viewing in Oia.' },
        { day: 2, title: 'Caldera Cruise', activities: 'Catamaran cruise around the volcano with hot springs and BBQ.' },
        { day: 3, title: 'Wine Tasting Tour', activities: 'Visit traditional wineries and taste Assyrtiko wines.' },
        { day: 4, title: 'Akrotiri & Beaches', activities: 'Tour the ancient ruins of Akrotiri and relax at the Red Beach.' },
        { day: 5, title: 'Fira Exploration', activities: 'Shopping and dining in the capital city, Fira.' },
        { day: 6, title: 'Departure', activities: 'Breakfast with a view and airport transfer.' }
      ]
    },
    {
      id: nanoid(),
      title: 'Kyoto Cultural Immersion',
      destination: 'Kyoto, Japan',
      region: 'asia',
      durationDays: 8,
      price: 2150,
      rating: 5.0,
      reviews: 94,
      description: 'Step back in time in Japan\'s ancient capital. Experience authentic tea ceremonies, stroll through bamboo groves, and witness the beauty of traditional Geisha districts.',
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      featured: true,
      itinerary: [
        { day: 1, title: 'Welcome to Kyoto', activities: 'Bullet train arrival. Check-in to traditional Ryokan.' },
        { day: 2, title: 'Temples & Shrines', activities: 'Kinkaku-ji (Golden Pavilion) and Fushimi Inari Taisha.' },
        { day: 3, title: 'Arashiyama', activities: 'Bamboo Grove walk and monkey park visit.' },
        { day: 4, title: 'Tea Ceremony', activities: 'Authentic tea ceremony and kimono wearing experience.' },
        { day: 5, title: 'Nara Day Trip', activities: 'Visit Nara Park and the Great Buddha at Todai-ji.' },
        { day: 6, title: 'Gion District', activities: 'Evening walking tour of the historic Geisha district.' },
        { day: 7, title: 'Market & Cooking', activities: 'Nishiki Market tour and Japanese cooking class.' },
        { day: 8, title: 'Departure', activities: 'Final farewells and bullet train to Tokyo/Osaka airports.' }
      ]
    }
  ],
  [KEYS.SETTINGS]: {
    companyName: 'Qube Travel',
    email: 'support@qubetravel.com',
    phone: '+1 (800) 555-0199',
    address: '100 Voyager Way, Suite 400, NY 10012'
  }
};

const CURRENT_VERSION = '1.0';

export const storage = {
  KEYS,

  initSeedData: () => {
    const version = localStorage.getItem(KEYS.VERSION);
    if (version !== CURRENT_VERSION) {
      // Initialize or upgrade database
      localStorage.setItem(KEYS.VERSION, CURRENT_VERSION);
      
      if (!localStorage.getItem(KEYS.PACKAGES)) {
        localStorage.setItem(KEYS.PACKAGES, JSON.stringify(SEED_DATA[KEYS.PACKAGES]));
      }
      if (!localStorage.getItem(KEYS.SETTINGS)) {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(SEED_DATA[KEYS.SETTINGS]));
      }
      if (!localStorage.getItem(KEYS.BOOKINGS)) {
        localStorage.setItem(KEYS.BOOKINGS, JSON.stringify([]));
      }
      if (!localStorage.getItem(KEYS.INQUIRIES)) {
        localStorage.setItem(KEYS.INQUIRIES, JSON.stringify([]));
      }
    }
  },

  getAll: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getById: (key, id) => {
    const items = storage.getAll(key);
    return items.find((item) => item.id === id);
  },

  create: (key, data) => {
    const items = storage.getAll(key);
    const newItem = { 
      id: nanoid(), 
      createdAt: new Date().toISOString(), 
      ...data 
    };
    localStorage.setItem(key, JSON.stringify([...items, newItem]));
    return newItem;
  },

  update: (key, id, data) => {
    const items = storage.getAll(key);
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() };
      localStorage.setItem(key, JSON.stringify(items));
      return items[index];
    }
    return null;
  },

  remove: (key, id) => {
    const items = storage.getAll(key);
    const filtered = items.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filtered));
    return true;
  },

  getSettings: () => {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  updateSettings: (data) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(data));
    return data;
  },

  login: (email, password) => {
    // Mock authentication
    if (email === 'admin@qubetravel.com' && password === 'password123') {
      const session = { email, token: nanoid(), expires: Date.now() + 86400000 };
      localStorage.setItem(KEYS.AUTH, JSON.stringify(session));
      return session;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(KEYS.AUTH);
  },

  getSession: () => {
    try {
      const data = localStorage.getItem(KEYS.AUTH);
      if (!data) return null;
      const session = JSON.parse(data);
      if (Date.now() > session.expires) {
        localStorage.removeItem(KEYS.AUTH);
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }
};
