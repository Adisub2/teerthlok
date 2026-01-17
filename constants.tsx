
import { Destination } from './types';

export const TRANSLATIONS = {
  en: {
    home: "Home",
    explore: "Explore",
    assistant: "Margdarshak",
    community: "Satsang",
    map: "Yatra Map",
    vr: "Darshan 360",
    heroTitle: "Experience the Divine",
    heroSub: "The most advanced spiritual guide for Uttarakhand, powered by AI.",
    devBy: "Developed by Aditya Shukla",
    districts: "Explore by District",
    shrines: "Sacred Destinations"
  },
  hi: {
    home: "होम",
    explore: "खोजें",
    assistant: "मार्गदर्शक",
    community: "सत्संग",
    map: "यात्रा मानचित्र",
    vr: "दर्शन 360",
    heroTitle: "दिव्यता का अनुभव करें",
    heroSub: "उत्तराखंड के लिए सबसे उन्नत आध्यात्मिक मार्गदर्शिका, एआई द्वारा संचालित।",
    devBy: "आदित्य शुक्ला द्वारा विकसित",
    districts: "जिले के अनुसार खोजें",
    shrines: "पवित्र गंतव्य"
  },
  sa: {
    home: "मुख्यम्",
    explore: "अन्वेषणम्",
    assistant: "मार्गदर्शकः",
    community: "सत्संगः",
    map: "मानचित्रम्",
    vr: "दर्शनम् 360",
    heroTitle: "दिव्य अनुभवः",
    heroSub: "उत्तराखण्डस्य कृते उन्नत आध्यात्मिक मार्गदर्शिका।",
    devBy: "आदित्य शुक्लेन विकसितम्",
    districts: "मण्डलानुसारं अन्वेषणम्",
    shrines: "पवित्र स्थानानि"
  }
};

export const DISTRICTS = [
  "Dehradun", "Haridwar", "Chamoli", "Rudraprayag", "Tehri Garhwal", 
  "Uttarkashi", "Pauri Garhwal", "Nainital", "Almora", 
  "Pithoragarh", "Bageshwar", "Champawat", "Udham Singh Nagar"
];

