// API endpoint pour récupérer les flash
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variables d\'environnement Supabase manquantes')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  try {
    const { data, error } = await supabase
      .from('flash_items')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur Supabase:', error)
      return res.status(500).json({ 
        success: false, 
        error: 'Erreur lors de la récupération des flash' 
      })
    }

    return res.status(200).json({ 
      success: true, 
      data: data || [] 
    })
  } catch (error) {
    console.error('Erreur serveur:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur interne du serveur' 
    })
  }
}