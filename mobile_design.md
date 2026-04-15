# Design System: The Digital Atelier
## Mobile-Only Premium Editorial Experience

### 1. Overview & Creative North Star
**Creative North Star: "The Digital Atelier"**
This design system moves away from the "app-like" conventions of rounded corners and floating bubbles, moving instead toward the tactile, architectural world of high-end tailoring and archival manuscripts. Inspired by the editorial restraint of Loro Piana and the quiet luxury of the Four Seasons, this system treats the mobile screen as a single, continuous sheet of premium paper.

The aesthetic is defined by **Archival Brutalism**: a high-contrast tension between the romantic, sweeping curves of serif typography and the rigid, uncompromising precision of 0px border-radii and structural hairline rules. We do not use shadows to create depth; we use tonal layering and structural lines to define space.

### 2. Colors & Tonal Architecture
The palette is rooted in organic, earth-derived tones that evoke heritage and permanence.

*   **The Foundation:** `background` (#F5F0E8) serves as our "paper." All editorial content lives here.
*   **The Signature Greens:** `primary` (#133a0b / Hunter Green) and `secondary` (#386a0e / Forest Green) are used to denote authority and action.
*   **The Structural Line:** The `outline_variant` (#C4B99A) is our most critical tool. Unlike standard UI, we use "Hairline Rules" (0.5px to 1px) to create a document-like grid.
*   **The Grounding Element:** The `inverse_surface` (#1C1C1A) is reserved for the Dark Footer and persistent navigation, providing a heavy "weighted" base to the light editorial scroll.

**The "Strict Tonal" Rule:**
Because shadows and gradients are prohibited, hierarchy is achieved through "Surface Nesting." 
*   Place a `surface_container_high` (#ece8e0) element inside a `surface` (#fef9f1) background to denote a featured section. 
*   Never use a border where a subtle shift in background tone can achieve the same separation.

### 3. Typography: The Editorial Voice
The system relies on the interplay between the "Humanist Serif" and the "Functional Sans."

*   **Display & Headlines (Playfair Display):** These are our "Voice" tokens. Use `display-lg` and `headline-md` for service names and quotes. The high contrast of Playfair Display demands generous leading (line-height) to breathe.
*   **Body & Utility (DM Sans):** Used for `body-md` and `label-sm`. DM Sans provides a neutral, modern counterpoint to the serif. 
*   **The "Numeral" Rule:** All price points, dates, and list numbers must use Playfair Display to maintain the bespoke, ledger-like feel.
*   **Text Hierarchy:** 
    *   `on_surface` (#1c1c1a) for primary reading.
    *   `on_surface_variant` (#5c5c52) for "Muted" metadata and secondary descriptions.

### 4. Elevation & Depth: Structural Layering
In a world without shadows, depth is a product of layout and line.

*   **The Layering Principle:** Use the Surface Scale (`surface_container_lowest` to `highest`) to stack information. A "Card" is not a box with a shadow; it is a rectangular block of `surface_container_low` sitting on a `background` field.
*   **Zero-Radius Precision:** Every element—buttons, inputs, images, and containers—must have a `0px` border-radius. This creates an uncompromising, architectural silhouette.
*   **The "Structural Rule":** Use the `divider` (#C4B99A) to separate sections. These should feel like the lines of a bespoke tailor's measurement book. Lines should often extend to the full width of the screen to emphasize the mobile-first "edge-to-edge" philosophy.

### 5. Components

#### Buttons
*   **Primary:** Solid `primary_container` (#2a5220) with `on_primary` (#ffffff) text. 0px radius. All caps `label-md` (DM Sans) with 1px letter spacing.
*   **Tertiary (Editorial Link):** `headline-sm` (Playfair Display) with a 1px underline in `outline`. No background.
*   **WhatsApp CTA:** High-visibility `on_tertiary_container` (#97C459) background. Reserved exclusively for direct communication actions.

#### Editorial Cards
*   **Style:** No borders, no shadows. 
*   **Layout:** A top-aligned `outline_variant` hairline, followed by a `display-sm` headline, then `body-md` text. 
*   **Spacing:** Use "Thumb-Optimized" padding (minimum 24px internal padding) to ensure the interface feels spacious and premium.

#### Navigation & Persistent Elements
*   **The Persistent Base:** A bottom-docked bar using `inverse_surface` (#1C1C1A). This grounds the experience.
*   **Inputs:** Bottom-border only using `outline`. Labels sit above in `label-sm` DM Sans. When focused, the border transitions to `primary`.

#### Lists
*   **Separation:** Do not use cards for lists. Use a vertical stack separated by `outline_variant` hairlines. 
*   **Numbers:** Use `headline-sm` Playfair Display for list indices (01, 02, 03) to create a "Manuscript" feel.

### 6. Do’s and Don’ts

**Do:**
*   **Do** use asymmetrical margins (e.g., 32px left, 16px right) for quote sections to break the "template" look.
*   **Do** use extreme vertical white space between sections (64px+) to convey luxury.
*   **Do** ensure all touch targets for buttons are at least 48px tall, even if the visual box is smaller.
*   **Do** use the `Dark Footer` (#1C1C1A) to create a definitive end to the editorial journey.

**Don’t:**
*   **Don’t** ever use a border-radius. Even a 1px radius breaks the "Bespoke Manuscript" aesthetic.
*   **Don’t** use shadows, glows, or blurs. If an element needs to stand out, change its background color or surround it with structural lines.
*   **Don’t** use standard "system" icons. Use thin-stroke, high-refined iconography that matches the `outline` weight.
*   **Don’t** crowd the screen. If you can fit four items on the screen at once, it is likely not "Editorial" enough—increase the typography size or spacing.