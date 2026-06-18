const fs = require('fs');
const svg = fs.readFileSync('public/cyclist.svg', 'utf8');

// Find all tags
const tags = svg.match(/<[^>]+>/g);

const rearWheel = [];
const frontWheel = [];
const frame = [];

tags.forEach(tag => {
  if (tag.startsWith('<?') || tag.startsWith('</') || tag.startsWith('<svg')) return;
  
  // Quick fix: SVG attributes in React shouldn't have colons if they aren't namespace prefixes.
  // Actually, standard SVG attributes are fine, but in React `xmlns:xlink` is better removed.
  let cleanTag = tag.replace(/xmlns:xlink="[^"]+"/, '').replace(/artist="[^"]+"/, '').replace(/source="[^"]+"/, '');
  
  if (cleanTag.includes('M354.44965,757.513') || 
      (cleanTag.includes('cx="152.24841"') && cleanTag.includes('circle')) ||
      (cleanTag.includes('translate(417.41671 1014.87309)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(355.14654 1014.87309)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(417.41671 1092.33111)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(355.14654 1092.33111)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(417.41671 1169.78913)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(355.14654 1169.78913)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(355.14654 1247.24715)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(355.14654 1324.70517)') && cleanTag.includes('rotate(-180)'))
  ) {
    rearWheel.push(cleanTag);
  } else if (
      cleanTag.includes('M822.88975,755.95931') || 
      (cleanTag.includes('cx="625.70904"') && cleanTag.includes('circle')) ||
      (cleanTag.includes('translate(955.65274 1092.33111)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(893.38257 1092.33111)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(955.65274 1169.78913)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(893.38257 1169.78913)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(955.65274 1247.24715)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(893.38257 1247.24715)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(955.65274 1324.70517)') && cleanTag.includes('rotate(-180)')) ||
      (cleanTag.includes('translate(893.38257 1324.70517)') && cleanTag.includes('rotate(-180)'))
  ) {
    frontWheel.push(cleanTag);
  } else {
    frame.push(cleanTag);
  }
});

const componentCode = `
"use client";

import { motion } from "framer-motion";

export default function CyclistPlayer({ xPosition }) {
  // Rotate wheels based on xPosition. 
  const rotation = (xPosition / 500) * 360;

  return (
    <div className="absolute bottom-[20%] left-[10vw] z-40 w-[200px] md:w-[320px] pointer-events-none">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
        className="w-full h-auto drop-shadow-2xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 794.67 615.31" className="w-full h-full">
          <g id="frame">
            ${frame.join('\\n            ')}
          </g>
          
          <g id="rear-wheel" style={{ transformOrigin: '152.24px 507.12px', transform: \`rotate(\${rotation}deg)\` }}>
            ${rearWheel.join('\\n            ')}
          </g>

          <g id="front-wheel" style={{ transformOrigin: '620.68px 499.58px', transform: \`rotate(\${rotation}deg)\` }}>
            ${frontWheel.join('\\n            ')}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/CyclistPlayer.jsx', componentCode);
console.log("Component generated!");
