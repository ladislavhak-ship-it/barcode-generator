// api/barcode.js

import bwipjs from 'bwip-js';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing code parameter');
  }

  try {
    const png = await bwipjs.toBuffer({
      bcid:        'ean13',       // Barcode type
      text:        code,          // Text to encode
      scale:       3,             // 3x scaling factor
      height:      10,            // Bar height, in mm
      includetext: false,         // Don't show human-readable text
      backgroundcolor: 'FFFFFF',  // Optional: white background
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    res.send(png);
  } catch (err) {
    console.error('Error generating barcode:', err);
    res.status(500).send(`Error generating barcode: ${err.message}`);
  }
}
