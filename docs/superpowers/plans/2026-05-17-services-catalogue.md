# Services Catalogue Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the /services page as a full visual catalogue matching the JM Publicidad product catalogue, with 4 category sections (Exterior, Digital, Souvenirs, Print), real client photos, and complete i18n.

**Architecture:** Replace `ServicesBento.tsx` with four focused category section components under `src/components/services/`. Three shared primitives (CategoryHeader, SubSectionLabel, ProductCard) keep each section under 150 lines. All strings via react-i18next.

**Tech Stack:** React 18, TypeScript strict, Tailwind CSS v3, react-i18next, React Router v6

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `src/components/services/CategoryHeader.tsx` | Green full-width section header bar |
| Create | `src/components/services/SubSectionLabel.tsx` | Olive uppercase divider between sub-groups |
| Create | `src/components/services/ProductCard.tsx` | Product card: name + bullet specs + optional photo |
| Create | `src/components/services/ExteriorSection.tsx` | Rótulos + Displays + Brandeo Vehicular |
| Create | `src/components/services/DigitalSection.tsx` | Pantallas + Tótems + Video Wall |
| Create | `src/components/services/SouvenirsSection.tsx` | All 5 merch sub-groups |
| Create | `src/components/services/PrintSection.tsx` | Papelería + Impresos |
| Modify | `src/pages/ServicesPage.tsx` | Import new sections, remove ServicesBento |
| Modify | `src/i18n/en.json` | All catalogue product strings in English |
| Modify | `src/i18n/es.json` | All catalogue product strings in Spanish |
| Copy | `src/assets/media/exterior/` | Client pop-up and roll-up photos |
| Delete | `src/components/sections/ServicesBento.tsx` | Replaced |

---

### Task 1: Copy client photos into media library

**Files:**
- Create: `src/assets/media/exterior/` (photos)

- [ ] Copy selected Pop-up photos:
```
src/assets/media/exterior/popup-suzuki.jpg       ← IMG_20241212_152336.jpg
src/assets/media/exterior/popup-boehringer.jpg   ← IMG_20241218_171335.jpg
src/assets/media/exterior/popup-conectados.jpg   ← IMG_20250210_174319.jpg (already in cta, reuse ok)
src/assets/media/exterior/rollup-militar.jpg     ← JM Publicidad Role ups/IMG_20250507_132326.jpg
src/assets/media/exterior/rollup-obi.jpg         ← JM Publicidad Role ups/IMG_20250731_125952.jpg
src/assets/media/catalogue/vehicular.png         ← catalogue_pages-04.png
```

- [ ] Commit:
```
git add src/assets/media/
git commit -m "chore: add exterior and vehicular photos to media library"
```

---

