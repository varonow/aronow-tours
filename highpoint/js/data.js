/* High Point Market — the showroom schedule. Edit here to change the Schedule, Map and the Buy List vendor picker.
   plan: booked | confirmed | book | email | headsup | walkin      pin: [lat, lon]      car: true = drive there */

export const PLAN = {
  booked:    'Booked',
  confirmed: 'Confirmed',
  book:      'To book',
  email:     'Email ahead',
  headsup:   'Heads-up',
  walkin:    'Walk-in',
};

export const DAYS = [
  {
    iso: '2026-10-18', tab: 'Sun', num: '18', label: 'Sunday, October 18',
    title: '200 Steele and 220 Elm',
    intro: 'Land at 12:27, pick up the SUV at 12:30, and start at 3:00. Both booked meetings are in the same building, so the afternoon is built around 200 Steele.',
    stops: [
      { id: 'steele', name: '200 Steele', addr: '200 Steele St, High Point, NC', time: 'From 3:00', pin: [35.96041, -80.00409], vendors: [
        { time: '3:00', name: 'Artitalia', space: '#110, Floor 1', what: 'Foglie d\'Oro Italian wood floors and Arte Brotto furniture. The anchor appointment, for the 207 floors. Bring Andrew\'s plans and elevations.', plan: 'booked' },
        { time: '4:30', name: 'ConArte America', space: 'Inside Artitalia', what: 'Olga Terentieva. PhilippSelva, Brianform and Dea bedding.', plan: 'confirmed' },
        { time: '5:15', name: 'Costantini Pietro', space: '#101', what: 'Luxury Italian living, dining and bedroom.', plan: 'headsup' },
        { time: '5:35', name: 'Bracci', space: '#113', what: 'Custom Italian upholstery in leather and fabric.', plan: 'headsup' },
      ] },
      { id: 'elm', name: '220 Elm', addr: '220 N Elm St, High Point, NC', time: 'If time allows', pin: [35.95862, -80.00897], vendors: [
        { name: 'Alf DaFrè', space: '#304, Level 3', what: 'Modern Italian bedroom, living and dining.', plan: 'headsup' },
      ] },
    ],
  },
  {
    iso: '2026-10-19', tab: 'Mon', num: '19', label: 'Monday, October 19',
    title: 'Lighting day',
    intro: 'IHFC, then Showplace, Commerce & Design, and the Hamilton and Wrenn loop. All on foot.',
    stops: [
      { id: 'ihfc', name: 'IHFC', addr: '210 E Commerce Ave, High Point, NC', time: '9:00 to 12:30', note: 'Floor 1 first, then work up.', pin: [35.95568, -80.00398], vendors: [
        { name: 'Lavagnoli Marmi', space: 'IH305, Floor 1', what: 'Italian marble and stone surfaces, and furniture.', plan: 'headsup' },
        { name: 'Roll & Hill', space: 'IH205, Floor 1', what: 'Made-to-order modern lighting from Brooklyn.', plan: 'walkin' },
        { name: 'Oi Soi Oi Copenhagen', space: 'IH209, Floor 1', what: 'Hand-woven bamboo and rattan pendants.', plan: 'walkin' },
        { name: 'Hubbardton Forge', space: 'IH211, Floor 1', what: 'Hand-forged steel lighting from Vermont.', plan: 'walkin' },
        { name: 'Regina Andrew', space: 'IH006, Floor 1', what: 'Lighting, furniture and accessories.', plan: 'walkin' },
        { name: 'CWI Lighting', space: 'IH108, Floor 1', what: 'Value decorative lighting.', plan: 'walkin', quick: 'Quick look' },
        { name: 'Febal Casa', space: 'IH102, Floor 1', what: 'Italian kitchens, plus living and bedroom systems.', plan: 'walkin', quick: '15 minutes' },
        { name: 'Wermo', space: 'IH311, Floor 1', what: 'Solid-oak consoles, sideboards and bar cabinets from Estonia.', plan: 'walkin' },
        { name: 'Fine Art Handcrafted Lighting', space: 'C229, Floor 2', what: 'Luxury hand-finished chandeliers and sconces.', plan: 'headsup' },
        { name: 'Kalco / Allegri', space: 'H232, Floor 2', what: 'Transitional lighting, and Allegri Italian crystal.', plan: 'walkin' },
        { name: 'Rhea Designs', space: 'D423', what: 'Chandeliers, pendants, sconces and flush mounts.', plan: 'walkin' },
      ] },
      { id: 'showplace', name: 'Showplace', addr: '211 E Commerce Ave, High Point, NC', time: '12:30 to 1:15', pin: [35.95584, -80.00402], vendors: [
        { name: 'Four Hands', space: '#4101, Floor 4', what: 'Modern-rustic furniture, lighting and decor.', plan: 'walkin' },
      ] },
      { id: 'cd', name: 'Commerce & Design', addr: '201 W Commerce Ave, High Point, NC', time: '1:45 to 3:15', pin: [35.95527, -80.00699], vendors: [
        { time: '1:45', name: 'Visual Comfort & Co.', space: '2A / 2G, Floor 2', what: 'Designer lighting, including Kelly Wearstler alabaster. Look for hallway flush mounts, and primary and entry floor lighting.', plan: 'book' },
        { name: 'Bethel International', space: '4C, Floor 4', what: 'Modern LED and crystal statement lighting.', plan: 'headsup' },
      ] },
      { id: 'casaitalia', name: 'Casa Italia', addr: '130 W Commerce Ave, High Point, NC', time: 'Before 3:15', pin: [35.9556, -80.00581], vendors: [
        { name: 'Casa Italia', space: 'Whole building', what: 'A building of Italian brands: Natuzzi, Calligaris, Connubia.', plan: 'walkin' },
      ] },
      { id: 'hamilton', name: 'Hamilton Street and Bank on Wrenn', addr: 'N Hamilton St, High Point, NC', time: '3:15 to 5:45', note: 'A walking loop. Each showroom has its own address.', vendors: [
        { name: 'Eichholtz', space: '129 S Hamilton', addr: '129 S Hamilton St, High Point, NC', pin: [35.95765, -80.00296], what: 'Glam Dutch luxury furniture, lighting and accessories.', plan: 'walkin' },
        { name: 'Bernhardt', space: '101 N Hamilton', addr: '101 N Hamilton St, High Point, NC', pin: [35.9589, -80.00359], what: 'Upholstery, casegoods and dining.', plan: 'walkin', quick: 'Skip if short on time' },
        { time: '4:00', name: 'Made Goods', space: '203 N Wrenn', addr: '203 N Wrenn St, High Point, NC', pin: [35.95866, -80.00524], what: '30,000 square feet of furniture, lighting and decor in stone, shagreen, mirror and natural fiber. No New York showroom, and the best fit for 207. An appointment is required.', plan: 'book' },
        { name: 'Gabby', space: '333 N Hamilton', addr: '333 N Hamilton St, High Point, NC', pin: [35.9612, -80.0047], approx: true, what: 'Furniture, lighting and decor, plus some vintage.', plan: 'walkin' },
        { name: 'My Italian Interior', space: '317 N Main', addr: '317 N Main St, High Point, NC', pin: [35.95961, -80.00742], what: 'Imported Italian furniture.', plan: 'walkin' },
        { name: 'Eloa', space: '518 N Hamilton, Floor 2', addr: '518 N Hamilton St, High Point, NC', pin: [35.9632, -80.0057], approx: true, what: 'Mouth-blown glass pendants from Berlin.', plan: 'headsup' },
      ] },
    ],
  },
  {
    iso: '2026-10-20', tab: 'Tue', num: '20', label: 'Tuesday, October 20',
    title: 'West Commerce, then by car',
    intro: 'Antiques and Market Square on foot in the morning. After lunch, take the SUV to 313.Space, Russell Avenue, the rug appointment on Mill Avenue, and MLK Drive.',
    stops: [
      { id: 'adc', name: 'Antique & Design Center', addr: '316 W Commerce Ave, High Point, NC', time: '9:00 to 10:30', pin: [35.95481, -80.00804], vendors: [
        { name: 'Antique & Design Center', space: 'Whole building', what: 'More than 70 dealers of vintage and antiques for designers.', plan: 'walkin' },
      ] },
      { id: 'marketsq', name: 'Market Square and Suites', addr: '200 W Commerce Ave, High Point, NC', time: '10:30 to 12:30', pin: [35.95543, -80.00705], vendors: [
        { name: 'Hudson Valley Lighting / Mitzi', space: 'M70 to M99, Mezzanine', what: 'Decorative lighting; Mitzi is the lower-priced line. Confirm the Mitzi Reva for the girls\' room.', plan: 'walkin' },
        { name: 'Hinkley', space: '#143, Floor 1', what: 'Indoor and outdoor residential lighting, for the 207 backyard.', plan: 'walkin', quick: 'Quick look' },
        { name: 'Varaluz', space: '#290, Floor 1', what: 'Decorative lighting in recycled materials.', plan: 'walkin', quick: 'Quick look' },
        { name: 'Art and Forge Hardware', space: 'Suites G-6026', what: 'Solid brass and bronze cabinet and decorative hardware.', plan: 'walkin' },
        { name: 'Akari Lanterns', space: 'Suites M-6042', what: 'Paper-and-bamboo lanterns in the Noguchi style.', plan: 'walkin', quick: 'Quick look' },
        { name: 'Vahallan', space: 'Suites G-4009', what: 'Hand-painted wallcoverings and panels.', plan: 'walkin' },
        { name: 'Guild Cabinetry', space: 'Suites G-6058', what: 'Custom cabinetry for designers, for the 207 millwork. Ask the three millwork questions.', plan: 'walkin', quick: 'Walk-through, 15 minutes' },
        { name: 'Walker Woodworking', space: 'Suites G-7017, Salon', what: 'Custom cabinetry and millwork made in North Carolina, for the 207 millwork. Ask the three millwork questions.', plan: 'walkin', quick: 'Walk-through, 15 minutes' },
      ] },
      { id: 'space313', name: '313.Space', addr: '313 S Centennial St, High Point, NC', time: '1:00 to 3:30', car: true, pin: [35.95395, -79.99976], vendors: [
        { name: 'Schwung', space: 'Ground floor', what: 'Architectural modern brass lighting from the Netherlands.', plan: 'headsup' },
        { name: 'Collected by Schwung', space: 'Ground floor', what: 'Schwung\'s antiques and vintage.', plan: 'walkin' },
        { name: 'Beacon Custom Lighting', space: 'M26', what: 'One-off custom handblown Bohemian glass and crystal, trade only. Glam for 207, and a statement piece for the 203 entry or library.', plan: 'email' },
        { name: 'Darrell Dean Antiques', space: '#210', what: 'Antiques and decorative arts, known for mirrors.', plan: 'walkin' },
        { name: 'The Mill USA', space: 'M10 to M11', what: 'Handwoven Namibian wool rugs and throws. Possibly for the cellar.', plan: 'walkin' },
        { name: 'Asia Minor Carpets (booth)', space: 'M24', what: 'A preview before the Mill Avenue appointment.', plan: 'walkin', quick: 'Quick look' },
        { name: 'Pooky', space: 'M16 to M17, Floor 2', what: 'Colorful lamps and shades from the UK, for the kids\' floor.', plan: 'walkin' },
        { name: 'MORY Homes', space: 'M12, Floor 2', what: 'Seattle joinery tables and shelving, plus Kasmo glass pendants.', plan: 'walkin', quick: 'Quick look' },
        { name: 'Unique Kitchens & Baths', space: 'A03, Floor 2', what: 'Cabinetry and vanities with designer-collaboration lines, for the 207 millwork. Ask the three millwork questions.', plan: 'walkin', quick: 'Walk-through, 15 minutes' },
      ] },
      { id: 'russell', name: '214 Modern Vintage', addr: '314 W Russell Ave, High Point, NC', time: 'Before 3:30', car: true, pin: [35.95194, -80.00909], vendors: [
        { name: '214 Modern Vintage', space: 'Floor 1', what: 'Mid-century furniture and art.', plan: 'walkin' },
      ] },
      { id: 'asiaminor', name: 'Asia Minor Carpets', addr: '1014 Mill Ave, High Point, NC', time: '3:45 to 4:30', car: true, pin: [35.93612, -80.00897], vendors: [
        { time: '3:45', name: 'Asia Minor Carpets', space: 'Main showroom', what: 'The main rug stop: the 203 living room rug, the stair runner, and carpets. Trade only. Bring the room and stair dimensions.', plan: 'book' },
      ] },
      { id: 'mlk', name: 'MLK Jr Drive', addr: 'E Martin Luther King Jr Dr, High Point, NC', time: '4:45 to 5:30', car: true, vendors: [
        { name: 'Mr. Brown London', space: '114 to 116 E MLK', addr: '114 E Martin Luther King Jr Dr, High Point, NC', pin: [35.95869, -80.00621], what: 'Mid-century and Art Deco luxury.', plan: 'walkin' },
        { name: 'Abner Henry', space: '214 E MLK', addr: '214 E Martin Luther King Jr Dr, High Point, NC', pin: [35.95921, -80.00532], what: 'Handcrafted Amish hardwood furniture.', plan: 'walkin' },
      ] },
    ],
  },
];

