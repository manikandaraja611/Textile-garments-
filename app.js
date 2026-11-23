/* ─────────────────────────────────────────────────────────────
   Tana Textile Studio — shop logic
   ───────────────────────────────────────────────────────────── */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const money = (n) => "$" + Number(n).toFixed(0);
const FREE_SHIP = 150;
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5l5.2 5.5L20 6.5"/></svg>';

/* ── Catalogue ─────────────────────────────────────────────── */

const PRODUCTS = [
  {
    id: "tee-01", art: "tee", name: "Everyday Cotton Tee", category: "Tops",
    fabric: "Organic cotton jersey", price: 64, badge: "New", bg: "#EFE6D6",
    rating: 4.8, reviews: 212, sizes: ["XS", "S", "M", "L", "XL"],
    desc: "The tee we build every collection around. A mid-weight organic jersey with a rib that refuses to stretch out, cut just wide enough through the body to fall clean.",
    palette: [
      { name: "Undyed", main: "#E5D8C0", shade: "#CDBB9B" },
      { name: "Ink", main: "#33302A", shade: "#211F1B" },
      { name: "Clay", main: "#B4552D", shade: "#8F3F1E" }
    ],
    details: [
      ["Cloth", "220 GSM organic cotton jersey, knitted in Portugal."],
      ["Fit", "Relaxed body, straight hem. Size down for a closer fit."],
      ["Care", "Cold wash, line dry. Softens with every wash."]
    ]
  },
  {
    id: "shirt-01", art: "shirt", name: "Kasuri Overshirt", category: "Shirts",
    fabric: "Handwoven cotton", price: 148, badge: "Bestseller", bg: "#E7DED0",
    rating: 4.9, reviews: 168, sizes: ["XS", "S", "M", "L", "XL"],
    desc: "Woven on a pit loom with ikat-dyed warp threads, so the pattern blurs at the edges exactly as it should. Worn open over a tee or buttoned as a light jacket.",
    palette: [
      { name: "Indigo", main: "#3A5265", shade: "#283C4B" },
      { name: "Ecru", main: "#E2D6C0", shade: "#C7B79A" },
      { name: "Rust", main: "#A65B36", shade: "#80401F" }
    ],
    details: [
      ["Cloth", "Handwoven cotton, 140 GSM, woven in Kerala."],
      ["Fit", "Boxy, dropped shoulder. Model is 6'1\" in a M."],
      ["Care", "Cold hand wash separately for the first three washes."]
    ]
  },
  {
    id: "trouser-01", art: "trousers", name: "Fold Pleat Trouser", category: "Bottoms",
    fabric: "Linen-cotton twill", price: 132, bg: "#EDE4D4",
    rating: 4.7, reviews: 94, sizes: ["28", "30", "32", "34", "36"],
    desc: "One deep pleat at each hip, a high waist and a leg that falls straight to the ankle. Cut from a dry linen-cotton twill that holds the fold without pressing.",
    palette: [
      { name: "Sand", main: "#D8C7A8", shade: "#BDAA89" },
      { name: "Charcoal", main: "#3B3833", shade: "#282621" },
      { name: "Olive", main: "#6C6E4C", shade: "#52543A" }
    ],
    details: [
      ["Cloth", "55% linen, 45% cotton, woven in Belgium."],
      ["Fit", "High rise, straight leg, unfinished hem at 34\" inseam."],
      ["Care", "Machine wash cold, hang dry, embrace the crease."]
    ]
  },
  {
    id: "dress-01", art: "dress", name: "Noon Wrap Dress", category: "Dresses",
    fabric: "Khadi cotton", price: 186, bg: "#F0E3D6",
    rating: 4.9, reviews: 137, sizes: ["XS", "S", "M", "L"],
    desc: "A wrap bodice on a full, unlined skirt in handspun khadi. Ties at the side so you can set the waist where you want it, then leave the rest to the breeze.",
    palette: [
      { name: "Terracotta", main: "#B4552D", shade: "#8C3F1F" },
      { name: "Bone", main: "#E6DBC7", shade: "#CBBCA1" },
      { name: "Indigo", main: "#33495A", shade: "#233542" }
    ],
    details: [
      ["Cloth", "Handspun, handwoven khadi cotton, 120 GSM."],
      ["Fit", "True to size, adjustable wrap waist. Midi length."],
      ["Care", "Cold wash with like colours, line dry in shade."]
    ]
  },
  {
    id: "jacket-01", art: "jacket", name: "Field Chore Jacket", category: "Outerwear",
    fabric: "Cotton canvas", price: 210, bg: "#E8E4D6",
    rating: 4.8, reviews: 76, sizes: ["S", "M", "L", "XL"],
    desc: "Three patch pockets, a straight collar and no lining, so it moves like a shirt and wears like armour. The 12oz canvas starts stiff and ends up yours.",
    palette: [
      { name: "Olive", main: "#5E6242", shade: "#464A30" },
      { name: "Ink", main: "#2C2A26", shade: "#1B1A17" },
      { name: "Clay", main: "#A9563A", shade: "#833C25" }
    ],
    details: [
      ["Cloth", "12oz cotton canvas, mill-washed for softness."],
      ["Fit", "Straight, layer-friendly. Sits at the hip."],
      ["Care", "Wash rarely, cold. Repairs free for life."]
    ]
  },
  {
    id: "knit-01", art: "knit", name: "Ribbed Wool Crew", category: "Knitwear",
    fabric: "Merino wool", price: 158, bg: "#EBE6DA",
    rating: 4.9, reviews: 203, sizes: ["XS", "S", "M", "L", "XL"],
    desc: "Fine-gauge merino with a deep ribbed crew and cuffs that stay put. Warm enough for a cold studio, fine enough to wear under the chore jacket.",
    palette: [
      { name: "Oat", main: "#DDD2BC", shade: "#C3B598" },
      { name: "Moss", main: "#777A54", shade: "#5A5D3C" },
      { name: "Navy", main: "#303C4A", shade: "#202A35" }
    ],
    details: [
      ["Cloth", "100% RWS-certified merino, 18.5 micron, knitted in Portugal."],
      ["Fit", "Regular. Size up for a slouchier line."],
      ["Care", "Hand wash cool or wool cycle, dry flat."]
    ]
  },
  {
    id: "scarf-01", art: "scarf", name: "Hand-block Scarf", category: "Accessories",
    fabric: "Silk noil", price: 78, bg: "#F1E6D8",
    rating: 4.7, reviews: 51, sizes: ["One size"],
    desc: "Block-printed by hand in Bagru, so no two repeats land in quite the same place. Silk noil has a dry, papery hand that gets softer every time you wrap it.",
    palette: [
      { name: "Saffron", main: "#C9873A", shade: "#A56822" },
      { name: "Indigo", main: "#2F4858", shade: "#1F333F" },
      { name: "Rose", main: "#B07A6E", shade: "#8E5B50" }
    ],
    details: [
      ["Cloth", "Peace silk noil, 70 × 180 cm, hand-rolled edges."],
      ["Fit", "One size. Wear it long, doubled, or as a head wrap."],
      ["Care", "Dry clean, or cold hand wash and press damp."]
    ]
  },
  {
    id: "tote-01", art: "tote", name: "Market Canvas Tote", category: "Accessories",
    fabric: "Heavy canvas", price: 58, badge: "Low stock", bg: "#EAE1D2",
    rating: 4.6, reviews: 44, sizes: ["One size"],
    desc: "Cut from the same 12oz canvas as the chore jacket, with a flat base that keeps a baguette upright. Two inside pockets, one for keys and one for everything else.",
    palette: [
      { name: "Natural", main: "#DCCFB5", shade: "#C1B08F" },
      { name: "Black", main: "#33302B", shade: "#201E1A" },
      { name: "Clay", main: "#AC5A3C", shade: "#86402A" }
    ],
    details: [
      ["Cloth", "12oz cotton canvas, riveted handle anchors."],
      ["Fit", "38 × 42 cm, 12 cm gusset, 58 cm handles."],
      ["Care", "Spot clean. Machine wash only if you must."]
    ]
  },
  {
    id: "skirt-01", art: "skirt", name: "Bias Slip Skirt", category: "Bottoms",
    fabric: "Cupro lining", price: 124, bg: "#EDE5D8",
    rating: 4.7, reviews: 62, sizes: ["XS", "S", "M", "L"],
    desc: "Cut on the bias so it skims rather than clings, with a hidden elastic at the back of the waist. Cupro falls like silk and washes like cotton.",
    palette: [
      { name: "Bronze", main: "#A98352", shade: "#86633A" },
      { name: "Ink", main: "#2F2C28", shade: "#1D1B18" },
      { name: "Sage", main: "#8A8F70", shade: "#6B7052" }
    ],
    details: [
      ["Cloth", "100% cupro (regenerated cotton linter), 110 GSM."],
      ["Fit", "Mid rise, midi length. Bias cut runs true."],
      ["Care", "Cold hand wash, hang to dry away from direct sun."]
    ]
  },
  {
    id: "shirt-02", art: "shirt", name: "Linen Camp Shirt", category: "Shirts",
    fabric: "Belgian linen", price: 118, badge: "New", bg: "#EFE8DA",
    rating: 4.8, reviews: 88, sizes: ["S", "M", "L", "XL"],
    desc: "An open camp collar, a straight hem and nothing else to get in the way. Rain-fed Belgian linen at 165 GSM — heavy enough to drape, light enough for August.",
    palette: [
      { name: "Chalk", main: "#E9E0CF", shade: "#CFC2AB" },
      { name: "Sky", main: "#8FA3A8", shade: "#6F858B" },
      { name: "Burnt", main: "#A85B38", shade: "#82401F" }
    ],
    details: [
      ["Cloth", "100% Belgian linen, 165 GSM, garment washed."],
      ["Fit", "Relaxed, straight hem, worn untucked."],
      ["Care", "Machine wash cold, line dry, press warm if you like."]
    ]
  }
];

