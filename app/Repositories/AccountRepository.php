<?php

namespace App\Repositories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Collection;

class AccountRepository
{
    public function all(): Collection
    {
        return Account::where('is_active', true)->get();
    }

    public function find(int $id): ?Account
    {
        return Account::find($id);
    }

    public function create(array $data): Account
    {
        return Account::create($data);
    }

    public function update(Account $account, array $data): Account
    {
        $account->update($data);

        return $account->fresh();
    }

    public function delete(Account $account): bool
    {
        return $account->delete();
    }

    public function getKasAccounts(): Collection
    {
        return Account::where('is_active', true)
            ->where('tipe', 'kas')
            ->get();
    }
}
