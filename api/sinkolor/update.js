// API endpoint pour mettre à jour les créations Sinkolor
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variables d\'environnement Supabase manquantes')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  try {
    const { creations, adminKey } = req.body

    if (!creations || !Array.isArray(creations)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Données de créations invalides' 
      })
    }

    // Vérifier la clé d'administration
    if (adminKey !== '03KinepolisdDiva23!') {
      return res.status(401).json({ 
        success: false, 
        error: 'Clé d\'administration invalide' 
      })
    }

    // Supprimer toutes les créations existantes
    const { error: deleteError } = await supabase
      .from('sinkolor_creations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Condition qui sera toujours vraie

    if (deleteError) {
      console.error('Erreur lors de la suppression:', deleteError)
      return res.status(500).json({ 
        success: false, 
        error: 'Erreur lors de la suppression des anciennes créations' 
      })
    }

    // Insérer les nouvelles créations
    const { data, error: insertError } = await supabase
      .from('sinkolor_creations')
      .insert(creations.map(item => ({
        src: item.src,
        alt: item.alt || ''
      })))
      .select()

    if (insertError) {
      console.error('Erreur lors de l\'insertion:', insertError)
      return res.status(500).json({ 
        success: false, 
        error: 'Erreur lors de la sauvegarde des créations' 
      })
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Créations sauvegardées avec succès',
      data: data 
    })
  } catch (error) {
    console.error('Erreur serveur:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur interne du serveur' 
    })
  }
}