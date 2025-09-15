import bwipjs from 'bwip-js';

export default async function handler(req, res) {
  const { code } = req.query;

  // validace EAN13 – 13 číslic
  if (!code || !/^\d{13}$/.test(code)) {
    return res.status(400).send('Invalid EAN-13 code. Must be 13 digits.');
  }

  try {
    const png = await bwipjs.toBuffer({
      bcid: 'ean13',
      text: code,
      scale: 2,               // měň na 3 nebo 4 podle potřeby
      height: 10,
      includetext: false,
      backgroundcolor: 'FFFFFF' // čistě bílé pozadí (ne ffffff00!)
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    res.end(png);
  } catch (err) {
    console.error(err);
    res.status(500).send('Barcode generation error');
  }
}
