import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { creations } = req.body;
    
    if (!creations || !Array.isArray(creations)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const filePath = path.join(process.cwd(), 'data', 'sinkolor-creations.json');
    
    // Sauvegarder les données
    fs.writeFileSync(filePath, JSON.stringify(creations, null, 2));
    
    res.status(200).json({ 
      success: true, 
      message: 'Créations Sinkolor mises à jour avec succès',
      count: creations.length 
    });
  } catch (error) {
    console.error('Error updating sinkolor creations:', error);
    res.status(500).json({ error: 'Failed to update creations' });
  }
}
