# D10 AI storefront redesign

A Hebrew, right-to-left React/Vite storefront for the D10 OBD2 adapter and app, with an interactive Three.js product experience.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No API key is needed.

```sh
npm run lint
npm run build
npm run preview
```

`dist/` is the production build. Pushes to `main` deploy automatically through the existing GitHub Pages workflow, using the retained d10.store custom-domain configuration.

## What changed

- Futuristic obsidian, mint and violet visual identity, with dark glass surfaces and responsive lighting.
- Real WebGL 3D device: drag or arrow keys to rotate, reset orientation, reveal the internal layers, pause motion, and run an explicitly labeled scan simulation.
- Procedural model with locally drawn textures; no external model/environment downloads. Its internal layout is an illustration, not manufacturer CAD.
- GPU rendering pauses offscreen, in background tabs, and for reduced-motion preferences. Pixel ratio is capped; a static fallback remains available if WebGL is unavailable.
- Interactive, clearly labeled example app screens for diagnostics, live readings, and maintenance, with pointer-responsive depth and animated signals.
- Vehicle and phone inquiry form that prepares a WhatsApp message for the visitor to send. It does not validate against a vehicle database or automatically send a message.
- One package selector and order summary; the selection persists during the session, including visits to the policies.
- Original signed HYP payment links, exact prices (299 / 717 / 800 ILS), support contacts, and policy content retained.
- Removed unsubstantiated testimonials, guaranteed savings, blanket compatibility, and the 30-day refund promises that contradicted the supplied return policy.
- Keyboard-friendly navigation and demo controls, mobile purchase access, visible focus, reduced-motion support, and optional accessibility settings.
- Marketing analytics initializes only after consent and only on d10.store/www.d10.store. Preferences can be reopened in the footer. Local development never loads the Meta pixel.
- Removed the initial 121-frame (~6.9 MB) animation load. The optional fallback JPEG is about 287 KB; the 3D renderer is loaded in a separate chunk. Unused reference frames live under design/source-assets rather than being deployed.

## Key files

- `src/components/TechHero.tsx` and `DeviceScene.tsx`: 3D product scene, internal reveal, scan simulation and controls.
- `src/components/ProductStory.tsx`: illustrative app experience and setup.
- `src/components/PurchaseSections.tsx`: compatibility inquiry, package selection, FAQ.
- `src/components/SiteChrome.tsx`: navigation, footer, privacy and accessibility controls.
- `src/components/LegalPages.tsx`: supplied policies with updated presentation and descriptions of implemented accessibility/privacy controls.
- `src/utils.ts`: preserved signed checkout URLs and consent-gated analytics.
- `src/index.css`, `src/device-scene.css`, `src/purchase.css`, `src/chrome.css`: responsive design.
- `public/images/d10-hero.jpg`: WebGL fallback and retained social image.

## Business information still needing owner confirmation

The original files do not include app-store URLs, supported phone OS versions, a verified vehicle compatibility database, or evidence supporting customer testimonials. These have not been invented. The demo is illustrative and should be aligned with real app screenshots before a public launch. Shipping, one-time app access and warranty statements are carried forward from the supplied offer; no live payment transaction was made.

## Fallback image provenance

Used the built-in image generation tool, with `public/smart-diagnostic.jpg` as the product reference. Selected output: `design/d10-hero-source.png`; web version: `public/images/d10-hero.jpg`.

Final prompt:

> Use case: product-mockup. Asset type: premium automotive diagnostic product website hero photograph, landscape 3:2. Reference image: preserve the exact black D10 AI OBD diagnostic adapter product shape, 16 pin connector, and white D10 AI logo as in the reference, but remove the large background headline. Create an exceptional editorial studio product photograph: the adapter is big, sharp and tactile, resting on a low circular dark graphite brushed metal platform, rotated at the same three-quarter angle with the connector visible, occupying the middle-left 60% of frame. Behind it in the upper background a very subtle out-of-focus silhouette of a modern graphite car (no badge) in a dark architectural garage. Soft warm white key light strongly defines the adapter; very subtle warm orange edge lighting on the platform. Rich charcoal black background #17191b, soft smoke gray falloff, luxurious controlled contrast. Entire product fully inside frame with generous surrounding room, no cropped edges. Photoreal precision product photography, not sci-fi, no circuits, no floating UI, no additional text, no headlines, no watermark. The primary focus is the physical D10 adapter, as a crafted premium object. This image goes in left half of a website, so prioritize clear product at center.

## Verification completed

- TypeScript check and Vite production build passed. The 3D component is dynamically loaded separately from the purchase interface.
- Browser layouts checked at desktop, 390 and 320 pixels; no horizontal overflow at the narrowest size.
- All three package totals and signed destinations checked; policy round-trip preserves the package choice.
- The live single-device HYP page displayed D10 and 299.00 ILS. No customer information was entered and no payment was submitted.
- Compatibility required-field validation, prepared message contents, focus transfer and stale-result clearing checked.
- Demo tab switching and arrow-key navigation, FAQ expansion, menu Escape/focus return, skip navigation on legal pages, enlarged text and consent-control spacing checked.
- Consent logic passed 73 isolated assertions across eight scenarios without loading real tracking code.
- Final local browser console contained no errors.

### Interactive 3D revision

Verified WebGL readiness, internal-layer toggle, scan progress/completion, keyboard rotation and reset. The revised page fits 320px screens without overflowing controls; checkout still uses the correct selected package amount. TypeScript and production build pass.
