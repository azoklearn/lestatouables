// API endpoint pour récupérer les tarifs LDermo
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  // Données de test temporaires
  const testData = [
    { 
      id: '1',
      service: 'Reconstruction de l\'aréole mammaire',
      prix: 'À partir de 200€',
      description: 'Tatouage réparateur pour reconstruction de l\'aréole après chirurgie mammaire'
    },
    { 
      id: '2',
      service: 'Camouflage de cicatrices',
      prix: 'À partir de 150€',
      description: 'Tatouage réparateur pour atténuer les cicatrices visibles'
    }
  ];

  return res.status(200).json({ 
    success: true, 
    data: testData,
    message: 'Endpoint tarifs fonctionne !'
  });
}