# Database Design

## users

* id
* name
* email
* password

## roles

* id
* name

## accounts

* id
* code
* name
* type

## incomes

* id
* transaction_no
* transaction_date
* account_id
* amount
* description

## expenses

* id
* transaction_no
* transaction_date
* account_id
* amount
* description

## cash_books

* id
* date
* debit
* credit
* balance

## audit_logs

* id
* user_id
* action
* old_value
* new_value
* created_at
