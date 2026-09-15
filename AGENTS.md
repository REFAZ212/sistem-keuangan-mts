# AGENTS.md - Sistem Informasi Keuangan MTs

## Project
- Laravel 13 + React 18 + Inertia 2 + Vite 8 + Tailwind 3
- PHP 8.3+, Node 18+, MySQL (Laragon local)
- Custom UI/UX design system with navy primary brand

## Key Commands
| Task | Command |
|------|---------|
| Full setup | `composer run setup` |
| Dev servers (PHP + Vite) | `composer run dev` |
| Frontend build | `npm run build` |
| Frontend dev | `npm run dev` |
| Run tests | `composer run test` |
| Lint (PHP) | `./vendor/bin/pint` |
| Typecheck | `npx tsc --noEmit` |

## Frontend
- Source: `resources/js/` (`.jsx` files)
- Entrypoint: `resources/js/app.jsx`
- Vite config: `vite.config.js` (laravel-vite-plugin + @vitejs/plugin-react)
- Design system: `resources/js/designSystem.js` — single source of truth for colors, spacing, radius, shadows
- Axios: in `dependencies`, configured in `bootstrap.js`
- **All UI components use design system tokens** (not hardcoded hex colors)
- Components: `PrimaryButton`, `SecondaryButton`, `DangerButton`, `OutlineButton`, `GhostButton`, `Card`, `Badge`, `Table`, `Select`, `TextInput`, `Textarea`
- Layouts: `AuthenticatedLayout` (navy sidebar + topbar), `GuestLayout`

## Backend
- Standard Laravel 13 structure
- Inertia server-side: `inertiajs/inertia-laravel`
- Auth: Laravel Sanctum + custom login flow
- Routes: `routes/web.php` (Inertia pages), `routes/auth.php`
- Ziggy for route helpers in JS
- Service Layer + Repository patterns (in `app/Services/`, `app/Repositories/`)
- API resources if used

## Database
- Migrations: `database/migrations/`
- Factories: `database/factories/`
- Seeders: `database/seeders/` (run via `DatabaseSeeder`)
- Tests use SQLite `:memory:` (see `phpunit.xml`)

## Environment
- `.env` for local, never commit
- `.env.example` is the template
- `APP_KEY` generated on setup

## Design System (Critical)
Color palette from `resources/js/designSystem.js`:
- **Navy**: `#0B1F3A` (900), `#071A33` (800), `#F5F7FA` (50), `#E4E7EC` (100)
- **Primary Blue**: `#1677FF` (500), `#136BFF` (600)
- **Success**: `#12B76A` — positive status only
- **Warning**: `#F79009` — warnings
- **Danger**: `#F04438` — errors, destructive actions
- **Background**: `#F5F7FA`
- **Surface**: `#FFFFFF`
- **Border**: `#E4E7EC`

All components import from `@/designSystem` and use design tokens, NOT hardcoded Tailwind classes like `bg-white`, `text-gray-700`, etc.

## UI Conventions
- Bahasa Indonesia throughout (not English)
- Sidebar kiri + Header topbar = consistent across all pages
- Breadcrumb: `Menu / Submenu / Page`
- Cards use `bg-white` / border-navy-200 / shadow-sm
- Tables: `divide-y divide-gray-200`, striped/hover rows
- Buttons: Primary (navy blue), Secondary (white with border), Danger (red), Outline (navy border)
- Status badges: draft (kuning), disetujui (hijau), pending (biru), ditolak (merah)
- Forms: TextInput with `rounded-md border px-3 py-2`, focus ring primary
- Dates: `type="date"` with `id="date_from"/"date_to"`

## Gotchas
- **Do not downgrade Vite below 8** (laravel-vite-plugin requires it)
- Keep `vite`, `laravel-vite-plugin`, `@vitejs/plugin-react` versions compatible
- `resources/js/bootstrap.js` must stay valid JS (imported by entrypoint)
- `composer run dev` runs `php artisan dev` which starts PHP server + Vite via concurrently
- **Do not hardcode hex colors** in components — use `designSystem.colors` tokens
- **Do not modify AuthenticatedLayout sidebar/header colors** without updating the design system
- Tailwind 3.x with `purge` disabled — relies on class scanning
- Laravel Pint enforces PSR-12 on backend
- Frontend currently `.jsx` (not TypeScript Strict Mode per CODING-STANDARDS.md)

## Business Rules (summary)
See `BUSINESS-RULES.md`:
- Penerimaan: no-transaction-duplicate, non-negative, dated
- Pengeluaran: cannot exceed cash balance, requires account
- Kas: Saldo = Total Penerimaan - Total Pengeluaran
- Laporan: no modifying approved historical data, period-based
- Users: must have role, inactive users cannot login

## Testing
- PHPUnit via `composer run test` (runs `php artisan test`)
- Test suites: `tests/Unit/`, `tests/Feature/`
- Test env: SQLite in-memory, array drivers for cache/mail/queue/session
- Run specific test: `php artisan test --filter=NameOfTest`

## Recent Changes (UI Design System)
- Updated `resources/js/designSystem.js` with navy-primary color system
- Updated all UI components to use design tokens (Badge, Card, Select, Buttons, Inputs)
- Updated `AuthenticatedLayout` with consistent navy/surface colors
- All pages now use consistent design language across the app