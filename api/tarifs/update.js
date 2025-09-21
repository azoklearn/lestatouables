import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tarifs } = req.body;
    
    if (!tarifs || !Array.isArray(tarifs)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const filePath = path.join(process.cwd(), 'data', 'ldermo-tarifs.json');
    
    // Sauvegarder les données
    fs.writeFileSync(filePath, JSON.stringify(tarifs, null, 2));
    
    res.status(200).json({ 
      success: true, 
      message: 'Tarifs mis à jour avec succès',
      count: tarifs.length 
    });
  } catch (error) {
    console.error('Error updating tarifs:', error);
    res.status(500).json({ error: 'Failed to update tarifs' });
  }
}
