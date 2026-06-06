import { Event, GroupType, PriceBreakdown, GroupOption } from './types';

export const events: Event[] = [
  {
    id: 'evt-001',
    slug: 'midnight-football-showdown',
    title: 'Midnight Football Showdown',
    tagline: 'Under the lights. Full intensity. No mercy.',
    category: 'Football',
    tags: ['5v5', 'Floodlit', 'Competitive', 'Night'],
    description: `Step onto the turf as the city sleeps. The Midnight Football Showdown is NEXUS CLUB's flagship night tournament — 5v5, floodlit, full intensity. Whether you're a seasoned baller or someone who hasn't laced up in years, this is the arena where legends are made and friendships are forged under the stars.

Teams of 5 go head-to-head in a round-robin format across two turfs. The atmosphere? Electric. The competition? Fierce. The post-match chai? Non-negotiable.

We cap every session at 40 players to keep the energy tight. Spots vanish within hours — you know the drill.`,
    highlights: [
      'Professional floodlit turf at premier venue',
      'Round-robin format — guaranteed 3+ matches',
      'Referee and scorekeeping provided',
      'Post-match refreshments & networking',
      'Trophy & medals for winning team',
      'Professional match photography',
    ],
    schedule: [
      { time: '9:30 PM', activity: 'Gates open, warm-up' },
      { time: '10:00 PM', activity: 'Team briefing & group draw' },
      { time: '10:15 PM', activity: 'Round-robin matches begin' },
      { time: '11:45 PM', activity: 'Semi-finals' },
      { time: '12:15 AM', activity: 'Grand Final' },
      { time: '12:45 AM', activity: 'Awards ceremony & wrap-up' },
    ],
    whatToBring: [
      'Football boots or flat-soled sports shoes',
      'Comfortable sportswear (dark/light divided by organizer)',
      'Water bottle (hydration station on-site)',
      'Valid ID for venue entry',
      'Your competitive spirit 🔥',
    ],
    rules: [
      'No studs allowed — astroturf only, flat-soled shoes',
      'Sliding tackles strictly prohibited for safety',
      'Maximum 5 players per team on the turf',
      'Referee decisions are final',
      'Zero tolerance for aggressive behavior',
      'No refunds after 48 hours of event',
    ],
    coverImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80',
      'https://images.unsplash.com/photo-1551958219-acbc868aed97?w=800&q=80',
      'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&q=80',
    ],
    dates: [
      {
        id: 'date-001-1',
        label: 'Saturday, 14 June 2026',
        date: '2026-06-14',
        time: '10:00 PM – 1:00 AM',
        location: 'Urban Sports Arena, Andheri West',
        spotsTotal: 40,
        spotsLeft: 12,
      },
      {
        id: 'date-001-2',
        label: 'Saturday, 21 June 2026',
        date: '2026-06-21',
        time: '10:00 PM – 1:00 AM',
        location: 'Urban Sports Arena, Andheri West',
        spotsTotal: 40,
        spotsLeft: 34,
      },
    ],
    pricing: { solo: 799, duo: 749, group3: 699, group4plus: 649 },
    earlyBird: {
      active: true,
      pricing: { solo: 699, duo: 649, group3: 599, group4plus: 549 },
      label: 'Early bird — register before 48 hrs',
      limit: 10,
    },
    mapLocation: {
      lat: 19.1364,
      lng: 72.8296,
      address: 'Urban Sports Arena, Veera Desai Rd, Andheri West, Mumbai 400053',
      landmark: 'Near Andheri Metro Station',
    },
    organizer: {
      name: 'Rohan Mehta',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
      role: 'Head Organizer · NEXUS CLUB',
      events: 24,
    },
    upiId: 'nexusclub@upi',
    featured: true,
    difficulty: 'All Levels',
    minAge: 16,
  },
  {
    id: 'evt-002',
    slug: 'sunrise-run-bandra',
    title: 'Sunrise Run — Bandra Seafront',
    tagline: '5K along the coast as Mumbai wakes up.',
    category: 'Running',
    tags: ['5K', 'Scenic', 'All Levels', 'Morning'],
    description: `There's something magical about running as the city comes alive. Join us for a 5K run along the iconic Bandra seafront — past Carter Road, along the promenade, and back.

This isn't a race. It's a ritual. We run together, chat, celebrate the sunrise, and then head for coffee. Pacers available for every speed — whether you're clocking 4:30/km or enjoying a social jog at 8:00/km.

Post-run: cold brew coffee, protein bites, and the best conversations you'll have all week. The run is the warm-up; the community is the main event.`,
    highlights: [
      'Scenic 5K coastal route — Bandra promenade',
      'Pacers for every pace group',
      'Complimentary post-run cold brew & snacks',
      'Professional run photos at sunrise',
      'NEXUS CLUB running bib included',
      'Cool-down stretching session with trainer',
    ],
    schedule: [
      { time: '5:45 AM', activity: 'Assembly & warm-up' },
      { time: '6:00 AM', activity: 'Flag-off — all pace groups' },
      { time: '6:50 AM', activity: 'Finish line celebrations' },
      { time: '7:00 AM', activity: 'Cool-down stretch & photos' },
      { time: '7:30 AM', activity: 'Coffee & networking at Carter Road café' },
    ],
    whatToBring: [
      'Running shoes (mandatory)',
      'Comfortable athletic wear',
      'Your own water bottle',
      'Positive energy 🌅',
    ],
    rules: [
      'Arrive at least 15 minutes before flag-off',
      'Headphones discouraged — be aware of your surroundings',
      'Stay with your pace group for safety',
      'No littering — use designated bins',
      'Respect other pedestrians on the promenade',
    ],
    coverImage: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1600&q=80',
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80',
    ],
    dates: [
      {
        id: 'date-002-1',
        label: 'Sunday, 15 June 2026',
        date: '2026-06-15',
        time: '5:45 AM – 8:00 AM',
        location: 'Carter Road Promenade, Bandra West',
        spotsTotal: 30,
        spotsLeft: 7,
      },
      {
        id: 'date-002-2',
        label: 'Sunday, 22 June 2026',
        date: '2026-06-22',
        time: '5:45 AM – 8:00 AM',
        location: 'Carter Road Promenade, Bandra West',
        spotsTotal: 30,
        spotsLeft: 30,
      },
    ],
    pricing: { solo: 499, duo: 449, group3: 399, group4plus: 349 },
    earlyBird: {
      active: true,
      pricing: { solo: 399, duo: 349, group3: 299, group4plus: 249 },
      label: 'Early bird pricing',
      limit: 8,
    },
    mapLocation: {
      lat: 19.0589,
      lng: 72.8359,
      address: 'Carter Road Promenade, Bandra West, Mumbai 400050',
      landmark: 'Opposite Joggers Park',
    },
    organizer: {
      name: 'Priya Kapoor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      role: 'Run Lead · NEXUS CLUB',
      events: 18,
    },
    upiId: 'nexusclub@upi',
    difficulty: 'All Levels',
    minAge: 14,
  },
  {
    id: 'evt-003',
    slug: 'rooftop-yoga-worli',
    title: 'Rooftop Yoga — Worli Skyline',
    tagline: 'Breathe. Stretch. Reset. 30 floors above Mumbai.',
    category: 'Yoga',
    tags: ['Yoga', 'Rooftop', 'Wellness', 'Sunrise'],
    description: `Imagine holding your warrior pose with the entire Mumbai skyline as your backdrop — the Bandra-Worli Sea Link glimmering in the morning light, the city just waking up below you.

Our rooftop yoga sessions are intimate (max 20 people), guided by certified instructors, and designed for all levels. Whether you're a seasoned yogi or have never unrolled a mat, this is your invitation to slow down, breathe deeply, and reconnect.

Each session includes a 45-minute Hatha flow, a 15-minute guided meditation, and a closing breath-work practice. You'll leave feeling like a different person.`,
    highlights: [
      'Exclusive rooftop venue — 30th floor, Worli',
      'Certified yoga instructor (7+ years experience)',
      'Yoga mats & props provided',
      'Herbal tea & healthy breakfast post-session',
      'Maximum 20 participants — intimate setting',
      'Stunning sea-link sunrise view',
    ],
    schedule: [
      { time: '6:00 AM', activity: 'Arrival, centering & intention setting' },
      { time: '6:15 AM', activity: '45-min Hatha yoga flow' },
      { time: '7:00 AM', activity: '15-min guided meditation' },
      { time: '7:15 AM', activity: 'Breath-work & closing' },
      { time: '7:30 AM', activity: 'Herbal tea & breakfast, open conversation' },
    ],
    whatToBring: [
      'Comfortable, flexible workout clothes',
      'Hair tie if needed',
      'An open mind 🙏',
    ],
    rules: [
      'Please arrive on time — late entry disrupts the session',
      'Silence phones before the session begins',
      'Respect everyone\'s practice — no judgement zone',
      'Avoid heavy meals 2 hours before',
    ],
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80',
    ],
    dates: [
      {
        id: 'date-003-1',
        label: 'Saturday, 14 June 2026',
        date: '2026-06-14',
        time: '6:00 AM – 8:00 AM',
        location: 'The Sky Terrace, Worli, Mumbai',
        spotsTotal: 20,
        spotsLeft: 5,
      },
    ],
    pricing: { solo: 899, duo: 849, group3: 799, group4plus: 749 },
    mapLocation: {
      lat: 19.0176,
      lng: 72.8179,
      address: 'The Sky Terrace, Worli, Mumbai 400018',
      landmark: 'Near Worli Sea Face',
    },
    organizer: {
      name: 'Ananya Singh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
      role: 'Yoga Lead · NEXUS CLUB',
      events: 31,
    },
    upiId: 'nexusclub@upi',
    difficulty: 'All Levels',
    minAge: 16,
  },
  {
    id: 'evt-004',
    slug: 'streetball-tournament-lower-parel',
    title: 'Streetball Tournament',
    tagline: 'Concrete courts. Raw energy. No filter.',
    category: 'Basketball',
    tags: ['3v3', 'Streetball', 'Competitive', 'Weekend'],
    description: `3v3 streetball. Concrete courts. The only rules are the ones you've always known.

NEXUS CLUB's Streetball Tournament is back — louder, faster, and with bigger prizes. Eight teams of 3 compete in a bracket format across 4 concrete courts, DJ on the sidelines, crowd getting loud.

This is grassroots basketball at its finest. Individual skill, team chemistry, and sheer desire to win — that's all you need. Register as a trio and bring your game.`,
    highlights: [
      '3v3 bracket tournament — 8 teams compete',
      '4 outdoor concrete courts with markings',
      'DJ & live crowd energy throughout',
      'Cash prize pool for top 3 teams',
      'Professional sports photography',
      'Free energy drinks & snacks for all participants',
    ],
    schedule: [
      { time: '2:00 PM', activity: 'Check-in & warm-up' },
      { time: '3:00 PM', activity: 'Quarter-finals begin' },
      { time: '4:30 PM', activity: 'Semi-finals' },
      { time: '5:30 PM', activity: 'Finals' },
      { time: '6:00 PM', activity: 'Prize distribution & closing' },
    ],
    whatToBring: [
      'Basketball shoes (recommended)',
      'Team kit in matching colors (optional)',
      'Water bottle',
      'Valid ID',
    ],
    rules: [
      'Teams must have exactly 3 players (no substitutes)',
      'Check-ball rule applies — check with defender before each possession',
      'Self-officiated with NEXUS mediators for disputes',
      'First team to 21 points wins (win by 2)',
      'Aggressive behavior results in immediate disqualification',
    ],
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80',
    ],
    dates: [
      {
        id: 'date-004-1',
        label: 'Sunday, 22 June 2026',
        date: '2026-06-22',
        time: '2:00 PM – 6:30 PM',
        location: 'Phoenix Courts, Lower Parel, Mumbai',
        spotsTotal: 24,
        spotsLeft: 18,
      },
    ],
    pricing: { solo: 599, duo: 549, group3: 499, group4plus: 499 },
    mapLocation: {
      lat: 18.9949,
      lng: 72.8302,
      address: 'Phoenix Courts, Senapati Bapat Marg, Lower Parel, Mumbai 400013',
      landmark: 'Near Phoenix Mills',
    },
    organizer: {
      name: 'Dev Sharma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev',
      role: 'Sports Coordinator · NEXUS CLUB',
      events: 12,
    },
    upiId: 'nexusclub@upi',
    difficulty: 'Intermediate',
    minAge: 16,
  },
  {
    id: 'evt-005',
    slug: 'social-mixer-colaba',
    title: 'Social Mixer — The Grand Edit',
    tagline: 'Great people. Great conversations. Zero awkwardness.',
    category: 'Social',
    tags: ['Networking', 'Social', 'Indoor', 'Evening'],
    description: `Mumbai has millions of people and yet everyone is looking for their tribe. NEXUS CLUB's Social Mixer is designed to change that.

Structured activities, thoughtful icebreakers, and a beautifully curated venue come together to make meaningful connection effortless. Unlike a party where you know no one, our mixer is built with intention — every game, every conversation prompt, every activity is designed to help you meet people you'll actually want to see again.

Expect great music, premium beverages, card games, trivia, and that one conversation that lasts way too long and you don't mind at all.`,
    highlights: [
      'Curated activities & structured icebreakers',
      'Premium venue with great ambiance',
      '2 rounds of beverages included',
      'Trivia, board games & conversation cards',
      'Professional MC & event facilitator',
      'Group photo & digital keepsake',
    ],
    schedule: [
      { time: '7:00 PM', activity: 'Doors open, welcome drinks' },
      { time: '7:30 PM', activity: 'Opening icebreaker games' },
      { time: '8:30 PM', activity: 'Trivia round & group activities' },
      { time: '9:30 PM', activity: 'Open mingling, music & games' },
      { time: '10:30 PM', activity: 'Group photo & close' },
    ],
    whatToBring: [
      'Smart casual attire (no sportswear)',
      'Your best stories 💬',
      'Business cards (optional)',
      'Valid ID for venue entry',
    ],
    rules: [
      'Must be 21+ to attend (ID required at door)',
      'Respect everyone\'s boundaries — consent is everything',
      'No sales pitches — this is a social event, not a business networking event',
      'Be present — put the phone away during activities',
    ],
    coverImage: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1600&q=80',
    ],
    dates: [
      {
        id: 'date-005-1',
        label: 'Friday, 20 June 2026',
        date: '2026-06-20',
        time: '7:00 PM – 11:00 PM',
        location: 'The Bombay Canteen, Colaba',
        spotsTotal: 35,
        spotsLeft: 21,
      },
      {
        id: 'date-005-2',
        label: 'Friday, 27 June 2026',
        date: '2026-06-27',
        time: '7:00 PM – 11:00 PM',
        location: 'The Bombay Canteen, Colaba',
        spotsTotal: 35,
        spotsLeft: 35,
      },
    ],
    pricing: { solo: 1299, duo: 1199, group3: 1099, group4plus: 999 },
    mapLocation: {
      lat: 18.9220,
      lng: 72.8303,
      address: 'The Bombay Canteen, Colaba, Mumbai 400005',
      landmark: 'Near Gateway of India',
    },
    organizer: {
      name: 'Shreya Nair',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shreya',
      role: 'Events Lead · NEXUS CLUB',
      events: 47,
    },
    upiId: 'nexusclub@upi',
    difficulty: 'All Levels',
    minAge: 21,
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getFeaturedEvents(): Event[] {
  return events.filter((e) => e.featured);
}

