# SEO and responsive layout

## Product constraints

The desktop calculator should keep configuration, distance, and results on one screen at supported viewport sizes. Preserve the existing fonts, colours, rocket illustration, and quick click / right-click workflow. Help opens only when requested; it does not add a step to normal calculations.

At widths below 1100px, the provisional layout stacks existing regions. Vertical scrolling to results is expected. Modules have explicit remove buttons, and distance and oxidizer choices are keyboard-accessible buttons. A full mobile experience is a separate task ([#1](https://github.com/utagestudio/oni_rocket_calc/issues/1)); the provisional implementation belongs to [#45](https://github.com/utagestudio/oni_rocket_calc/issues/45).

Supported desktop verification sizes are 1280×720, 1366×768, and 1920×1080 CSS pixels at 100% zoom. Smaller windows and enlarged text may require scrolling. Long rocket configurations scroll inside the illustration / list region instead of increasing the desktop page height.

## Search content and metadata

- `src/components/CalculatorHelp.tsx` contains the introduction, usage, calculation assumptions, limits, references, and maintenance links. It is rendered in the initial HTML inside a native dialog and available to users through Help. Do not fetch this text only after opening the dialog or create crawler-only text.
- `src/lib/seo.ts` shares the public URL, title, description, and factual WebApplication JSON-LD. `src/app/layout.tsx` defines canonical, Open Graph, and Twitter metadata.
- `src/app/robots.ts` allows crawling and points to the sitemap. `src/app/sitemap.ts` lists the single canonical page. Do not fabricate a last-modified date from the build time.
- The page uses English with `lang="en"`. Japanese localisation remains a separate optional task ([#16](https://github.com/utagestudio/oni_rocket_calc/issues/16)); do not add hreflang without translated pages and self-canonical URLs.

The WebApplication JSON-LD describes the tool; it is not an application rich-result claim. The tool has no published rating or review, and these must not be invented to satisfy Google's [SoftwareApplication rich-result requirements](https://developers.google.com/search/docs/appearance/structured-data/software-app). Google requires a real rating or review for that appearance. Schema validity and rich-result eligibility are separate checks.

The help documents the current implementation, including whole-kilogram search bounds, fuel / oxidizer assumptions, and the exclusion of cargo contents. It does not certify a particular game build. If the model changes, update the help, calculation tests, and README together.

## Verification before merging

Use Node.js 24.14.1 from `.mise.toml`:

```bash
mise exec -- npx tsc --noEmit
mise exec -- npm test
mise exec -- npm run build
```

Inspect the production HTML for one main h1, title, description, canonical, JSON-LD, help text, and image dimensions. Check `/robots.txt` and `/sitemap.xml` return 200, unknown URLs return 404, and query parameters keep the canonical URL.

Check desktop sizes above and narrow widths 360, 390, 768, and 1024px, plus 844×390 landscape. Verify capsule / engine selection, module add / remove, distance / oxidizer changes, reachable and unreachable results, slots and reset, and Help opening / closing with focus returned. Confirm no horizontal overflow at narrow sizes. Test Help with Escape, keyboard navigation, and a touch pointer. Existing cookie consent should continue to work independently.

## After production deployment

1. Retrieve the actual public HTML, robots, sitemap, OGP image, and representative CSS / JS. Verify Cloudflare does not replace the intended robots directives and that the sitemap remains accessible.
2. In Search Console, inspect the indexed URL, Google-selected canonical, and rendered content. The owner has already confirmed indexing; do not treat the site as unindexed.
3. Submit `https://rocket-calc.utage.games/sitemap.xml` in Search Console and inspect its processing result.
4. Validate JSON-LD with a Schema.org validator. A Google rich-results test may report missing application rating / review; this is expected for the current factual markup and must not be “fixed” with fabricated data.
5. Measure PageSpeed Insights on mobile and desktop, and inspect CrUX if available. A build's First Load JS or a local browser's timing is not a Core Web Vitals field measurement.
6. Compare Search Console query-level clicks, impressions, CTR, and position across recorded periods. Allow time for recrawling and account for changes in game-related demand. Do not infer ranking causality from a single comparison.

The local SEO audit and browser evidence live in ignored `_local/`. Keep unresolved public verification and measurement work in [#44](https://github.com/utagestudio/oni_rocket_calc/issues/44) and the parent [#36](https://github.com/utagestudio/oni_rocket_calc/issues/36) until completed.
