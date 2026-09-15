<?php

namespace App\Services;

use App\Models\Account;
use App\Repositories\AccountRepository;
use Illuminate\Database\Eloquent\Collection;

class AccountService
{
    public function __construct(protected AccountRepository $repository) {}

    public function all(): Collection
    {
        return $this->repository->all();
    }

    public function find(int $id): ?Account
    {
        return $this->repository->find($id);
    }

    public function create(array $data): Account
    {
        return $this->repository->create($data);
    }

    public function update(Account $account, array $data): Account
    {
        return $this->repository->update($account, $data);
    }

    public function delete(Account $account): bool
    {
        return $this->repository->delete($account);
    }

    public function getKasAccounts(): Collection
    {
        return $this->repository->getKasAccounts();
    }
}