const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

/* ── Garment illustrations ─────────────────────────────────── */

const STITCH = "rgba(23,21,18,.17)";

function paint(d, c, uid) {
  return `<path d="${d}" fill="${c.main}"/><path d="${d}" fill="url(#g-${uid})"/>`;
}

const SILHOUETTES = {
  tee(c, uid) {
    const body = "M118,104 Q160,126 202,104 L220,110 L254,160 L214,182 L202,152 L202,322 Q160,336 118,322 L118,152 L106,182 L66,160 L100,110 Z";
    return paint(body, c, uid) +
      `<path d="M118,104 Q160,126 202,104" fill="none" stroke="${c.shade}" stroke-width="7"/>` +
      `<path d="M118,104 Q160,126 202,104" fill="none" stroke="rgba(23,21,18,.2)" stroke-width="1"/>` +
      `<path d="M120,312 Q160,326 200,312" fill="none" stroke="${STITCH}" stroke-width="1.2" stroke-dasharray="4 4"/>` +
      `<path d="M120,156 L123,318M200,156 L197,318" fill="none" stroke="rgba(0,0,0,.07)" stroke-width="3"/>` +
      `<path d="M220,110 L254,160 L214,182" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="1"/>` +
      `<path d="M100,110 L66,160 L106,182" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="1"/>`;
  },

  shirt(c, uid) {
    const body = "M118,104 Q160,126 202,104 L220,110 L254,160 L214,182 L202,152 L202,322 Q160,336 118,322 L118,152 L106,182 L66,160 L100,110 Z";
    return paint(body, c, uid) +
      `<path d="M138,102 L158,148 L140,154 L120,110 Z" fill="${c.shade}"/>` +
      `<path d="M182,102 L162,148 L180,154 L200,110 Z" fill="${c.shade}"/>` +
      `<rect x="155" y="128" width="10" height="192" fill="rgba(255,255,255,.14)"/>` +
      `<path d="M160,128 V320" stroke="rgba(0,0,0,.16)" stroke-width="1"/>` +
      `<circle cx="160" cy="164" r="2.3" fill="rgba(23,21,18,.4)"/>` +
      `<circle cx="160" cy="206" r="2.3" fill="rgba(23,21,18,.4)"/>` +
      `<circle cx="160" cy="248" r="2.3" fill="rgba(23,21,18,.4)"/>` +
      `<circle cx="160" cy="290" r="2.3" fill="rgba(23,21,18,.4)"/>` +
      `<path d="M126,204 h32 v36 h-32 z" fill="rgba(0,0,0,.05)" stroke="rgba(0,0,0,.14)" stroke-width="1"/>` +
      `<path d="M126,204 h32" stroke="rgba(0,0,0,.14)" stroke-width="1"/>` +
      `<path d="M118,104 Q160,126 202,104" fill="none" stroke="rgba(23,21,18,.22)" stroke-width="1"/>` +
      `<path d="M120,312 Q160,326 200,312" fill="none" stroke="${STITCH}" stroke-width="1.2" stroke-dasharray="4 4"/>` +
      `<path d="M220,110 L254,160 L214,182" fill="none" stroke="rgba(0,0,0,.1)" stroke-width="1"/>` +
      `<path d="M100,110 L66,160 L106,182" fill="none" stroke="rgba(0,0,0,.1)" stroke-width="1"/>`;
  },

  dress(c, uid) {
    const bodice = "M136,94 Q160,106 184,94 L192,180 Q160,192 128,180 Z";
    const skirt = "M128,178 Q160,190 192,178 L232,332 Q160,354 88,332 Z";
    return `<path d="M141,96 L147,68" stroke="${c.main}" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M179,96 L173,68" stroke="${c.main}" stroke-width="6" stroke-linecap="round"/>` +
      paint(skirt, c, uid) +
      `<path d="M143,188 L118,332M154,190 L146,340M166,190 L174,340M177,188 L202,332" stroke="rgba(23,21,18,.1)" stroke-width="1.2"/>` +
      `<path d="M92,326 Q160,348 228,326" fill="none" stroke="${STITCH}" stroke-width="1.2" stroke-dasharray="4 5"/>` +
      paint(bodice, c, uid) +
      `<path d="M144,96 Q160,116 176,96" fill="none" stroke="${c.shade}" stroke-width="6"/>` +
      `<path d="M144,96 Q160,116 176,96" fill="none" stroke="rgba(23,21,18,.2)" stroke-width="1"/>` +
      `<path d="M128,180 Q160,192 192,180" fill="none" stroke="${c.shade}" stroke-width="7"/>` +
      `<path d="M128,180 Q160,192 192,180" fill="none" stroke="rgba(23,21,18,.14)" stroke-width="1"/>`;
  },

  trousers(c, uid) {
    const left = "M108,118 L158,118 L156,208 L148,344 L114,344 L104,208 Z";
    const right = "M162,118 L212,118 L216,208 L206,344 L172,344 L164,208 Z";
    return paint(left, c, uid) + paint(right, c, uid) +
      `<rect x="103" y="92" width="114" height="26" rx="3" fill="${c.shade}"/>` +
      `<path d="M103,118 h114" stroke="rgba(0,0,0,.16)" stroke-width="1"/>` +
      `<path d="M160,92 v10" stroke="rgba(0,0,0,.28)" stroke-width="1.5"/>` +
      `<path d="M132,124 L128,336M188,124 L192,336" stroke="rgba(0,0,0,.1)" stroke-width="1.2" stroke-dasharray="5 5"/>` +
      `<path d="M112,122 q16,26 2,44M208,122 q-16,26 -2,44" fill="none" stroke="rgba(0,0,0,.16)" stroke-width="1.2"/>` +
      `<path d="M116,334 h30M174,334 h30" stroke="${STITCH}" stroke-width="1.2" stroke-dasharray="4 4"/>` +
      `<path d="M158,208 L150,344M162,208 L170,344" stroke="rgba(0,0,0,.1)" stroke-width="1"/>`;
  },

  jacket(c, uid) {
    const leftSleeve = "M112,108 L72,140 L58,272 L98,282 L104,164 Z";
    const rightSleeve = "M208,108 L248,140 L262,272 L222,282 L216,164 Z";
    const left = "M110,104 L158,104 L152,166 L148,326 L102,320 L106,166 Z";
    const right = "M210,104 L162,104 L168,166 L172,326 L218,320 L214,166 Z";
    return paint(leftSleeve, c, uid) + paint(rightSleeve, c, uid) +
      paint(left, c, uid) + paint(right, c, uid) +
      `<path d="M158,104 L152,166 L163,138 L166,108 Z" fill="${c.shade}" opacity=".85"/>` +
      `<path d="M162,104 L168,166 L157,138 L154,108 Z" fill="${c.shade}" opacity=".85"/>` +
      `<path d="M134,98 L160,126 L186,98 L196,104 L168,136 L160,138 L152,136 L124,104 Z" fill="${c.shade}"/>` +
      `<path d="M160,138 V320" stroke="rgba(0,0,0,.22)" stroke-width="1"/>` +
      `<circle cx="152" cy="196" r="2.6" fill="rgba(23,21,18,.45)"/>` +
      `<circle cx="152" cy="232" r="2.6" fill="rgba(23,21,18,.45)"/>` +
      `<circle cx="152" cy="268" r="2.6" fill="rgba(23,21,18,.45)"/>` +
      `<path d="M116,246 h30 v36 h-30 z" fill="rgba(0,0,0,.06)" stroke="rgba(0,0,0,.16)" stroke-width="1"/>` +
      `<path d="M174,246 h30 v36 h-30 z" fill="rgba(0,0,0,.06)" stroke="rgba(0,0,0,.16)" stroke-width="1"/>` +
      `<path d="M116,246 h30M174,246 h30" stroke="rgba(0,0,0,.2)" stroke-width="1.4"/>` +
      `<path d="M104,164 L100,314M216,164 L220,314" stroke="rgba(0,0,0,.1)" stroke-width="1.4"/>` +
      `<path d="M106,310 h38M176,310 h38" stroke="${STITCH}" stroke-width="1.2" stroke-dasharray="4 4"/>`;
  },

  knit(c, uid) {
    const body = "M116,132 Q160,148 204,132 L208,308 Q160,324 112,308 Z";
    const leftSleeve = "M118,134 L68,162 L58,272 L100,282 L110,196 Z";
    const rightSleeve = "M202,134 L252,162 L262,272 L220,282 L210,196 Z";
    return paint(leftSleeve, c, uid) + paint(rightSleeve, c, uid) + paint(body, c, uid) +
      `<path d="M140,132 Q160,154 180,132" fill="none" stroke="${c.shade}" stroke-width="11"/>` +
      `<path d="M140,132 Q160,154 180,132" fill="none" stroke="rgba(23,21,18,.16)" stroke-width="1"/>` +
      `<g stroke="rgba(23,21,18,.1)" stroke-width="1">` +
        `<path d="M120,302 v14M128,303 v13M136,304 v12M144,305 v12M152,306 v11M160,306 v11M168,306 v11M176,305 v12M184,304 v12M192,303 v13M200,302 v14"/>` +
      `</g>` +
      `<path d="M62,266 l38,9M258,266 l-38,9" stroke="rgba(23,21,18,.12)" stroke-width="1.2"/>` +
      `<path d="M118,158 L112,296M202,158 L208,296" stroke="rgba(0,0,0,.08)" stroke-width="2"/>` +
      `<path d="M154,190 q6,30 0,60M166,190 q-6,30 0,60" fill="none" stroke="rgba(0,0,0,.06)" stroke-width="1.4"/>`;
  },

  skirt(c, uid) {
    const skirt = "M122,118 L198,118 L232,318 Q160,342 88,318 Z";
    return paint(skirt, c, uid) +
      `<rect x="120" y="98" width="80" height="22" rx="3" fill="${c.shade}"/>` +
      `<path d="M120,120 h80" stroke="rgba(0,0,0,.16)" stroke-width="1"/>` +
      `<path d="M134,122 L102,322M145,122 L126,330M156,122 L148,334M164,122 L172,334M175,122 L194,330M186,122 L218,322" stroke="rgba(23,21,18,.1)" stroke-width="1.2"/>` +
      `<path d="M92,312 Q160,334 228,312" fill="none" stroke="${STITCH}" stroke-width="1.2" stroke-dasharray="4 5"/>`;
  },

  scarf(c, uid) {
    const path = "M118,68 C152,110 108,152 146,196 C184,240 138,286 172,332";
    return `<path d="${path}" fill="none" stroke="${c.shade}" stroke-width="52" stroke-linecap="round"/>` +
      `<path d="${path}" fill="none" stroke="${c.main}" stroke-width="46" stroke-linecap="round"/>` +
      `<path d="${path}" fill="none" stroke="url(#g-${uid})" stroke-width="46" stroke-linecap="round"/>` +
      `<path d="M126,72 C160,114 116,156 154,200 C192,244 146,290 180,336" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="3"/>` +
      `<path d="M110,74 C144,116 100,158 138,202 C176,246 130,292 164,338" fill="none" stroke="rgba(0,0,0,.1)" stroke-width="2"/>` +
      `<path d="M104,66 l-12,-8M110,58 l-9,-12M120,52 l-4,-14M96,80 l-14,-4M90,94 l-15,2" stroke="${c.shade}" stroke-width="2.4" stroke-linecap="round"/>` +
      `<path d="M184,320 l12,8M178,328 l9,12M168,334 l4,14M192,306 l14,4M198,292 l15,-2" stroke="${c.shade}" stroke-width="2.4" stroke-linecap="round"/>`;
  },

  tote(c, uid) {
    const body = "M98,158 L222,158 L212,332 Q160,344 108,332 Z";
    return `<path d="M124,158 C124,110 196,110 196,158" fill="none" stroke="${c.shade}" stroke-width="12" stroke-linecap="round"/>` +
      `<path d="M124,158 C124,110 196,110 196,158" fill="none" stroke="${c.main}" stroke-width="7" stroke-linecap="round"/>` +
      paint(body, c, uid) +
      `<path d="M98,176 h124" stroke="rgba(0,0,0,.12)" stroke-width="1.2"/>` +
      `<path d="M108,186 L114,328M212,186 L206,328" stroke="rgba(0,0,0,.09)" stroke-width="1.2"/>` +
      `<rect x="140" y="248" width="40" height="30" rx="2" fill="${c.shade}" opacity=".55"/>` +
      `<path d="M112,322 Q160,334 208,322" fill="none" stroke="${STITCH}" stroke-width="1.2" stroke-dasharray="4 4"/>` +
      `<circle cx="134" cy="164" r="2" fill="rgba(23,21,18,.35)"/><circle cx="186" cy="164" r="2" fill="rgba(23,21,18,.35)"/>`;
  }
};

