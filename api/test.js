// Endpoint de test simple
export default async function handler(req, res) {
  return res.status(200).json({ 
    success: true, 
    message: 'API fonctionne !',
    timestamp: new Date().toISOString()
  });
}
