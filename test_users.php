<?php
$pdo = new PDO('mysql:host=127.0.0.1;dbname=sistem_keuangan_mts', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $pdo->query('SELECT * FROM users');
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo 'Users count: ' . count($users) . PHP_EOL;
foreach ($users as $u) {
    echo 'Email: ' . $u['email'] . ' Role ID: ' . $u['role_id'] . PHP_EOL;
}
echo PHP_EOL;
\$stmt2 = $pdo->query('SELECT * FROM roles');
$roles = $stmt2->fetchAll(PDO::FETCH_ASSOC);
echo 'Roles count: ' . count($roles) . PHP_EOL;
foreach ($roles as $r) {
    echo 'ID: ' . $r['id'] . ' Name: ' . $r['name'] . ' Label: ' . $r['label'] . PHP_EOL;
}