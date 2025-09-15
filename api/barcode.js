import bwipjs from 'bwip-js';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing code parameter');
  }

  try {
    const png = await new Promise((resolve, reject) => {
      bwipjs.toBuffer({
        bcid: 'ean13',
        text: code,
        scale: 3,
        height: 10,
        includetext: false,
      }, function (err, png) {
        if (err) {
          reject(err);
        } else {
          resolve(png);
        }
      });
    });

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(png);
  } catch (err) {
    res.status(500).send('Error generating barcode: ' + err.message);
  }
}
