// Mock transportation data
export const transportModes = [
  {
    id: 'walking',
    name: 'Walking',
    icon: 'footprints',
    profiles: [
      { id: 'safe', name: 'Safe', description: 'Well-lit paths with less traffic' },
      { id: 'scenic', name: 'Scenic', description: 'Beautiful routes through parks and landmarks' },
      { id: 'fast', name: 'Fast', description: 'Shortest paths to destination' },
      { id: 'accessible', name: 'Accessible', description: 'Routes with ramps and elevators' },
    ],
  },
  {
    id: 'cycling',
    name: 'Cycling',
    icon: 'bike',
    profiles: [
      { id: 'safe', name: 'Safe', description: 'Dedicated bike lanes and less traffic' },
      { id: 'sport', name: 'Sport', description: 'Routes with more elevation for training' },
      { id: 'fast', name: 'Fast', description: 'Direct routes to destination' },
      { id: 'scenic', name: 'Scenic', description: 'Beautiful cycling paths and trails' },
    ],
  },
  {
    id: 'car',
    name: 'Car',
    icon: 'car',
    profiles: [
      { id: 'fast', name: 'Fast', description: 'Fastest route with highways' },
      { id: 'eco', name: 'Eco', description: 'Fuel-efficient routes' },
      { id: 'scenic', name: 'Scenic', description: 'Scenic drives with viewpoints' },
      { id: 'no-tolls', name: 'No Tolls', description: 'Avoid toll roads and bridges' },
    ],
  },
  {
    id: 'transit',
    name: 'Transit',
    icon: 'train',
    profiles: [
      { id: 'fast', name: 'Fast', description: 'Routes with fewer transfers' },
      { id: 'cheap', name: 'Cheap', description: 'Most economical routes' },
      { id: 'accessible', name: 'Accessible', description: 'Routes with accessible stations' },
      { id: 'less-walking', name: 'Less Walking', description: 'Minimize walking distance' },
    ],
  },
];

