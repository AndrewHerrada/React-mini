# Weather Finder

App de pronóstico del tiempo usando la API gratuita de [Open-Meteo](https://open-meteo.com/).

## Cómo correr el proyecto

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Tests
pnpm exec vitest run

# Build de producción
pnpm build
```

## Despliegue

```bash
pnpm add -g vercel
vercel login
vercel --prod
```
