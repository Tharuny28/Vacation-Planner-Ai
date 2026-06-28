const fs = require('fs');
let text = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add IMGS.hotels
if (!text.includes('hotels: [')) {
    text = text.replace('food: [', 'hotels: [\n    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",\n    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",\n    "https://images.unsplash.com/photo-1542314831-c53cd3816002?auto=format&fit=crop&q=80&w=800",\n    "https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?auto=format&fit=crop&q=80&w=800",\n    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800"\n  ],\n  food: [');
}

// 2. Add Hotels tab to navigation
const newTabs = `const tabs=[
    {id:"places",l:"📍 Places"},
    {id:"hotels",l:"🏨 Stays"},
    {id:"food",l:"🍽️ Dining"},
    {id:"rentals",l:"🚗 Transport"},
    {id:"dayPlan",l:"📅 Itinerary"}
  ];`;
text = text.replace(/const tabs=\[[\s\S]*?\];/, newTabs);

// 3. Add HotelsTab rendering
text = text.replace(/\{tab==="places"&&<PlacesTab places=\{result\.places\}\/>\}/, '{tab==="places"&&<PlacesTab places={result.places}/>}\n            {tab==="hotels"&&<HotelsTab hotels={result.hotels}/>}');

// 4. Add HotelsTab component
const hotelsTabComp = `// ─── HOTELS TAB ─────────────────────────────────────────────────────────────
function HotelsTab({hotels=[]}){
  return(
    <div style={{animation:"fadeIn .3s"}}>
      <SectionHeader title="Top Stays" sub="Highly rated accommodations for your trip"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:24,marginTop:24}}>
        {hotels.map((h,i)=>(
          <div key={i} className="card-hover" style={{
            background:C.card,borderRadius:16,overflow:"hidden",border:\`1px solid \${C.border}\`,
            display:"flex",flexDirection:"column"
          }}>
            <div style={{height:200,background:"#222",position:"relative"}}>
              <img 
                src={pick(IMGS.hotels,i)} 
                style={{width:"100%",height:"100%",objectFit:"cover"}}
                onError={e=>{e.target.src=IMGS.hotels[(i+1)%IMGS.hotels.length];}}
                alt="Hotel"
              />
              <div style={{position:"absolute",top:12,right:12,background:"rgba(0,0,0,0.6)",
                padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:"bold",backdropFilter:"blur(4px)"}}>
                ⭐ {h.rating}
              </div>
            </div>
            <div style={{padding:20,display:"flex",flexDirection:"column",flex:1}}>
              <h3 style={{fontSize:18,fontWeight:600,marginBottom:6,color:C.text}}>{h.name}</h3>
              <p style={{fontSize:13,color:C.textMuted,marginBottom:16}}>{h.description}</p>
              
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
                {(h.amenities || []).map((am, j)=>(
                  <span key={j} style={{background:C.bg,padding:"4px 10px",borderRadius:6,fontSize:11,color:C.textSub,border:\`1px solid \${C.border}\`}}>
                    {am}
                  </span>
                ))}
              </div>

              <div style={{marginTop:"auto",paddingTop:16,borderTop:\`1px solid \${C.border}\`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,color:C.textMuted}}>Price per night</div>
                  <div style={{fontSize:16,fontWeight:600,color:C.emerald}}>{h.pricePerNight}</div>
                </div>
                <button style={{
                  background:C.emeraldGlow,color:C.emerald,border:\`1px solid \${C.borderHover}\`,
                  padding:"6px 14px",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all .2s"
                }}>Book</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PLACES TAB ─────────────────────────────────────────────────────────────`;

if (!text.includes('function HotelsTab')) {
    text = text.replace('// ─── PLACES TAB', hotelsTabComp);
}

