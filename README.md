# heatmap

This template should help get you started developing with Vue 3 in Vite.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Components

```mermaid
flowchart TB
 App --> Config & Grid & Loader & Stats
 App -.-> GridConfig

 subgraph config
  Config
 end

 subgraph grid
  Grid --> Cell
  Grid & Cell --> GridConfig
 end

 subgraph loader
 Loader --> loaders
  subgraph loaders
   DefaultLoader
   DeckLoader
  end
 end

 subgraph stats
  Stats
 end
```
