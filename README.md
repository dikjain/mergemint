<h1 align="center">mergemint</h1>

<p align="center">
  <em>Gamifying open-source contributions with on-chain rewards</em><br/>
  <a href="https://mergemint.appwrite.network">Live Demo</a> •
</p>

---

## ✨ Why mergemint?

Open-source is the backbone of modern software, yet newcomers often struggle to find beginner-friendly issues and tangible rewards for their effort. **mergemint** flips that script:

1. **Motivation-first** – every merged PR earns **MM points** that contributors can redeem for Solana SPL tokens.  
2. **Zero-friction for maintainers** – connect a GitHub repo via webhook and start rewarding contributors instantly.  
3. **On-chain credibility** – rewards are handled on the Solana blockchain, adding transparency and verifiable recognition.

Our goal is simple: **even the smallest contributor should feel valued and excited to keep contributing**.

---

## 🚀 Features

| Maintainers | Contributors |
|-------------|--------------|
| • One-click GitHub webhook setup  | • Automatic MM points for each merged PR |
| • Adjustable point-to-token ratio | • Personal dashboard to track earnings |
| • Public “Wall of Fame” page      | • Redeem points for SPL tokens in a few clicks |
| • Built-in analytics (PR count, active contributors) | • See leaderboards & community stats |

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| Front-end | **Next.js**, **Tailwind CSS** |
| Auth & Data | **Supabase** (Auth, Postgres) |
| Backend Functions | **Appwrite Cloud Functions** |
| Webhooks | **GitHub Webhooks** |
| Rewards | **Solana** (SPL tokens via @solana/web3.js) |
| Deployment | **Appwrite Sites** |

---

## 🖼 Architecture

```text
GitHub PR Event  ─┐
                  │ 1. Webhook → Appwrite Function
                  ▼
         +--------------------+
         |  Reward Engine     | 2. Validate & award MM points
         |  (TypeScript)      |
         +--------------------+
                  │ 3. Persist stats
                  ▼
         +--------------------+
         |  Supabase          |
         +--------------------+
                  │ 4. Client fetch
                  ▼
Next.js Frontend (mergemint.appwrite.network)
                  │ 5. Redeem → Solana Tx
                  ▼
         +--------------------+
         |  Treasury Wallet   |
         +--------------------+
```

---

## ⚙️ Quick Start

### 1. Prerequisites
- Node.js ≥ 18
- `pnpm` / `npm` / `yarn`
- Supabase & Appwrite accounts
- A Solana devnet wallet with test SOL

### 2. Clone & install

```bash
git clone https://github.com/dikjain/mergemint.git
cd mergemint
pnpm install
```

### 3. Configure environment

See [`ENV_SETUP.md`](./ENV_SETUP.md) for all required variables:

```bash
cp .env.local.example .env.local   # then fill in values
```

Key items:
- Supabase URL / keys  
- Solana RPC endpoint & SPL token mint  
- Treasury keypair JSON for payouts  

### 4. Run locally

```bash
pnpm dev
```

Visit `http://localhost:3000`.

### 5. Deploy

1. Push to GitHub.  
2. Connect the repo in **Appwrite Sites** → Automatic build & deploy.  
3. Add the same environment variables in Appwrite.  
4. Deploy the `reward-engine` Appwrite Function from `/api`.

> _Note: The live demo is deployed at **https://mergemint.appwrite.network**._

---

## 💸 Business Model & Sustainability

mergemint is currently in a **prototype** phase. To fund token redemptions at scale we will:

1. **Partner with open-source-friendly companies** that sponsor point pools.  
2. **Apply for Solana community grants** to bootstrap the treasury.  
3. Introduce premium analytics for organizations once traction grows.

---

## 🛠️ Local Development Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run Next.js in dev mode |
| `pnpm lint` | Lint all code with ESLint |
| `pnpm build` | Build production bundle |
| `pnpm supabase:start` | Start Supabase local (requires Docker) |

---

## 🤝 Contributing

We love PRs! To add a feature or fix a bug:

1. **Fork** the repo → create a branch.  
2. Commit descriptive messages.  
3. Open a PR against `main`.  
4. The webhook will automatically test & award MM points when merged.

Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## 📅 Roadmap

- [ ] Multi-repo organization dashboards  
- [ ] ERC-20 bridge for EVM compatibility  
- [ ] Optional fiat rewards via Stripe  
- [ ] Mobile-first UI polish  
- [ ] In-app notifications (WebSockets)

---

## 📜 License

This project is licensed under the **BSD-3-Clause** License – see the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  Built with ❤️ for Hacktoberfest&nbsp;2025
</div>
