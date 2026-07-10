# Platform of Papas

Static website for Platform of Papas.

## Local preview

Run `python3 -m http.server 8000`, then open `http://localhost:8000`.

## Rebuild pages

The generated HTML pages are maintained by `build-site.js`:

```sh
node build-site.js
```

## Deployment

The repository can be imported directly into Vercel as an `Other` framework. No build command or database is required; use the repository root as the output directory.
