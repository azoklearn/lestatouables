// API endpoint pour mettre a jour les flash
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

console.log('SUPABASE_URL:', supabaseUrl ? 'Present' : 'Missing')
console.log('SUPABASE_ANON_KEY:', supabaseKey ? 'Present' : 'Missing')

if (!supabaseUrl || !supabaseKey) {
  console.error('Variables d\'environnement Supabase manquantes')
  // Mode test si les variables manquent
  export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Methode non autorisee' })
    }

    try {
      const { flash, adminKey } = req.body

      if (!flash || !Array.isArray(flash)) {
        return res.status(400).json({
          success: false,
          error: 'Donnees de flash invalides'
        })
      }

      if (adminKey !== '03KinepolisdDiva23!') {
        return res.status(401).json({
          success: false,
          error: 'Cle d\'administration invalide'
        })
      }

      console.log('Flash recus (mode test):', flash)

      return res.status(200).json({
        success: true,
        message: 'Flash sauvegardes avec succes (mode test)',
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
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Methode non autorisee' })
  }

  try {
    const { flash, adminKey } = req.body

    if (!flash || !Array.isArray(flash)) {
      return res.status(400).json({
        success: false,
        error: 'Donnees de flash invalides'
      })
    }

    // Verifier la cle d'administration
    if (adminKey !== '03KinepolisdDiva23!') {
      return res.status(401).json({
        success: false,
        error: 'Cle d\'administration invalide'
      })
    }

    console.log('Tentative de connexion Supabase...')

    // Supprimer toutes les images flash existantes
    const { error: deleteError } = await supabase
      .from('flash_items')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    if (deleteError) {
      console.error('Erreur lors de la suppression:', deleteError)
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la suppression des anciennes images: ' + deleteError.message
      })
    }

    // Inserer les nouvelles images flash
    const { data, error: insertError } = await supabase
      .from('flash_items')
      .insert(flash.map((item) => ({
        src: item.src,
        caption: item.caption || ''
      })))
      .select()

    if (insertError) {
      console.error('Erreur lors de l\'insertion:', insertError)
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la sauvegarde des images: ' + insertError.message
      })
    }

    console.log('Flash sauvegardes avec succes dans Supabase:', data)

    return res.status(200).json({
      success: true,
      message: 'Flash sauvegardes avec succes',
      data: data
    })
  } catch (error) {
    console.error('Erreur serveur:', error)
    return res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur: ' + error.message
    })
  }
}
