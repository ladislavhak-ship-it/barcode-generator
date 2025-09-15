import bwipjs from 'bwip-js';

export default async function handler(req, res) {
  const { code, format = 'ean13' } = req.query;

  if (!code) {
    return res.status(400).send('Missing code parameter');
  }

try {
  const format = req.query.format || 'ean13';
  const code = req.query.code;

  let options = {
    bcid: format,
    text: code,
    scale: 2,
    includetext: false,
    backgroundcolor: 'FFFFFF00', // průhledné pozadí
  };

  if (format === 'ean13') {
    options.height = 25;
    options.paddingwidth = 0;
    options.paddingheight = 0;
  } else if (format === 'code128') {
    options.height = 40;
    options.paddingwidth = 0;
    options.paddingheight = 0;
    options.includeguardwhitespace = false;
  }

  const png = await bwipjs.toBuffer(options);

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'no-store');
  res.end(png);

} catch (err) {
  console.error('Error generating barcode:', err);
  res.status(500).send(`Error generating barcode: ${err.message}`);
}
}