// 5. Replace fetchPlan with massive new database and smart itinerary
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
             {name: "Palolem Beach", type: "Beach", description: "A picturesque crescent-shaped beach known for its calm waters and scenic beauty.", rating: 4.9, entryFee: "Free", bestTime: "Mid-day", duration: "4 hours", tip: "Rent a kayak to explore the nearby butterfly beach."},
             {name: "Chapora Fort", type: "History", description: "Ruins of a Portuguese fort offering spectacular views of Vagator Beach.", rating: 4.5, entryFee: "Free", bestTime: "Sunset", duration: "1.5 hours", tip: "Famous from the movie Dil Chahta Hai."},
             {name: "Spice Plantations", type: "Nature", description: "Explore traditional Goan spice farms in Ponda.", rating: 4.6, entryFee: "₹500", bestTime: "Morning", duration: "3 hours", tip: "Enjoy the authentic Goan buffet lunch included."}
           ],
           hotels: [
             {name: "Taj Resort & Convention Centre", rating: 4.9, pricePerNight: "₹18,000", description: "Luxurious hillside resort overlooking the Arabian Sea.", amenities: ["Infinity Pool", "Spa", "Free WiFi", "Private Beach Access"]},
             {name: "W Goa", rating: 4.8, pricePerNight: "₹22,000", description: "Chic and vibrant luxury resort in Vagator.", amenities: ["Rock Pool", "Fitness Center", "Pet Friendly", "Bar"]},
             {name: "The Leela Goa", rating: 4.9, pricePerNight: "₹25,000", description: "Opulent resort nestled between the Sal River and the Arabian Sea.", amenities: ["Golf Course", "Lagoon Pool", "Ayurvedic Spa", "Dining"]},
             {name: "Novotel Goa Resort", rating: 4.5, pricePerNight: "₹9,500", description: "Family-friendly modern resort located in Candolim.", amenities: ["Kids Club", "Pool Bar", "Spa", "Free WiFi"]},
             {name: "Hostel Crowd - Pappi Chulo", rating: 4.6, pricePerNight: "₹1,200", description: "Vibrant and highly social backpackers hostel in Vagator.", amenities: ["Dorm Beds", "Bar", "Events", "Free WiFi"]}
           ],
           restaurants: [
             {name: "Thalassa", cuisine: "Greek & Mediterranean", priceRange: "₹1500-2500", rating: 4.7, mustTry: "Spicy Prawn Saganaki", openHours: "9 AM - 12 AM", address: "Siolim"},
             {name: "Gunpowder", cuisine: "South Indian Coastal", priceRange: "₹1000-1500", rating: 4.8, mustTry: "Andhra Style Spicy Chicken", openHours: "12 PM - 10:30 PM", address: "Assagao"},
             {name: "Curlies Beach Shack", cuisine: "Goan & Continental", priceRange: "₹800-1200", rating: 4.3, mustTry: "Goan Fish Curry", openHours: "8 AM - 3 AM", address: "Anjuna Beach"},
             {name: "Martin's Corner", cuisine: "Authentic Goan", priceRange: "₹1000-1800", rating: 4.6, mustTry: "Pork Vindaloo & Bebinca", openHours: "11 AM - 11 PM", address: "Betalbatim"},
             {name: "Black Sheep Bistro", cuisine: "Modern Global Fusion", priceRange: "₹1800-3000", rating: 4.7, mustTry: "Chorizo Pav", openHours: "12 PM - 1 AM", address: "Panjim"}
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
           hotels: [
             {name: "Ritz Paris", rating: 5.0, pricePerNight: "₹150,000", description: "Legendary luxury hotel in the heart of Paris.", amenities: ["Michelin Star Dining", "Indoor Pool", "Chanel Spa", "Butler Service"]},
             {name: "Hotel Lutetia", rating: 4.8, pricePerNight: "₹85,000", description: "Iconic luxury Palace hotel situated in the Saint-Germain-des-Prés area.", amenities: ["Akasha Spa", "Fitness Center", "Jazz Bar", "Pool"]},
             {name: "Pullman Paris Tour Eiffel", rating: 4.5, pricePerNight: "₹25,000", description: "Modern hotel offering balconies with spectacular views of the Eiffel Tower.", amenities: ["Eiffel Views", "Fitness Room", "Restaurant", "Free WiFi"]},
             {name: "Generator Paris", rating: 4.3, pricePerNight: "₹4,500", description: "Trendy design hostel located near Canal Saint-Martin.", amenities: ["Rooftop Bar", "Dorms & Privates", "Café", "Lounge"]}
           ],
           restaurants: [
             {name: "Le Relais de l'Entrecôte", cuisine: "French Steakhouse", priceRange: "₹3000-4000", rating: 4.6, mustTry: "Steak Frites with secret sauce", openHours: "12 PM - 11 PM", address: "Saint-Germain-des-Prés"},
             {name: "L'Ami Jean", cuisine: "Basque French", priceRange: "₹4000-6000", rating: 4.7, mustTry: "Rice Pudding (Riz au lait)", openHours: "7 PM - 11 PM", address: "Rue Malar"},
             {name: "Boulangerie Utopie", cuisine: "Bakery", priceRange: "₹500-1000", rating: 4.8, mustTry: "Charcoal Baguette & Eclairs", openHours: "7 AM - 8 PM", address: "Rue Jean-Pierre Timbaud"},
             {name: "Le Train Bleu", cuisine: "Fine Dining", priceRange: "₹5000-8000", rating: 4.5, mustTry: "Roasted Leg of Lamb", openHours: "11 AM - 10:30 PM", address: "Gare de Lyon"}
           ],
           rentals: [
             {name: "Velib City Bikes", type: "bike", pricePerDay: "₹400", contact: "App Based", address: "Everywhere", includes: "City-wide docking"},
             {name: "Sixt Rent a Car", type: "car", pricePerDay: "₹4500", contact: "+33 1 234 567", address: "CDG Airport", includes: "Automatic transmission"}
           ]
        }
      };

      let selectedKey = Object.keys(DB).find(k => dest.includes(k));
      
      let p, h, r, ren;
      if (selectedKey) {
          p = DB[selectedKey].places;
          h = DB[selectedKey].hotels;
          r = DB[selectedKey].restaurants;
          ren = DB[selectedKey].rentals;
      } else {
          p = [
            {name: \`Downtown \${planData.destination} Square\`, type: "Landmark", description: "The bustling center of the city.", rating: 4.5, entryFee: "Free", bestTime: "Morning", duration: "2 hours", tip: "Great for people watching."},
            {name: "Historic Museum", type: "Culture", description: "Learn about the rich history of the area.", rating: 4.7, entryFee: "₹500", bestTime: "Mid-day", duration: "3 hours", tip: "Audio guide recommended."},
            {name: "Panoramic Viewpoint", type: "Nature", description: "The highest point with stunning views.", rating: 4.8, entryFee: "Free", bestTime: "Sunset", duration: "1 hour", tip: "Bring a camera!"},
            {name: "Local Night Market", type: "Shopping", description: "Vibrant market for local goods.", rating: 4.6, entryFee: "Free", bestTime: "Evening", duration: "2 hours", tip: "Bargain respectfully."}
          ];
          h = [
            {name: \`Grand \${planData.destination} Resort\`, rating: 4.8, pricePerNight: "₹15,000", description: "Premium luxury resort with the best amenities in town.", amenities: ["Pool", "Spa", "Free Breakfast"]},
            {name: "City Center Hotel", rating: 4.4, pricePerNight: "₹5,000", description: "Conveniently located for easy access to all landmarks.", amenities: ["Free WiFi", "Gym", "Restaurant"]},
            {name: "Backpackers Inn", rating: 4.2, pricePerNight: "₹1,000", description: "Budget friendly and great for solo travelers.", amenities: ["Dorm Beds", "Shared Kitchen", "Lounge"]}
          ];
          r = [
            {name: "The Grand Restaurant", cuisine: "Local Fine Dining", priceRange: "₹2000-3500", rating: 4.7, mustTry: "Chef's Tasting Menu", openHours: "6 PM - 11 PM", address: "City Center"},
            {name: "Street Food Alley", cuisine: "Local Street Food", priceRange: "₹300-800", rating: 4.8, mustTry: "Assorted Skewers", openHours: "5 PM - Midnight", address: "Market Area"}
          ];
          ren = [
             {name: "City Rides", type: "car", pricePerDay: "₹2500", contact: "+1 000 000 0000", address: "Airport", includes: "Unlimited mileage"},
             {name: "Quick Scooters", type: "scooter", pricePerDay: "₹600", contact: "App Based", address: "Downtown", includes: "Helmet"}
          ];
      }

      // Generate precise day plan with Arrival
      const totalDays = Math.max(1, parseInt(planData.days) || 3);
      const dayPlan = [];
      
      const checkinHotel = h[0]; // pick first hotel

      for(let i=0; i<totalDays; i++) {
         const p1 = p[(i*2) % p.length];
         const p2 = p[(i*2 + 1) % p.length];
         const rest = r[i % r.length];
         
         if (i === 0) {
            dayPlan.push({
               day: 1,
               theme: "Arrival & Orientation",
               activities: [
                 \`Upon landing at the nearest major airport for \${planData.destination}, collect your luggage and arrange transport via \${ren[0] ? ren[0].name : 'local taxi'}.\`,
                 \`Head to \${checkinHotel.name} and check in to your room. Take an hour to unpack, relax, and freshen up after the journey.\`,
                 \`In the late afternoon, stretch your legs by visiting \${p1.name}. It's a fantastic \${p1.type} spot to get your first taste of the region.\`,
                 \`For your first night, enjoy a welcoming dinner at \${rest.name}. Be sure to try the \${rest.mustTry} to kickstart your vacation!\`
               ]
            });
         } else {
            dayPlan.push({
               day: i + 1,
               theme: \`Explore \${p1.name} & Surrounds\`,
               activities: [
                 \`Start your day by visiting \${p1.name}. The best time for the view and experience is \${p1.bestTime}. \${p1.tip}\`,
                 \`After spending about \${p1.duration} there, head over to \${p2.name}. It's an excellent \${p2.type} spot. (Entry Fee: \${p2.entryFee})\`,
                 \`Wrap up Day \${i+1} with a delicious meal at \${rest.name} located at \${rest.address}. They are famous for their \${rest.cuisine}!\`
               ]
            });
         }
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
        hotels: h,
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
console.log('UI and precise itinerary mock successfully applied!');
