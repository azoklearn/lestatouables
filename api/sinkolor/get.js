import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'sinkolor-creations.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const creations = JSON.parse(data);
    
    res.status(200).json({ success: true, data: creations });
  } catch (error) {
    console.error('Error reading sinkolor creations:', error);
    res.status(500).json({ error: 'Failed to read creations' });
  }
}
