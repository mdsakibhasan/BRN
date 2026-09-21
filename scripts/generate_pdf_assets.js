import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve('public/images');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to wrap SVG in sharp and write both SVG and PNG
async function saveAsset(name, svgContent) {
  const svgPath = path.join(OUTPUT_DIR, `${name}.svg`);
  const pngPath = path.join(OUTPUT_DIR, `${name}.png`);

  fs.writeFileSync(svgPath, svgContent);

  await sharp(Buffer.from(svgContent))
    .png({ quality: 95 })
    .resize(800, 500, { fit: 'cover' })
    .toFile(pngPath);

  console.log(`Saved ${name}.svg and ${name}.png`);
}

async function main() {
  // 1. Bangla Ruti (বাংলা রুটি) - 4 pack
  const svgBanglaRuti = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_ruti" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fffbeb"/>
        <stop offset="50%" stop-color="#fef3c7"/>
        <stop offset="100%" stop-color="#fde68a"/>
      </linearGradient>
      <radialGradient id="thali" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stop-color="#d97706"/>
        <stop offset="95%" stop-color="#92400e"/>
        <stop offset="100%" stop-color="#78350f"/>
      </radialGradient>
      <radialGradient id="ruti_face" cx="45%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#fef9c3"/>
        <stop offset="60%" stop-color="#fde047"/>
        <stop offset="85%" stop-color="#ca8a04"/>
        <stop offset="100%" stop-color="#a16207"/>
      </radialGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#78350f" flood-opacity="0.25"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="800" height="500" fill="url(#bg_ruti)"/>

    <!-- Subtle texture lines -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f59e0b" stroke-width="0.75" stroke-opacity="0.15"/>
    </pattern>
    <rect width="800" height="500" fill="url(#grid)"/>

    <!-- Top Banner Ribbon like PDF Page 1 -->
    <rect x="0" y="0" width="800" height="70" fill="#78350f"/>
    <rect x="0" y="65" width="800" height="5" fill="#f59e0b"/>
    <text x="35" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#fef3c7">
      Bangla Roti Network • বাংলা রুটি
    </text>
    <text x="765" y="44" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#fde68a">
      "সকাল সন্ধ্যায় খাবারের স্বাস্থ্যকর সঙ্গী"
    </text>

    <!-- Price Tag Badge (Matching Brochure) -->
    <g transform="translate(620, 100)" filter="url(#shadow)">
      <rect width="145" height="65" rx="14" fill="#dc2626"/>
      <text x="72" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#fef2f2">৪টি বাংলা রুটি</text>
      <text x="72" y="52" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#fef08a">মাত্র ৩৫৳</text>
    </g>

    <!-- Center Woven Thali & Roti Stack (from PDF) -->
    <g transform="translate(380, 290)" filter="url(#shadow)">
      <!-- Woven Thali / Bamboo Plate -->
      <circle r="175" fill="url(#thali)"/>
      <circle r="162" fill="#b45309" stroke="#fef3c7" stroke-dasharray="4,6" stroke-width="3"/>
      <circle r="150" fill="#fef3c7" fill-opacity="0.95"/>

      <!-- Stacked Rotis with Golden Toast Marks -->
      <!-- Bottom Roti -->
      <ellipse cx="-12" cy="10" rx="135" ry="120" fill="url(#ruti_face)" opacity="0.8"/>
      <!-- Mid Roti -->
      <ellipse cx="10" cy="-5" rx="132" ry="118" fill="url(#ruti_face)" opacity="0.9"/>
      <!-- Top Puffed Roti -->
      <ellipse cx="0" cy="-18" rx="130" ry="115" fill="url(#ruti_face)"/>

      <!-- Golden brown toasted blister spots (Same as PDF photo) -->
      <ellipse cx="-45" cy="-45" rx="18" ry="10" fill="#92400e" opacity="0.65"/>
      <ellipse cx="40" cy="-30" rx="22" ry="14" fill="#78350f" opacity="0.7"/>
      <ellipse cx="-10" cy="15" rx="25" ry="12" fill="#854d0e" opacity="0.6"/>
      <ellipse cx="60" cy="10" rx="14" ry="9" fill="#92400e" opacity="0.65"/>
      <ellipse cx="-70" cy="0" rx="16" ry="11" fill="#78350f" opacity="0.6"/>
      <ellipse cx="15" cy="-60" rx="14" ry="8" fill="#854d0e" opacity="0.5"/>
      <ellipse cx="-30" cy="35" rx="20" ry="9" fill="#92400e" opacity="0.6"/>
      
      <!-- Wheat grain illustration beside -->
      <path d="M 120 70 Q 150 90 170 120" stroke="#ca8a04" stroke-width="3" fill="none"/>
      <ellipse cx="135" cy="80" rx="8" ry="4" fill="#ca8a04" transform="rotate(35, 135, 80)"/>
      <ellipse cx="150" cy="95" rx="8" ry="4" fill="#ca8a04" transform="rotate(35, 150, 95)"/>
      <ellipse cx="165" cy="110" rx="8" ry="4" fill="#ca8a04" transform="rotate(35, 165, 110)"/>
    </g>

    <!-- Left Nutrition & Ingredients Summary Box (from PDF) -->
    <g transform="translate(35, 100)" filter="url(#shadow)">
      <rect width="260" height="360" rx="16" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>
      <rect width="260" height="42" rx="16" fill="#f59e0b"/>
      <rect x="0" y="24" width="260" height="18" fill="#f59e0b"/>
      <text x="130" y="27" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#1c1917">
        উপাদান ও পুষ্টিগুণ (প্রতি ১০০ গ্রাম)
      </text>

      <text x="20" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#78350f">মূল উপাদানসমূহ:</text>
      <text x="20" y="94" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#4b5563">✓ সাদা গমের আটা (ফার্স্ট গ্রেড)</text>
      <text x="20" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#4b5563">✓ গুড়া দুধ ও সামান্য ড্রাই ইস্ট</text>
      <text x="20" y="138" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#4b5563">✓ পরিমিত লবণ, বেকিং সোডা, চিনি</text>
      <text x="20" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#4b5563">✓ বিশুদ্ধ রিফাইন্ড সয়াবিন তেল</text>

      <line x1="20" y1="180" x2="240" y2="180" stroke="#f3f4f6" stroke-width="2"/>

      <text x="20" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#1f2937">Nutrition Facts:</text>
      
      <g transform="translate(20, 220)">
        <rect width="220" height="24" fill="#fef3c7" rx="4"/>
        <text x="10" y="16" font-size="12" font-weight="bold" fill="#78350f">ক্যালোরি / Energy</text>
        <text x="210" y="16" text-anchor="end" font-size="12" font-weight="900" fill="#78350f">২৪১ kcal</text>
      </g>
      <g transform="translate(20, 248)">
        <rect width="220" height="24" fill="#f9fafb" rx="4"/>
        <text x="10" y="16" font-size="12" fill="#374151">কার্বোহাইড্রেট</text>
        <text x="210" y="16" text-anchor="end" font-size="12" font-weight="bold" fill="#111827">৫৪.৩ গ্রাম</text>
      </g>
      <g transform="translate(20, 276)">
        <rect width="220" height="24" fill="#fef3c7" rx="4"/>
        <text x="10" y="16" font-size="12" fill="#374151">প্রোটিন / Protein</text>
        <text x="210" y="16" text-anchor="end" font-size="12" font-weight="bold" fill="#111827">৪.৩ গ্রাম</text>
      </g>
      <g transform="translate(20, 304)">
        <rect width="220" height="24" fill="#f9fafb" rx="4"/>
        <text x="10" y="16" font-size="12" fill="#374151">ডায়েটরি ফাইবার</text>
        <text x="210" y="16" text-anchor="end" font-size="12" font-weight="bold" fill="#111827">২.৫ গ্রাম</text>
      </g>
    </g>

    <!-- Bottom 4 Feature Badges (Matching PDF Page 1) -->
    <g transform="translate(320, 440)">
      <rect x="0" y="0" width="105" height="38" rx="8" fill="#166534"/>
      <text x="52" y="24" text-anchor="middle" font-size="12" font-weight="800" fill="#ffffff">100% Fresh</text>

      <rect x="115" y="0" width="105" height="38" rx="8" fill="#1e3a8a"/>
      <text x="167" y="24" text-anchor="middle" font-size="12" font-weight="800" fill="#ffffff">Machine Made</text>

      <rect x="230" y="0" width="105" height="38" rx="8" fill="#78350f"/>
      <text x="282" y="24" text-anchor="middle" font-size="12" font-weight="800" fill="#ffffff">Hygienic</text>

      <rect x="345" y="0" width="105" height="38" rx="8" fill="#991b1b"/>
      <text x="397" y="24" text-anchor="middle" font-size="12" font-weight="800" fill="#ffffff">Quick Meal</text>
    </g>
  </svg>
  `;

  // 2. DiaFit Roti (ডায়াফিট রুটি) - Page 1
  const svgDiaFit = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_diafit" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f0fdf4"/>
        <stop offset="50%" stop-color="#dcfce7"/>
        <stop offset="100%" stop-color="#bbf7d0"/>
      </linearGradient>
      <radialGradient id="diafit_plate" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stop-color="#451a03"/>
        <stop offset="100%" stop-color="#1c1917"/>
      </radialGradient>
      <radialGradient id="diafit_roti" cx="45%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#d97706"/>
        <stop offset="50%" stop-color="#b45309"/>
        <stop offset="85%" stop-color="#92400e"/>
        <stop offset="100%" stop-color="#78350f"/>
      </radialGradient>
    </defs>

    <rect width="800" height="500" fill="url(#bg_diafit)"/>

    <!-- Top Green Banner like PDF Page 1 -->
    <rect x="0" y="0" width="800" height="75" fill="#14532d"/>
    <rect x="0" y="70" width="800" height="5" fill="#22c55e"/>
    <text x="35" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#ffffff">
      DiaFit Roti (ডায়াফিট রুটি)
    </text>
    <text x="35" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#86efac">
      ডায়াবেটিস ও স্বাস্থ্য সচেতন গ্রাহকদের জন্য • "সঠিক পছন্দ সুস্থ জীবন"
    </text>
    <text x="765" y="46" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#facc15">
      ৳১৫ / পিস
    </text>

    <!-- Center Rustic Wood Board & Grain Roti -->
    <g transform="translate(490, 270)">
      <!-- Rustic Wooden Board -->
      <circle r="165" fill="url(#diafit_plate)"/>
      <circle r="150" fill="#581c87" fill-opacity="0.2"/>

      <!-- Stacked Multigrain Seed Rotis -->
      <circle r="130" fill="url(#diafit_roti)"/>
      
      <!-- Texture: Multigrain Seeds (Chia, Flax, Oats, Sesame) -->
      <ellipse cx="-30" cy="-40" rx="3" ry="2" fill="#fef08a"/>
      <ellipse cx="-15" cy="-60" rx="4" ry="2" fill="#ffffff"/>
      <ellipse cx="20" cy="-30" rx="3" ry="2" fill="#1c1917"/>
      <ellipse cx="45" cy="-55" rx="4" ry="2" fill="#fef08a"/>
      <ellipse cx="-50" cy="10" rx="4" ry="2" fill="#ffffff"/>
      <ellipse cx="-20" cy="30" rx="3" ry="2" fill="#1c1917"/>
      <ellipse cx="30" cy="20" rx="4" ry="2" fill="#fef08a"/>
      <ellipse cx="60" cy="-10" rx="3" ry="2" fill="#ffffff"/>
      <ellipse cx="0" cy="50" rx="4" ry="2" fill="#1c1917"/>
      <ellipse cx="50" cy="45" rx="3" ry="2" fill="#fef08a"/>

      <!-- Toasted spots -->
      <circle cx="-25" cy="-15" r="18" fill="#451a03" opacity="0.4"/>
      <circle cx="25" cy="-25" r="16" fill="#451a03" opacity="0.4"/>
      <circle cx="10" cy="25" r="20" fill="#451a03" opacity="0.35"/>
    </g>

    <!-- Left Info Card (Exact from PDF Page 1) -->
    <g transform="translate(35, 100)">
      <rect width="280" height="360" rx="16" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>
      <rect width="280" height="42" rx="16" fill="#15803d"/>
      <rect x="0" y="24" width="280" height="18" fill="#15803d"/>
      <text x="140" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#ffffff">
        ১২টি স্বাস্থ্যবান্ধব উপাদানের মিশ্রণ
      </text>

      <text x="20" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#1f2937">🌾 লাল আটার ফাইবার ও ওটস আটা</text>
      <text x="20" y="94" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#1f2937">🌱 শিয়া সীড, তিসি গুঁড়া ও ইসুবগুল</text>
      <text x="20" y="118" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#1f2937">🌿 মেথি গুঁড়া, দারুচিনি ও বার্লি পাউডার</text>
      <text x="20" y="142" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#1f2937">🌻 সূর্যমুখী তেল, তিল ও পরিমিত লবণ</text>

      <line x1="20" y1="165" x2="260" y2="165" stroke="#e5e7eb" stroke-width="2"/>

      <text x="20" y="190" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#15803d">Nutrition Facts (প্রতি ১০০ গ্রাম):</text>
      
      <g transform="translate(20, 205)">
        <rect width="240" height="24" fill="#f0fdf4" rx="4"/>
        <text x="10" y="16" font-size="12" font-weight="bold" fill="#15803d">ক্যালোরি / Energy</text>
        <text x="230" y="16" text-anchor="end" font-size="12" font-weight="900" fill="#15803d">২৬৫ kcal</text>
      </g>
      <g transform="translate(20, 233)">
        <rect width="240" height="24" fill="#f9fafb" rx="4"/>
        <text x="10" y="16" font-size="12" fill="#374151">কার্বোহাইড্রেট</text>
        <text x="230" y="16" text-anchor="end" font-size="12" font-weight="bold" fill="#111827">৪৫.০ গ্রাম</text>
      </g>
      <g transform="translate(20, 261)">
        <rect width="240" height="24" fill="#f0fdf4" rx="4"/>
        <text x="10" y="16" font-size="12" font-weight="bold" fill="#15803d">প্রোটিন / Protein</text>
        <text x="230" y="16" text-anchor="end" font-size="12" font-weight="900" fill="#15803d">১২.৫ গ্রাম</text>
      </g>
      <g transform="translate(20, 289)">
        <rect width="240" height="24" fill="#f9fafb" rx="4"/>
        <text x="10" y="16" font-size="12" fill="#374151">ডায়েটরি ফাইবার</text>
        <text x="230" y="16" text-anchor="end" font-size="12" font-weight="bold" fill="#111827">৩.৪ গ্রাম</text>
      </g>
      <g transform="translate(20, 317)">
        <rect width="240" height="24" fill="#f0fdf4" rx="4"/>
        <text x="10" y="16" font-size="12" fill="#374151">সোডিয়াম</text>
        <text x="230" y="16" text-anchor="end" font-size="12" font-weight="bold" fill="#111827">১৮০ মি.গ্রা.</text>
      </g>
    </g>

    <!-- 4 Pills (from PDF Page 1) -->
    <g transform="translate(345, 435)">
      <rect x="0" y="0" width="95" height="36" rx="18" fill="#15803d"/>
      <text x="47" y="23" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">Low GI</text>

      <rect x="105" y="0" width="95" height="36" rx="18" fill="#047857"/>
      <text x="152" y="23" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">High Fiber</text>

      <rect x="210" y="0" width="115" height="36" rx="18" fill="#065f46"/>
      <text x="267" y="23" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">Sugar Friendly</text>

      <rect x="335" y="0" width="95" height="36" rx="18" fill="#0f766e"/>
      <text x="382" y="23" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">Machine</text>
    </g>
  </svg>
  `;

  // 3. YoungFuel Roti (Page 1)
  const svgYoungFuel = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_young" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff7ed"/>
        <stop offset="50%" stop-color="#ffedd5"/>
        <stop offset="100%" stop-color="#fed7aa"/>
      </linearGradient>
      <radialGradient id="plate_young" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </radialGradient>
      <radialGradient id="roti_young" cx="45%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#fbbf24"/>
        <stop offset="60%" stop-color="#d97706"/>
        <stop offset="90%" stop-color="#b45309"/>
      </radialGradient>
    </defs>

    <rect width="800" height="500" fill="url(#bg_young)"/>

    <!-- Header Banner like PDF Page 1 -->
    <rect x="0" y="0" width="800" height="75" fill="#c2410c"/>
    <rect x="0" y="70" width="800" height="5" fill="#ea580c"/>
    <text x="35" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#ffffff">
      YoungFuel Roti ⚡ High Protein Energy Booster
    </text>
    <text x="35" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#ffedd5">
      যুবসমাজের শক্তি ও কর্মক্ষমতার স্মার্ট চয়েস
    </text>
    <text x="765" y="46" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#fef08a">
      ৳১৫ / পিস
    </text>

    <!-- Center Plate & Protein Roti -->
    <g transform="translate(490, 270)">
      <circle r="165" fill="url(#plate_young)"/>
      <circle r="130" fill="url(#roti_young)"/>
      <ellipse cx="-20" cy="-30" rx="18" ry="10" fill="#78350f" opacity="0.6"/>
      <ellipse cx="30" cy="-20" rx="16" ry="9" fill="#78350f" opacity="0.55"/>
      <ellipse cx="0" cy="30" rx="22" ry="12" fill="#78350f" opacity="0.65"/>

      <!-- Almond & Peanut illustrations (from PDF) -->
      <ellipse cx="-135" cy="80" rx="16" ry="9" fill="#92400e" transform="rotate(-25, -135, 80)"/>
      <ellipse cx="-110" cy="110" rx="18" ry="10" fill="#b45309" transform="rotate(35, -110, 110)"/>
      <ellipse cx="-80" cy="125" rx="15" ry="9" fill="#92400e" transform="rotate(-15, -80, 125)"/>
    </g>

    <!-- Left Nutrition Card -->
    <g transform="translate(35, 100)">
      <rect width="280" height="360" rx="16" fill="#ffffff" stroke="#ea580c" stroke-width="2"/>
      <rect width="280" height="42" rx="16" fill="#ea580c"/>
      <rect x="0" y="24" width="280" height="18" fill="#ea580c"/>
      <text x="140" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#ffffff">
        হাই প্রোটিন উপাদানসমূহ
      </text>

      <text x="20" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#1f2937">💪 লাল আটা, ছোলা আটা ও কাঁচা মুগ</text>
      <text x="20" y="94" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#1f2937">🥜 পিনাট পাউডার ও কাজু-কাঠবাদাম গুঁড়া</text>
      <text x="20" y="118" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#1f2937">🥚 ফার্ম ফ্রেশ ডিম ও ওটস গুঁড়া</text>
      <text x="20" y="142" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#1f2937">🌻 সূর্যমুখী তেল ও সামান্য ড্ৰাই ইস্ট</text>

      <line x1="20" y1="165" x2="260" y2="165" stroke="#fed7aa" stroke-width="2"/>

      <text x="20" y="190" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#c2410c">Nutrition Facts (প্রতি ১০০ গ্রাম):</text>
      
      <g transform="translate(20, 205)">
        <rect width="240" height="24" fill="#fff7ed" rx="4"/>
        <text x="10" y="16" font-size="12" font-weight="bold" fill="#c2410c">ক্যালোরি / Energy</text>
        <text x="230" y="16" text-anchor="end" font-size="12" font-weight="900" fill="#c2410c">২৮০ kcal</text>
      </g>
      <g transform="translate(20, 233)">
        <rect width="240" height="24" fill="#fff7ed" rx="4"/>
        <text x="10" y="16" font-size="12" font-weight="bold" fill="#ea580c">প্রোটিন / Protein</text>
        <text x="230" y="16" text-anchor="end" font-size="12" font-weight="900" fill="#ea580c">১৪.৫ গ্রাম</text>
      </g>
      <g transform="translate(20, 261)">
        <rect width="240" height="24" fill="#f9fafb" rx="4"/>
        <text x="10" y="16" font-size="12" fill="#374151">কার্বোহাইড্রেট</text>
        <text x="230" y="16" text-anchor="end" font-size="12" font-weight="bold" fill="#111827">৪০.০ গ্রাম</text>
      </g>
      <g transform="translate(20, 289)">
        <rect width="240" height="24" fill="#fff7ed" rx="4"/>
        <text x="10" y="16" font-size="12" fill="#374151">স্বাস্থ্যকর ফ্যাট</text>
        <text x="230" y="16" text-anchor="end" font-size="12" font-weight="bold" fill="#111827">১৪.০ গ্রাম</text>
      </g>
      <g transform="translate(20, 317)">
        <rect width="240" height="24" fill="#f9fafb" rx="4"/>
        <text x="10" y="16" font-size="12" fill="#374151">ডায়েটরি ফাইবার</text>
        <text x="230" y="16" text-anchor="end" font-size="12" font-weight="bold" fill="#111827">৩.৮ গ্রাম</text>
      </g>
    </g>

    <!-- Bottom Features -->
    <g transform="translate(340, 435)">
      <rect x="0" y="0" width="135" height="36" rx="8" fill="#ea580c"/>
      <text x="67" y="23" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">উচ্চ প্রোটিন ও ফাইবার</text>

      <rect x="145" y="0" width="140" height="36" rx="8" fill="#c2410c"/>
      <text x="215" y="23" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">দীর্ঘক্ষণ শক্তি জোগায়</text>

      <rect x="295" y="0" width="135" height="36" rx="8" fill="#9a3412"/>
      <text x="362" y="23" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">১০০% প্রাকৃতিক</text>
    </g>
  </svg>
  `;

  // 4. Rice Flour Roti (চালের আটার রুটি - Page 1)
  const svgRiceFlour = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_rice" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f0fdfa"/>
        <stop offset="50%" stop-color="#ccfbf1"/>
        <stop offset="100%" stop-color="#99f6e4"/>
      </linearGradient>
      <radialGradient id="rice_roti" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="85%" stop-color="#f8fafc"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </radialGradient>
    </defs>

    <rect width="800" height="500" fill="url(#bg_rice)"/>

    <!-- Header Banner like PDF Page 1 -->
    <rect x="0" y="0" width="800" height="75" fill="#0f766e"/>
    <rect x="0" y="70" width="800" height="5" fill="#14b8a6"/>
    <text x="35" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#ffffff">
      চালের আটার রুটি • RICE FLOUR ROTI
    </text>
    <text x="35" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#99f6e4">
      "সুস্বাদু রুটি, ঐতিহ্যের পুষ্টি" • নরম, হালকা ও সহজপাচ্য
    </text>
    <text x="765" y="46" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#fef08a">
      ৳১২ / পিস
    </text>

    <!-- Center Rice Rotis on Bamboo Leaf -->
    <g transform="translate(500, 270)">
      <!-- Bamboo Plate -->
      <circle r="165" fill="#b45309"/>
      <circle r="150" fill="#15803d"/>

      <!-- Stack of Pure White Rice Rotis -->
      <circle r="130" fill="url(#rice_roti)" stroke="#cbd5e1" stroke-width="1.5"/>
      <circle cx="-15" cy="10" r="125" fill="url(#rice_roti)" stroke="#cbd5e1" stroke-width="1.5"/>
      <circle cx="10" cy="-10" r="122" fill="url(#rice_roti)" stroke="#cbd5e1" stroke-width="1.5"/>

      <!-- Rice grain bowl on side -->
      <g transform="translate(130, 80)">
        <ellipse rx="35" ry="25" fill="#78350f"/>
        <ellipse rx="30" ry="18" fill="#ffffff"/>
      </g>
    </g>

    <!-- Left Benefits Card -->
    <g transform="translate(35, 100)">
      <rect width="280" height="360" rx="16" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
      <rect width="280" height="42" rx="16" fill="#0f766e"/>
      <rect x="0" y="24" width="280" height="18" fill="#0f766e"/>
      <text x="140" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#ffffff">
        চালের আটার বিশেষ উপকারিতা
      </text>

      <g transform="translate(20, 65)">
        <rect width="240" height="45" rx="8" fill="#f0fdfa"/>
        <text x="12" y="22" font-size="12" font-weight="bold" fill="#0f766e">✓ গ্লুটেন মুক্ত (Gluten-Free)</text>
        <text x="12" y="38" font-size="10" fill="#64748b">যাদের গমে এলার্জি তাদের জন্য সেরা</text>
      </g>

      <g transform="translate(20, 120)">
        <rect width="240" height="45" rx="8" fill="#f0fdfa"/>
        <text x="12" y="22" font-size="12" font-weight="bold" fill="#0f766e">✓ সহজে হজম হয়</text>
        <text x="12" y="38" font-size="10" fill="#64748b">পেট ফাঁপা বা অ্যাসিডিটি হয় না</text>
      </g>

      <g transform="translate(20, 175)">
        <rect width="240" height="45" rx="8" fill="#f0fdfa"/>
        <text x="12" y="22" font-size="12" font-weight="bold" fill="#0f766e">✓ গ্যাস্ট্রিক ও বদহজম দূর করে</text>
        <text x="12" y="38" font-size="10" fill="#64748b">বৃদ্ধ ও শিশুদের জন্য চমৎকার পুষ্টি</text>
      </g>

      <text x="20" y="250" font-size="12" font-weight="bold" fill="#0f766e">উপাদানসমূহ:</text>
      <text x="20" y="272" font-size="11" fill="#334155">• উন্নত আতপ চালের গুঁড়া (১০০%)</text>
      <text x="20" y="292" font-size="11" fill="#334155">• কুসুম গরম পানি ও পরিশোধিত লবণ</text>

      <g transform="translate(20, 315)">
        <rect width="240" height="32" rx="6" fill="#14b8a6"/>
        <text x="120" y="21" text-anchor="middle" font-size="13" font-weight="900" fill="#ffffff">GLUTEN FREE • ১০০% বিশুদ্ধ</text>
      </g>
    </g>
  </svg>
  `;

  // 5. Spice Kalai Roti (চাঁপাইনবাবগঞ্জের কলাই রুটি - Page 1)
  const svgKalaiRoti = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_kalai" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fffbeb"/>
        <stop offset="50%" stop-color="#fef3c7"/>
        <stop offset="100%" stop-color="#fde68a"/>
      </linearGradient>
      <radialGradient id="kalai_plate" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stop-color="#78350f"/>
        <stop offset="100%" stop-color="#451a03"/>
      </radialGradient>
      <radialGradient id="kalai_face" cx="45%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#e7e5e4"/>
        <stop offset="40%" stop-color="#d6d3d1"/>
        <stop offset="75%" stop-color="#a8a29e"/>
        <stop offset="100%" stop-color="#78716c"/>
      </radialGradient>
    </defs>

    <rect width="800" height="500" fill="url(#bg_kalai)"/>

    <!-- Header Banner like PDF Page 1 -->
    <rect x="0" y="0" width="800" height="75" fill="#78350f"/>
    <rect x="0" y="70" width="800" height="5" fill="#d97706"/>
    <text x="35" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#ffffff">
      Spice Kalai Roti • চাঁপাইনবাবগঞ্জের ঐতিহ্যবাহী কলাই রুটি
    </text>
    <text x="35" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#fde68a">
      "২৫% প্রাকৃতিক প্রোটিন সমৃদ্ধ" • নরম, সুস্বাদু ও পুষ্টিকর
    </text>
    <text x="765" y="46" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#fde047">
      ৳১৫ / পিস
    </text>

    <!-- Center Kalai Roti on Terracotta plate -->
    <g transform="translate(500, 270)">
      <circle r="165" fill="url(#kalai_plate)"/>
      <circle r="130" fill="url(#kalai_face)"/>

      <!-- Charred / Roasted Marks characteristic of Kalai Roti -->
      <ellipse cx="-35" cy="-25" rx="14" ry="8" fill="#292524" opacity="0.75"/>
      <ellipse cx="25" cy="-40" rx="18" ry="11" fill="#1c1917" opacity="0.8"/>
      <ellipse cx="-10" cy="35" rx="22" ry="10" fill="#292524" opacity="0.75"/>
      <ellipse cx="45" cy="15" rx="16" ry="9" fill="#1c1917" opacity="0.7"/>

      <!-- Red Chili and Bhorta illustration on side -->
      <g transform="translate(-130, 90)">
        <ellipse rx="30" ry="20" fill="#991b1b"/>
        <path d="M -15 0 Q 0 -15 20 -5" stroke="#15803d" stroke-width="4" fill="none"/>
      </g>
    </g>

    <!-- Left Details Card (from PDF) -->
    <g transform="translate(35, 100)">
      <rect width="280" height="360" rx="16" fill="#ffffff" stroke="#78350f" stroke-width="2"/>
      <rect width="280" height="42" rx="16" fill="#78350f"/>
      <rect x="0" y="24" width="280" height="18" fill="#78350f"/>
      <text x="140" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#ffffff">
        ঐতিহ্য ও পুষ্টিগুণ
      </text>

      <text x="20" y="70" font-size="12" font-weight="bold" fill="#78350f">মূল উপাদানসমূহ:</text>
      <text x="20" y="94" font-size="12" fill="#1f2937">• আসল মাষকলাইয়ের ডালের আটা</text>
      <text x="20" y="116" font-size="12" fill="#1f2937">• আতপ চালের আটা ও বিশুদ্ধ পানি</text>
      <text x="20" y="138" font-size="12" fill="#1f2937">• বিশেষ তাওয়ার ভাজা সুগন্ধি পোড়া ভাব</text>

      <line x1="20" y1="160" x2="260" y2="160" stroke="#fef3c7" stroke-width="2"/>

      <g transform="translate(20, 175)">
        <rect width="240" height="60" rx="8" fill="#fef3c7"/>
        <text x="12" y="26" font-size="13" font-weight="900" fill="#78350f">২৫% প্রাকৃতিক উদ্ভিজ্জ প্রোটিন</text>
        <text x="12" y="46" font-size="11" fill="#92400e">হৃদরোগ ও কোলেস্টেরল নিয়ন্ত্রণে সহায়ক</text>
      </g>

      <g transform="translate(20, 248)">
        <rect width="240" height="90" rx="8" fill="#fafaf9"/>
        <text x="12" y="22" font-size="12" font-weight="bold" fill="#1c1917">খাওয়ার পরামর্শ:</text>
        <text x="12" y="44" font-size="11" fill="#44403c">মরিচ বাটা, রসুন-পেঁয়াজ ভর্তা, বেগুন ভর্তা</text>
        <text x="12" y="64" font-size="11" fill="#44403c">কিংবা হাঁসের মাংস দিয়ে খাওয়ার অতুলনীয় স্বাদ!</text>
      </g>
    </g>
  </svg>
  `;

  // 6. Saddak Signature Paratha (Page 1)
  const svgParatha = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_paratha" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#18181b"/>
        <stop offset="50%" stop-color="#27272a"/>
        <stop offset="100%" stop-color="#09090b"/>
      </linearGradient>
      <radialGradient id="paratha_face" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="40%" stop-color="#facc15"/>
        <stop offset="70%" stop-color="#ca8a04"/>
        <stop offset="95%" stop-color="#854d0e"/>
      </radialGradient>
    </defs>

    <rect width="800" height="500" fill="url(#bg_paratha)"/>

    <!-- Header Banner like PDF Page 1 (Dark Premium Theme) -->
    <rect x="0" y="0" width="800" height="75" fill="#09090b"/>
    <rect x="0" y="70" width="800" height="5" fill="#eab308"/>
    <text x="35" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#facc15">
      সাদ্দাক সিগনেচার পরোটা • SADDAK PARATHA
    </text>
    <text x="35" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#e4e4e7">
      BANGLA ROTI NETWORK • LOW TRANS FAT
    </text>
    <text x="765" y="46" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#eab308">
      ৳১৫ / পিস
    </text>

    <!-- Center Flaky Multi-layered Spiral Paratha -->
    <g transform="translate(500, 270)">
      <circle r="160" fill="#3f3f46" stroke="#eab308" stroke-width="2"/>
      <circle r="135" fill="url(#paratha_face)"/>

      <!-- Spiral flaky laminated layers (like PDF) -->
      <ellipse cx="0" cy="0" rx="105" ry="100" fill="none" stroke="#713f12" stroke-width="4" stroke-dasharray="25,10"/>
      <ellipse cx="0" cy="0" rx="75" ry="70" fill="none" stroke="#854d0e" stroke-width="4" stroke-dasharray="20,8"/>
      <ellipse cx="0" cy="0" rx="45" ry="40" fill="none" stroke="#713f12" stroke-width="3" stroke-dasharray="15,6"/>

      <!-- Crispy Golden blister spots -->
      <ellipse cx="-40" cy="-30" rx="14" ry="7" fill="#713f12" opacity="0.8"/>
      <ellipse cx="30" cy="-45" rx="18" ry="8" fill="#713f12" opacity="0.85"/>
      <ellipse cx="50" cy="20" rx="15" ry="7" fill="#854d0e" opacity="0.8"/>
      <ellipse cx="-20" cy="40" rx="16" ry="9" fill="#713f12" opacity="0.75"/>
    </g>

    <!-- Left Features List (from PDF Page 1) -->
    <g transform="translate(35, 100)">
      <rect width="280" height="360" rx="16" fill="#18181b" stroke="#3f3f46" stroke-width="2"/>
      <rect width="280" height="42" rx="16" fill="#eab308"/>
      <rect x="0" y="24" width="280" height="18" fill="#eab308"/>
      <text x="140" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#09090b">
        সিগনেচার গুণমান ও বৈশিষ্ট্য
      </text>

      <g transform="translate(20, 65)">
        <text x="0" y="15" font-size="13" font-weight="bold" fill="#facc15">✓ Rich Aroma of Ghee</text>
        <text x="0" y="32" font-size="11" fill="#a1a1aa">ঘিয়ের মনমাতানো সুবাস ও স্বাদ</text>
      </g>

      <g transform="translate(20, 115)">
        <text x="0" y="15" font-size="13" font-weight="bold" fill="#facc15">✓ Low Trans Fat (Unsaturated)</text>
        <text x="0" y="32" font-size="11" fill="#a1a1aa">অপ্রয়োজনীয় চর্বি মুক্ত, স্বাস্থ্যের অনুকূল</text>
      </g>

      <g transform="translate(20, 165)">
        <text x="0" y="15" font-size="13" font-weight="bold" fill="#facc15">✓ Rice Bran &amp; Soybean Oil</text>
        <text x="0" y="32" font-size="11" fill="#a1a1aa">স্বাস্থ্যসম্মত পরিশোধিত তেলের স্পর্শ</text>
      </g>

      <g transform="translate(20, 215)">
        <text x="0" y="15" font-size="13" font-weight="bold" fill="#facc15">✓ Just The Right Touch Of Sugar</text>
        <text x="0" y="32" font-size="11" fill="#a1a1aa">পরিমিত মিষ্টতায় মুখরোচক সোনালী পরোটা</text>
      </g>

      <g transform="translate(20, 280)">
        <rect width="240" height="50" rx="8" fill="#27272a" stroke="#eab308" stroke-width="1.5"/>
        <text x="120" y="24" text-anchor="middle" font-size="12" font-weight="900" fill="#facc15">QUALITY YOU CAN TRUST</text>
        <text x="120" y="40" text-anchor="middle" font-size="11" fill="#e4e4e7">পরিপূর্ণ তৃপ্তি ও দীর্ঘস্থায়ী মচমচে ভাব</text>
      </g>
    </g>
  </svg>
  `;

  // 7. Roti + Booter Dal Combo (Page 1 & 2)
  const svgCombo = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_combo" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1c1917"/>
        <stop offset="50%" stop-color="#292524"/>
        <stop offset="100%" stop-color="#0c0a09"/>
      </linearGradient>
      <radialGradient id="dal_curry" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="40%" stop-color="#eab308"/>
        <stop offset="85%" stop-color="#ca8a04"/>
        <stop offset="100%" stop-color="#a16207"/>
      </radialGradient>
    </defs>

    <rect width="800" height="500" fill="url(#bg_combo)"/>

    <!-- Header Ribbon like PDF Page 1 -->
    <rect x="0" y="0" width="800" height="75" fill="#991b1b"/>
    <rect x="0" y="70" width="800" height="5" fill="#f59e0b"/>
    <text x="35" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#fef2f2">
      গরম রুটি + বুটের ডাল কম্বো
    </text>
    <text x="35" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#fef08a">
      "ঝামেলাহীন সন্ধ্যা-সকাল" • একজন গৃহিণীর নির্ঝঞ্ঝাট স্বস্তি
    </text>
    <text x="765" y="46" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#facc15">
      ৳৫০ কম্বো
    </text>

    <!-- Visual: Rotis Stacked on Left & Steaming Dal Bowl on Right -->
    <g transform="translate(350, 270)">
      <!-- Roti Stack -->
      <circle r="125" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
      <ellipse cx="-20" cy="-25" rx="18" ry="9" fill="#854d0e" opacity="0.6"/>
      <ellipse cx="20" cy="-10" rx="14" ry="7" fill="#854d0e" opacity="0.55"/>
      <ellipse cx="-5" cy="30" rx="20" ry="10" fill="#854d0e" opacity="0.65"/>
    </g>

    <!-- Bowl of Booter Dal with Bagar, Coriander & Chili -->
    <g transform="translate(580, 270)">
      <circle r="120" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
      <circle r="105" fill="url(#dal_curry)"/>

      <!-- Bagar / Cumin Seeds / Chili pieces -->
      <path d="M -20 -10 Q 0 -30 25 -15" stroke="#78350f" stroke-width="3" fill="none"/>
      <circle cx="-10" cy="15" r="4" fill="#15803d"/>
      <circle cx="15" cy="10" r="5" fill="#15803d"/>
      <circle cx="0" cy="-5" r="4" fill="#15803d"/>
      <ellipse cx="10" cy="-20" rx="15" ry="4" fill="#dc2626" transform="rotate(30, 10, -20)"/>
    </g>

    <!-- Left Details Card (from PDF Page 2) -->
    <g transform="translate(35, 100)">
      <rect width="260" height="360" rx="16" fill="#292524" stroke="#44403c" stroke-width="2"/>
      <rect width="260" height="42" rx="16" fill="#f59e0b"/>
      <rect x="0" y="24" width="260" height="18" fill="#f59e0b"/>
      <text x="130" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#1c1917">
        কম্বো বিবরণী
      </text>

      <text x="20" y="75" font-size="14" font-weight="bold" fill="#facc15">প্যাকেজে যা যা পাচ্ছেন:</text>
      <text x="20" y="105" font-size="13" fill="#e7e5e4">🫓 ৪টি তাজা ফুলকো বাংলা রুটি</text>
      <text x="20" y="135" font-size="13" fill="#e7e5e4">🍲 ১ বাটি খাঁটি বুটের ডাল বাগার</text>

      <line x1="20" y1="165" x2="240" y2="165" stroke="#44403c" stroke-width="2"/>

      <text x="20" y="195" font-size="13" font-weight="bold" fill="#facc15">কেন এই কম্বো সেরা?</text>
      <text x="20" y="222" font-size="12" fill="#d6d3d1">✓ সকাল বা সন্ধ্যার তাৎক্ষণিক ভরপেট খাবার</text>
      <text x="20" y="248" font-size="12" fill="#d6d3d1">✓ কোনো রান্নার ঝামেলা নেই</text>
      <text x="20" y="274" font-size="12" fill="#d6d3d1">✓ গরম অবস্থায় ইনসুলেটেড ব্যাগে ডেলিভারি</text>
      <text x="20" y="300" font-size="12" fill="#d6d3d1">✓ সাশ্রয়ী ও পুষ্টিকর</text>

      <rect x="20" y="325" width="220" height="25" rx="4" fill="#dc2626"/>
      <text x="130" y="342" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">সকাল ৭-১১ টা | সন্ধ্যা ৫:৩০-৯:৩০ টা</text>
    </g>
  </svg>
  `;

  // 8. Automatic Roti Machine (Page 1 & 2)
  const svgMachine = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_mach" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="50%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <linearGradient id="steel" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f1f5f9"/>
        <stop offset="40%" stop-color="#cbd5e1"/>
        <stop offset="70%" stop-color="#94a3b8"/>
        <stop offset="100%" stop-color="#64748b"/>
      </linearGradient>
    </defs>

    <rect width="800" height="500" fill="url(#bg_mach)"/>

    <!-- Header Ribbon like PDF Page 1 -->
    <rect x="0" y="0" width="800" height="75" fill="#0284c7"/>
    <rect x="0" y="70" width="800" height="5" fill="#38bdf8"/>
    <text x="35" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#ffffff">
      স্বয়ংক্রিয় মেশিনে তাজা রুটি উৎপাদন
    </text>
    <text x="35" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#e0f2fe">
      "স্বাস্থ্যসম্মত খাদ্য প্রস্তুত করি, জনস্বাস্থ্যে অবদান রাখি"
    </text>

    <!-- Industrial Automatic Roti Maker Illustration (like PDF photo) -->
    <g transform="translate(100, 110)">
      <!-- Main Steel Body -->
      <rect x="150" y="60" width="380" height="220" rx="12" fill="url(#steel)" stroke="#475569" stroke-width="4"/>
      
      <!-- Top Dough Hopper / Feeder -->
      <polygon points="170,60 210,0 270,0 310,60" fill="#94a3b8" stroke="#334155" stroke-width="3"/>
      
      <!-- Conveyor Belt Assembly -->
      <rect x="60" y="240" width="560" height="40" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="3"/>
      <circle cx="80" cy="260" r="14" fill="#64748b"/>
      <circle cx="600" cy="260" r="14" fill="#64748b"/>

      <!-- Rotis moving along conveyor belt -->
      <ellipse cx="140" cy="235" rx="35" ry="12" fill="#fef08a"/>
      <ellipse cx="280" cy="235" rx="36" ry="12" fill="#fde047"/>
      <ellipse cx="420" cy="235" rx="36" ry="12" fill="#eab308"/>
      <ellipse cx="540" cy="235" rx="36" ry="12" fill="#ca8a04"/>

      <!-- Digital Control Display / Touchpad -->
      <rect x="360" y="90" width="130" height="80" rx="6" fill="#020617" stroke="#0ea5e9" stroke-width="2"/>
      <text x="425" y="125" text-anchor="middle" font-family="monospace" font-size="18" font-weight="900" fill="#38bdf8">220°C</text>
      <text x="425" y="150" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#4ade80">TOUCHLESS</text>

      <!-- Machine Legs -->
      <rect x="170" y="280" width="30" height="80" fill="#475569"/>
      <rect x="480" y="280" width="30" height="80" fill="#475569"/>
    </g>

    <!-- Bottom Features (Exact from PDF Page 2) -->
    <g transform="translate(40, 430)">
      <rect x="0" y="0" width="225" height="45" rx="8" fill="#0369a1"/>
      <text x="112" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">✓ ১০০% স্পর্শহীন স্বাস্থ্যসম্মত</text>

      <rect x="245" y="0" width="230" height="45" rx="8" fill="#075985"/>
      <text x="360" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">✓ আধুনিক হিট ও প্রেস প্রযুক্তি</text>

      <rect x="495" y="0" width="225" height="45" rx="8" fill="#0c4a6e"/>
      <text x="607" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">✓ প্রতি ব্যাচে নিখুঁত ফুলকো রুটি</text>
    </g>
  </svg>
  `;

  // 9. Delivery Rider & Scooter (Page 2)
  const svgRider = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_rider" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#064e3b"/>
        <stop offset="50%" stop-color="#065f46"/>
        <stop offset="100%" stop-color="#022c22"/>
      </linearGradient>
    </defs>

    <rect width="800" height="500" fill="url(#bg_rider)"/>

    <!-- Top Banner Ribbon like PDF Page 2 -->
    <rect x="0" y="0" width="800" height="75" fill="#047857"/>
    <rect x="0" y="70" width="800" height="5" fill="#34d399"/>
    <text x="35" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#ffffff">
      Own Rider Routing System
    </text>
    <text x="35" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#a7f3d0">
      "নিজস্ব ডেলিভারি কর্মী ও পথ নির্দেশক/নির্ধারণ ব্যবস্থা" • Max 2 Km
    </text>
    <text x="765" y="46" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#facc15">
      ১৫ মিনিট এক্সপ্রেস
    </text>

    <!-- Green Delivery Scooter & Rider with Thermal Delivery Box (like PDF photo) -->
    <g transform="translate(420, 290)">
      <!-- Road -->
      <line x1="-200" y1="110" x2="250" y2="110" stroke="#34d399" stroke-width="4"/>

      <!-- Scooter Wheels -->
      <circle cx="-100" cy="80" r="35" fill="#1f2937" stroke="#e5e7eb" stroke-width="6"/>
      <circle cx="120" cy="80" r="35" fill="#1f2937" stroke="#e5e7eb" stroke-width="6"/>

      <!-- Scooter Green Body -->
      <path d="M -90 60 L -40 60 L 0 30 L 70 30 L 110 50" stroke="#16a34a" stroke-width="24" fill="none" stroke-linecap="round"/>
      <path d="M 70 30 L 90 -20 L 75 -25" stroke="#15803d" stroke-width="8" fill="none"/>

      <!-- Bangla Roti Network Insulated Thermal Box on Rear Rack -->
      <rect x="-140" y="-40" width="90" height="85" rx="8" fill="#15803d" stroke="#facc15" stroke-width="3"/>
      <text x="-95" y="-15" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">Bangla Roti</text>
      <text x="-95" y="0" text-anchor="middle" font-size="10" font-weight="bold" fill="#facc15">Network</text>
      <text x="-95" y="25" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">HOT BOX ♨</text>

      <!-- Rider in Green Delivery Jacket & Helmet -->
      <!-- Body -->
      <ellipse cx="-10" cy="-20" rx="30" ry="45" fill="#16a34a"/>
      <!-- Helmet -->
      <circle cx="-10" cy="-85" r="24" fill="#047857" stroke="#34d399" stroke-width="3"/>
      <rect x="-6" y="-85" width="22" height="12" rx="4" fill="#0f172a"/>
    </g>

    <!-- Left Info Card (from PDF Page 2) -->
    <g transform="translate(35, 100)">
      <rect width="280" height="360" rx="16" fill="#064e3b" stroke="#059669" stroke-width="2"/>
      <rect width="280" height="42" rx="16" fill="#047857"/>
      <rect x="0" y="24" width="280" height="18" fill="#047857"/>
      <text x="140" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#ffffff">
        এলাকাভিত্তিক ডেলিভারি পরিষেবা
      </text>

      <text x="20" y="70" font-size="13" font-weight="bold" fill="#facc15">বর্তমান সেবা অঞ্চল:</text>
      <text x="20" y="96" font-size="13" fill="#ffffff">📍 পল্লবী (Pallabi)</text>
      <text x="20" y="122" font-size="13" fill="#ffffff">📍 মিরপুর DOHS</text>
      <text x="20" y="148" font-size="13" fill="#ffffff">📍 মিরপুর-১১</text>
      <text x="20" y="174" font-size="13" fill="#ffffff">📍 মিরপুর-১২</text>

      <line x1="20" y1="200" x2="260" y2="200" stroke="#047857" stroke-width="2"/>

      <text x="20" y="225" font-size="13" font-weight="bold" fill="#facc15">ডেলিভারির সময়সূচি:</text>
      <text x="20" y="250" font-size="12" fill="#d1fae5">🌅 সকাল: ৭:০০ টা - ১১:০০ টা</text>
      <text x="20" y="275" font-size="12" fill="#d1fae5">🌆 সন্ধ্যা: ৫:৩০ টা - ৯:৩০ টা</text>

      <g transform="translate(20, 305)">
        <rect width="240" height="36" rx="8" fill="#facc15"/>
        <text x="120" y="23" text-anchor="middle" font-size="13" font-weight="900" fill="#064e3b">
          হটলাইন: 01329593540
        </text>
      </g>
    </g>
  </svg>
  `;

  // 10. Family Breakfast (Page 1 & 2)
  const svgFamily = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_fam" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fffbeb"/>
        <stop offset="50%" stop-color="#fef3c7"/>
        <stop offset="100%" stop-color="#fde68a"/>
      </linearGradient>
    </defs>

    <rect width="800" height="500" fill="url(#bg_fam)"/>

    <!-- Header Ribbon like PDF Page 1 -->
    <rect x="0" y="0" width="800" height="75" fill="#78350f"/>
    <rect x="0" y="70" width="800" height="5" fill="#f59e0b"/>
    <text x="35" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#fef3c7">
      ঝামেলাহীন সন্ধ্যা-সকাল • Bangla Roti Network
    </text>
    <text x="35" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#fde68a">
      "মায়ের গান, মায়ের ভালোবাসা" • গৃহিণীর নির্ঝঞ্ঝাট সকাল
    </text>

    <!-- Warm Breakfast Illustration with Family Table -->
    <g transform="translate(420, 270)">
      <!-- Dining Table -->
      <ellipse cx="0" cy="50" rx="280" ry="80" fill="#92400e" stroke="#78350f" stroke-width="4"/>
      
      <!-- Hot Fresh Rotis in Center Table -->
      <circle cx="0" cy="30" r="60" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
      <ellipse cx="-10" cy="20" rx="10" ry="5" fill="#854d0e" opacity="0.6"/>

      <!-- Dal Bowls on sides -->
      <circle cx="-120" cy="40" r="35" fill="#eab308" stroke="#ca8a04" stroke-width="3"/>
      <circle cx="120" cy="40" r="35" fill="#eab308" stroke="#ca8a04" stroke-width="3"/>

      <!-- Steam rising -->
      <path d="M -10 0 Q -5 -20 -15 -40" stroke="#ca8a04" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
      <path d="M 10 0 Q 15 -20 5 -40" stroke="#ca8a04" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
    </g>

    <!-- Left Heartwarming Card (from PDF) -->
    <g transform="translate(35, 100)">
      <rect width="280" height="360" rx="16" fill="#ffffff" stroke="#f59e0b" stroke-width="2"/>
      <rect width="280" height="42" rx="16" fill="#b45309"/>
      <rect x="0" y="24" width="280" height="18" fill="#b45309"/>
      <text x="140" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#ffffff">
        সকাল সন্ধ্যার ঝামেলা আর না!
      </text>

      <text x="20" y="75" font-size="13" font-weight="bold" fill="#78350f">আমাদের বার্তা:</text>
      <text x="20" y="102" font-size="12" fill="#4b5563">"ঘরে আটা মাখানো, বেলা ও চুলার পাশে দাঁড়িয়ে</text>
      <text x="20" y="122" font-size="12" fill="#4b5563">রুটি ভাজার কষ্ট এখন অতীত।"</text>

      <g transform="translate(20, 145)">
        <rect width="240" height="65" rx="8" fill="#fef3c7"/>
        <text x="12" y="24" font-size="12" font-weight="bold" fill="#78350f">❤️ গৃহিণীর স্বস্তি ফিরিয়ে আনুন</text>
        <text x="12" y="44" font-size="11" fill="#92400e">অফিস বা স্কুলের তাড়ার মাঝে ধোঁয়া ওঠা গরম রুটি</text>
      </g>

      <g transform="translate(20, 225)">
        <rect width="240" height="65" rx="8" fill="#fef3c7"/>
        <text x="12" y="24" font-size="12" font-weight="bold" fill="#78350f">🌿 নিরাপদ ও স্বাস্থ্যসম্মত খাদ্য</text>
        <text x="12" y="44" font-size="11" fill="#92400e">শতভাগ ভেজালমুক্ত উপাদান ও নিজস্ব ডেলিভারি</text>
      </g>

      <g transform="translate(20, 305)">
        <rect width="240" height="36" rx="8" fill="#15803d"/>
        <text x="120" y="23" text-anchor="middle" font-size="13" font-weight="900" fill="#ffffff">
          নিরাপদ খাদ্য, সুস্থ জীবন
        </text>
      </g>
    </g>
  </svg>
  `;

  // 11. Kashmiri Alur Dom (ডাল-সবজি সেকশন)
  const svgAlurDom = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_alu" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7f1d1d"/>
        <stop offset="50%" stop-color="#991b1b"/>
        <stop offset="100%" stop-color="#450a0a"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#bg_alu)"/>
    <rect x="0" y="0" width="800" height="75" fill="#450a0a"/>
    <rect x="0" y="70" width="800" height="5" fill="#ef4444"/>
    <text x="35" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#ffffff">
      কাশ্মীরি আলুর দম • Kashmiri Alur Dom
    </text>
    <text x="35" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#fecaca">
      রুটি ও পরোটার সাথে জাদুকরি স্বাদের কাশ্মীরি গ্রেভি
    </text>
    <text x="765" y="46" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#facc15">
      ৳৩৫ / বাটি
    </text>

    <!-- Bowl of Alur Dom with Rich Red Gravy -->
    <g transform="translate(500, 270)">
      <circle r="150" fill="#1c1917" stroke="#ca8a04" stroke-width="4"/>
      <circle r="130" fill="#b91c1c"/>
      <!-- Golden baby potatoes -->
      <circle cx="-35" cy="-30" r="38" fill="#ca8a04" stroke="#78350f" stroke-width="2"/>
      <circle cx="35" cy="-30" r="42" fill="#d97706" stroke="#78350f" stroke-width="2"/>
      <circle cx="0" cy="35" r="45" fill="#ca8a04" stroke="#78350f" stroke-width="2"/>
      <!-- Coriander leaves -->
      <circle cx="0" cy="-5" r="6" fill="#15803d"/>
      <circle cx="-15" cy="10" r="7" fill="#15803d"/>
      <circle cx="15" cy="15" r="6" fill="#15803d"/>
    </g>

    <!-- Left Details -->
    <g transform="translate(35, 100)">
      <rect width="280" height="360" rx="16" fill="#1c1917" stroke="#991b1b" stroke-width="2"/>
      <rect width="280" height="42" rx="16" fill="#991b1b"/>
      <rect x="0" y="24" width="280" height="18" fill="#991b1b"/>
      <text x="140" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#ffffff">
        ঐতিহ্যবাহী স্বাদের রহস্য
      </text>

      <text x="20" y="75" font-size="13" font-weight="bold" fill="#facc15">উপকরণ ও মশলা:</text>
      <text x="20" y="105" font-size="12" fill="#e5e7eb">✓ বাছাইকৃত ছোট গোল আলু (বেবি পটেটো)</text>
      <text x="20" y="130" font-size="12" fill="#e5e7eb">✓ খাঁটি টকদই ও কাশ্মীরি লাল মরিচ পেস্ট</text>
      <text x="20" y="155" font-size="12" fill="#e5e7eb">✓ আদা বাটা, মৌরি গুঁড়া ও হিং ফোড়ন</text>
      <text x="20" y="180" font-size="12" fill="#e5e7eb">✓ শাহী গরম মশলা ও সরিষার তেলের বাগার</text>

      <g transform="translate(20, 220)">
        <rect width="240" height="65" rx="8" fill="#292524" stroke="#991b1b" stroke-width="1.5"/>
        <text x="12" y="24" font-size="12" font-weight="bold" fill="#facc15">🔥 রুটি ও সাদ্দাক পরোটার সেরা জুটি</text>
        <text x="12" y="44" font-size="11" fill="#fca5a5">ঝাল-মিষ্টি ঘন গ্রেভির অতুলনীয় স্বাদ</text>
      </g>
    </g>
  </svg>
  `;

  // 12. Shahi Malai Cha
  const svgCha = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg_cha" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#451a03"/>
        <stop offset="50%" stop-color="#78350f"/>
        <stop offset="100%" stop-color="#291102"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#bg_cha)"/>
    <rect x="0" y="0" width="800" height="75" fill="#291102"/>
    <rect x="0" y="70" width="800" height="5" fill="#d97706"/>
    <text x="35" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#fde68a">
      শাহী জাফরানি মালাই চা • Shahi Malai Cha
    </text>
    <text x="35" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#fed7aa">
      ঘন দুধ, জাফরান ও এলাচের সুবাসিত চা
    </text>
    <text x="765" y="46" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#facc15">
      ৳২৫ / কাপ
    </text>

    <!-- Clay Matka / Cup with Malai -->
    <g transform="translate(500, 270)">
      <!-- Saucer -->
      <ellipse cx="0" cy="120" rx="140" ry="40" fill="#78350f" stroke="#451a03" stroke-width="4"/>
      <!-- Earthen Cup (Matka) -->
      <path d="M -70 110 L -90 -20 L 90 -20 L 70 110 Z" fill="#92400e" stroke="#451a03" stroke-width="4"/>
      <!-- Tea surface with Malai -->
      <ellipse cx="0" cy="-20" rx="90" ry="30" fill="#b45309"/>
      <ellipse cx="0" cy="-20" rx="70" ry="20" fill="#fef08a" opacity="0.8"/>
      <!-- Steam -->
      <path d="M -20 -40 Q -10 -70 -25 -100" stroke="#fef3c7" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.6"/>
      <path d="M 20 -40 Q 30 -70 15 -100" stroke="#fef3c7" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.6"/>
    </g>

    <!-- Left Details -->
    <g transform="translate(35, 100)">
      <rect width="280" height="360" rx="16" fill="#291102" stroke="#92400e" stroke-width="2"/>
      <rect width="280" height="42" rx="16" fill="#92400e"/>
      <rect x="0" y="24" width="280" height="18" fill="#92400e"/>
      <text x="140" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#ffffff">
        আসল মাটির কাপের স্বাদ
      </text>

      <text x="20" y="75" font-size="13" font-weight="bold" fill="#facc15">উপকরণ ও বৈশিষ্ট্য:</text>
      <text x="20" y="105" font-size="12" fill="#e5e7eb">✓ খাঁটি জ্বাল দেওয়া ঘন গরুর দুধ</text>
      <text x="20" y="130" font-size="12" fill="#e5e7eb">✓ সুগন্ধি জাফরান ও সবুজ এলাচ</text>
      <text x="20" y="155" font-size="12" fill="#e5e7eb">✓ উপরে খাঁটি দুধের ঘন সরের মালাই</text>
      <text x="20" y="180" font-size="12" fill="#e5e7eb">✓ থার্মাল কাপে ধোঁয়া ওঠা গরম পরিবেশন</text>
    </g>
  </svg>
  `;

  // Write all assets
  await saveAsset('pdf_bangla_ruti', svgBanglaRuti);
  await saveAsset('pdf_diafit_roti', svgDiaFit);
  await saveAsset('pdf_youngfuel_roti', svgYoungFuel);
  await saveAsset('pdf_rice_flour_roti', svgRiceFlour);
  await saveAsset('pdf_kalai_roti', svgKalaiRoti);
  await saveAsset('pdf_saddak_paratha', svgParatha);
  await saveAsset('pdf_roti_dal_combo', svgCombo);
  await saveAsset('pdf_machine_production', svgMachine);
  await saveAsset('pdf_delivery_rider', svgRider);
  await saveAsset('pdf_family_breakfast', svgFamily);
  await saveAsset('pdf_alur_dom', svgAlurDom);
  await saveAsset('pdf_shahi_cha', svgCha);

  console.log('All PDF visual assets generated successfully!');
}

main().catch(console.error);
