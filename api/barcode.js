import bwipjs from 'bwip-js';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code || code.length !== 13) {
    return res.status(400).send('Missing or invalid code parameter');
  }

  try {
    const png = await bwipjs.toBuffer({
      bcid: 'ean13',
      text: code,
      scale: 2,
      height: 10,
      includetext: false,
      backgroundcolor: 'FFFFFF', // čistě bílé pozadí
      paddingwidth: 10,           // potřebné pro správný výřez
      paddingheight: 10
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    res.end(png);
  } catch (err) {
    console.error('Error generating barcode:', err);
    res.status(500).send(`Error generating barcode: ${err.message}`);
  }
}
