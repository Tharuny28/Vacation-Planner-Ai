const fs = require('fs');
let text = fs.readFileSync('src/App.jsx', 'utf8');

const newFetchPlan = `  const fetchPlan=async()=>{
    setLoading(true);setErr("");
    try{
      // Simulated API delay
      await new Promise(r => setTimeout(r, 2500));
      
      const mockResult = {
        overview: \`Get ready for an unforgettable adventure in \${planData.destination}! This \${planData.days}-day journey is perfectly balanced between thrilling exploration and relaxing moments, tailored exactly for your group.\`,
        budgetBreakdown: {
          accommodation: Math.round(planData.budget * 0.4),
          food: Math.round(planData.budget * 0.25),
          activities: Math.round(planData.budget * 0.2),
          transport: Math.round(planData.budget * 0.1),
          misc: Math.round(planData.budget * 0.05)
        },
        places: [
          {name: "Grand Horizon Viewpoint", type: "Nature", description: "Breathtaking panoramic views of the entire region. Best experienced during golden hour for stunning photography.", rating: 4.8, entryFee: "Free", bestTime: "Sunset", duration: "1.5 hours", tip: "Arrive 30 mins before sunset to secure a good spot."},
          {name: "Old Town Heritage Walk", type: "Culture", description: "Wander through centuries-old cobblestone streets lined with vibrant local shops and historic architecture.", rating: 4.6, entryFee: "Free", bestTime: "Morning", duration: "2-3 hours", tip: "Wear comfortable walking shoes."},
          {name: "The Sapphire Lagoon", type: "Leisure", description: "Crystal clear waters perfect for a relaxing swim or kayaking. Surrounded by lush greenery.", rating: 4.9, entryFee: "₹450", bestTime: "Mid-day", duration: "Half day", tip: "Bring your own snorkeling gear!"},
          {name: "Royal Botanical Gardens", type: "Nature", description: "A massive expanse of exotic plants and vibrant flower displays. Features a stunning glass greenhouse.", rating: 4.5, entryFee: "₹200", bestTime: "Morning", duration: "2 hours", tip: "Don't miss the orchid pavilion."},
          {name: "Sunset Ridge Trail", type: "Adventure", description: "A moderate hiking trail that rewards you with sweeping views of the valley below.", rating: 4.7, entryFee: "Free", bestTime: "Late Afternoon", duration: "3 hours", tip: "Carry plenty of water."},
          {name: "Artisan Night Market", type: "Shopping", description: "Bustling evening market filled with local crafts, street performers, and endless food stalls.", rating: 4.8, entryFee: "Free", bestTime: "Evening", duration: "2 hours", tip: "Haggle respectfully for the best souvenir prices!"}
        ],
        restaurants: [
          {name: "The Rustic Hearth", cuisine: "Local Authentic", priceRange: "₹800-1500 per person", rating: 4.7, mustTry: "Signature Wood-fired Delights", openHours: "12 PM - 11 PM", address: "Downtown Square"},
          {name: "Oceanic Breeze Cafe", cuisine: "Seafood & Continental", priceRange: "₹1200-2000 per person", rating: 4.5, mustTry: "Grilled Catch of the Day", openHours: "8 AM - 10 PM", address: "Coastal Road"},
          {name: "Spice Route Kitchen", cuisine: "Asian Fusion", priceRange: "₹500-1000 per person", rating: 4.6, mustTry: "Spicy Coconut Curry", openHours: "11 AM - 10 PM", address: "Heritage District"},
          {name: "Skyline Lounge", cuisine: "International Tapas", priceRange: "₹1500-2500 per person", rating: 4.8, mustTry: "Truffle Fries & Mocktails", openHours: "5 PM - 1 AM", address: "Rooftop, Grand Hotel"}
        ],
        rentals: [
          {name: "City Wheels Rentals", type: "scooter", pricePerDay: "₹800", contact: "+1 234 567 890", address: "Main Transit Hub", includes: "2 Helmets & Full Tank"},
          {name: "EcoBike Adventures", type: "bike", pricePerDay: "₹400", contact: "+1 234 567 891", address: "Old Town Entrance", includes: "Basket & Lock"},
          {name: "Premium Drive Co.", type: "car", pricePerDay: "₹3500", contact: "+1 234 567 892", address: "Airport Kiosk", includes: "Insurance & Unlimited Mileage"}
        ],
        dayPlan: Array.from({length: Math.max(1, parseInt(planData.days) || 3)}).map((_, i) => ({
          day: i + 1,
          theme: ["Arrival & Exploration", "Adventure & Nature", "Culture & History", "Leisure & Beach", "Shopping & Departure"][i % 5],
          activities: [
            "Start the day with a hearty local breakfast at a highly rated cafe.",
            \`Head to a top attraction in \${planData.destination} to soak in the local vibe.\`,
            "Enjoy a beautiful dinner and experience the vibrant night scene."
          ]
        }))
      };
      
      setResult(mockResult);
    }catch(e){
      setErr("Could not generate plan. Please try again.");
    }finally{
      setLoading(false);
    }
  };`;

// Use regex to replace the fetchPlan function
text = text.replace(/const fetchPlan=async\(\)=>\{[\s\S]*?\}\s*catch\(e\)\{[\s\S]*?\}\s*finally\s*\{[\s\S]*?\}\s*\};/g, newFetchPlan);

// Fallback in case regex missed
if (!text.includes('mockResult')) {
    text = text.replace(/const fetchPlan=async\(\)=>\{[\s\S]*?setLoading\(false\);\s*\}\s*\};/g, newFetchPlan);
}

fs.writeFileSync('src/App.jsx', text);
console.log('Mock AI applied.');
