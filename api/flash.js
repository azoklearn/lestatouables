// API Route pour Vercel
export default async function handler(req, res) {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Lire les données depuis un fichier JSON
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'flash.json');
        
        let data = [];
        if (fs.existsSync(dataPath)) {
          const fileContent = fs.readFileSync(dataPath, 'utf8');
          data = JSON.parse(fileContent);
        } else {
          // Données par défaut
          data = [
            { id: '1', src: 'images/flash1.jpeg', caption: 'Flash 1' },
            { id: '2', src: 'images/flash2.jpeg', caption: 'Flash 2' },
            { id: '3', src: 'images/flash3.jpeg', caption: 'Flash 3' }
          ];
          // Créer le dossier data s'il n'existe pas
          const dataDir = path.dirname(dataPath);
          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
          }
          fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        }
        
        res.status(200).json(data);
        break;

      case 'POST':
        // Ajouter un nouveau flash
        const { src, caption } = req.body;
        if (!src || !caption) {
          return res.status(400).json({ error: 'Données manquantes' });
        }

        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'flash.json');
        
        let data = [];
        if (fs.existsSync(dataPath)) {
          const fileContent = fs.readFileSync(dataPath, 'utf8');
          data = JSON.parse(fileContent);
        }

        const newId = Date.now().toString();
        const newFlash = { id: newId, src, caption };
        data.push(newFlash);

        // Créer le dossier data s'il n'existe pas
        const dataDir = path.dirname(dataPath);
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        res.status(200).json({ success: true, id: newId });
        break;

      case 'PUT':
        // Modifier un flash
        const { id, src: newSrc, caption: newCaption } = req.body;
        if (!id || !newSrc || !newCaption) {
          return res.status(400).json({ error: 'Données manquantes' });
        }

        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'flash.json');
        
        if (!fs.existsSync(dataPath)) {
          return res.status(404).json({ error: 'Fichier de données non trouvé' });
        }

        const fileContent = fs.readFileSync(dataPath, 'utf8');
        let data = JSON.parse(fileContent);
        
        const itemIndex = data.findIndex(item => item.id === id);
        if (itemIndex === -1) {
          return res.status(404).json({ error: 'Flash non trouvé' });
        }

        data[itemIndex] = { id, src: newSrc, caption: newCaption };
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        res.status(200).json({ success: true });
        break;

      case 'DELETE':
        // Supprimer un flash
        const { id: deleteId } = req.body;
        if (!deleteId) {
          return res.status(400).json({ error: 'ID manquant' });
        }

        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', 'flash.json');
        
        if (!fs.existsSync(dataPath)) {
          return res.status(404).json({ error: 'Fichier de données non trouvé' });
        }

        const fileContent = fs.readFileSync(dataPath, 'utf8');
        let data = JSON.parse(fileContent);
        
        data = data.filter(item => item.id !== deleteId);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        res.status(200).json({ success: true });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur API:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