function garmentSVG(p, ci = 0) {
  const c = p.palette[ci] || p.palette[0];
  const uid = p.id + "-" + ci;
  const draw = SILHOUETTES[p.art] || SILHOUETTES.tee;
  return `<svg viewBox="0 0 320 400" role="img" aria-label="${p.name} in ${c.name}">
    <defs>
      <linearGradient id="g-${uid}" x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity=".22"/>
        <stop offset=".5" stop-color="#ffffff" stop-opacity="0"/>
        <stop offset="1" stop-color="#000000" stop-opacity=".16"/>
      </linearGradient>
    </defs>
    ${draw(c, uid)}
  </svg>`;
}

/* ── State ─────────────────────────────────────────────────── */

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

const state = {
  filter: "All",
  query: "",
  sort: "featured",
  bag: load("tana.bag", []),
  wish: new Set(load("tana.wish", [])),
  checkout: false,
  order: null
};

if (!Array.isArray(state.bag)) state.bag = [];
state.bag = state.bag.filter((i) => byId[i.id] && i.qty > 0);
state.bag.forEach((i) => { if (!Number.isInteger(i.color)) i.color = 0; });

function persist() {
  try {
    localStorage.setItem("tana.bag", JSON.stringify(state.bag));
    localStorage.setItem("tana.wish", JSON.stringify([...state.wish]));
  } catch (err) { /* storage unavailable — the session still works */ }
}

