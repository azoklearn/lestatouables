// API endpoint pour mettre a jour les creations Sinkolor
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Methode non autorisee' })
  }

  try {
    const { creations, adminKey } = req.body

    if (!creations || !Array.isArray(creations)) {
      return res.status(400).json({
        success: false,
        error: 'Donnees de creations invalides'
      })
    }

    // Verifier la cle d'administration
    if (adminKey !== '03KinepolisdDiva23!') {
      return res.status(401).json({
        success: false,
        error: 'Cle d\'administration invalide'
      })
    }

    // Pour l'instant, on simule une sauvegarde reussie
    console.log('Creations recues:', creations);

    return res.status(200).json({
      success: true,
      message: 'Creations sauvegardees avec succes (mode test)',
      data: creations
    })
  } catch (error) {
    console.error('Erreur serveur:', error)
    return res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    })
  }
}
