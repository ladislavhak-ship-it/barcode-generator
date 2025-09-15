import bwipjs from 'bwip-js';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code || code.length !== 13) {
    return res.status(400).send('Invalid or missing EAN13 code.');
  }

  try {
    const svg = bwipjs.toBuffer({
      bcid: 'ean13',
      text: code,
      scale: 3,
      includetext: false,
      backgroundcolor: 'FFFFFF',
      paddingwidth: 5,
      paddingheight: 5,
      // Optional: suppress text under barcode
      includetext: false,
    }, { encoding: 'svg' });

    const svgBuffer = await svg;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svgBuffer.toString());
  } catch (err) {
    res.status(500).send(`Error generating barcode: ${err.message}`);
  }
}