### Task 2: Expand i18n — en.json and es.json

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/es.json`

- [ ] Add all catalogue keys to `en.json` under `services_page` (replace existing section keys entirely):

The full `services_page` block for en.json:
```json
"services_page": {
  "label": "What we do",
  "title": "Advertising you can see, touch and remember",
  "description": "From illuminated signs to digital screens and corporate merchandise, we offer complete advertising production in Quito, Ecuador.",
  "cta_quote": "Request a Quote",
  "cta_enquire": "Enquire",

  "exterior": {
    "title": "Outdoor Advertising",
    "subtitle": "Signs, displays and vehicle branding",
    "rotulos_label": "Signs",
    "clasicos_title": "Classic Signs",
    "clasicos_spec_1": "Design included",
    "clasicos_spec_2": "Print at 2400 ppi",
    "clasicos_spec_3": "Metal frame structure",
    "luminosos_title": "Illuminated Signs",
    "luminosos_spec_1": "Design included",
    "luminosos_spec_2": "Print at 2400 ppi",
    "luminosos_spec_3": "9W LED lighting",
    "letras3d_title": "3D Letters",
    "letras3d_spec_1": "Design included",
    "letras3d_spec_2": "Metal material, from 100 ppi",
    "letras3d_spec_3": "9W LED lighting",
    "terminados_label": "Finishes available",
    "terminado_1": "Gloss or Matte",
    "terminado_2": "Eyelets",
    "terminado_3": "Adhesive Vinyl",
    "displays_label": "Displays & Point of Sale",
    "rollups_title": "Roll Ups",
    "rollups_spec_1": "Design included",
    "rollups_spec_2": "Print at 2400 ppi",
    "rollups_spec_3": "Roll Up / Spider frame",
    "vinil_title": "Adhesive Vinyl",
    "vinil_spec_1": "Design included",
    "vinil_spec_2": "2400 ppi Full Colour",
    "microperforado_title": "Microperforated",
    "microperforado_spec_1": "Design included",
    "microperforado_spec_2": "Print at 2400 ppi",
    "triangulos_title": "Display Triangles",
    "triangulos_spec_1": "Design included",
    "triangulos_spec_2": "Print at 2400 ppi",
    "triangulos_spec_3": "Metal structure",
    "exibidores_title": "Exhibitors",
    "exibidores_spec_1": "Design included",
    "exibidores_spec_2": "Adhesive vinyl",
    "exibidores_spec_3": "Print at 2400 ppi",
    "stands_title": "Stands",
    "stands_spec_1": "Design included",
    "stands_spec_2": "Print at 2400 ppi",
    "stands_spec_3": "Full Colour",
    "vehicular_label": "Vehicle Branding",
    "vehicular_description": "Complete vehicle branding for cars, trucks, trailers and any surface. Design, print and installation included.",
    "vehicular_spec_1": "Cars, trucks and trailers",
    "vehicular_spec_2": "Design, print and installation included",
    "vehicular_spec_3": "High-durability adhesive vinyl",
    "vehicular_spec_4": "Full Colour, any surface"
  },

  "digital": {
    "title": "Digital Advertising",
    "subtitle": "Screens, totems and video solutions",
    "screens_label": "Digital Screens",
    "vallas_digitales_title": "Digital Billboards",
    "pantallas_digitales_title": "Digital Screens",
    "vallas_led_title": "LED Billboards",
    "counter_cap_title": "Counter Cap Touch",
    "totems_label": "Totems",
    "totem_led_title": "LED Totem",
    "totem_doble_title": "Double-Sided Totem",
    "totem_cap_touch_title": "Horizontal Cap Touch Totem",
    "totem_outdoor_title": "Outdoor Totem",
    "video_label": "Video Wall & Hanging Screens",
    "video_wall_title": "Video Wall",
    "video_wall_spec": "Sale and Rental",
    "colgante_title": "Hanging Screen",
    "colgante_spec": "1 or 2 Sides",
    "menu_board_title": "Digital Menu Boards",
    "poster_led_title": "LED Poster",
    "cap_touch_signage_title": "Cap Touch Signage",
    "translucida_title": "Translucent Hanging Screen"
  },

  "souvenirs": {
    "title": "Promotional Merchandise",
    "subtitle": "Corporate gifts and branded items",
    "escritura_label": "Stationery & Office",
    "esferos_title": "Promotional Pens",
    "esferos_spec_1": "1-colour or Full Colour design",
    "esferos_spec_2": "1-colour or Full Colour print",
    "vasos_title": "Promotional Cups",
    "vasos_spec_1": "Design included",
    "vasos_spec_2": "Sublimation print, Full Colour",
    "servilletas_title": "Serviettes / Tablecloths",
    "servilletas_spec_1": "Design included",
    "servilletas_spec_2": "Screen printing",
    "packaging_title": "Branded Packaging",
    "packaging_spec_1": "Design included",
    "packaging_spec_2": "Full Colour print",
    "habladores_title": "Shelf Talkers",
    "habladores_spec_1": "Design included",
    "habladores_spec_2": "Adhesive print, Full Colour",
    "stickers_title": "Promotional Stickers",
    "stickers_spec_1": "Design included",
    "stickers_spec_2": "Full Colour print",
    "stickers_spec_3": "Die-cut",
    "indumentaria_label": "Clothing & Accessories",
    "uniformes_title": "Corporate Uniforms",
    "uniformes_spec_1": "Design included",
    "uniformes_spec_2": "Sublimation (finished zone)",
    "uniformes_spec_3": "Full Colour",
    "deportivos_title": "Sports Kits",
    "deportivos_spec_1": "Design included",
    "deportivos_spec_2": "Sublimation (finished zone)",
    "deportivos_spec_3": "Full Colour",
    "flash_title": "Branded USB Drives",
    "flash_spec_1": "Design included",
    "flash_spec_2": "Sublimation (finished zone)",
    "flash_spec_3": "Full Colour",
    "agendas_title": "Corporate Diaries",
    "agendas_spec_1": "Design included",
    "agendas_spec_2": "Sublimation print",
    "agendas_spec_3": "Full Colour",
    "carnets_title": "Corporate ID Cards",
    "carnets_spec_1": "Design included",
    "carnets_spec_2": "Sublimation print",
    "carnets_spec_3": "Full Colour",
    "accesorios_label": "Accessories",
    "gorras_title": "Branded Caps",
    "gorras_spec_1": "Design included",
    "gorras_spec_2": "Full Colour",
    "tomatodos_title": "Water Bottles & Thermos",
    "tomatodos_spec_1": "Design included",
    "tomatodos_spec_2": "Full Colour",
    "jarros_title": "Mugs",
    "jarros_spec_1": "Design included",
    "jarros_spec_2": "Full Colour",
    "pulseras_title": "Wristbands",
    "pulseras_spec_1": "Design included",
    "pulseras_spec_2": "Full Colour",
    "mousepad_title": "Mouse Pads",
    "mousepad_spec_1": "Design included",
    "mousepad_spec_2": "Full Colour",
    "bolsos_title": "Branded Bags",
    "bolsos_spec_1": "Design included",
    "bolsos_spec_2": "Full Colour",
    "eventos_label": "Events & Outdoor",
    "carpas_title": "Branded Tents",
    "carpas_spec_1": "Design included",
    "carpas_spec_2": "Sublimation, Full Colour",
    "banderas_title": "Sublimated Flags",
    "banderas_spec_1": "Design included",
    "banderas_spec_2": "Sublimation, Full Colour"
  },

  "print": {
    "title": "Printed Media",
    "subtitle": "Corporate stationery and precision print",
    "papeleria_label": "Basic Stationery",
    "tarjetas_title": "Business Cards",
    "tarjetas_spec_1": "Design included",
    "tarjetas_spec_2": "Front and back print",
    "tarjetas_spec_3": "UV Varnish finish",
    "hojas_title": "Letterheads",
    "hojas_spec_1": "Design included",
    "hojas_spec_2": "Full Colour print",
    "sobres_title": "Envelopes",
    "sobres_spec_1": "Design included",
    "sobres_spec_2": "Full Colour print",
    "carpetas_title": "Folders",
    "carpetas_spec_1": "Design included",
    "carpetas_spec_2": "Full Colour print",
    "impresos_label": "Print Collateral",
    "flayers_title": "Flyers A4, A5, A6",
    "flayers_spec_1": "Design included",
    "flayers_spec_2": "90g Bond Paper",
    "flayers_spec_3": "Front and back print",
    "flayers_spec_4": "UV Varnish finish",
    "folletos_title": "Classic Brochures",
    "folletos_spec_1": "Design and layout included",
    "folletos_spec_2": "Front and back print",
    "folletos_spec_3": "UV Varnish on covers",
    "dipticos_title": "Bifold Brochures",
    "dipticos_spec_1": "Design included",
    "dipticos_spec_2": "Front and back print",
    "dipticos_spec_3": "Matte finish",
    "tripticos_title": "Trifold Brochures",
    "tripticos_spec_1": "Design included",
    "tripticos_spec_2": "Front and back print",
    "tripticos_spec_3": "Matte finish"
  },

  "faq": { "existing": "keys preserved as-is" },
  "specs": { "existing": "keys preserved as-is" }
}
```

- [ ] Add equivalent Spanish keys to `es.json` (same structure, translated values — see task body)

- [ ] Commit:
```
git add src/i18n/
git commit -m "feat: expand i18n with full catalogue product strings"
```

---

### Task 3: Build shared primitives

**Files:**
- Create: `src/components/services/CategoryHeader.tsx`
- Create: `src/components/services/SubSectionLabel.tsx`
- Create: `src/components/services/ProductCard.tsx`

- [ ] Write `CategoryHeader.tsx`:
```tsx
interface CategoryHeaderProps {
  title: string;
  subtitle: string;
  tag: string;
}
export function CategoryHeader({ title, subtitle, tag }: CategoryHeaderProps) {
  return (
    <div className="bg-jm-primary px-6 py-10 md:py-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        <span className="font-inter font-semibold text-white/60 text-[10px] tracking-[0.2em] uppercase">
          {tag}
        </span>
        <h2 className="font-manrope font-extrabold text-white text-[28px] md:text-[36px] leading-tight tracking-[-0.03em]">
          {title}
        </h2>
        <p className="font-inter text-white/80 text-sm leading-6">{subtitle}</p>
      </div>
    </div>
  );
}
```

- [ ] Write `SubSectionLabel.tsx`:
```tsx
interface SubSectionLabelProps { label: string; }
export function SubSectionLabel({ label }: SubSectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-5 bg-jm-primary rounded-full shrink-0" />
      <span className="font-inter font-semibold text-jm-primary text-[11px] tracking-[0.18em] uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-jm-primary/15" />
    </div>
  );
}
```

- [ ] Write `ProductCard.tsx`:
```tsx
interface ProductCardProps {
  title: string;
  specs: string[];
  dark?: boolean;
}
export function ProductCard({ title, specs, dark = false }: ProductCardProps) {
  const bg = dark ? 'bg-jm-primary' : 'bg-jm-bg-card';
  const titleColor = dark ? 'text-white' : 'text-jm-heading';
  const specColor = dark ? 'text-white/80' : 'text-jm-body';
  const dotColor = dark ? 'bg-white/50' : 'bg-jm-primary';

  return (
    <div className={`${bg} rounded-xl p-5 flex flex-col gap-3`}>
      <h4 className={`font-manrope font-bold ${titleColor} text-base leading-snug`}>
        {title}
      </h4>
      <ul className="flex flex-col gap-1.5">
        {specs.map((spec) => (
          <li key={spec} className="flex items-start gap-2">
            <span className={`${dotColor} w-1.5 h-1.5 rounded-full mt-1.5 shrink-0`} />
            <span className={`font-inter text-xs ${specColor} leading-5`}>{spec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] Commit:
```
git add src/components/services/
git commit -m "feat: shared catalogue primitives — CategoryHeader, SubSectionLabel, ProductCard"
```

---

### Task 4: Build ExteriorSection

**Files:**
- Create: `src/components/services/ExteriorSection.tsx`

- [ ] Write the component (full code):
```tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { SubSectionLabel } from './SubSectionLabel';
import { ProductCard } from './ProductCard';
import popupSuzuki from '../../assets/media/exterior/popup-suzuki.jpg';
import rollupObi from '../../assets/media/exterior/rollup-obi.jpg';
import vehicularImg from '../../assets/media/catalogue/vehicular.png';

export function ExteriorSection() {
  const { t } = useTranslation();
  const e = (k: string) => t(`services_page.exterior.${k}`);

  return (
    <section className="pb-16 bg-jm-bg">
      <CategoryHeader
        tag={t('services_page.label')}
        title={e('title')}
        subtitle={e('subtitle')}
      />

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-10">

        {/* Rótulos */}
        <div>
          <SubSectionLabel label={e('rotulos_label')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ProductCard title={e('clasicos_title')} specs={[e('clasicos_spec_1'), e('clasicos_spec_2'), e('clasicos_spec_3')]} />
            <ProductCard title={e('luminosos_title')} specs={[e('luminosos_spec_1'), e('luminosos_spec_2'), e('luminosos_spec_3')]} />
            <ProductCard title={e('letras3d_title')} specs={[e('letras3d_spec_1'), e('letras3d_spec_2'), e('letras3d_spec_3')]} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[e('terminado_1'), e('terminado_2'), e('terminado_3')].map((t) => (
              <span key={t} className="bg-jm-primary/10 text-jm-primary font-inter text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Displays */}
        <div>
          <SubSectionLabel label={e('displays_label')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <ProductCard title={e('rollups_title')} specs={[e('rollups_spec_1'), e('rollups_spec_2'), e('rollups_spec_3')]} />
            <ProductCard title={e('vinil_title')} specs={[e('vinil_spec_1'), e('vinil_spec_2')]} />
            <ProductCard title={e('microperforado_title')} specs={[e('microperforado_spec_1'), e('microperforado_spec_2')]} />
            <ProductCard title={e('triangulos_title')} specs={[e('triangulos_spec_1'), e('triangulos_spec_2'), e('triangulos_spec_3')]} />
            <ProductCard title={e('exibidores_title')} specs={[e('exibidores_spec_1'), e('exibidores_spec_2'), e('exibidores_spec_3')]} />
            <ProductCard title={e('stands_title')} specs={[e('stands_spec_1'), e('stands_spec_2'), e('stands_spec_3')]} />
          </div>
          {/* Client work photo strip */}
          <div className="grid grid-cols-2 gap-3">
            <img src={popupSuzuki} alt="Pop-up Suzuki" className="rounded-xl object-cover aspect-[4/3] w-full" />
            <img src={rollupObi} alt="Roll-up OBI" className="rounded-xl object-cover aspect-[4/3] w-full" />
          </div>
        </div>

        {/* Brandeo Vehicular */}
        <div>
          <SubSectionLabel label={e('vehicular_label')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <img src={vehicularImg} alt="Brandeo vehicular" className="rounded-xl object-cover w-full aspect-video" />
            <div className="flex flex-col gap-4">
              <p className="font-inter text-jm-body text-sm leading-6">{e('vehicular_description')}</p>
              <ul className="flex flex-col gap-2">
                {[e('vehicular_spec_1'), e('vehicular_spec_2'), e('vehicular_spec_3'), e('vehicular_spec_4')].map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="bg-jm-primary w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" />
                    <span className="font-inter text-xs text-jm-body leading-5">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Link to="/contact" className="self-start bg-jm-primary text-white font-inter font-semibold text-sm px-8 py-4 rounded hover:bg-jm-accent transition-colors">
          {t('services_page.cta_quote')} →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] Commit:
```
git add src/components/services/ExteriorSection.tsx
git commit -m "feat: ExteriorSection — rótulos, displays, brandeo vehicular"
```

---

### Task 5: Build DigitalSection

**Files:**
- Create: `src/components/services/DigitalSection.tsx`

- [ ] Write the component:
```tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { SubSectionLabel } from './SubSectionLabel';
import { ProductCard } from './ProductCard';

export function DigitalSection() {
  const { t } = useTranslation();
  const d = (k: string) => t(`services_page.digital.${k}`);

  return (
    <section className="pb-16 bg-jm-bg-section">
      <CategoryHeader tag="Digital" title={d('title')} subtitle={d('subtitle')} />

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-10">

        {/* Pantallas */}
        <div>
          <SubSectionLabel label={d('screens_label')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              d('vallas_digitales_title'),
              d('pantallas_digitales_title'),
              d('vallas_led_title'),
              d('counter_cap_title'),
            ].map((title) => (
              <ProductCard key={title} title={title} specs={[t('services_page.cta_enquire')]} />
            ))}
          </div>
        </div>

        {/* Tótems */}
        <div>
          <SubSectionLabel label={d('totems_label')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              d('totem_led_title'),
              d('totem_doble_title'),
              d('totem_cap_touch_title'),
              d('totem_outdoor_title'),
            ].map((title) => (
              <ProductCard key={title} title={title} specs={[t('services_page.cta_enquire')]} />
            ))}
          </div>
        </div>

        {/* Video Wall */}
        <div>
          <SubSectionLabel label={d('video_label')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ProductCard title={d('video_wall_title')} specs={[d('video_wall_spec')]} />
            <ProductCard title={d('colgante_title')} specs={[d('colgante_spec')]} />
            <ProductCard title={d('menu_board_title')} specs={[]} />
            <ProductCard title={d('poster_led_title')} specs={[]} />
            <ProductCard title={d('translucida_title')} specs={[]} />
            <ProductCard title={d('cap_touch_signage_title')} specs={[]} />
          </div>
        </div>

        <Link to="/contact" className="self-start bg-jm-primary text-white font-inter font-semibold text-sm px-8 py-4 rounded hover:bg-jm-accent transition-colors">
          {t('services_page.cta_enquire')} →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] Commit:
```
git add src/components/services/DigitalSection.tsx
git commit -m "feat: DigitalSection — pantallas, tótems, video wall"
```

---

### Task 6: Build SouvenirsSection

**Files:**
- Create: `src/components/services/SouvenirsSection.tsx`

- [ ] Write the component:
```tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { SubSectionLabel } from './SubSectionLabel';
import { ProductCard } from './ProductCard';

export function SouvenirsSection() {
  const { t } = useTranslation();
  const s = (k: string) => t(`services_page.souvenirs.${k}`);

  return (
    <section className="pb-16 bg-jm-bg">
      <CategoryHeader tag="Merchandising" title={s('title')} subtitle={s('subtitle')} />

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-10">

        {/* Stationery */}
        <div>
          <SubSectionLabel label={s('escritura_label')} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ProductCard title={s('esferos_title')} specs={[s('esferos_spec_1'), s('esferos_spec_2')]} />
            <ProductCard title={s('vasos_title')} specs={[s('vasos_spec_1'), s('vasos_spec_2')]} />
            <ProductCard title={s('servilletas_title')} specs={[s('servilletas_spec_1'), s('servilletas_spec_2')]} />
            <ProductCard title={s('packaging_title')} specs={[s('packaging_spec_1'), s('packaging_spec_2')]} />
            <ProductCard title={s('habladores_title')} specs={[s('habladores_spec_1'), s('habladores_spec_2')]} />
            <ProductCard title={s('stickers_title')} specs={[s('stickers_spec_1'), s('stickers_spec_2'), s('stickers_spec_3')]} />
          </div>
        </div>

        {/* Clothing */}
        <div>
          <SubSectionLabel label={s('indumentaria_label')} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ProductCard title={s('uniformes_title')} specs={[s('uniformes_spec_1'), s('uniformes_spec_2'), s('uniformes_spec_3')]} />
            <ProductCard title={s('deportivos_title')} specs={[s('deportivos_spec_1'), s('deportivos_spec_2'), s('deportivos_spec_3')]} />
            <ProductCard title={s('flash_title')} specs={[s('flash_spec_1'), s('flash_spec_2'), s('flash_spec_3')]} />
            <ProductCard title={s('agendas_title')} specs={[s('agendas_spec_1'), s('agendas_spec_2'), s('agendas_spec_3')]} />
            <ProductCard title={s('carnets_title')} specs={[s('carnets_spec_1'), s('carnets_spec_2'), s('carnets_spec_3')]} />
          </div>
        </div>

        {/* Accessories */}
        <div>
          <SubSectionLabel label={s('accesorios_label')} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ProductCard title={s('gorras_title')} specs={[s('gorras_spec_1'), s('gorras_spec_2')]} />
            <ProductCard title={s('tomatodos_title')} specs={[s('tomatodos_spec_1'), s('tomatodos_spec_2')]} />
            <ProductCard title={s('jarros_title')} specs={[s('jarros_spec_1'), s('jarros_spec_2')]} />
            <ProductCard title={s('pulseras_title')} specs={[s('pulseras_spec_1'), s('pulseras_spec_2')]} />
            <ProductCard title={s('mousepad_title')} specs={[s('mousepad_spec_1'), s('mousepad_spec_2')]} />
            <ProductCard title={s('bolsos_title')} specs={[s('bolsos_spec_1'), s('bolsos_spec_2')]} />
          </div>
        </div>

        {/* Events */}
        <div>
          <SubSectionLabel label={s('eventos_label')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProductCard title={s('carpas_title')} specs={[s('carpas_spec_1'), s('carpas_spec_2')]} />
            <ProductCard title={s('banderas_title')} specs={[s('banderas_spec_1'), s('banderas_spec_2')]} />
          </div>
        </div>

        <Link to="/contact" className="self-start bg-jm-primary text-white font-inter font-semibold text-sm px-8 py-4 rounded hover:bg-jm-accent transition-colors">
          {t('services_page.cta_quote')} →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] Commit:
```
git add src/components/services/SouvenirsSection.tsx
git commit -m "feat: SouvenirsSection — merch, clothing, accessories, events"
```

---

### Task 7: Build PrintSection

**Files:**
- Create: `src/components/services/PrintSection.tsx`

- [ ] Write the component:
```tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CategoryHeader } from './CategoryHeader';
import { SubSectionLabel } from './SubSectionLabel';
import { ProductCard } from './ProductCard';

export function PrintSection() {
  const { t } = useTranslation();
  const p = (k: string) => t(`services_page.print.${k}`);

  return (
    <section className="pb-16 bg-jm-bg-section">
      <CategoryHeader tag="Impresos" title={p('title')} subtitle={p('subtitle')} />

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-10">

        {/* Stationery */}
        <div>
          <SubSectionLabel label={p('papeleria_label')} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProductCard title={p('tarjetas_title')} specs={[p('tarjetas_spec_1'), p('tarjetas_spec_2'), p('tarjetas_spec_3')]} />
            <ProductCard title={p('hojas_title')} specs={[p('hojas_spec_1'), p('hojas_spec_2')]} />
            <ProductCard title={p('sobres_title')} specs={[p('sobres_spec_1'), p('sobres_spec_2')]} />
            <ProductCard title={p('carpetas_title')} specs={[p('carpetas_spec_1'), p('carpetas_spec_2')]} />
          </div>
        </div>

        {/* Print collateral */}
        <div>
          <SubSectionLabel label={p('impresos_label')} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProductCard title={p('flayers_title')} specs={[p('flayers_spec_1'), p('flayers_spec_2'), p('flayers_spec_3'), p('flayers_spec_4')]} />
            <ProductCard title={p('folletos_title')} specs={[p('folletos_spec_1'), p('folletos_spec_2'), p('folletos_spec_3')]} />
            <ProductCard title={p('dipticos_title')} specs={[p('dipticos_spec_1'), p('dipticos_spec_2'), p('dipticos_spec_3')]} />
            <ProductCard title={p('tripticos_title')} specs={[p('tripticos_spec_1'), p('tripticos_spec_2'), p('tripticos_spec_3')]} />
          </div>
        </div>

        <Link to="/contact" className="self-start bg-jm-primary text-white font-inter font-semibold text-sm px-8 py-4 rounded hover:bg-jm-accent transition-colors">
          {t('services_page.cta_quote')} →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] Commit:
```
git add src/components/services/PrintSection.tsx
git commit -m "feat: PrintSection — papelería, flyers, folletos, dípticos, trípticos"
```

---

### Task 8: Wire up ServicesPage, retire ServicesBento

**Files:**
- Modify: `src/pages/ServicesPage.tsx`
- Delete: `src/components/sections/ServicesBento.tsx`

- [ ] Update `ServicesPage.tsx` — replace `<ServicesBento />` with 4 new sections
- [ ] Delete `ServicesBento.tsx`
- [ ] Commit:
```
git add src/pages/ServicesPage.tsx
git rm src/components/sections/ServicesBento.tsx
git commit -m "feat: wire catalogue sections into ServicesPage, retire ServicesBento"
```

---

### Task 9: Branch, final check, push

- [ ] Create branch `services-catalogue` before starting (if not already on one)
- [ ] Verify dev server shows no TypeScript errors
- [ ] Check /services in browser: all 4 sections render, photos load, i18n works
- [ ] Merge to main and push
