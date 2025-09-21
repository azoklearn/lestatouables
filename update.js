// API endpoint pour mettre à jour les flash
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  try {
    const { flash, adminKey } = req.body

    if (!flash || !Array.isArray(flash)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Données de flash invalides' 
      })
    }

    // Vérifier la clé d'administration
    if (adminKey !== '03KinepolisdDiva23!') {
      return res.status(401).json({ 
        success: false, 
        error: 'Clé d\'administration invalide' 
      })
    }

    // Pour l'instant, on simule une sauvegarde réussie
    console.log('Flash reçus:', flash);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Flash sauvegardés avec succès (mode test)',
      data: flash 
    })
  } catch (error) {
    console.error('Erreur serveur:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur interne du serveur' 
    })
  }
}