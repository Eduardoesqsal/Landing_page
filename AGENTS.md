# Nails Saris - Landing Page

## Stack
- React 19 + Vite 8
- Tailwind CSS v4
- Lucide React (iconos)
- Oxlint (linter)
- TypeScript
- Jest + React Testing Library

## Comandos
- `npm run dev` - Desarrollo
- `npm run build` - Build producción
- `npm run lint` - Linter
- `npm run typecheck` - TypeScript typecheck
- `npm run test` - Tests unitarios
- `npm run preview` - Vista previa del build

## Estructura
```
src/
  components/     # Componentes React (.tsx)
    Navbar.tsx
    Hero.tsx
    Services.tsx
    Pricing.tsx
    Gallery.tsx
    About.tsx
    Testimonials.tsx
    Contact.tsx
    Footer.tsx
    FloatingWhatsApp.tsx
    BackToTop.tsx
    ScrollProgress.tsx
  App.tsx         # Componente raíz
  main.tsx        # Entry point
  index.css       # Estilos globales + Tailwind
  vite-env.d.ts   # Tipos de Vite
  __tests__/      # Tests unitarios
    App.test.tsx
  __mocks__/      # Mocks para Jest
    styleMock.js
public/
  images/         # Fotos reales de clientas (1.jpg a 15.jpg)
  favicon.svg
  icons.svg
jest.config.mjs   # Configuración de Jest
jest.setup.cjs    # Setup de Jest (mocks globales)
babel.config.json # Configuración de Babel
tsconfig.json     # Configuración de TypeScript (src)
tsconfig.node.json # Configuración de TypeScript (vite.config.ts)
vite.config.ts    # Configuración de Vite
```

## Convenciones
- **TypeScript** - Todo en .tsx/.ts
- **Tailwind CSS** - Sin CSS modules, todo con clases utilitarias
- **Animaciones** - Usar las utilidades `section-hidden` / `section-visible` de `index.css` para scroll reveal
- **Iconos** - Siempre de Lucide React, importar el nombre exacto del icono
- **Colores** - Usar variables del theme de Tailwind: `primary`, `secondary`, `accent`, `gold`, `dark`, `rose-light`
- **Responsive** - Usar breakpoints `sm:`, `md:`, `lg:`, `xl:`
- **Imágenes** - Las de clientas van en `public/images/` y se sirven como `/images/nombre.jpg`
- **WhatsApp** - Número: +52 1 563 624 1895, enlace: `https://wa.me/5215636241895`

## Secciones (en orden)
1. Navbar - Navegación fija con active section highlight
2. Hero - Portada con imagen, CTA, contadores animados
3. Services - Tarjetas de servicios con iconos
4. Pricing - Tarjetas de precios
5. Gallery - Galería con filtros y lightbox
6. About - Información del negocio
7. Testimonials - Carrusel de opiniones con formulario
8. Contact - Información de contacto + CTA WhatsApp
9. Footer - Enlaces, redes, copyright

## Reglas
- Sin comentarios en código
- No crear archivos .md a menos que se solicite explícitamente
- Seguir patrones existentes en componentes similares
- Usar `pnpm` en lugar de `npm`

## CI/CD (GitHub Actions)

El workflow `.github/workflows/ci.yml` ejecuta en cada `push` y `pull_request` a `main`:

| Paso | Comando |
|---|---|
| Install | `pnpm install --frozen-lockfile` |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` |
| Tests | `pnpm test` |
| Build | `pnpm build` |
| Deploy | GitHub Pages (solo en push a `main`) |

### GitHub Pages

El build se despliega automáticamente a GitHub Pages. El `base` en `vite.config.ts` está configurado como `/Landing_page/` para que coincida con el nombre del repo.

Requisitos para activar Pages:
1. Ir a Settings > Pages del repo
2. Source: **GitHub Actions**

## Repositorio

```
git remote add origin https://github.com/Eduardoesqsal/Landing_page.git
git branch -M main
git push -u origin main
```

## Notas

- La versión de pnpm se fija en `package.json` con el campo `packageManager` (actualmente `pnpm@10.34.4`). El workflow `pnpm/action-setup@v4` lo detecta automáticamente.
- `actions/download-pages-artifact` **no existe** (404). El deploy job usa solo `actions/deploy-pages@v4`, que maneja la descarga del artifact internamente.
- `actions/upload-pages-artifact@v3` sube el build a un artifact que `deploy-pages` consume automáticamente.
- El deploy a GitHub Pages falla con 404 si Pages no está activado. Solución: ir a Settings > Pages del repo, seleccionar Source: **GitHub Actions** y guardar.