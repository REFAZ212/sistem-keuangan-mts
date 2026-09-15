<?php
require 'vendor/autoload.php';

use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Role;

echo "=== Users ===\n";
$user = User::where('email', 'admin@example.com')->first();
if ($user) {
    echo "ID: " . $user->id . "\n";
    echo "Name: " . $user->name . "\n";
    echo "Email: " . $user->email . "\n";
    echo "Password hash starts: " . substr($user->password, 0, 20) . "\n";
    echo "is_active: " . ($user->is_active ? 'yes' : 'no') . "\n";
    echo "Role: ";
    $role = $user->role;
    if ($role) {
        echo $role->name . " (" . $role->label . ")";
    } else {
        echo "null";
    }
    echo "\n";
} else {
    echo "User not found!\n";
}

echo "\n=== Roles ===\n";
$roles = Role::all();
foreach ($roles as $role) {
    echo "ID: " . $role->id . " Name: " . $role->name . " Label: " . $role->label . "\n";
}

echo "\n=== User-Count ===\n";
echo "Total users: " . User::count() . "\n";
?>