export const DESTINATIONS: Destination[] = [
  // HARIDWAR
  {
    id: 'har-ki-pauri',
    name: 'Har Ki Pauri',
    category: 'Ghat',
    region: 'Haridwar',
    description: 'The holiest bathing ghat in Haridwar where the Ganges leaves the mountains.',
    spiritualSignificance: 'Believed to be the precise spot where the celestial nectar fell.',
    mythology: 'Lord Vishnu is said to have visited this place, leaving a footprint on a stone.',
    rituals: ['Ganga Aarti', 'Pind Daan', 'Holy Dip'],
    bestTime: 'Year-round',
    image: 'https://images.unsplash.com/photo-1590050752117-23a9d7f668ad?auto=format&fit=crop&q=80&w=1200',
    coordinates: { lat: 29.9564, lng: 78.1706 },
    crowdLevel: 95,
    rating: 4.8
  },
  {
    id: 'mansa-devi',
    name: 'Mansa Devi Temple',
    category: 'Siddh Peeth',
    region: 'Haridwar',
    description: 'A temple dedicated to Goddess Mansa Devi, perched on Bilwa Parvat.',
    spiritualSignificance: 'One of the Panch Tirth of Haridwar.',
    mythology: 'She is believed to have emerged from the mind of Lord Shiva.',
    rituals: ['Aarti', 'Prasad Offering'],
    bestTime: 'Year-round',
    image: 'https://images.unsplash.com/photo-1626014303757-60f1d0685741?auto=format&fit=crop&q=80&w=1200',
    coordinates: { lat: 29.9555, lng: 78.1634 },
    crowdLevel: 80,
    rating: 4.6
  },
  // DEHRADUN
  {
    id: 'robbers-cave',
    name: 'Robber\'s Cave (Guchhupani)',
    category: 'Nature',
    region: 'Dehradun',
    description: 'A natural river cave formation where water flows through a narrow gorge.',
    spiritualSignificance: 'Considered an abode of Lord Shiva due to the natural jal-abhishek.',
    mythology: 'Local legends say it was a hiding place for robbers during British rule.',
    rituals: ['Nature Walk'],
    bestTime: 'April - October',
    image: 'https://images.unsplash.com/photo-1621255152959-1e3550e5033c?auto=format&fit=crop&q=80&w=1200',
    coordinates: { lat: 30.3756, lng: 78.0583 },
    crowdLevel: 60,
    rating: 4.5
  },
  {
    id: 'rishikesh-laxman-jhula',
    name: 'Laxman Jhula',
    category: 'Spiritual Heritage',
    region: 'Dehradun',
    description: 'An iconic iron suspension bridge across the Ganges.',
    spiritualSignificance: 'Bridge connecting the path to divine realization.',
    mythology: 'Lord Laxman crossed the Ganges here on jute ropes.',
    rituals: ['Ganga Darshan'],
    bestTime: 'Year-round',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200',
    coordinates: { lat: 30.1299, lng: 78.3297 },
    crowdLevel: 85,
    rating: 4.7
  },
  // CHAMOLI
  {
    id: 'badrinath',
    name: 'Badrinath Temple',
    category: 'Char Dham',
    region: 'Chamoli',
    description: 'The premier Char Dham site dedicated to Lord Vishnu.',
    spiritualSignificance: 'One of the 108 Divya Desams of Vishnu.',
    mythology: 'Vishnu meditated here while Lakshmi became a Badri tree to shade him.',
    rituals: ['Nirmalya Darshan', 'Maha Abhishek'],
    bestTime: 'May - November',
    image: 'https://images.unsplash.com/photo-1634710156942-df2167d4e13d?auto=format&fit=crop&q=80&w=1200',
    coordinates: { lat: 30.7433, lng: 79.4938 },
    crowdLevel: 75,
    rating: 4.9
  },
  {
    id: 'valley-flowers',
    name: 'Valley of Flowers',
    category: 'Nature',
    region: 'Chamoli',
    description: 'A UNESCO World Heritage site known for its meadows of endemic alpine flowers.',
    spiritualSignificance: 'Believed to be the "Nandan Kanan" or the garden of Indra.',
    mythology: 'Associated with the search for Sanjeevani Buti in Ramayana.',
    rituals: ['Nature Walk'],
    bestTime: 'July - September',
    image: 'https://images.unsplash.com/photo-1588096383061-5cc38202272a?auto=format&fit=crop&q=80&w=1200',
    coordinates: { lat: 30.7280, lng: 79.6053 },
    crowdLevel: 40,
    rating: 4.8
  },
  // RUDRAPRAYAG
  {
    id: 'kedarnath',
    name: 'Kedarnath Temple',
    category: 'Jyotirlinga',
    region: 'Rudraprayag',
    description: 'One of the most sacred Shiva temples in the Himalayas.',
    spiritualSignificance: 'Highest of the 12 Jyotirlingas.',
    mythology: 'Built by Pandavas to seek Shiva\'s forgiveness after Kurukshetra.',
    rituals: ['Bhasma Aarti', 'Jal Abhishek'],
    bestTime: 'May - October',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
    coordinates: { lat: 30.7352, lng: 79.0669 },
    crowdLevel: 90,
    rating: 4.9
  },
  {
    id: 'tungnath',
    name: 'Tungnath Temple',
    category: 'Panch Kedar',
    region: 'Rudraprayag',
    description: 'The highest Shiva temple in the world (3,680m).',
    spiritualSignificance: 'Site where Shiva\'s bahu (arms) appeared.',
    mythology: 'Associated with the penance of Pandavas.',
    rituals: ['Shiva Pooja'],
    bestTime: 'April - November',
    image: 'https://images.unsplash.com/photo-1643190226995-585800ec476c?auto=format&fit=crop&q=80&w=1200',
    coordinates: { lat: 30.4886, lng: 79.2152 },
    crowdLevel: 30,
    rating: 4.9
  },
  // UTTARKASHI
  {
    id: 'gangotri',
    name: 'Gangotri Temple',
    category: 'Char Dham',
    region: 'Uttarkashi',
    description: 'Sacred temple dedicated to Goddess Ganga at the source of the river.',
    spiritualSignificance: 'Site where the holy river touched earth.',
    mythology: 'King Bhagiratha meditated here to bring Ganga from heaven.',
    rituals: ['Ganga Snan', 'Aarti'],
    bestTime: 'May - November',
    image: 'https://images.unsplash.com/photo-1563219010-86c3886f7f2b?auto=format&fit=crop&q=80&w=1200',
    coordinates: { lat: 30.9947, lng: 78.9398 },
    crowdLevel: 65,
    rating: 4.8
  },
  // NAINITAL
  {
    id: 'naina-devi',
    name: 'Naina Devi Temple',
    category: 'Shakti Peeth',
    region: 'Nainital',
    description: 'A temple dedicated to the eyes of Goddess Sati, on the banks of Naini Lake.',
    spiritualSignificance: 'One of the 51 Shakti Peethas.',
    mythology: 'Where Sati\'s eyes fell as Shiva carried her body.',
    rituals: ['Naina Devi Aarti'],
    bestTime: 'Year-round',
    image: 'https://images.unsplash.com/photo-1572851410113-d4444a79667f?auto=format&fit=crop&q=80&w=1200',
    coordinates: { lat: 29.3954, lng: 79.4589 },
    crowdLevel: 75,
    rating: 4.6
  }
];
