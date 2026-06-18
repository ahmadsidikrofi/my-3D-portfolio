const fs = require('fs');
const svg = fs.readFileSync('public/cyclist.svg', 'utf8');

// Parse SVG tags
const tags = svg.match(/<[^>]+>/g);

const rearWheel = [];
const frontWheel = [];
const legs = [];
const frame = [];

const REAR_CX = 152.24;
const REAR_CY = 507.12;
const FRONT_CX = 620.68;
const FRONT_CY = 499.58;

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

tags.forEach(tag => {
  if (tag.startsWith('<?') || tag.startsWith('</') || tag.startsWith('<svg')) return;
  
  let cleanTag = tag.replace(/xmlns:xlink="[^"]+"/, '')
                    .replace(/artist="[^"]+"/, '')
                    .replace(/source="[^"]+"/, '')
                    .replace(/role="img"/, '');
  
  // 1. Remove background elements as requested
  if (cleanTag.includes('fill="#f2f2f2"')) return; // Buildings
  if (cleanTag.includes('fill="#f0f0f0"')) return; // Clouds
  if (cleanTag.includes('fill="#fd6584"')) return; // Sun
  if (cleanTag.includes('fill="#ccc"')) return;    // Ground line
  if (cleanTag.includes('height="2"') && cleanTag.includes('fill="#3f3d56"')) return; // Speed lines

  // 2. Wheel Identification
  if (cleanTag.includes('M354.44965,757.513')) {
    rearWheel.push(cleanTag);
    return;
  }
  if (cleanTag.includes('M822.88975,755.95931')) {
    frontWheel.push(cleanTag);
    return;
  }

  if (cleanTag.includes('circle')) {
    const cxMatch = cleanTag.match(/cx="([^"]+)"/);
    const cyMatch = cleanTag.match(/cy="([^"]+)"/);
    if (cxMatch && cyMatch) {
      const cx = parseFloat(cxMatch[1]);
      const cy = parseFloat(cyMatch[1]);
      if (getDistance(cx, cy, REAR_CX, REAR_CY) < 50) {
        rearWheel.push(cleanTag);
        return;
      }
      if (getDistance(cx, cy, FRONT_CX, FRONT_CY) < 50) {
        frontWheel.push(cleanTag);
        return;
      }
    }
  }

  // Fix wheel highlights distance to strictly group them inside tires
  if (cleanTag.includes('rect') && cleanTag.includes('fill="#fff"')) {
    const xMatch = cleanTag.match(/ x="([^"]+)"/);
    const yMatch = cleanTag.match(/ y="([^"]+)"/);
    const wMatch = cleanTag.match(/width="([^"]+)"/);
    const hMatch = cleanTag.match(/height="([^"]+)"/);
    const txMatch = cleanTag.match(/translate\(([^ ]+) ([^)]+)\)/);
    
    if (xMatch && yMatch && wMatch && hMatch) {
      let cx = parseFloat(xMatch[1]) + parseFloat(wMatch[1])/2;
      let cy = parseFloat(yMatch[1]) + parseFloat(hMatch[1])/2;
      
      if (cleanTag.includes('rotate(-180)') && txMatch) {
        cx = parseFloat(txMatch[1]) - cx;
        cy = parseFloat(txMatch[2]) - cy;
      }
      
      if (getDistance(cx, cy, REAR_CX, REAR_CY) < 120) {
        rearWheel.push(cleanTag);
        return;
      }
      if (getDistance(cx, cy, FRONT_CX, FRONT_CY) < 120) {
        frontWheel.push(cleanTag);
        return;
      }
    }
  }

  // 3. Leg Identification for Pedaling (Pants and related components)
  if (cleanTag.includes('fill="#2f2e41"')) {
    legs.push(cleanTag);
    return;
  }
  if (cleanTag.includes('cx="369.24841"') && cleanTag.includes('circle')) {
    legs.push(cleanTag);
    return;
  }
  if (cleanTag.includes('fill="#3f3d56"') && cleanTag.includes('rotate(-19.67716)')) {
    legs.push(cleanTag); // Crank arm
    return;
  }

  // 4. Everything else goes to the frame
  frame.push(cleanTag);
});

const componentCode = `
"use client";

import { motion } from "framer-motion";

export default function CyclistPlayer({ xPosition }) {
  // SVG Rotation using accurate transform instead of css origin
  const rotation = (xPosition / 716) * 360;

  return (
    <div className="absolute bottom-[20%] left-[10vw] z-40 w-[200px] md:w-[320px] pointer-events-none -translate-y-[6px]">
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
        className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 794.67 615.31" className="w-full h-full">
          <g id="frame">
            ${frame.join('\n            ')}
          </g>
          
          {/* Leg pedaling animation (Elliptical pumping) */}
          <motion.g
            animate={{ 
              y: [0, -8, 0, 8, 0],
              x: [0, 4, 0, -4, 0],
              rotate: [0, 4, 0, -4, 0]
            }}
            transition={{ repeat: Infinity, duration: 0.45, ease: "linear" }}
            style={{ transformOrigin: "450px 350px" }}
          >
            ${legs.join('\n            ')}
          </motion.g>
          
          {/* Wheels using SVG transform for perfect center rotation */}
          <g id="rear-wheel" transform={\`rotate(\${rotation} 152.24 507.12)\`}>
            ${rearWheel.join('\n            ')}
          </g>

          <g id="front-wheel" transform={\`rotate(\${rotation} 620.68 499.58)\`}>
            ${frontWheel.join('\n            ')}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/CyclistPlayer.jsx', componentCode);
console.log("Component successfully regenerated with fixes!");
