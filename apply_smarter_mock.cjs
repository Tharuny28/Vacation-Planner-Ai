const fs = require('fs');
let text = fs.readFileSync('src/App.jsx', 'utf8');

const newFetchPlan = `  const fetchPlan=async()=>{
    setLoading(true);setErr("");
    try{
      // Simulated API delay
      await new Promise(r => setTimeout(r, 2200));
      
      const dest = (planData.destination || "").toLowerCase();
      let places = [];
      let restaurants = [];
      let rentals = [];
      
      if (dest.includes('goa')) {
         places = [
           {name: "Baga Beach", type: "Beach", description: "Vibrant beach known for its water sports, shacks, and nightlife.", rating: 4.5, entryFee: "Free", bestTime: "Evening", duration: "3 hours", tip: "Try the seafood at the famous Tito's Lane nearby."},
           {name: "Dudhsagar Waterfalls", type: "Nature", description: "A magnificent four-tiered waterfall on the Mandovi River.", rating: 4.8, entryFee: "₹400", bestTime: "Morning", duration: "Half day", tip: "Jeep safaris get booked out early."},
           {name: "Fort Aguada", type: "History", description: "A well-preserved 17th-century Portuguese fort and lighthouse overlooking the Arabian Sea.", rating: 4.6, entryFee: "Free", bestTime: "Late Afternoon", duration: "2 hours", tip: "Great spot for sunset photography."},
           {name: "Basilica of Bom Jesus", type: "Culture", description: "A UNESCO World Heritage site holding the mortal remains of St. Francis Xavier.", rating: 4.7, entryFee: "Free", bestTime: "Morning", duration: "1.5 hours", tip: "Dress modestly."},
           {name: "Anjuna Flea Market", type: "Shopping", description: "A legendary lively weekly market offering clothes, jewelry, and souvenirs.", rating: 4.4, entryFee: "Free", bestTime: "Wednesday", duration: "2 hours", tip: "Bargain hard!"},
           {name: "Palolem Beach", type: "Beach", description: "A picturesque crescent-shaped beach known for its calm waters and scenic beauty.", rating: 4.9, entryFee: "Free", bestTime: "Mid-day", duration: "4 hours", tip: "Rent a kayak to explore the nearby butterfly beach."}
         ];
         restaurants = [
           {name: "Thalassa", cuisine: "Greek & Mediterranean", priceRange: "₹1500-2500 per person", rating: 4.7, mustTry: "Spicy Prawn Saganaki", openHours: "9 AM - 12 AM", address: "Siolim"},
           {name: "Gunpowder", cuisine: "South Indian Coastal", priceRange: "₹1000-1500 per person", rating: 4.8, mustTry: "Andhra Style Spicy Chicken", openHours: "12 PM - 10:30 PM", address: "Assagao"},
           {name: "Curlies Beach Shack", cuisine: "Goan & Continental", priceRange: "₹800-1200 per person", rating: 4.3, mustTry: "Goan Fish Curry", openHours: "8 AM - 3 AM", address: "Anjuna Beach"},
           {name: "Martin's Corner", cuisine: "Authentic Goan", priceRange: "₹1000-1800 per person", rating: 4.6, mustTry: "Pork Vindaloo & Bebinca", openHours: "11 AM - 11 PM", address: "Betalbatim"}
         ];
         rentals = [
           {name: "Goa Scoot Rentals", type: "scooter", pricePerDay: "₹400", contact: "+91 98765 43210", address: "Calangute Market", includes: "2 Helmets"},
           {name: "Cruise Car Hire", type: "car", pricePerDay: "₹1500", contact: "+91 98765 43211", address: "Dabolim Airport", includes: "Self-drive & Insurance"},
           {name: "Royal Enfield Hub", type: "bike", pricePerDay: "₹800", contact: "+91 98765 43212", address: "Panjim City", includes: "Helmet & 1L fuel"}
         ];
      } else if (dest.includes('paris')) {
         places = [
           {name: "Eiffel Tower", type: "Landmark", description: "The iconic wrought-iron lattice tower on the Champ de Mars.", rating: 4.8, entryFee: "₹2400", bestTime: "Sunset", duration: "2 hours", tip: "Book tickets online in advance to skip the queue."},
           {name: "Louvre Museum", type: "Culture", description: "The world's largest art museum and a historic monument in Paris.", rating: 4.7, entryFee: "₹1500", bestTime: "Morning", duration: "4 hours", tip: "Don't just rush to the Mona Lisa; explore the Egyptian antiquities."},
           {name: "Montmartre & Sacré-Cœur", type: "History", description: "A picturesque district known for its artistic history and the white-domed basilica.", rating: 4.6, entryFee: "Free", bestTime: "Late Afternoon", duration: "3 hours", tip: "Walk up the stairs instead of the funicular for the best views."},
           {name: "Seine River Cruise", type: "Leisure", description: "A relaxing boat ride offering spectacular views of Parisian landmarks.", rating: 4.5, entryFee: "₹1200", bestTime: "Evening", duration: "1 hour", tip: "Take the evening cruise to see the city lights."},
           {name: "Notre-Dame Cathedral", type: "Architecture", description: "A medieval Catholic cathedral considered one of the finest examples of French Gothic architecture.", rating: 4.7, entryFee: "Free", bestTime: "Morning", duration: "1 hour", tip: "The exterior is still breathtaking while renovations continue."},
           {name: "Champs-Élysées", type: "Shopping", description: "Famous avenue known for its theaters, cafés, and luxury shops.", rating: 4.4, entryFee: "Free", bestTime: "Mid-day", duration: "2 hours", tip: "Grab a macaroon from Ladurée!"}
         ];
         restaurants = [
           {name: "Le Relais de l'Entrecôte", cuisine: "French Steakhouse", priceRange: "₹3000-4000 per person", rating: 4.6, mustTry: "Steak Frites with secret sauce", openHours: "12 PM - 11 PM", address: "Saint-Germain-des-Prés"},
           {name: "L'Ami Jean", cuisine: "Basque French", priceRange: "₹4000-6000 per person", rating: 4.7, mustTry: "Rice Pudding (Riz au lait)", openHours: "7 PM - 11 PM", address: "Rue Malar"},
           {name: "Boulangerie Utopie", cuisine: "Bakery", priceRange: "₹500-1000 per person", rating: 4.8, mustTry: "Charcoal Baguette & Eclairs", openHours: "7 AM - 8 PM", address: "Rue Jean-Pierre Timbaud"},
           {name: "Le Train Bleu", cuisine: "Fine Dining", priceRange: "₹5000-8000 per person", rating: 4.5, mustTry: "Roasted Leg of Lamb", openHours: "11 AM - 10:30 PM", address: "Gare de Lyon"}
         ];
         rentals = [
           {name: "Velib City Bikes", type: "bike", pricePerDay: "₹400", contact: "App Based", address: "Everywhere", includes: "City-wide docking"},
           {name: "Sixt Rent a Car", type: "car", pricePerDay: "₹4500", contact: "+33 1 234 567", address: "CDG Airport", includes: "Automatic transmission"},
           {name: "Lime Scooters", type: "scooter", pricePerDay: "₹1200", contact: "App Based", address: "Central Paris", includes: "Electric charge"}
         ];
      } else {
         places = [
          {name: \`The Grand \${planData.destination} Viewpoint\`, type: "Nature", description: "Breathtaking panoramic views of the entire region. Best experienced during golden hour for stunning photography.", rating: 4.8, entryFee: "Free", bestTime: "Sunset", duration: "1.5 hours", tip: "Arrive 30 mins before sunset to secure a good spot."},
          {name: \`Historic \${planData.destination} Walk\`, type: "Culture", description: "Wander through centuries-old streets lined with vibrant local shops and historic architecture.", rating: 4.6, entryFee: "Free", bestTime: "Morning", duration: "2-3 hours", tip: "Wear comfortable walking shoes."},
          {name: \`The Sapphire \${planData.destination} Lagoon\`, type: "Leisure", description: "Crystal clear waters perfect for a relaxing swim or kayaking. Surrounded by lush greenery.", rating: 4.9, entryFee: "₹450", bestTime: "Mid-day", duration: "Half day", tip: "Bring your own snorkeling gear!"},
          {name: "Royal Botanical Gardens", type: "Nature", description: "A massive expanse of exotic plants and vibrant flower displays. Features a stunning glass greenhouse.", rating: 4.5, entryFee: "₹200", bestTime: "Morning", duration: "2 hours", tip: "Don't miss the orchid pavilion."},
          {name: "Sunset Ridge Trail", type: "Adventure", description: "A moderate hiking trail that rewards you with sweeping views of the valley below.", rating: 4.7, entryFee: "Free", bestTime: "Late Afternoon", duration: "3 hours", tip: "Carry plenty of water."},
          {name: "Artisan Night Market", type: "Shopping", description: "Bustling evening market filled with local crafts, street performers, and endless food stalls.", rating: 4.8, entryFee: "Free", bestTime: "Evening", duration: "2 hours", tip: "Haggle respectfully for the best souvenir prices!"}
        ];
        restaurants = [
          {name: "The Rustic Hearth", cuisine: "Local Authentic", priceRange: "₹800-1500 per person", rating: 4.7, mustTry: "Signature Wood-fired Delights", openHours: "12 PM - 11 PM", address: "Downtown Square"},
          {name: "Oceanic Breeze Cafe", cuisine: "Seafood & Continental", priceRange: "₹1200-2000 per person", rating: 4.5, mustTry: "Grilled Catch of the Day", openHours: "8 AM - 10 PM", address: "Coastal Road"},
          {name: "Spice Route Kitchen", cuisine: "Asian Fusion", priceRange: "₹500-1000 per person", rating: 4.6, mustTry: "Spicy Coconut Curry", openHours: "11 AM - 10 PM", address: "Heritage District"},
          {name: "Skyline Lounge", cuisine: "International Tapas", priceRange: "₹1500-2500 per person", rating: 4.8, mustTry: "Truffle Fries & Mocktails", openHours: "5 PM - 1 AM", address: "Rooftop, Grand Hotel"}
        ];
        rentals = [
          {name: "City Wheels Rentals", type: "scooter", pricePerDay: "₹800", contact: "+1 234 567 890", address: "Main Transit Hub", includes: "2 Helmets & Full Tank"},
          {name: "EcoBike Adventures", type: "bike", pricePerDay: "₹400", contact: "+1 234 567 891", address: "Old Town Entrance", includes: "Basket & Lock"},
          {name: "Premium Drive Co.", type: "car", pricePerDay: "₹3500", contact: "+1 234 567 892", address: "Airport Kiosk", includes: "Insurance & Unlimited Mileage"}
        ];
      }

      const mockResult = {
        overview: \`Get ready for an unforgettable adventure in \${planData.destination}! This \${planData.days}-day journey is perfectly balanced between thrilling exploration and relaxing moments, tailored exactly for your group.\`,
        budgetBreakdown: {
          accommodation: Math.round(planData.budget * 0.4),
          food: Math.round(planData.budget * 0.25),
          activities: Math.round(planData.budget * 0.2),
          transport: Math.round(planData.budget * 0.1),
          misc: Math.round(planData.budget * 0.05)
        },
        places,
        restaurants,
        rentals,
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

// Regex replacement
text = text.replace(/const fetchPlan=async\(\)=>\{[\s\S]*?\}\s*catch\(e\)\{[\s\S]*?\}\s*finally\s*\{[\s\S]*?\}\s*\};/g, newFetchPlan);
fs.writeFileSync('src/App.jsx', text);
console.log('Smarter mock applied!');
