const fs = require('fs');
let text = fs.readFileSync('src/App.jsx', 'utf8');

const newFetchPlan = `  const fetchPlan=async()=>{
    setLoading(true);setErr("");
    try{
      await new Promise(r => setTimeout(r, 1500));
      
      const dest = (planData.destination || "").toLowerCase();
      
      const DB = {
        goa: {
           places: [
             {name: "Baga Beach", type: "Beach", description: "Vibrant beach known for its water sports, shacks, and nightlife.", rating: 4.5, entryFee: "Free", bestTime: "Evening", duration: "3 hours", tip: "Try the seafood at the famous Tito's Lane nearby."},
             {name: "Dudhsagar Waterfalls", type: "Nature", description: "A magnificent four-tiered waterfall on the Mandovi River.", rating: 4.8, entryFee: "₹400", bestTime: "Morning", duration: "Half day", tip: "Jeep safaris get booked out early."},
             {name: "Fort Aguada", type: "History", description: "A well-preserved 17th-century Portuguese fort and lighthouse overlooking the Arabian Sea.", rating: 4.6, entryFee: "Free", bestTime: "Late Afternoon", duration: "2 hours", tip: "Great spot for sunset photography."},
             {name: "Basilica of Bom Jesus", type: "Culture", description: "A UNESCO World Heritage site holding the mortal remains of St. Francis Xavier.", rating: 4.7, entryFee: "Free", bestTime: "Morning", duration: "1.5 hours", tip: "Dress modestly."},
             {name: "Anjuna Flea Market", type: "Shopping", description: "A legendary lively weekly market offering clothes, jewelry, and souvenirs.", rating: 4.4, entryFee: "Free", bestTime: "Wednesday", duration: "2 hours", tip: "Bargain hard!"},
             {name: "Palolem Beach", type: "Beach", description: "A picturesque crescent-shaped beach known for its calm waters and scenic beauty.", rating: 4.9, entryFee: "Free", bestTime: "Mid-day", duration: "4 hours", tip: "Rent a kayak to explore the nearby butterfly beach."}
           ],
           restaurants: [
             {name: "Thalassa", cuisine: "Greek & Mediterranean", priceRange: "₹1500-2500 per person", rating: 4.7, mustTry: "Spicy Prawn Saganaki", openHours: "9 AM - 12 AM", address: "Siolim"},
             {name: "Gunpowder", cuisine: "South Indian Coastal", priceRange: "₹1000-1500 per person", rating: 4.8, mustTry: "Andhra Style Spicy Chicken", openHours: "12 PM - 10:30 PM", address: "Assagao"},
             {name: "Curlies Beach Shack", cuisine: "Goan & Continental", priceRange: "₹800-1200 per person", rating: 4.3, mustTry: "Goan Fish Curry", openHours: "8 AM - 3 AM", address: "Anjuna Beach"},
             {name: "Martin's Corner", cuisine: "Authentic Goan", priceRange: "₹1000-1800 per person", rating: 4.6, mustTry: "Pork Vindaloo & Bebinca", openHours: "11 AM - 11 PM", address: "Betalbatim"}
           ],
           rentals: [
             {name: "Goa Scoot Rentals", type: "scooter", pricePerDay: "₹400", contact: "+91 98765 43210", address: "Calangute Market", includes: "2 Helmets"},
             {name: "Cruise Car Hire", type: "car", pricePerDay: "₹1500", contact: "+91 98765 43211", address: "Dabolim Airport", includes: "Self-drive & Insurance"},
             {name: "Royal Enfield Hub", type: "bike", pricePerDay: "₹800", contact: "+91 98765 43212", address: "Panjim City", includes: "Helmet & 1L fuel"}
           ]
        },
        paris: {
           places: [
             {name: "Eiffel Tower", type: "Landmark", description: "The iconic wrought-iron lattice tower on the Champ de Mars.", rating: 4.8, entryFee: "₹2400", bestTime: "Sunset", duration: "2 hours", tip: "Book tickets online in advance to skip the queue."},
             {name: "Louvre Museum", type: "Culture", description: "The world's largest art museum and a historic monument in Paris.", rating: 4.7, entryFee: "₹1500", bestTime: "Morning", duration: "4 hours", tip: "Don't just rush to the Mona Lisa; explore the Egyptian antiquities."},
             {name: "Montmartre & Sacré-Cœur", type: "History", description: "A picturesque district known for its artistic history and the white-domed basilica.", rating: 4.6, entryFee: "Free", bestTime: "Late Afternoon", duration: "3 hours", tip: "Walk up the stairs instead of the funicular for the best views."},
             {name: "Seine River Cruise", type: "Leisure", description: "A relaxing boat ride offering spectacular views of Parisian landmarks.", rating: 4.5, entryFee: "₹1200", bestTime: "Evening", duration: "1 hour", tip: "Take the evening cruise to see the city lights."},
             {name: "Notre-Dame Cathedral", type: "Architecture", description: "A medieval Catholic cathedral considered one of the finest examples of French Gothic architecture.", rating: 4.7, entryFee: "Free", bestTime: "Morning", duration: "1 hour", tip: "The exterior is still breathtaking while renovations continue."},
             {name: "Champs-Élysées", type: "Shopping", description: "Famous avenue known for its theaters, cafés, and luxury shops.", rating: 4.4, entryFee: "Free", bestTime: "Mid-day", duration: "2 hours", tip: "Grab a macaroon from Ladurée!"}
           ],
           restaurants: [
             {name: "Le Relais de l'Entrecôte", cuisine: "French Steakhouse", priceRange: "₹3000-4000 per person", rating: 4.6, mustTry: "Steak Frites with secret sauce", openHours: "12 PM - 11 PM", address: "Saint-Germain-des-Prés"},
             {name: "L'Ami Jean", cuisine: "Basque French", priceRange: "₹4000-6000 per person", rating: 4.7, mustTry: "Rice Pudding (Riz au lait)", openHours: "7 PM - 11 PM", address: "Rue Malar"},
             {name: "Boulangerie Utopie", cuisine: "Bakery", priceRange: "₹500-1000 per person", rating: 4.8, mustTry: "Charcoal Baguette & Eclairs", openHours: "7 AM - 8 PM", address: "Rue Jean-Pierre Timbaud"},
             {name: "Le Train Bleu", cuisine: "Fine Dining", priceRange: "₹5000-8000 per person", rating: 4.5, mustTry: "Roasted Leg of Lamb", openHours: "11 AM - 10:30 PM", address: "Gare de Lyon"}
           ],
           rentals: [
             {name: "Velib City Bikes", type: "bike", pricePerDay: "₹400", contact: "App Based", address: "Everywhere", includes: "City-wide docking"},
             {name: "Sixt Rent a Car", type: "car", pricePerDay: "₹4500", contact: "+33 1 234 567", address: "CDG Airport", includes: "Automatic transmission"},
             {name: "Lime Scooters", type: "scooter", pricePerDay: "₹1200", contact: "App Based", address: "Central Paris", includes: "Electric charge"}
           ]
        },
        bali: {
           places: [
             {name: "Uluwatu Temple", type: "Culture", description: "A spectacular Balinese sea temple perched on a steep cliff.", rating: 4.8, entryFee: "₹300", bestTime: "Sunset", duration: "2 hours", tip: "Watch out for the mischievous monkeys!"},
             {name: "Tegallalang Rice Terrace", type: "Nature", description: "Beautifully lush, terraced rice paddies in Ubud.", rating: 4.7, entryFee: "₹100", bestTime: "Morning", duration: "3 hours", tip: "Arrive early before the sun gets too hot."},
             {name: "Sacred Monkey Forest", type: "Nature", description: "A nature reserve and temple complex in Ubud.", rating: 4.6, entryFee: "₹400", bestTime: "Mid-day", duration: "2 hours", tip: "Keep your sunglasses and loose items secured."},
             {name: "Seminyak Beach", type: "Beach", description: "Trendy beach area known for luxury resorts, villas and spas.", rating: 4.5, entryFee: "Free", bestTime: "Evening", duration: "4 hours", tip: "Perfect spot for sunset cocktails at a beach club."},
             {name: "Mount Batur", type: "Adventure", description: "An active volcano that is a very popular sunrise trek.", rating: 4.8, entryFee: "₹1500 (with guide)", bestTime: "Early Morning", duration: "6 hours", tip: "Wear proper trekking shoes and bring a jacket."},
             {name: "Tanah Lot", type: "Culture", description: "Iconic offshore rock formation hosting a pilgrimage temple.", rating: 4.7, entryFee: "₹300", bestTime: "Sunset", duration: "2 hours", tip: "Check the tide schedule before visiting."}
           ],
           restaurants: [
             {name: "Locavore", cuisine: "Modern Indonesian", priceRange: "₹5000-8000 per person", rating: 4.9, mustTry: "Tasting Menu", openHours: "6 PM - 11 PM", address: "Ubud"},
             {name: "La Lucciola", cuisine: "Italian", priceRange: "₹2000-3500 per person", rating: 4.6, mustTry: "Seafood Linguine", openHours: "9 AM - 11 PM", address: "Seminyak Beach"},
             {name: "Naughty Nuri's", cuisine: "BBQ/Grill", priceRange: "₹1000-1800 per person", rating: 4.7, mustTry: "BBQ Pork Ribs", openHours: "11 AM - 10 PM", address: "Ubud"},
             {name: "Warung Made", cuisine: "Traditional Balinese", priceRange: "₹400-800 per person", rating: 4.5, mustTry: "Nasi Campur", openHours: "10 AM - 10 PM", address: "Kuta"}
           ],
           rentals: [
             {name: "Bali Bike Rental", type: "scooter", pricePerDay: "₹500", contact: "+62 812 3456", address: "Kuta & Seminyak", includes: "Surfboard rack & Insurance"},
             {name: "Ubud Cycle Tours", type: "bike", pricePerDay: "₹300", contact: "+62 812 3457", address: "Ubud Center", includes: "Helmet & Map"},
             {name: "Island Car Hire", type: "car", pricePerDay: "₹2000", contact: "+62 812 3458", address: "Denpasar Airport", includes: "English speaking driver (optional)"}
           ]
        },
        tokyo: {
           places: [
             {name: "Senso-ji Temple", type: "Culture", description: "Tokyo's oldest and most significant Buddhist temple located in Asakusa.", rating: 4.8, entryFee: "Free", bestTime: "Morning", duration: "2 hours", tip: "Explore the Nakamise shopping street for traditional snacks."},
             {name: "Shibuya Crossing", type: "Landmark", description: "The famous, massive pedestrian scramble intersection.", rating: 4.7, entryFee: "Free", bestTime: "Evening", duration: "1 hour", tip: "Get a window seat at the nearby Starbucks or Magnet by Shibuya 109 for the best aerial view."},
             {name: "Meiji Shrine", type: "History", description: "A Shinto shrine dedicated to Emperor Meiji, surrounded by a peaceful forest.", rating: 4.6, entryFee: "Free", bestTime: "Morning", duration: "2 hours", tip: "Experience the tranquil contrast right next to bustling Harajuku."},
             {name: "Akihabara", type: "Shopping", description: "The epicenter of Japan's otaku culture, electronics, and anime.", rating: 4.5, entryFee: "Free", bestTime: "Afternoon", duration: "4 hours", tip: "Visit a themed maid cafe or retro arcade."},
             {name: "Tokyo Skytree", type: "Landmark", description: "A broadcasting and observation tower with spectacular city views.", rating: 4.7, entryFee: "₹1800", bestTime: "Sunset", duration: "2 hours", tip: "Book fast-track tickets to avoid long lines."},
             {name: "Shinjuku Gyoen", type: "Nature", description: "One of Tokyo's largest and most popular parks, beautiful year-round.", rating: 4.8, entryFee: "₹300", bestTime: "Mid-day", duration: "2 hours", tip: "Particularly stunning during cherry blossom season or autumn."}
           ],
           restaurants: [
             {name: "Sukiyabashi Jiro", cuisine: "Sushi", priceRange: "₹20000+ per person", rating: 4.9, mustTry: "Omakase Course", openHours: "11:30 AM - 2 PM, 5 PM - 8 PM", address: "Ginza"},
             {name: "Ichiran Ramen", cuisine: "Ramen", priceRange: "₹800-1200 per person", rating: 4.7, mustTry: "Tonkotsu Ramen", openHours: "24 Hours", address: "Shibuya"},
             {name: "Kyubey", cuisine: "Sushi", priceRange: "₹6000-12000 per person", rating: 4.8, mustTry: "Nigiri Lunch Set", openHours: "11:30 AM - 2 PM, 5 PM - 10 PM", address: "Ginza"},
             {name: "Gyukatsu Motomura", cuisine: "Japanese Cutlet", priceRange: "₹1200-2000 per person", rating: 4.6, mustTry: "Deep Fried Beef Cutlet", openHours: "11 AM - 10 PM", address: "Shinjuku"}
           ],
           rentals: [
             {name: "Docomo Bike Share", type: "bike", pricePerDay: "₹900", contact: "App Based", address: "Various Ports", includes: "Electric assist"},
             {name: "Toyota Rent a Car", type: "car", pricePerDay: "₹5000", contact: "+81 3 1234", address: "Narita/Haneda", includes: "ETC Card reader"},
             {name: "Luup Scooters", type: "scooter", pricePerDay: "₹1000", contact: "App Based", address: "Central Tokyo", includes: "Electric charge"}
           ]
        }
      };

      let selectedKey = Object.keys(DB).find(k => dest.includes(k));
      
      let p, r, ren;
      if (selectedKey) {
          p = DB[selectedKey].places;
          r = DB[selectedKey].restaurants;
          ren = DB[selectedKey].rentals;
      } else {
          p = [
            {name: \`Downtown \${planData.destination} Square\`, type: "Landmark", description: "The bustling center of the city.", rating: 4.5, entryFee: "Free", bestTime: "Morning", duration: "2 hours", tip: "Great for people watching."},
            {name: "Historic Museum", type: "Culture", description: "Learn about the rich history of the area.", rating: 4.7, entryFee: "₹500", bestTime: "Mid-day", duration: "3 hours", tip: "Audio guide recommended."},
            {name: "Panoramic Viewpoint", type: "Nature", description: "The highest point with stunning views.", rating: 4.8, entryFee: "Free", bestTime: "Sunset", duration: "1 hour", tip: "Bring a camera!"},
            {name: "Local Night Market", type: "Shopping", description: "Vibrant market for local goods.", rating: 4.6, entryFee: "Free", bestTime: "Evening", duration: "2 hours", tip: "Bargain respectfully."},
            {name: "Botanical Gardens", type: "Nature", description: "Lush gardens featuring local flora.", rating: 4.5, entryFee: "₹200", bestTime: "Morning", duration: "2 hours", tip: "Perfect for a quiet walk."},
            {name: "Central Park", type: "Leisure", description: "A large green space in the city.", rating: 4.4, entryFee: "Free", bestTime: "Afternoon", duration: "2 hours", tip: "Rent a bike to explore."}
          ];
          r = [
            {name: "The Grand Restaurant", cuisine: "Local Fine Dining", priceRange: "₹2000-3500", rating: 4.7, mustTry: "Chef's Tasting Menu", openHours: "6 PM - 11 PM", address: "City Center"},
            {name: "Street Food Alley", cuisine: "Local Street Food", priceRange: "₹300-800", rating: 4.8, mustTry: "Assorted Skewers", openHours: "5 PM - Midnight", address: "Market Area"},
            {name: "Bistro " + planData.destination, cuisine: "Continental", priceRange: "₹1000-2000", rating: 4.5, mustTry: "Wood-fired Pizza", openHours: "11 AM - 10 PM", address: "Riverside"},
            {name: "Sunset Cafe", cuisine: "Cafe & Desserts", priceRange: "₹500-1000", rating: 4.6, mustTry: "Signature Coffee", openHours: "8 AM - 8 PM", address: "Hilltop"}
          ];
          ren = [
             {name: "City Rides", type: "car", pricePerDay: "₹2500", contact: "+1 000 000 0000", address: "Airport", includes: "Unlimited mileage"},
             {name: "Quick Scooters", type: "scooter", pricePerDay: "₹600", contact: "App Based", address: "Downtown", includes: "Helmet"},
             {name: "Eco Bikes", type: "bike", pricePerDay: "₹300", contact: "App Based", address: "City Parks", includes: "Lock"}
          ];
      }

      // Generate precise day plan tied directly to the places array
      const totalDays = Math.max(1, parseInt(planData.days) || 3);
      const dayPlan = [];
      
      for(let i=0; i<totalDays; i++) {
         const p1 = p[(i*2) % p.length];
         const p2 = p[(i*2 + 1) % p.length];
         const rest = r[i % r.length];
         
         dayPlan.push({
            day: i + 1,
            theme: \`Explore \${p1.name} & Surrounds\`,
            activities: [
              \`Start your day by visiting \${p1.name}. The best time for the view and experience is \${p1.bestTime}. \${p1.tip}\`,
              \`After spending about \${p1.duration} there, head over to \${p2.name}. It's a fantastic \${p2.type} spot. (Entry Fee: \${p2.entryFee})\`,
              \`Wrap up Day \${i+1} with a delicious meal at \${rest.name} located at \${rest.address}. They are famous for their \${rest.cuisine}; definitely try the \${rest.mustTry}!\`
            ]
         });
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
        places: p,
        restaurants: r,
        rentals: ren,
        dayPlan: dayPlan
      };
      
      setResult(mockResult);
    }catch(e){
      setErr("Could not generate plan. Please try again.");
    }finally{
      setLoading(false);
    }
  };`;

text = text.replace(/const fetchPlan=async\(\)=>\{[\s\S]*?\}\s*catch\(e\)\{[\s\S]*?\}\s*finally\s*\{[\s\S]*?\}\s*\};/g, newFetchPlan);

fs.writeFileSync('src/App.jsx', text);
console.log('Precise itinerary mock applied!');
