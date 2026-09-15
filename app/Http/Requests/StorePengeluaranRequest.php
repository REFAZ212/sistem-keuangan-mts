<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePengeluaranRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nomor_transaksi' => ['required', 'string', 'max:50', 'unique:pengeluaran,nomor_transaksi'],
            'tanggal' => ['required', 'date'],
            'account_id' => ['required', 'exists:accounts,id'],
            'kategori_id' => ['nullable', 'exists:kategori_keuangan,id'],
            'jumlah' => ['required', 'numeric', 'min:0'],
            'keterangan' => ['nullable', 'string'],
            'status' => ['sometimes', 'in:draft,disetujui'],
        ];
    }

    public function messages(): array
    {
        return [
            'nomor_transaksi.required' => 'Nomor transaksi wajib diisi',
            'nomor_transaksi.unique' => 'Nomor transaksi sudah digunakan',
            'tanggal.required' => 'Tanggal transaksi wajib diisi',
            'account_id.required' => 'Akun pengeluaran wajib dipilih',
            'account_id.exists' => 'Akun tidak valid',
            'jumlah.required' => 'Jumlah wajib diisi',
            'jumlah.min' => 'Jumlah tidak boleh negatif',
        ];
    }
}
