// gradientUtils.js

/**
 * Converts a hex color code to an RGB array.
 * @param {string} hex - The hex color code.
 * @returns {number[]} An array containing the RGB values.
 */
function hexToRgb(hex) {
  let r = 0,
    g = 0,
    b = 0;
  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return [r, g, b];
}

/**
 * Converts RGB values to a hex color code.
 * @param {number} r - The red value (0-255).
 * @param {number} g - The green value (0-255).
 * @param {number} b - The blue value (0-255).
 * @returns {string} The hex color code.
 */
function rgbToHex(r, g, b) {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

/**
 * Generates an array of gradient colors from hex color A to hex color B.
 * @param {string} hexA - The starting color in hex format.
 * @param {string} hexB - The ending color in hex format.
 * @param {number} steps - The number of steps in the gradient.
 * @returns {string[]} An array of hex color codes representing the gradient.
 */
function generateGradient(hexA, hexB, steps) {
  const [rA, gA, bA] = hexToRgb(hexA);
  const [rB, gB, bB] = hexToRgb(hexB);

  const gradient = [];
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps;
    const r = Math.round(rA + (rB - rA) * ratio);
    const g = Math.round(gA + (gB - gA) * ratio);
    const b = Math.round(bA + (bB - bA) * ratio);
    gradient.push(rgbToHex(r, g, b));
  }
  return gradient;
}

// Export the function to be used in other modules
export { generateGradient };