// Every vendor, for the Buy List picker.
export const VENDORS = DAYS.flatMap(d => d.stops.flatMap(s => s.vendors.map(v => ({
  name: v.name,
  where: v.name === s.name ? s.addr.replace(', High Point, NC', '') : (v.addr ? v.space : s.name + ', ' + v.space),
  day: d.tab,
}))));

export const CHECKLIST = [
  { grp: 'To set up before we go', items: [
    ['acct-fourhands', 'Open a trade account with Four Hands, to see net pricing in the showroom'],
    ['acct-visual', 'Open a trade account with Visual Comfort'],
    ['acct-regina', 'Open a trade account with Regina Andrew'],
    ['book-visual', 'Book Visual Comfort for Monday at 1:45'],
    ['book-madegoods', 'Book Made Goods for Monday at 4:00 (appointment required)'],
    ['book-asiaminor', 'Book Asia Minor Carpets for Tuesday at 3:45'],
    ['email-beacon', 'Email Beacon Custom Lighting ahead (trade only)'],
    ['car-skymiles', 'Add a SkyMiles number to the Budget rental'],
  ] },
  { grp: 'To pack', items: [
    ['pack-plans', 'Andrew\'s 207 plans and elevations, for the millwork walk-throughs and Artitalia'],
    ['pack-dims', 'The 203 living room and stair dimensions, for the rugs'],
    ['pack-cards', 'Business cards'],
    ['pack-resale', 'Resale certificate'],
    ['pack-tape', 'Tape measure'],
    ['pack-shoes', 'Comfortable shoes. We will walk miles.'],
  ] },
];