/* ── DOM refs ──────────────────────────────────────────────── */
const grid = $("#grid");
const filtersEl = $("#filters");
const resultsEl = $("#results");
const emptyEl = $("#empty");
const searchEl = $("#search");
const sortEl = $("#sort");
const bagCountEl = $("#bag-count");
const drawerCountEl = $("#drawer-count");
const cart = $("#cart");
const cartBody = $("#cart-body");
const cartFoot = $("#cart-foot");
const cartClose = $("#cart-close");
const scrim = $("#scrim");
const pdp = $("#pdp");
const pdpContent = $("#pdp-content");
const pdpClose = $("#pdp-close");
const toasts = $("#toasts");
const menuToggle = $("#menu-toggle");
const mobileMenu = $("#mobile-menu");

let lastFocused = null;

/* ── Catalogue rendering ───────────────────────────────────── */

function renderFilters() {
  const cats = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
  filtersEl.innerHTML = cats.map((cat) => {
    const count = cat === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat).length;
    const on = state.filter === cat;
    return `<button class="chip${on ? " is-active" : ""}" data-filter="${cat}" aria-pressed="${on}">${cat} <span>${count}</span></button>`;
  }).join("");
}

function visibleProducts() {
  let list = state.filter === "All"
    ? PRODUCTS.slice()
    : PRODUCTS.filter((p) => p.category === state.filter);

  const q = state.query.trim().toLowerCase();
  if (q) {
    list = list.filter((p) => {
      const haystack = [p.name, p.fabric, p.category, p.desc, ...p.palette.map((c) => c.name)].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }

  if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
  if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

  return list;
}

function cardHTML(p) {
  const wished = state.wish.has(p.id);
  const badge = p.badge
    ? `<span class="badge${p.badge === "Low stock" ? " low" : ""}">${p.badge}</span>`
    : "";
  const swatches = p.palette.map((c, i) =>
    `<button class="swatch-dot${i === 0 ? " is-active" : ""}" style="--c:${c.main}" data-color="${p.id}:${i}" aria-label="Colour: ${c.name}" aria-pressed="${i === 0}"></button>`
  ).join("");

  return `<article class="card" data-id="${p.id}">
    <div class="card-art" style="--bg:${p.bg}">
      ${badge}
      <button class="heart${wished ? " is-on" : ""}" data-wish="${p.id}" aria-label="Save ${p.name}" aria-pressed="${wished}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3C7.4 17 4 14 4 10.4A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 8 2.8c0 3.6-3.4 6.6-8 9.9z"/></svg>
      </button>
      ${garmentSVG(p, 0)}
      <button class="quick" data-view="${p.id}">Quick view</button>
    </div>
    <div class="card-body">
      <div class="card-row"><h3>${p.name}</h3><span class="price">${money(p.price)}</span></div>
      <p class="card-meta">${p.fabric}</p>
      <div class="swatches" aria-label="Colours">${swatches}</div>
    </div>
  </article>`;
}

function renderGrid() {
  const list = visibleProducts();
  grid.innerHTML = list.map(cardHTML).join("");
  emptyEl.hidden = list.length > 0;

  const q = state.query.trim();
  if (list.length === 0) {
    resultsEl.textContent = "No pieces match";
  } else if (q) {
    resultsEl.textContent = `Showing ${list.length} ${list.length === 1 ? "match" : "matches"} for “${q}”`;
  } else if (state.filter === "All") {
    resultsEl.textContent = `Showing all ${list.length} pieces`;
  } else {
    resultsEl.textContent = `Showing ${list.length} ${list.length === 1 ? "piece" : "pieces"} in ${state.filter}`;
  }
}

/* ── Bag ───────────────────────────────────────────────────── */

function bagCount() {
  return state.bag.reduce((sum, item) => sum + item.qty, 0);
}

function bagSubtotal() {
  return state.bag.reduce((sum, item) => sum + byId[item.id].price * item.qty, 0);
}

function updateCount(animate = true) {
  const count = bagCount();
  bagCountEl.textContent = count;
  drawerCountEl.textContent = count;
  if (!animate) return;
  bagCountEl.classList.remove("pop");
  void bagCountEl.offsetWidth;
  bagCountEl.classList.add("pop");
}

function addToBag(id, size, qty = 1, color = 0) {
  const product = byId[id];
  const existing = state.bag.find((i) => i.id === id && i.size === size && i.color === color);
  if (existing) {
    existing.qty = Math.min(9, existing.qty + qty);
  } else {
    state.bag.push({ id, size, qty, color });
  }
  persist();
  updateCount();
  if (cart.classList.contains("is-open")) renderBag();
  toast(`${product.name} added to your bag`);
}

function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span class="tick">${CHECK}</span><span>${message}</span>`;
  toasts.appendChild(el);
  window.setTimeout(() => {
    el.classList.add("out");
    window.setTimeout(() => el.remove(), 320);
  }, 2600);
}

function lineHTML(item) {
  const p = byId[item.id];
  const ci = item.color ?? 0;
  const key = `${p.id}|${item.size}|${ci}`;
  return `<div class="line" data-key="${key}">
    <div class="line-art" style="--bg:${p.bg}">${garmentSVG(p, ci)}</div>
    <div class="line-info">
      <div class="line-top">
        <h3>${p.name}</h3>
        <button class="line-remove" data-remove="${key}">Remove</button>
      </div>
      <p class="line-meta">Size ${item.size} · ${p.palette[ci].name}</p>
      <div class="line-bottom">
        <div class="stepper">
          <button data-qty="${key}|-1" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button data-qty="${key}|1" aria-label="Increase quantity">+</button>
        </div>
        <span class="line-price">${money(p.price * item.qty)}</span>
      </div>
    </div>
  </div>`;
}

function renderBag() {
  if (state.order) {
    renderSuccess();
    return;
  }

  if (state.bag.length === 0) {
    cartBody.innerHTML = `<div class="cart-empty">
      <p class="empty-mark">✳</p>
      <h3>Your bag is empty</h3>
      <p>Ten good pieces are waiting on the loom.</p>
      <button class="btn btn-outline" id="keep-shopping">Browse the collection</button>
    </div>`;
    cartFoot.innerHTML = "";
    return;
  }

  if (state.checkout) {
    renderCheckout();
    return;
  }

  cartBody.innerHTML = state.bag.map(lineHTML).join("");

  const subtotal = bagSubtotal();
  const remaining = Math.max(0, FREE_SHIP - subtotal);
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIP) * 100));

  cartFoot.innerHTML = `
    <div class="ship-meter">
      <p><span>${remaining > 0 ? money(remaining) + " from free shipping" : "Free shipping unlocked"}</span><span>${pct}%</span></p>
      <div class="track"><i style="width:${pct}%"></i></div>
    </div>
    <div class="sum-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
    <button class="btn btn-solid" id="to-checkout">Checkout</button>
    <p class="small-note">Taxes calculated at checkout · Free returns within 30 days</p>`;
}

function renderCheckout() {
  const subtotal = bagSubtotal();
  cartBody.innerHTML = `
    <div class="checkout-head">
      <button id="back-to-bag">← Back to bag</button>
      <h3>Checkout</h3>
    </div>
    <form id="checkout-form" novalidate>
      <div class="field">
        <label for="co-name">Full name</label>
        <input id="co-name" name="fullname" autocomplete="name" required>
      </div>
      <div class="field">
        <label for="co-email">Email</label>
        <input id="co-email" name="email" type="email" autocomplete="email" required>
      </div>
      <div class="field">
        <label for="co-address">Address</label>
        <input id="co-address" name="address" autocomplete="street-address" required>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="co-city">City</label>
          <input id="co-city" name="city" autocomplete="address-level2" required>
        </div>
        <div class="field">
          <label for="co-zip">Postcode</label>
          <input id="co-zip" name="zip" autocomplete="postal-code" required>
        </div>
      </div>
      <div class="field">
        <label for="co-country">Country</label>
        <select id="co-country" name="country" required>
          <option value="India">India</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="Portugal">Portugal</option>
          <option value="Germany">Germany</option>
          <option value="Japan">Japan</option>
        </select>
      </div>
      <div class="pay-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
        <span>Demo checkout. No payment is taken and no card details are collected.</span>
      </div>
      <div class="checkout-total"><span>Total · ${bagCount()} ${bagCount() === 1 ? "piece" : "pieces"}</span><strong>${money(subtotal)}</strong></div>
    </form>`;

  cartFoot.innerHTML = `<button class="btn btn-solid" type="submit" form="checkout-form">Place order · ${money(subtotal)}</button>
    <p class="small-note">Free shipping over ${money(FREE_SHIP)} · Free repairs for life</p>`;
}

function renderSuccess() {
  const order = state.order;
  const lines = order.items.map((i) => `<div class="success-line"><span>${i.name} × ${i.qty} · ${i.size}</span><strong>${money(i.price * i.qty)}</strong></div>`).join("");
  cartBody.innerHTML = `<div class="success">
    <div class="success-mark">${CHECK}</div>
    <h3>Thank you, ${order.firstName}.</h3>
    <p>Your order is confirmed. We cut and pack on Tuesdays and Fridays.</p>
    <span class="order-no">${order.no}</span>
    <p>A confirmation is on its way to ${order.email}.</p>
    <div class="success-summary">
      ${lines}
      <div class="success-line"><span>Shipping</span><strong>${order.shipping === 0 ? "Free" : money(order.shipping)}</strong></div>
      <div class="success-line"><span>Total</span><strong>${money(order.total)}</strong></div>
    </div>
    <button class="btn btn-solid" id="keep-shopping" style="margin-top:20px;width:100%">Keep shopping</button>
  </div>`;
  cartFoot.innerHTML = "";
}

function openCart() {
  lastFocused = document.activeElement;
  state.checkout = false;
  renderBag();
  updateCount();
  scrim.hidden = false;
  cart.classList.add("is-open");
  cart.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  window.setTimeout(() => cartClose.focus(), 60);
}

function closeCart() {
  cart.classList.remove("is-open");
  cart.setAttribute("aria-hidden", "true");
  scrim.hidden = true;
  document.body.classList.remove("no-scroll");
  state.checkout = false;
  state.order = null;
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

/* ── Quick view ────────────────────────────────────────────── */

const pdpState = { id: null, size: null, color: 0, qty: 1 };

function openPDP(id) {
  const product = byId[id];
  if (!product) return;
  pdpState.id = id;
  pdpState.size = product.sizes.length === 1 ? product.sizes[0] : null;
  pdpState.color = 0;
  pdpState.qty = 1;
  renderPDP();
  if (pdp.open) pdp.close();
  pdp.showModal();
  document.body.classList.add("no-scroll");
}

function renderPDP() {
  const p = byId[pdpState.id];
  if (!p) return;
  const color = p.palette[pdpState.color];

  const sizes = p.sizes.map((s) =>
    `<button class="size-btn${pdpState.size === s ? " is-active" : ""}" data-size="${s}" aria-pressed="${pdpState.size === s}">${s}</button>`
  ).join("");

  const colors = p.palette.map((c, i) =>
    `<button class="swatch-dot${i === pdpState.color ? " is-active" : ""}" style="--c:${c.main}" data-pdp-color="${i}" aria-label="${c.name}" aria-pressed="${i === pdpState.color}"></button>`
  ).join("");

  const details = p.details.map(([label, text]) =>
    `<details><summary>${label}</summary><p>${text}</p></details>`
  ).join("");

  pdpContent.innerHTML = `<div class="pdp-grid">
    <div class="pdp-art" style="--bg:${p.bg}">${garmentSVG(p, pdpState.color)}</div>
    <div class="pdp-info">
      <p class="eyebrow">${p.category} · ${p.fabric}</p>
      <h2>${p.name}</h2>
      <p class="pdp-price">${money(p.price)} <span>· ${p.rating.toFixed(1)} ★ ${p.reviews} reviews</span></p>
      <p class="pdp-desc">${p.desc}</p>

      <p class="opt-label">Colour <em>${color.name}</em></p>
      <div class="color-row">${colors}</div>

      <p class="opt-label">Size <em>${pdpState.size || "Select a size"}</em></p>
      <div class="size-row">${sizes}</div>

      <div class="pdp-buy">
        <div class="stepper">
          <button data-pdp-qty="-1" aria-label="Decrease quantity">−</button>
          <span>${pdpState.qty}</span>
          <button data-pdp-qty="1" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn btn-solid" id="pdp-add">Add to bag · ${money(p.price * pdpState.qty)}</button>
      </div>
      <p class="pdp-hint" id="pdp-hint" role="status"></p>

      <div class="pdp-details">${details}</div>
    </div>
  </div>`;
}

/* ── Events ────────────────────────────────────────────────── */

renderFilters();
renderGrid();
updateCount(false);

/* filters */
filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  state.filter = btn.dataset.filter;
  renderFilters();
  renderGrid();
});

searchEl.addEventListener("input", (e) => {
  state.query = e.target.value;
  renderGrid();
});

sortEl.addEventListener("change", (e) => {
  state.sort = e.target.value;
  renderGrid();
});

$("#clear-filters").addEventListener("click", () => {
  state.filter = "All";
  state.query = "";
  searchEl.value = "";
  renderFilters();
  renderGrid();
});

/* grid */
grid.addEventListener("click", (e) => {
  const heart = e.target.closest("[data-wish]");
  if (heart) {
    const id = heart.dataset.wish;
    const p = byId[id];
    if (state.wish.has(id)) {
      state.wish.delete(id);
      heart.classList.remove("is-on");
      heart.setAttribute("aria-pressed", "false");
      toast(`${p.name} removed from saved pieces`);
    } else {
      state.wish.add(id);
      heart.classList.add("is-on");
      heart.setAttribute("aria-pressed", "true");
      toast(`${p.name} saved for later`);
    }
    persist();
    return;
  }

  const colorBtn = e.target.closest("[data-color]");
  if (colorBtn) {
    const [id, idx] = colorBtn.dataset.color.split(":");
    const card = colorBtn.closest(".card");
    const p = byId[id];
    const ci = Number(idx);
    card.querySelectorAll(".swatch-dot").forEach((s) => {
      const on = s === colorBtn;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-pressed", String(on));
    });
    const oldSvg = card.querySelector(".card-art > svg");
    if (oldSvg) {
      const holder = document.createElement("div");
      holder.innerHTML = garmentSVG(p, ci);
      card.querySelector(".card-art").replaceChild(holder.firstElementChild, oldSvg);
    }
    return;
  }

  const quick = e.target.closest("[data-view]");
  if (quick) {
    openPDP(quick.dataset.view);
    return;
  }

  const art = e.target.closest(".card-art");
  if (art) openPDP(art.closest(".card").dataset.id);
});

/* bag drawer */
$("#open-cart").addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
scrim.addEventListener("click", closeCart);

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (cart.classList.contains("is-open")) closeCart();
});

cart.addEventListener("click", (e) => {
  const qtyBtn = e.target.closest("[data-qty]");
  if (qtyBtn) {
    const [id, size, colorRaw, deltaRaw] = qtyBtn.dataset.qty.split("|");
    const color = Number(colorRaw);
    const delta = Number(deltaRaw);
    const item = state.bag.find((i) => i.id === id && i.size === size && i.color === color);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) state.bag = state.bag.filter((i) => i !== item);
    if (item.qty > 9) item.qty = 9;
    persist();
    updateCount();
    renderBag();
    return;
  }

  const removeBtn = e.target.closest("[data-remove]");
  if (removeBtn) {
    const [id, size, colorRaw] = removeBtn.dataset.remove.split("|");
    const color = Number(colorRaw);
    state.bag = state.bag.filter((i) => !(i.id === id && i.size === size && i.color === color));
    persist();
    updateCount();
    renderBag();
    return;
  }

  if (e.target.closest("#to-checkout")) {
    state.checkout = true;
    renderBag();
    window.setTimeout(() => $("#co-name")?.focus(), 80);
    return;
  }

  if (e.target.closest("#back-to-bag")) {
    state.checkout = false;
    renderBag();
    return;
  }

  if (e.target.closest("#keep-shopping")) {
    closeCart();
    document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
  }
});

cart.addEventListener("submit", (e) => {
  if (e.target.id !== "checkout-form") return;
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const items = state.bag.map((i) => {
    const p = byId[i.id];
    return { name: p.name, size: i.size, qty: i.qty, price: p.price };
  });
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal >= FREE_SHIP ? 0 : 12;

  state.order = {
    no: "TN-" + Math.floor(100000 + Math.random() * 900000),
    firstName: form.fullname.value.trim().split(" ")[0] || "friend",
    email: form.email.value.trim(),
    items,
    shipping,
    total: subtotal + shipping
  };
  state.bag = [];
  state.checkout = false;
  persist();
  updateCount();
  renderBag();
  cartBody.scrollTop = 0;
  toast("Order placed — thank you");
});

/* focus trap for the drawer */
cart.addEventListener("keydown", (e) => {
  if (e.key !== "Tab" || !cart.classList.contains("is-open")) return;
  const focusables = $$("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])", cart)
    .filter((el) => !el.disabled && el.offsetParent !== null);
  if (focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

/* quick view */
pdpClose.addEventListener("click", () => pdp.close());
pdp.addEventListener("click", (e) => {
  if (e.target === pdp) pdp.close();
});
pdp.addEventListener("close", () => {
  document.body.classList.remove("no-scroll");
});

pdpContent.addEventListener("click", (e) => {
  const sizeBtn = e.target.closest("[data-size]");
  if (sizeBtn) {
    pdpState.size = sizeBtn.dataset.size;
    renderPDP();
    return;
  }

  const colorBtn = e.target.closest("[data-pdp-color]");
  if (colorBtn) {
    pdpState.color = Number(colorBtn.dataset.pdpColor);
    renderPDP();
    return;
  }

  const qtyBtn = e.target.closest("[data-pdp-qty]");
  if (qtyBtn) {
    pdpState.qty = Math.max(1, Math.min(9, pdpState.qty + Number(qtyBtn.dataset.pdpQty)));
    renderPDP();
    return;
  }

  if (e.target.closest("#pdp-add")) {
    if (!pdpState.size) {
      const hint = $("#pdp-hint");
      if (hint) hint.textContent = "Choose a size first — sizes run true.";
      const row = $(".size-row");
      if (row) {
        row.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(0)" }],
          { duration: 260, easing: "ease-in-out" }
        );
      }
      return;
    }
    addToBag(pdpState.id, pdpState.size, pdpState.qty, pdpState.color);
    pdp.close();
  }
});

/* header / nav */
$("#nav-search").addEventListener("click", () => {
  document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => searchEl.focus({ preventScroll: true }), 450);
});

const MENU_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
const CLOSE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

function setMenu(open) {
  mobileMenu.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuToggle.innerHTML = open ? CLOSE_ICON : MENU_ICON;
}

menuToggle.addEventListener("click", () => setMenu(mobileMenu.hidden));

mobileMenu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

/* newsletter */
$("#newsletter-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const input = $("#newsletter-email");
  const note = $("#newsletter-note");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
  if (!valid) {
    note.textContent = "Please enter a valid email address.";
    note.classList.add("err");
    input.focus();
    return;
  }
  note.classList.remove("err");
  note.textContent = "You’re on the list. The next letter goes out on the first of the month.";
  form.reset();
  toast("Subscribed to notes from the loom");
});

/* reveal on scroll */
const revealEls = $$(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}
