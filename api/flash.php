<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$dataFile = '../data/flash.json';
$uploadDir = '../upload/';

// Créer les dossiers s'ils n'existent pas
if (!file_exists('../data/')) {
    mkdir('../data/', 0755, true);
}
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Initialiser le fichier JSON s'il n'existe pas
if (!file_exists($dataFile)) {
    $defaultData = [
        ['id' => '1', 'src' => 'images/flash1.jpeg', 'caption' => 'Flash 1'],
        ['id' => '2', 'src' => 'images/flash2.jpeg', 'caption' => 'Flash 2'],
        ['id' => '3', 'src' => 'images/flash3.jpeg', 'caption' => 'Flash 3']
    ];
    file_put_contents($dataFile, json_encode($defaultData, JSON_PRETTY_PRINT));
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        // Lire les données
        if (file_exists($dataFile)) {
            $data = json_decode(file_get_contents($dataFile), true);
            echo json_encode($data);
        } else {
            echo json_encode([]);
        }
        break;
        
    case 'POST':
        // Ajouter un nouveau flash
        if (isset($input['src']) && isset($input['caption'])) {
            $data = json_decode(file_get_contents($dataFile), true);
            $newId = uniqid();
            $newFlash = [
                'id' => $newId,
                'src' => $input['src'],
                'caption' => $input['caption']
            ];
            $data[] = $newFlash;
            file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
            echo json_encode(['success' => true, 'id' => $newId]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Données manquantes']);
        }
        break;
        
    case 'PUT':
        // Modifier un flash
        if (isset($input['id']) && isset($input['src']) && isset($input['caption'])) {
            $data = json_decode(file_get_contents($dataFile), true);
            $found = false;
            foreach ($data as &$item) {
                if ($item['id'] === $input['id']) {
                    $item['src'] = $input['src'];
                    $item['caption'] = $input['caption'];
                    $found = true;
                    break;
                }
            }
            if ($found) {
                file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
                echo json_encode(['success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Flash non trouvé']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Données manquantes']);
        }
        break;
        
    case 'DELETE':
        // Supprimer un flash
        if (isset($input['id'])) {
            $data = json_decode(file_get_contents($dataFile), true);
            $data = array_filter($data, function($item) use ($input) {
                return $item['id'] !== $input['id'];
            });
            $data = array_values($data); // Réindexer
            file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
            echo json_encode(['success' => true]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'ID manquant']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
}
?>
