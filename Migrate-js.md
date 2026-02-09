# JS Migration

## Why
Convert TS/TSX to JS/JSX, remove TS tooling/config, keep runtime deps.

## Steps (commands + intent)
1. Discover TS files
   - `rg --files -g "*.ts" -g "*.tsx"`
   - confirms scope.
1. Inspect configs
   - `Get-Content package.json`
   - `Get-Content tsconfig.json`
   - `Get-Content next.config.ts`
   - learn TS tooling + build config.
1. Emit JS/JSX from TS/TSX (preserve JSX)
   - `./node_modules/.bin/tsc --project tsconfig.json --outDir .tmp-js --noEmit false --declaration false --declarationMap false --sourceMap false --pretty false --incremental false --jsx preserve`
   - uses TS to strip types, keep JSX, output to temp.
1. Remove original TS/TSX sources
   - `Get-ChildItem -Recurse -File src -Include *.ts,*.tsx | Remove-Item -Force`
   - prevents mixed TS/JS.
1. Copy emitted JS/JSX into `src`
   - `Copy-Item -Recurse -Force .tmp-js/src/* src/`
   - replaces with JS/JSX.
1. Replace Next config with JS version
   - `Copy-Item -Force .tmp-js/next.config.js next.config.js`
   - then adjust to CJS + `__dirname`.
1. Remove TS config files
   - `Remove-Item -Force tsconfig.json, next-env.d.ts`
   - no TS tooling left.
1. Remove TS-only helper file
   - `Remove-Item -Force src/components/editor/plate-types.js`
   - empty `export {}` leftover.
1. Remove duplicate `.js` where `.jsx` exists
   - `$jsx = Get-ChildItem -Recurse -File src -Filter *.jsx; foreach ($f in $jsx) { $js = [IO.Path]::ChangeExtension($f.FullName, '.js'); if (Test-Path $js) { Remove-Item -Force $js } }`
   - prefer `.jsx` for React files.
1. Cleanup temp output
   - `Remove-Item -Recurse -Force .tmp-js`
1. Prune TS deps + refresh lockfile
   - `yarn install`

## Manual Edits (non-command)
1. Add `jsconfig.json` for path aliases (JS only tooling).
1. Update `eslint.config.mjs` to drop TS parser + TS globs.
1. Update `lefthook.yml` to remove TS/TSX globs.
1. Update `package.json` to remove TS scripts + dev deps.
1. Update text in `src/app/page.jsx` from `page.tsx` to `page.jsx`.
1. Update `biome.jsonc` to remove `!next-env.d.ts` ignore.

## Exact Config Changes

### `next.config.ts` -> `next.config.js`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // TEMPLATE ONLY
  turbopack: { root: __dirname },
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  // TEMPLATE ONLY
  async redirects() {
    return [
      {
        destination: '/editor',
        permanent: false,
        source: '/',
      },
    ];
  },
};

module.exports = nextConfig;
```

### `jsconfig.json` (new)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### `eslint.config.mjs` (before/after)
```diff
-import tsParser from '@typescript-eslint/parser';
 import { defineConfig } from 'eslint/config';
 import reactHooks from 'eslint-plugin-react-hooks';
@@
   {
     ...reactHooks.configs.flat.recommended,
-    files: ['src/**/*.tsx', 'src/**/use*.ts'],
-    languageOptions: { parser: tsParser },
+    files: ['src/**/*.jsx', 'src/**/use*.js'],
   },
 ];
```

### `lefthook.yml` (before/after)
```diff
       glob:
         - '*.js'
         - '*.jsx'
-        - '*.ts'
-        - '*.tsx'
         - '*.json'
         - '*.jsonc'
         - '*.css'
```

### `package.json` (scripts + dev deps)
```diff
   "scripts": {
@@
-    "start": "next start",
-    "typecheck": "tsc --noEmit"
+    "start": "next start"
   },
   "devDependencies": {
-    "@types/node": "^24.10.1",
-    "@types/react": "19.2.7",
-    "@types/react-dom": "19.2.3",
-    "@typescript-eslint/parser": "^8.47.0",
@@
-    "typescript": "5.9.3",
     "ultracite": "6.3.6"
   }
```

### `biome.jsonc` (before/after)
```diff
-  "files": {
-    "includes": ["**", "!!node_modules", "!!build", "!!.next", "!next-env.d.ts"]
-  },
+  "files": {
+    "includes": ["**", "!!node_modules", "!!build", "!!.next"]
+  },
```

## Notes
- TS tooling removed. JS/JSX only.