export function getEventsByCategory(category: string): Event[] {
  if (category === 'All') return events;
  return events.filter((e) => e.category === category);
}

export const GROUP_OPTIONS = [
  { type: 'solo' as const, label: 'Solo', size: 1, description: 'Just me, rolling in alone' },
  { type: 'duo' as const, label: 'Duo', size: 2, description: 'Bringing a +1' },
  { type: 'group3' as const, label: 'Group of 3', size: 3, description: 'Trio ready to roll' },
  { type: 'group4plus' as const, label: 'Group of 4+', size: 4, description: 'Squad is coming' },
];

export function getPriceForGroup(
  event: Event,
  groupType: keyof typeof event.pricing,
  groupSize: number,
  dateId: string
): PriceBreakdown {
  const pricing = event.pricing;
  const earlyBird = event.earlyBird;
  const fullPrice = pricing[groupType];

  if (!earlyBird?.active) {
    return {
      perPerson: fullPrice,
      total: fullPrice * groupSize,
      earlyBirdCount: 0,
      fullPriceCount: groupSize,
      earlyBirdPrice: fullPrice,
      fullPrice,
    };
  }

  const date = event.dates.find((d) => d.id === dateId);
  if (!date) {
    return {
      perPerson: fullPrice,
      total: fullPrice * groupSize,
      earlyBirdCount: 0,
      fullPriceCount: groupSize,
      earlyBirdPrice: fullPrice,
      fullPrice,
    };
  }

  const bookedSpots = date.spotsTotal - date.spotsLeft;
  const earlyBirdRemaining = Math.max(0, earlyBird.limit - bookedSpots);
  const ebCount = Math.min(groupSize, earlyBirdRemaining);
  const fullCount = groupSize - ebCount;
  const ebPrice = earlyBird.pricing[groupType];

  return {
    perPerson: ebCount > 0 ? ebPrice : fullPrice,
    total: ebCount * ebPrice + fullCount * fullPrice,
    earlyBirdCount: ebCount,
    fullPriceCount: fullCount,
    earlyBirdPrice: ebPrice,
    fullPrice,
  };
}

export const ALL_CATEGORIES = ['All', 'Football', 'Running', 'Yoga', 'Basketball', 'Social', 'Cricket', 'Music', 'Workshop'];
