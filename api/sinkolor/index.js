// API endpoint pour récupérer les créations Sinkolor
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  // Données de test temporaires
  const testData = [
    { id: '1', src: 'images/image9.jpeg', alt: 'Tatouage S\'inkolor 9' },
    { id: '2', src: 'images/image10.jpeg', alt: 'Tatouage S\'inkolor 10' },
    { id: '3', src: 'images/image12.jpeg', alt: 'Tatouage S\'inkolor 12' }
  ];

  return res.status(200).json({ 
    success: true, 
    data: testData,
    message: 'Endpoint sinkolor fonctionne !'
  });
}