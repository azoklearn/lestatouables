// API endpoint pour mettre à jour les flash
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

    // Supprimer tous les flash existants
    const { error: deleteError } = await supabase
      .from('flash_items')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Condition qui sera toujours vraie

    if (deleteError) {
      console.error('Erreur lors de la suppression:', deleteError)
      return res.status(500).json({ 
        success: false, 
        error: 'Erreur lors de la suppression des anciens flash' 
      })
    }

    // Insérer les nouveaux flash
    const { data, error: insertError } = await supabase
      .from('flash_items')
      .insert(flash.map(item => ({
        src: item.src,
        caption: item.caption || ''
      })))
      .select()

    if (insertError) {
      console.error('Erreur lors de l\'insertion:', insertError)
      return res.status(500).json({ 
        success: false, 
        error: 'Erreur lors de la sauvegarde des flash' 
      })
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Flash sauvegardés avec succès',
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
