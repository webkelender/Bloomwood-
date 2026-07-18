# Bloomwood — Cosmetics & Skincare Website

A 3-page static website: a homepage, a full product catalog with categories,
and an admin panel. Plain HTML/CSS/JS — no build step, no server required.

## Pages
- `index.html` — Homepage (hero, categories, bestsellers)
- `products.html` — Full catalog with category filters (Cosmetics, Skincare,
  Haircare, Beauty Products) and a "Show More Items" button
- `admin.html` — Admin panel (dashboard, products & inventory, orders,
  coupons, settings) — data is saved in your browser via `localStorage`

## How to put this on GitHub and view it live

1. **Create a repository**
   - Go to [github.com/new](https://github.com/new), name it (e.g. `bloomwood-site`), and create it.

2. **Upload these files**
   - On the repo page, click **Add file → Upload files**.
   - Drag in `index.html`, `products.html`, `admin.html`, the `assets/` folder, and this `README.md`.
   - Commit the changes.

   *(Or, from the command line:)*
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/bloomwood-site.git
   git push -u origin main
   ```

3. **Turn on GitHub Pages**
   - In your repo, go to **Settings → Pages**.
   - Under "Build and deployment", set **Source** to `Deploy from a branch`.
   - Set **Branch** to `main` and folder to `/ (root)`, then **Save**.

4. **Visit your site**
   - After a minute or two, GitHub will show a live URL, usually:
     `https://YOUR-USERNAME.github.io/bloomwood-site/`

## Notes
- The admin panel and cart use `localStorage`, so data is saved per-browser
  only — there's no real database or payment processor behind this yet.
- To make it a fully working store (real accounts, orders, payments), you'd
  need to connect it to a backend (e.g. Node/Express + a database, or a
  service like Firebase/Supabase).
