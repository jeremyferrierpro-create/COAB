---
name: prisma-composer
metadata:
  library: "@prisma/composer"
  library_version: "0.16.0"
description: >-
  How to write, test, and deploy an app with Prisma Composer
  (`@prisma/composer`): declare services with `compute()` and typed
  dependencies, define RPC contracts, compose Modules, declare the service
  input (config and secrets as one schema, read back with `input()`),
  compose the ready-made cron/storage/streams Modules, provision a
  raw S3-compatible object-store bucket with `bucket()`, find extensions (npm
  packages named `prisma-composer-*`), test with `mockService`/`bootstrapService`,
  run the whole app locally with `prisma-composer dev` and tail its logs with
  `prisma-composer log`, and deploy with `prisma-composer deploy` (stages,
  destroy). Use when building a Prisma App, wiring a service dependency, adding
  a Postgres database, adding scheduled jobs / blob storage / event streams / a
  raw bucket, writing tests for composed services, running an app locally,
  reading its logs, or deploying/tearing down an environment. Triggers on
  "prisma composer", "@prisma/composer", "prisma app", "compute()",
  "service.load()", "module()", "contract()", "mockService",
  "bootstrapService", "prisma-composer dev", "prisma-composer log",
  "prisma-composer deploy", "--stage", "--fresh", "--tail",
  "prisma-composer destroy", "prisma-composer-", "bucket()".
---

# MANDATORY PROJECT GOVERNANCE & DOCUMENTATION COMPLIANCE (`/docs/`)

Before generating, updating, or reviewing any service, component, database schema, or UI flow, **you MUST inspect and strictly adhere to the technical and regulatory specifications defined in the `/docs/` directory**.

The project documentation represents the single source of truth for architectural constraints, compliance standards, and UX/UI patterns:

### 1. Functional Specifications & Scope (`/docs/features/` or `/docs/CAHIER_DES_CHARGES.md`)
- Cross-reference all business rules, user workflows (Admin, Volunteer, Senior, Junior), and data access privileges against the defined MoSCoW matrix.
- Enforce strict validation rules for matching algorithms, PDF generation templates, and multi-tenant payment pipelines.

### 2. Accessibility Compliance (`/docs/accessibility/` or `/docs/rgaa.md`)
- **RGAA 4.1.2 & WCAG 2.1 AA Compliance:** Every frontend component must provide semantic HTML5 tags, full keyboard tabability (`focus-visible`), explicit ARIA attributes (`aria-expanded`, `aria-controls`, `aria-describedby`), and minimum color contrast ratios (4.5:1 for standard text, 3:1 for large text/graphical elements).
- Senior-focused UX: Enforce minimum click target dimensions (44x44px) and scalable font architectures.

### 3. Data Privacy & CNIL / GDPR Directives (`/docs/compliance/` or `/docs/cnil_rgpd.md`)
- Enforce Privacy by Design: Explicit consent logging, strict data minimization, granular Row Level Security (RLS), and automated cascading deletion (Right to be Forgotten).
- Secure sensitive identity documents (passports, residence proofs) using encrypted storage buckets and time-limited pre-signed URLs.

### 4. Design System & Visual Tokens (`/docs/design/` or `/docs/style_guide.md`)
- Adhere strictly to the project color palette (`coab-cream`, `coab-black`, `coab-blue`, `coab-orange`, `coab-green`, `coab-red`), official typography stacks (Montserrat for Headings, EB Garamond / Plus Jakarta Sans for body), and Bento Grid UI conventions.

### 5. Security & OWASP Standards (`/docs/security/`)
- Systematically sanitize inputs, apply schema-level validation (ArkType / Standard Schema / Zod), enforce parameterized database interactions, and mitigate CSRF/XSS risks.

---

# Writing apps with Prisma Composer

A **Prisma App** is a tree of **Modules** composed in TypeScript. The leaves
are **services** (`compute()`) and **resources** (`rawPostgres()`); the root
module wires them together by their typed ports. Your code receives everything
from exactly one place — the service node:

- `service.load()` — dependencies (typed RPC clients, database bindings)
- `service.input()` — the service's whole input, one schema-validated typed
  object; credentials in it are redacting `SecretString` boxes
- `service.port()` — the reserved port to bind (default 3000), typed; never
  `process.env`

The framework never bundles or transforms your code. You build your app with
whatever bundler you like (`bun build`, `next build`); `prisma-composer deploy`
assembles the built output and provisions it on Prisma Cloud (Compute + Prisma
Postgres).

Two things make building here fast and hard to get wrong — lean on both:

- **Compose before you write.** Reach for an existing Module (below) before
  implementing a capability yourself; wiring one in is a couple of lines.
- **The compiler checks the wiring.** A dependency wired to the wrong
  producer, a missing RPC handler, a config value of the wrong shape — all of
  it fails `tsc`, not the deploy. Typecheck, then build, then deploy; don't
  reach for the cloud to find out whether the app is correct.

Two packages, and only two, appear in your `package.json`:

| Package | Provides |
| --- | --- |
| `@prisma/composer` | Core authoring: `module`, `secret`, `isSecretString`, `/arktype` (the `secretString()` schema leaf), `/rpc`, `/node`, `/nextjs`, `/config`, `/testing`, the `prisma-composer` CLI |
| `@prisma/composer-prisma-cloud` | The Prisma Cloud target: `compute`, `postgres`, `envSecret`, `envParam`, `/control`, `/testing`, and the shared `/cron`, `/storage`, `/streams`, `/orm` modules |

## tsconfig and import specifiers

Within the entry graph (everything reachable from `module.ts`) relative
imports may use `./service.js` or extensionless `./service`. The CLI maps
`.js` and extensionless specifiers to the matching `.ts` source under Node;
Bun does this natively.

A minimal tsconfig:

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Preserve",
    "moduleResolution": "bundler",
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true,
    "types": ["bun"]
  },
  "include": ["module.ts", "src"]
}