// Mock routes for results
export const mockRoutes = {
  walking: [
    {
      id: 'w1',
      profile: 'safe',
      duration: 35,
      distance: 2.3,
      elevation: 12,
      conformity: 4.8,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Turn right onto Oak Avenue', distance: 0.5, duration: 8 },
        { id: 's3', instruction: 'Walk through Central Park', distance: 1.2, duration: 20 },
        { id: 's4', instruction: 'Turn left onto Maple Street', distance: 0.4, duration: 5 },
        { id: 's5', instruction: 'Arrive at destination', distance: 0.2, duration: 2 },
      ],
      elevationProfile: [0, 2, 5, 10, 12, 8, 5, 2, 0],
    },
    {
      id: 'w2',
      profile: 'fast',
      duration: 28,
      distance: 1.9,
      elevation: 18,
      conformity: 4.2,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Turn right onto Pine Avenue', distance: 0.4, duration: 6 },
        { id: 's3', instruction: 'Cross Highway Bridge', distance: 0.8, duration: 12 },
        { id: 's4', instruction: 'Turn left onto Cedar Street', distance: 0.5, duration: 8 },
        { id: 's5', instruction: 'Arrive at destination', distance: 0.2, duration: 2 },
      ],
      elevationProfile: [0, 5, 10, 18, 15, 12, 5, 0],
    },
    {
      id: 'w3',
      profile: 'scenic',
      duration: 42,
      distance: 2.7,
      elevation: 8,
      conformity: 4.9,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Enter Riverside Path', distance: 0.6, duration: 10 },
        { id: 's3', instruction: 'Follow path along river', distance: 1.4, duration: 22 },
        { id: 's4', instruction: 'Turn right onto Garden Street', distance: 0.5, duration: 8 },
        { id: 's5', instruction: 'Arrive at destination', distance: 0.2, duration: 2 },
      ],
      elevationProfile: [0, 1, 3, 5, 8, 6, 4, 2, 0],
    },
  ],
  cycling: [
    {
      id: 'c1',
      profile: 'sport',
      duration: 25,
      distance: 5.2,
      elevation: 65,
      conformity: 4.6,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Turn right onto Hill Road', distance: 1.2, duration: 6 },
        { id: 's3', instruction: 'Climb Sunset Hill', distance: 2.8, duration: 14 },
        { id: 's4', instruction: 'Descend via Ridge Path', distance: 1.0, duration: 4 },
        { id: 's5', instruction: 'Arrive at destination', distance: 0.2, duration: 1 },
      ],
      elevationProfile: [10, 25, 45, 65, 60, 40, 20, 10],
    },
    {
      id: 'c2',
      profile: 'safe',
      duration: 28,
      distance: 4.8,
      elevation: 20,
      conformity: 4.9,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Join Bike Lane on Oak Avenue', distance: 1.0, duration: 5 },
        { id: 's3', instruction: 'Follow Dedicated Bike Path', distance: 2.5, duration: 12 },
        { id: 's4', instruction: 'Turn left onto Maple Street Bike Lane', distance: 1.1, duration: 6 },
        { id: 's5', instruction: 'Arrive at destination', distance: 0.2, duration: 1 },
      ],
      elevationProfile: [5, 10, 15, 20, 18, 12, 8, 5],
    },
    {
      id: 'c3',
      profile: 'fast',
      duration: 18,
      distance: 4.5,
      elevation: 30,
      conformity: 4.1,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Take Main Boulevard', distance: 2.2, duration: 8 },
        { id: 's3', instruction: 'Turn right onto Highway Shoulder', distance: 1.8, duration: 7 },
        { id: 's4', instruction: 'Exit onto Park Street', distance: 0.3, duration: 2 },
        { id: 's5', instruction: 'Arrive at destination', distance: 0.2, duration: 1 },
      ],
      elevationProfile: [5, 15, 30, 25, 20, 10, 5],
    },
  ],
  car: [
    {
      id: 'v1',
      profile: 'fast',
      duration: 15,
      distance: 12.5,
      elevation: 0,
      conformity: 4.7,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Turn right onto Highway Entrance', distance: 1.5, duration: 2 },
        { id: 's3', instruction: 'Continue on Highway 101', distance: 9.0, duration: 8 },
        { id: 's4', instruction: 'Take Exit 24 toward Downtown', distance: 1.5, duration: 3 },
        { id: 's5', instruction: 'Arrive at destination', distance: 0.5, duration: 2 },
      ],
      elevationProfile: [10, 15, 20, 25, 20, 15, 10],
    },
    {
      id: 'v2',
      profile: 'eco',
      duration: 22,
      distance: 10.2,
      elevation: 0,
      conformity: 4.8,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Turn right onto Oak Avenue', distance: 2.0, duration: 5 },
        { id: 's3', instruction: 'Continue on City Boulevard', distance: 6.5, duration: 12 },
        { id: 's4', instruction: 'Turn left onto Park Street', distance: 1.2, duration: 3 },
        { id: 's5', instruction: 'Arrive at destination', distance: 0.5, duration: 2 },
      ],
      elevationProfile: [5, 10, 15, 20, 15, 10, 5],
    },
    {
      id: 'v3',
      profile: 'scenic',
      duration: 35,
      distance: 18.5,
      elevation: 0,
      conformity: 4.9,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Turn onto Coastal Highway', distance: 3.5, duration: 5 },
        { id: 's3', instruction: 'Continue along Scenic Route 1', distance: 12.0, duration: 25 },
        { id: 's4', instruction: 'Turn left onto Ocean View Drive', distance: 2.5, duration: 4 },
        { id: 's5', instruction: 'Arrive at destination', distance: 0.5, duration: 1 },
      ],
      elevationProfile: [5, 15, 30, 45, 35, 20, 10, 5],
    },
  ],
  transit: [
    {
      id: 't1',
      profile: 'fast',
      duration: 28,
      distance: 8.5,
      elevation: 0,
      conformity: 4.5,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Walk to Central Station', distance: 0.5, duration: 7 },
        { id: 's3', instruction: 'Take Blue Line to Downtown', distance: 7.0, duration: 15 },
        { id: 's4', instruction: 'Walk to destination', distance: 1.0, duration: 6 },
        { id: 's5', instruction: 'Arrive at destination', distance: 0, duration: 0 },
      ],
      elevationProfile: [5, 10, 5, 10, 5],
    },
    {
      id: 't2',
      profile: 'less-walking',
      duration: 38,
      distance: 9.2,
      elevation: 0,
      conformity: 4.6,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Walk to Local Bus Stop', distance: 0.2, duration: 3 },
        { id: 's3', instruction: 'Take Bus 42 to Central Station', distance: 2.0, duration: 8 },
        { id: 's4', instruction: 'Take Blue Line to Downtown', distance: 7.0, duration: 15 },
        { id: 's5', instruction: 'Take Bus 15 to destination', distance: 0.8, duration: 10 },
        { id: 's6', instruction: 'Walk to destination', distance: 0.2, duration: 2 },
      ],
      elevationProfile: [5, 5, 10, 5, 5, 5],
    },
    {
      id: 't3',
      profile: 'cheap',
      duration: 45,
      distance: 8.5,
      elevation: 0,
      conformity: 4.3,
      steps: [
        { id: 's1', instruction: 'Start at Main Street', distance: 0, duration: 0 },
        { id: 's2', instruction: 'Walk to Local Bus Stop', distance: 0.5, duration: 7 },
        { id: 's3', instruction: 'Take Bus 10 to Downtown', distance: 8.0, duration: 35 },
        { id: 's4', instruction: 'Walk to destination', distance: 0.3, duration: 3 },
        { id: 's5', instruction: 'Arrive at destination', distance: 0, duration: 0 },
      ],
      elevationProfile: [5, 10, 5, 5],
    },
  ],
};

