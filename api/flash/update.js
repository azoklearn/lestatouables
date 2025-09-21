import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { flash } = req.body;
    
    if (!flash || !Array.isArray(flash)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const filePath = path.join(process.cwd(), 'data', 'flash-data.json');
    
    // Sauvegarder les données
    fs.writeFileSync(filePath, JSON.stringify(flash, null, 2));
    
    res.status(200).json({ 
      success: true, 
      message: 'Flash mises à jour avec succès',
      count: flash.length 
    });
  } catch (error) {
    console.error('Error updating flash data:', error);
    res.status(500).json({ error: 'Failed to update flash data' });
  }
}
