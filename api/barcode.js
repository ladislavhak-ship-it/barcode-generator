import { createCanvas } from 'canvas'
import JsBarcode from 'jsbarcode'

export default async function handler(req, res) {
  const { code = '' } = req.query

  if (!code || code.length !== 13) {
    return res.status(400).send('Invalid or missing EAN13 code')
  }

  const canvas = createCanvas()
  try {
    JsBarcode(canvas, code, {
      format: 'EAN13',
      displayValue: false,
      background: 'transparent',
      height: 50,
    })

    const buffer = canvas.toBuffer('image/png')
    res.setHeader('Content-Type', 'image/png')
    res.send(buffer)
  } catch (err) {
    res.status(500).send('Failed to generate barcode')
  }
}
