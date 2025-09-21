// API endpoint pour récupérer les flash
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  // Données de test temporaires
  const testData = [
    { id: '1', src: 'images/flash1.jpeg', caption: 'Flash 1' },
    { id: '2', src: 'images/flash2.jpeg', caption: 'Flash 2' },
    { id: '3', src: 'images/flash3.jpeg', caption: 'Flash 3' }
  ];

  return res.status(200).json({ 
    success: true, 
    data: testData,
    message: 'Endpoint flash fonctionne !'
  });
}