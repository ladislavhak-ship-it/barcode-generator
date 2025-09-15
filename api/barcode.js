// /api/barcode.js
import bwipjs from 'bwip-js';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing barcode code');
  }

  try {
    const png = await bwipjs.toBuffer({
      bcid: 'code128',         // Barcode type
      text: code,              // Data to encode
      scale: 3,                // Higher = sharper (try 3 or 4)
      height: 10,              // Bar height (10 = ~50px at scale 3)
      includetext: false,      // No numbers below barcode
      backgroundcolor: 'ffffff00', // Transparent
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.status(200).send(png);
  } catch (err) {
    console.error('Error generating barcode:', err);
    res.status(500).send('Error generating barcode');
  }
}