// Mock favorite and history locations
export const favoritesAndHistory = {
  favorites: [
    { id: 'fav1', name: 'Home', address: '123 Maple Street', icon: 'home' },
    { id: 'fav2', name: 'Work', address: '456 Business Plaza', icon: 'briefcase' },
    { id: 'fav3', name: 'Gym', address: '789 Fitness Avenue', icon: 'dumbbell' },
    { id: 'fav4', name: 'Parents', address: '321 Family Road', icon: 'heart' },
  ],
  history: [
    {
      id: 'his1',
      from: 'Home',
      to: 'Work',
      date: '2025-04-10',
      mode: 'cycling',
      profile: 'fast',
      duration: 22,
    },
    {
      id: 'his2',
      from: 'Work',
      to: 'Gym',
      date: '2025-04-09',
      mode: 'walking',
      profile: 'safe',
      duration: 15,
    },
    {
      id: 'his3',
      from: 'Gym',
      to: 'Home',
      date: '2025-04-09',
      mode: 'transit',
      profile: 'fast',
      duration: 28,
    },
    {
      id: 'his4',
      from: 'Home',
      to: 'Parents',
      date: '2025-04-08',
      mode: 'car',
      profile: 'scenic',
      duration: 45,
    },
  ],
};

// Mock user preferences
export const userPreferences = {
  defaultMode: 'cycling',
  defaultProfiles: {
    walking: 'safe',
    cycling: 'sport',
    car: 'eco',
    transit: 'fast',
  },
  units: 'km', // or 'miles'
  theme: 'light', // or 'dark'
  accessibility: {
    wheelchairAccess: true,
    avoidStairs: true,
    visualImpairment: false,
    audioGuidance: true,
  },
};

// Mock data for map coordinates
export const mapCoordinates = {
  userLocation: {
    latitude: 48.8584,
    longitude: 2.2945,
  },
  destination: {
    latitude: 48.8606,
    longitude: 2.3376,
  },
  route: [
    { latitude: 48.8584, longitude: 2.2945 },
    { latitude: 48.8580, longitude: 2.3000 },
    { latitude: 48.8575, longitude: 2.3050 },
    { latitude: 48.8582, longitude: 2.3100 },
    { latitude: 48.8590, longitude: 2.3150 },
    { latitude: 48.8587, longitude: 2.3200 },
    { latitude: 48.8595, longitude: 2.3250 },
    { latitude: 48.8600, longitude: 2.3300 },
    { latitude: 48.8606, longitude: 2.3376 },
  ],
};