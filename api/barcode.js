import bwipjs from 'bwip-js';

export default async function handler(req, res) {
  const { code, format = 'ean13' } = req.query;

  if (!code) {
    return res.status(400).send('Missing code parameter');
  }

  try {
    const png = await bwipjs.toBuffer({
      bcid: format,              // 'ean13' or 'code128'
      text: code,
      scale: 3,
      height: 15,
      includetext: false,
      backgroundcolor: 'FFFFFF'
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    res.end(png);
  } catch (err) {
    console.error('Error generating barcode:', err);
    res.status(500).send(`Error generating barcode: ${err.message}`);
  }
}
