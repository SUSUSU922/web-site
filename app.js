const STORAGE_KEYS = {
  favorites: "decafSearch:favorites",
  compare: "decafSearch:compare",
};

const ASSETS = {
  hero: "assets/generated/hero-coffee-clean.png",
  products: [
    "assets/generated/product-bag-brown.svg",
    "assets/generated/product-bag-blue.svg",
    "assets/generated/product-bag-copper.svg",
    "assets/generated/product-bag-white.svg",
  ],
  articles: [
    "assets/generated/article-beans.png",
    "assets/generated/article-drip.png",
    "assets/generated/article-cookies.png",
    "assets/reference/column.png",
  ],
};

const state = {
  products: [],
  filteredProducts: [],
  favorites: new Set(),
  compare: new Set(),
  keyword: "",
  filters: {},
  sort: "popular",
  pageSize: 6,
  visibleFavorites: 5,
  route: "#/",
};

const ratings = [4.6, 4.4, 4.5, 4.3, 4.4, 4.5, 4.2, 4.7, 4.1, 4.6];
const reviewCounts = [128, 96, 74, 56, 81, 63, 42, 109, 38, 91];

const sceneCards = [
  {
    title: "夜でも安心",
    text: "カフェインを気にせず、リラックスタイムを楽しみたい方へ。",
    tone: "night",
    href: "#/category/night",
    products: ["decaf_001", "decaf_002", "decaf_003"],
  },
  {
    title: "妊娠中・授乳中向け",
    text: "大切な時期も、安心してコーヒーを楽しみたい方へ。",
    tone: "maternity",
    href: "#/category/night",
    products: ["decaf_004", "decaf_006", "decaf_007"],
  },
  {
    title: "カフェイン制限中",
    text: "健康や休息管理のために、カフェインを控えたい方へ。",
    tone: "health",
    href: "#/category/night",
    products: ["decaf_009", "decaf_010", "decaf_011"],
  },
];

const articles = [
  {
    title: "デカフェコーヒーとは？カフェインレスとの違いを解説",
    category: "基礎知識",
    date: "2024.05.12",
    image: ASSETS.articles[0],
    text: "デカフェとカフェインレスの違いや、カフェインが除去される仕組みをわかりやすく解説します。",
  },
  {
    title: "デカフェでも美味しい！おすすめの淹れ方",
    category: "楽しみ方",
    date: "2024.05.10",
    image: ASSETS.articles[1],
    text: "風味を最大限に引き出すための豆の量やお湯の温度、抽出時間のポイントを紹介します。",
  },
  {
    title: "夜のリラックスタイムに。デカフェコーヒーの楽しみ方",
    category: "ライフスタイル",
    date: "2024.05.08",
    image: ASSETS.articles[2],
    text: "カフェインを気にせず、夜でもコーヒーを楽しめるライフスタイルを提案します。",
  },
  {
    title: "カフェイン除去方法の種類とそれぞれの特徴",
    category: "基礎知識",
    date: "2024.05.05",
    image: ASSETS.hero,
    text: "水抽出、CO2抽出、有機溶媒抽出など、代表的な方式の違いを比較します。",
  },
  {
    title: "デカフェの生産地はどこ？主要な産地を紹介",
    category: "生産地",
    date: "2024.05.03",
    image: ASSETS.articles[0],
    text: "コロンビアやエチオピアなど、デカフェで人気の生産地と特徴を紹介します。",
  },
  {
    title: "カフェインの効果とは？体への影響をやさしく解説",
    category: "基礎知識",
    date: "2024.05.01",
    image: ASSETS.articles[1],
    text: "カフェインが体に与える影響や、摂取量の目安を丁寧にまとめました。",
  },
  {
    title: "妊娠中や授乳中にも安心？デカフェの選び方",
    category: "ライフスタイル",
    date: "2024.04.28",
    image: ASSETS.articles[2],
    text: "カフェインを控えたい時期の選び方と、注意したいポイントを整理します。",
  },
  {
    title: "デカフェで作る簡単アレンジレシピ 3選",
    category: "レシピ",
    date: "2024.04.25",
    image: ASSETS.hero,
    text: "ラテやアイスコーヒーなど、自宅で楽しめるアレンジを紹介します。",
  },
  {
    title: "環境にやさしいデカフェを選ぶということ",
    category: "サステナビリティ",
    date: "2024.04.20",
    image: ASSETS.articles[0],
    text: "製法や認証に注目しながら、環境に配慮した選択肢を考えます。",
  },
];

const icon = {
  bean: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.8 3.4c4.2 2.4 5.3 8.4 2.4 13.4-2.9 5-8.6 7-12.8 4.6S1.1 13 4 8c2.9-5 8.6-7 12.8-4.6Zm-1.1 2c-3-1.7-7.4-.1-9.7 3.8-2.3 3.9-1.7 8.4 1.4 10.1 1.9 1.1 4.4.9 6.6-.3-2.8-2.9-2.1-6.4.2-9.9.8-1.2 1.5-2.4 1.5-3.7Z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 5.8c-1.9-2.1-5-2-6.8.1L12 8.1 10 5.9C8.2 3.8 5.1 3.7 3.2 5.8 1.2 8 .9 11.6 3.6 14.3L12 22l8.4-7.7c2.7-2.7 2.4-6.3.4-8.5Z"/></svg>`,
  user: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.6-4.3 4.2-6.4 8-6.4s6.4 2.1 8 6.4"/></svg>`,
  cup: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h12v5a6 6 0 0 1-12 0V8Z"/><path d="M16 10h2.2a2.8 2.8 0 0 1 0 5.6H16"/><path d="M3 20h16"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/><circle cx="8" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="12" cy="18" r="2"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.6 7-13a7 7 0 0 0-14 0c0 6.4 7 13 7 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
  drop: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2s7 8.2 7 13a7 7 0 0 1-14 0c0-4.8 7-13 7-13Z"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4C11 4 5 9.5 5 18c8.6 0 15-6 15-14Z"/><path d="M5 18c3-4.4 6.4-7.3 11-9"/></svg>`,
  scale: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M5 7h14M7 7l-4 7h8L7 7Zm10 0-4 7h8l-4-7Z"/></svg>`,
  bookmark: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4V3Z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3.1 6.4 7 .9-5.1 4.9 1.3 6.9-6.3-3.3-6.2 3.3 1.2-6.9-5-4.9 7-.9L12 2Z"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14"/></svg>`,
  external: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4 10 14"/><path d="M20 14v6H4V4h6"/></svg>`,
};

function splitValues(value) {
  return String(value || "")
    .split("/")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase().normalize("NFKC");
}

function parsePrice(value) {
  const number = String(value || "").replace(/[^\d]/g, "");
  return number ? Number(number) : 0;
}

function parseRate(value) {
  const match = String(value || "").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeProduct(product, index) {
  const roastValues = splitValues(product.roast);
  const flavorValues = splitValues(product.flavor_category);
  return {
    ...product,
    index,
    priceNumber: parsePrice(product.price),
    volumeNumber: Number(product.volume) || 0,
    roastValues,
    originValues: splitValues(product.origin),
    decafMethodValues: splitValues(product.decaf_method),
    flavorValues,
    coffeeTypeValues: splitValues(product.coffee_type),
    beanTypeValues: splitValues(product.bean_type),
    certificationValues: splitValues(product.certification),
    rating: ratings[index % ratings.length],
    reviews: reviewCounts[index % reviewCounts.length],
    image: ASSETS.products[index % ASSETS.products.length],
    shortRoast: roastValues[0]?.replace(/\(.+\)/, "") || "中深煎り",
    primaryFlavor: flavorValues[0] || "甘味",
  };
}

async function fetchProducts() {
  const response = await fetch("products.json");
  if (!response.ok) throw new Error(`products.json load failed: ${response.status}`);
  const products = await response.json();
  state.products = products.map(normalizeProduct);
  state.filteredProducts = [...state.products];
}

function readStoredSet(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function writeStoredSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

function loadSavedState() {
  state.favorites = readStoredSet(STORAGE_KEYS.favorites);
  state.compare = readStoredSet(STORAGE_KEYS.compare);
}

function cleanSavedIds() {
  const ids = new Set(state.products.map((product) => product.id));
  state.favorites = new Set([...state.favorites].filter((id) => ids.has(id)));
  state.compare = new Set([...state.compare].filter((id) => ids.has(id)));
  writeStoredSet(STORAGE_KEYS.favorites, state.favorites);
  writeStoredSet(STORAGE_KEYS.compare, state.compare);
}

function normalizeFilters(rawFilters = {}) {
  return Object.fromEntries(
    Object.entries(rawFilters)
      .map(([key, value]) => [key, Array.isArray(value) ? value : splitValues(value)])
      .filter(([, values]) => values.length > 0 && !values.includes("すべて"))
  );
}

function matchesKeyword(product, keyword) {
  const needle = normalizeText(keyword);
  if (!needle) return true;
  return [
    product.name,
    product.brand,
    product.origin,
    product.roast,
    product.decaf_method,
    product.flavor_category,
    product.coffee_type,
    product.bean_type,
    product.certification,
    product.description,
  ]
    .map(normalizeText)
    .join(" ")
    .includes(needle);
}

function hasAny(productValues, filterValues) {
  if (!filterValues.length) return true;
  const productText = productValues.map(normalizeText).join(" ");
  return filterValues.some((value) => productText.includes(normalizeText(value)));
}

function matchesFilters(product, filters) {
  return Object.entries(filters).every(([key, values]) => {
    if (key === "roast") return hasAny(product.roastValues, values);
    if (key === "origin") return hasAny(product.originValues, values);
    if (key === "decaf_method") return hasAny(product.decafMethodValues, values);
    if (key === "flavor_category") return hasAny(product.flavorValues, values);
    if (key === "coffee_type") return hasAny(product.coffeeTypeValues, values);
    if (key === "bean_type") return hasAny(product.beanTypeValues, values);
    if (key === "certification") return hasAny(product.certificationValues, values);
    if (key === "caffeine_removal_rate") {
      const productRate = parseRate(product.caffeine_removal_rate);
      return values.some((rate) => productRate >= parseRate(rate));
    }
    if (key === "price_max") {
      const max = Number(values[0]) || 10000;
      return product.priceNumber <= max;
    }
    if (key === "volume") {
      return values.some((volume) => product.volumeNumber >= Number(volume));
    }
    return hasAny(splitValues(product[key]), values);
  });
}

function sortProducts(products) {
  const sorted = [...products];
  if (state.sort === "priceLow") sorted.sort((a, b) => a.priceNumber - b.priceNumber);
  if (state.sort === "priceHigh") sorted.sort((a, b) => b.priceNumber - a.priceNumber);
  if (state.sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
  return sorted;
}

function searchProducts({ keyword = state.keyword, filters = state.filters } = {}) {
  state.keyword = keyword;
  state.filters = normalizeFilters(filters);
  state.filteredProducts = sortProducts(
    state.products.filter((product) => matchesKeyword(product, state.keyword) && matchesFilters(product, state.filters))
  );
}

function productById(id) {
  return state.products.find((product) => product.id === id);
}

function toggleFavorite(productId) {
  if (state.favorites.has(productId)) state.favorites.delete(productId);
  else state.favorites.add(productId);
  writeStoredSet(STORAGE_KEYS.favorites, state.favorites);
}

function toggleCompare(productId) {
  if (state.compare.has(productId)) state.compare.delete(productId);
  else state.compare.add(productId);
  writeStoredSet(STORAGE_KEYS.compare, state.compare);
}

function clearCompare() {
  state.compare.clear();
  writeStoredSet(STORAGE_KEYS.compare, state.compare);
}

function activeClass(route) {
  return state.route === route ? "is-active" : "";
}

function renderShell(content) {
  document.getElementById("site").innerHTML = `
    <header class="site-header">
      <a class="brand" href="#/" aria-label="Decaf Search home">
        <span class="brand-mark">${icon.bean}</span>
        <span><strong>Decaf Search</strong><small>デカフェコーヒーを、もっと自由に。</small></span>
      </a>
      <nav class="nav">
        <a class="${activeClass("#/")}" href="#/">ホーム</a>
        <a class="${activeClass("#/search")}" href="#/search">検索</a>
        <a class="${activeClass("#/decaffeination")}" href="#/decaffeination">カフェイン除去方法</a>
        <a class="${activeClass("#/column")}" href="#/column">コラム</a>
        <a class="${activeClass("#/compare")}" href="#/compare">比較リスト</a>
        <a class="${activeClass("#/favorite")}" href="#/favorite">お気に入り</a>
      </nav>
      <div class="header-actions">
        <a class="icon-link ${activeClass("#/favorite")}" href="#/favorite" aria-label="お気に入り">${icon.heart}</a>
        <span class="divider"></span>
        <button class="login-button" type="button">${icon.user}<span>ログイン</span></button>
      </div>
    </header>
    <main class="page page-enter">${content}</main>
    ${renderFooter()}
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <a class="brand footer-brand" href="#/">
        <span class="brand-mark">${icon.bean}</span>
        <span><strong>Decaf Search</strong><small>デカフェコーヒーを、もっと自由に。</small></span>
      </a>
      <nav>
        <a href="#">利用規約</a>
        <a href="#">プライバシーポリシー</a>
        <a href="#">運営会社</a>
        <a href="#">お問い合わせ</a>
      </nav>
    </footer>
  `;
}

function productChips(product, limit = 3) {
  return [product.shortRoast, ...product.originValues.slice(0, 1), ...product.flavorValues.slice(0, limit - 2)]
    .filter(Boolean)
    .slice(0, limit)
    .map((value) => `<span class="chip">${escapeHtml(value)}</span>`)
    .join("");
}

function roastBeans(product) {
  const score = product.roast.includes("浅") ? 2 : product.roast.includes("中深") ? 3 : product.roast.includes("深") ? 5 : 3;
  return `<span class="bean-rating">${Array.from({ length: 5 }, (_, index) => `<i class="${index < score ? "filled" : ""}"></i>`).join("")}</span>`;
}

function renderProductCard(product, options = {}) {
  const compact = options.compact ? " product-card--compact" : "";
  const favoriteActive = state.favorites.has(product.id) ? " is-active" : "";
  const compareActive = state.compare.has(product.id) ? "checked" : "";
  return `
    <article class="product-card${compact}" style="--delay:${(product.index % 8) * 55}ms">
      <button class="heart-button${favoriteActive}" type="button" data-favorite-id="${product.id}" aria-label="お気に入り">${icon.heart}</button>
      <div class="product-media"><img src="${product.image}" alt="${escapeHtml(product.name)}" /></div>
      <div class="product-info">
        <p class="brand-name">${escapeHtml(product.brand)}</p>
        <h3>${escapeHtml(product.name)}</h3>
        <div class="chips">${productChips(product)}</div>
        <dl class="product-meta">
          <div><dt>生産地</dt><dd>${escapeHtml(product.origin)}</dd></div>
          <div><dt>除去方法</dt><dd>${escapeHtml(product.decaf_method)}</dd></div>
          <div><dt>除去率</dt><dd>${escapeHtml(product.caffeine_removal_rate)}</dd></div>
        </dl>
        <div class="price-row"><strong>¥${Number(product.priceNumber).toLocaleString()}</strong><small>（税込）</small></div>
      </div>
      <label class="compare-check">
        <input type="checkbox" data-compare-id="${product.id}" ${compareActive} />
        <span>比較リストに追加</span>
      </label>
    </article>
  `;
}

function renderHeroCompact(title, lead, breadcrumb = "", image = ASSETS.hero) {
  return `
    <section class="sub-hero">
      <div class="sub-hero__text">
        ${breadcrumb ? `<div class="breadcrumb">${breadcrumb}</div>` : ""}
        <h1>${title}</h1>
        <p>${lead}</p>
      </div>
      <img src="${image}" alt="" />
    </section>
  `;
}

function renderHome() {
  const popular = state.products.slice(0, 3);
  renderShell(`
    <section class="home-hero">
      <div class="home-hero__copy">
        <h1>デカフェコーヒーを探そう。<br />あなたにぴったりの一杯が見つかる。</h1>
        <p>産地・味わい・カフェイン除去方法など、こだわり条件でデカフェコーヒーを簡単に検索・比較できます。</p>
      </div>
      <div class="home-hero__visual"><img src="${ASSETS.hero}" alt="コーヒーカップと植物" /></div>
      <div class="search-panel">
        <form class="hero-search" data-home-search>
          <label>${icon.search}<input data-home-keyword type="search" placeholder="キーワードで検索（例：エチオピア、フルーティ、水抽出）" /></label>
          <button class="button button--primary" type="submit">検索する</button>
        </form>
        <div class="popular-keywords">
          <span>人気の検索キーワード</span>
          ${["エチオピア", "コロンビア", "深煎り", "フルーティ", "水抽出", "チョコレート感"].map((word) => `<button type="button" data-quick-search="${word}">${word}</button>`).join("")}
        </div>
        <div class="search-shortcuts">
          <a href="#/search">${icon.filter}<span>条件で探す<br /><small>（詳細検索）</small></span></a>
          <a href="#/search?origin=エチオピア">${icon.pin}<span>産地から探す</span></a>
          <a href="#/search?roast=深煎り">${icon.bean}<span>焙煎度から探す</span></a>
          <a href="#/search?method=水抽出">${icon.drop}<span>カフェイン除去方法から探す</span></a>
          <a href="#/search?flavor=チョコ">${icon.leaf}<span>味の特徴から探す</span></a>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section-heading">
        <h2><span>${icon.star}</span>人気商品</h2>
        <a class="text-link" href="#/search">すべて見る ${icon.arrow}</a>
      </div>
      <div class="popular-grid">${popular.map((product) => renderProductCard(product, { compact: true })).join("")}</div>
      <a class="button button--ghost centered" href="#/search">人気商品をもっと見る ${icon.arrow}</a>
    </section>
    <section class="section">
      <div class="section-heading section-heading--left">
        <h2><span>${icon.user}</span>シーン・目的から探す</h2>
        <p>あなたの生活に合わせたおすすめのデカフェコーヒーをご紹介します。</p>
      </div>
      <div class="scene-grid">${sceneCards.map(renderSceneCard).join("")}</div>
    </section>
    <section class="wide-cta">
      <div class="round-icon">${icon.search}</div>
      <div>
        <h2>もっと詳しく探したい方へ</h2>
        <p>産地・焙煎度・味の特徴・カフェイン除去方法など、こだわりの条件で検索できます。</p>
      </div>
      <a class="button button--primary" href="#/search">詳細検索ページへ ${icon.arrow}</a>
    </section>
    <section class="feature-row">
      ${[
        ["デカフェに特化", "デカフェコーヒーだけを厳選して掲載。", icon.cup],
        ["簡単に比較", "気になる商品を比べて、自分にぴったりを見つけられる。", icon.search],
        ["信頼できる情報", "除去方法や味わいなど、正確な情報をお届け。", icon.bookmark],
        ["各ショップで購入", "気になる商品は販売元の公式サイトで購入できます。", icon.external],
      ].map(([title, text, svg]) => `<article>${svg}<h3>${title}</h3><p>${text}</p></article>`).join("")}
    </section>
  `);
}

function renderSceneCard(scene) {
  const products = scene.products.map(productById).filter(Boolean);
  return `
    <article class="scene-card scene-card--${scene.tone}">
      <div>
        <h3>${scene.title}</h3>
        <p>${scene.text}</p>
      </div>
      <div class="scene-products">${products.map((product) => `<img src="${product.image}" alt="" />`).join("")}</div>
      <a class="button button--light" href="${scene.href}">おすすめを見る ${icon.arrow}</a>
    </article>
  `;
}

function renderSearch() {
  const params = new URLSearchParams(location.hash.split("?")[1] || "");
  if (params.size) {
    state.keyword = params.get("keyword") || "";
    state.filters = normalizeFilters({
      origin: params.get("origin") || "",
      roast: params.get("roast") || "",
      decaf_method: params.get("method") || "",
      flavor_category: params.get("flavor") || "",
    });
    searchProducts();
  }
  const products = state.filteredProducts.slice(0, state.pageSize);
  renderShell(`
    ${renderHeroCompact("条件からデカフェコーヒーを探す", "焙煎度、産地、除去方法など、こだわり条件で検索できます。", "ホーム 〉 検索")}
    <section class="search-layout">
      ${renderFilters()}
      <div class="results-area">
        <div class="results-toolbar">
          <strong>検索結果：${state.filteredProducts.length}件</strong>
          <label>並び替え
            <select data-sort>
              <option value="popular" ${state.sort === "popular" ? "selected" : ""}>人気順</option>
              <option value="rating" ${state.sort === "rating" ? "selected" : ""}>評価順</option>
              <option value="priceLow" ${state.sort === "priceLow" ? "selected" : ""}>価格が安い順</option>
              <option value="priceHigh" ${state.sort === "priceHigh" ? "selected" : ""}>価格が高い順</option>
            </select>
          </label>
        </div>
        <div class="product-grid">${products.map(renderProductCard).join("")}</div>
        <div class="pagination"><button>‹</button><b>1</b><span>2</span><span>3</span><span>4</span><span>5</span><em>...</em><span>21</span><button>›</button></div>
        <div class="split-cta">
          <a href="#/category/night">${icon.cup}<span><strong>シーンから探す</strong><small>目的やシーンに合わせておすすめをご紹介します。</small></span>${icon.arrow}</a>
          <a href="#/compare">${icon.scale}<span><strong>比較リストを見る</strong><small>気になる商品を比較して見つけましょう。</small></span>${icon.arrow}</a>
        </div>
      </div>
    </section>
  `);
}

function renderFilters() {
  const priceMax = Number(state.filters.price_max?.[0] || 10000);
  const groups = [
    ["roast", "焙煎度", ["浅煎り", "中浅煎り", "中深煎り", "深煎り", "極深煎り"]],
    ["origin", "生産地（国・地域）", ["エチオピア", "コロンビア", "ブラジル", "グアテマラ", "インドネシア", "メキシコ"]],
    ["caffeine_removal_rate", "除去率", ["90%以上", "97%以上", "99%以上"]],
    ["flavor_category", "フレーバーノート", ["チョコ", "ナッツ", "フルーティ", "フローラル", "甘味", "ハーバル"]],
    ["coffee_type", "シングル or ブレンド", ["シングル", "ブレンド"]],
    ["decaf_method", "デカフェ処理方法", ["水抽出", "CO2", "有機溶媒抽出"]],
    ["bean_type", "豆 / 粉", ["豆", "粉"]],
    ["volume", "内容量", ["100", "200", "500"]],
    ["certification", "オーガニック / 認証", ["有機JAS", "フェアトレード"]],
  ];
  return `
    <aside class="filter-panel">
      <h2>${icon.filter} 条件で探す</h2>
      <label class="filter-search">${icon.search}<input data-search-input type="search" value="${escapeHtml(state.keyword)}" placeholder="キーワード" /></label>
      ${groups.map(([key, title, values]) => `
        <fieldset>
          <legend>${title}<span>?</span></legend>
          <div class="filter-options">
            ${values.map((value) => {
              const checked = state.filters[key]?.includes(value) ? "checked" : "";
              const label = value === "100" ? "100g" : value === "200" ? "200g" : value === "500" ? "500g以上" : value;
              return `<label><input type="checkbox" data-filter="${key}" value="${value}" ${checked} /><span>${label}</span></label>`;
            }).join("")}
          </div>
        </fieldset>
      `).join("")}
      <fieldset class="range-fieldset">
        <legend>価格帯<span>?</span></legend>
        <div class="price-range">
          <div class="price-range__labels"><span>¥0</span><strong data-price-output>〜¥${priceMax.toLocaleString()}</strong><span>¥10,000以上</span></div>
          <input data-price-range type="range" min="0" max="10000" step="100" value="${priceMax}" />
        </div>
      </fieldset>
      <button class="button button--primary full" type="button" data-run-search>この条件で検索する</button>
      <button class="button button--outline full" type="button" data-reset-search>条件をリセット</button>
    </aside>
  `;
}

function renderCategoryNight() {
  const products = state.products
    .filter((product) => product.decaf_method.includes("水") || product.caffeine_removal_rate.includes("99"))
    .slice(0, 6);
  renderShell(`
    <section class="category-hero">
      <div>
        <div class="breadcrumb">ホーム 〉 シーン・目的から探す 〉 夜でも安心</div>
        <h1>夜でも安心のデカフェコーヒー</h1>
        <p>カフェインを気にせず、リラックスタイムを楽しみたい方へ。夜の時間にぴったりな、カフェイン残存量が少ないデカフェコーヒーを厳選しました。</p>
      </div>
      <img src="${ASSETS.hero}" alt="" />
    </section>
    <section class="point-card">
      <h2>選定のポイント</h2>
      <div>
        <article>${icon.drop}<h3>低カフェイン残存量</h3><p>カフェイン残存量が少ないものを選定</p></article>
        <article>${icon.bean}<h3>深煎り中心</h3><p>夜でも飲みやすい深煎りを中心にセレクト</p></article>
        <article>${icon.cup}<h3>リラックス向け</h3><p>まろやかでコクのある味わいを重視</p></article>
      </div>
    </section>
    <section class="section">
      <div class="results-toolbar">
        <strong>検索結果：${products.length}件</strong>
        <a class="button button--outline" href="#/search">絞り込み条件</a>
      </div>
      <div class="product-grid">${products.map(renderProductCard).join("")}</div>
    </section>
    <section class="wide-cta">
      <div class="round-icon">${icon.search}</div>
      <div><h2>さらに細かく条件検索する</h2><p>焙煎度・産地・カフェイン除去方法・味の特徴など、こだわりの条件で探せます。</p></div>
      <a class="button button--primary" href="#/search">条件を指定して検索する ${icon.arrow}</a>
    </section>
    <div class="save-row">${icon.bookmark}<span>この条件での検索を保存する</span></div>
  `);
}

function renderDecaffeination() {
  renderShell(`
    ${renderHeroCompact("デカフェのカフェイン除去方法とは？", "除去方法によって味・安全性・価格帯などに違いがあります。それぞれの特徴を理解して、自分にぴったりの一杯を見つけましょう。", "ホーム 〉 カフェイン除去方法")}
    <section class="method-summary">
      <h2>${icon.leaf} 除去方法の比較サマリー</h2>
      <div class="summary-table">
        ${["水抽出（スイスウォーター）", "CO2抽出", "有機溶媒抽出"].map((name, index) => `
          <article>
            <h3>${index === 0 ? icon.drop : index === 1 ? "CO₂" : icon.leaf} ${name}</h3>
            <p>${["水を使ってカフェインを除去。薬剤不使用で安全性が高い。", "二酸化炭素を高圧で使い、すっきりした味わいに。", "天然由来の有機溶媒を使い、コストを抑えやすい。"][index]}</p>
            <dl><div><dt>味への影響</dt><dd>★★★★${index === 0 ? "★" : "☆"}</dd></div><div><dt>安全性</dt><dd>${index === 0 ? "とても高い" : "高い"}</dd></div><div><dt>流通量</dt><dd>${index === 2 ? "多い" : "やや少ない"}</dd></div></dl>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="section">
      <h2 class="leaf-heading">${icon.leaf} 各除去方法の詳細</h2>
      <div class="method-grid">
        ${renderMethodCard("水抽出", "薬剤不使用", "コーヒー生豆をお湯に浸し、カフェインを含む成分を溶け出させます。特殊フィルターでカフェインだけを除去し、風味成分を戻します。", "この方法の商品を見る", "水抽出")}
        ${renderMethodCard("CO2抽出", "超臨界CO2", "二酸化炭素を高圧・高温で超臨界状態にし、カフェインを選択的に溶かし出します。すっきりした味わいになりやすい方法です。", "この方法の商品を見る", "CO2")}
        ${renderMethodCard("有機溶媒抽出", "酢酸エチルなど", "天然由来の有機溶媒を使ってカフェインを溶かし出します。コストを抑えやすく、広く普及しています。", "この方法の商品を見る", "有機溶媒抽出")}
      </div>
    </section>
    <section class="faq-section">
      <h2>よくある質問</h2>
      ${["カフェイン除去方法は安全ですか？", "味や風味は落ちてしまいますか？", "妊娠中や授乳中でも飲めますか？"].map((q, index) => `
        <details class="faq" ${index === 0 ? "open" : ""}>
          <summary>${icon.search}<span>${q}</span></summary>
          <p>はい。流通している主な方式は安全基準を満たしています。体質や体調により感じ方は異なるため、気になる場合は医師にご相談ください。</p>
        </details>
      `).join("")}
    </section>
    <section class="wide-cta"><div>${icon.cup}</div><div><h2>自分に合うデカフェコーヒーを探してみませんか？</h2><p>条件検索や比較リストを使って、ぴったりの一杯を見つけましょう。</p></div><a class="button button--primary" href="#/search">条件から探す ${icon.arrow}</a><a class="button button--outline" href="#/compare">比較リストを見る ${icon.arrow}</a></section>
  `);
}

function renderMethodCard(title, badge, text, linkText, method) {
  return `
    <article class="method-card">
      <h3>${title}<span>${badge}</span></h3>
      <h4>仕組み</h4>
      <p>${text}</p>
      <div class="process-line"><span>${icon.cup}</span><i></i><span>${icon.bean}</span><i></i><span>${icon.leaf}</span></div>
      <div class="pros-cons"><div><b>メリット</b><p>薬剤を一切使用しない、風味を保ちやすい</p></div><div><b>デメリット</b><p>コストが高く、取り扱いが少ない</p></div></div>
      <a class="button button--outline full" href="#/search?method=${encodeURIComponent(method)}">${linkText} ${icon.arrow}</a>
    </article>
  `;
}

function renderColumn() {
  renderShell(`
    ${renderHeroCompact("コラム", "デカフェコーヒーに関する知識や楽しみ方、ライフスタイルに役立つ情報をお届けします。", "ホーム 〉 コラム")}
    <section class="column-layout">
      <div>
        <h2>新着記事</h2>
        <div class="article-grid">${articles.map(renderArticleCard).join("")}</div>
        <div class="pagination"><button>‹</button><b>1</b><span>2</span><span>3</span><span>4</span><span>5</span><em>...</em><span>12</span><button>›</button></div>
      </div>
      <aside class="column-sidebar">
        <div class="side-box"><h3>カテゴリ</h3>${["基礎知識", "楽しみ方", "生産地", "ライフスタイル", "レシピ", "サステナビリティ"].map((cat, index) => `<a href="#">${icon.leaf}<span>${cat}</span><b>${[12, 9, 7, 10, 6, 5][index]}</b></a>`).join("")}<a href="#">すべてのカテゴリを見る ${icon.arrow}</a></div>
        <div class="side-box"><h3>人気の記事</h3>${articles.slice(0, 3).map((article, index) => `<a class="mini-article" href="#"><img src="${article.image}" alt="" /><span><b>${index + 1}</b>${article.title}<small>${article.date}</small></span></a>`).join("")}</div>
        <div class="side-box subscribe">${icon.bookmark}<h3>コラムの更新情報を受け取る</h3><p>新着記事やお役立ち情報をメールでお届けします。</p><input placeholder="メールアドレスを入力" /><button class="button button--primary full">登録する</button></div>
      </aside>
    </section>
    <section class="wide-cta"><div>${icon.cup}</div><div><h2>あなたにぴったりのデカフェを見つけませんか？</h2><p>条件検索や比較リストを使って、理想の一杯を見つけましょう。</p></div><a class="button button--primary" href="#/search">条件から探す ${icon.arrow}</a><a class="button button--outline" href="#/compare">比較リストを見る ${icon.arrow}</a></section>
  `);
}

function renderArticleCard(article) {
  return `
    <article class="article-card">
      <img src="${article.image}" alt="" />
      <div><span class="chip">${article.category}</span><h3>${article.title}</h3><p>${article.text}</p><time>${article.date}</time></div>
    </article>
  `;
}

function renderCompare() {
  const products = [...state.compare].map(productById).filter(Boolean).slice(0, 4);
  const recommendations = state.products.filter((product) => !state.compare.has(product.id)).slice(3, 6);
  renderShell(`
    ${renderHeroCompact("比較リスト", "気になる商品を並べて、あなたにぴったりの一杯を見つけましょう。", "ホーム 〉 比較リスト")}
    <section class="section compare-section">
      <div class="compare-head"><h2>比較中の商品：${products.length}件</h2><button class="button button--outline" type="button" data-clear-compare>すべてクリア ${icon.trash}</button></div>
      ${products.length ? renderCompareTable(products) : `<div class="empty-state">${icon.scale}<h2>比較リストは空です</h2><p>検索ページの商品カードから比較リストに追加できます。</p><a class="button button--primary" href="#/search">商品を探す</a></div>`}
      <p class="note">※ 除去率は各商品の公開情報に基づく参考値です。体質や体調により感じ方は異なります。</p>
    </section>
    <section class="recommend-box">
      <div class="section-heading"><h2>比較リストからのおすすめ</h2><a class="text-link" href="#/search">すべて見る ${icon.arrow}</a></div>
      <div class="recommend-grid">${recommendations.map((product) => renderProductCard(product, { compact: true })).join("")}</div>
    </section>
    <div class="save-row">${icon.bookmark}<span>この比較リストを保存する</span></div>
  `);
}

function renderCompareTable(products) {
  const rows = [
    ["商品名", (p) => `<strong>${escapeHtml(p.brand)}</strong><br />${escapeHtml(p.name)}`],
    ["焙煎度", (p) => `${roastBeans(p)}<br /><small>${escapeHtml(p.shortRoast)}</small>`],
    ["生産地", (p) => escapeHtml(p.origin)],
    ["カフェイン除去率", (p) => escapeHtml(p.caffeine_removal_rate)],
    ["カフェイン除去方法", (p) => escapeHtml(p.decaf_method)],
    ["フレーバーノート", (p) => p.flavorValues.slice(0, 3).map((v) => `<span class="chip">${escapeHtml(v)}</span>`).join("")],
    ["購入先", (p) => `<a class="button button--outline full" href="${p.url}" target="_blank" rel="noreferrer">詳細を見る ${icon.external}</a>`],
  ];
  return `
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead><tr><th>${icon.cup}<span>商品画像</span></th>${products.map((product) => `<th><button class="remove-small" data-remove-compare="${product.id}">×</button><img src="${product.image}" alt="" /></th>`).join("")}</tr></thead>
        <tbody>${rows.map(([label, renderer]) => `<tr><th>${label}</th>${products.map((product) => `<td>${renderer(product)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderFavorite() {
  const favorites = [...state.favorites].map(productById).filter(Boolean).slice(0, state.visibleFavorites);
  renderShell(`
    ${renderHeroCompact("お気に入り", "お気に入りに登録した商品を一覧で確認できます。気になる商品を見つけたら、比較したり、詳しくチェックしましょう。", "ホーム 〉 お気に入り")}
    <section class="favorite-layout">
      <div>
        <div class="section-heading"><h2>${icon.heart} お気に入り商品（${[...state.favorites].length}件）</h2><select><option>追加が新しい順</option></select></div>
        <div class="favorite-list">${favorites.length ? favorites.map(renderFavoriteItem).join("") : `<div class="empty-state">${icon.heart}<h2>お気に入りはまだありません</h2><p>商品カードのハートをクリックして追加できます。</p><a class="button button--primary" href="#/search">商品を探す</a></div>`}</div>
        ${[...state.favorites].length > state.visibleFavorites ? `<button class="button button--outline centered" data-load-more-favorites>もっと読み込む</button>` : ""}
      </div>
      <aside class="favorite-side">
        <div class="side-box"><h3>お気に入りの使い方</h3>${[
          [icon.heart, "気になる商品を保存", "ハートマークをクリックするとお気に入りに追加されます。"],
          [icon.scale, "比較に追加", "気になる商品を比較リストに追加して、違いをチェックできます。"],
          [icon.search, "あとでゆっくり検討", "お気に入りに保存しておけば、あとから簡単に見返せます。"],
        ].map(([svg, title, text]) => `<article>${svg}<div><h4>${title}</h4><p>${text}</p></div></article>`).join("")}</div>
        <div class="side-box links"><h3>お役立ちリンク</h3><a class="button button--outline full" href="#/compare">比較リストを見る ${icon.arrow}</a><a class="button button--outline full" href="#/search">条件から商品を探す ${icon.arrow}</a></div>
      </aside>
    </section>
  `);
}

function renderFavoriteItem(product) {
  return `
    <article class="favorite-item">
      <img src="${product.image}" alt="" />
      <div>
        <p class="brand-name">${escapeHtml(product.brand)}</p>
        <h3>${escapeHtml(product.name)}</h3>
        <div class="roast-line">焙煎度：${roastBeans(product)}</div>
        <div class="chips">${productChips(product, 4)}</div>
        <p>生産地：${escapeHtml(product.origin)}</p>
        <p>カフェイン除去率：${escapeHtml(product.caffeine_removal_rate)}</p>
        <p>除去方法：${escapeHtml(product.decaf_method)}</p>
        <p>内容量：${product.volumeNumber}g</p>
      </div>
      <div class="favorite-actions">
        <button class="heart-button is-active" type="button" data-favorite-id="${product.id}">${icon.heart}</button>
        <button class="menu-dot" type="button">⋮</button>
        <strong>¥${product.priceNumber.toLocaleString()}<small>（税込）</small></strong>
        <a class="button button--outline" href="${product.url}" target="_blank" rel="noreferrer">詳細を見る ${icon.external}</a>
      </div>
    </article>
  `;
}

function currentRoute() {
  return location.hash || "#/";
}

function render() {
  state.route = currentRoute().split("?")[0];
  if (state.route === "#/" || state.route === "") renderHome();
  else if (state.route === "#/search") renderSearch();
  else if (state.route === "#/category/night") renderCategoryNight();
  else if (state.route === "#/decaffeination") renderDecaffeination();
  else if (state.route === "#/column") renderColumn();
  else if (state.route === "#/compare") renderCompare();
  else if (state.route === "#/favorite") renderFavorite();
  else renderHome();
  window.scrollTo({ top: 0, behavior: "auto" });
}

function collectCheckedFilters() {
  const filters = {};
  document.querySelectorAll("[data-filter]:checked").forEach((input) => {
    filters[input.dataset.filter] = [...(filters[input.dataset.filter] || []), input.value];
  });
  const priceRange = document.querySelector("[data-price-range]");
  if (priceRange && Number(priceRange.value) < 10000) {
    filters.price_max = [priceRange.value];
  }
  return filters;
}

function handleSubmit(event) {
  const homeSearch = event.target.closest("[data-home-search]");
  if (!homeSearch) return;
  event.preventDefault();
  const keyword = homeSearch.querySelector("[data-home-keyword]").value.trim();
  location.hash = `#/search${keyword ? `?keyword=${encodeURIComponent(keyword)}` : ""}`;
  state.keyword = keyword;
  searchProducts();
}

function handleClick(event) {
  const favorite = event.target.closest("[data-favorite-id]");
  const quick = event.target.closest("[data-quick-search]");
  const reset = event.target.closest("[data-reset-search]");
  const runSearch = event.target.closest("[data-run-search]");
  const clear = event.target.closest("[data-clear-compare]");
  const removeCompare = event.target.closest("[data-remove-compare]");
  const loadMore = event.target.closest("[data-load-more-favorites]");

  if (favorite) {
    toggleFavorite(favorite.dataset.favoriteId);
    render();
  } else if (quick) {
    state.keyword = quick.dataset.quickSearch;
    searchProducts();
    location.hash = "#/search";
  } else if (reset) {
    state.keyword = "";
    state.filters = {};
    state.sort = "popular";
    searchProducts();
    render();
  } else if (runSearch) {
    state.keyword = document.querySelector("[data-search-input]")?.value || "";
    state.filters = collectCheckedFilters();
    searchProducts();
    render();
  } else if (clear) {
    clearCompare();
    render();
  } else if (removeCompare) {
    toggleCompare(removeCompare.dataset.removeCompare);
    render();
  } else if (loadMore) {
    state.visibleFavorites += 5;
    render();
  }
}

function handleChange(event) {
  if (event.target.matches("[data-filter]")) {
    state.filters = collectCheckedFilters();
    searchProducts();
    render();
  }
  if (event.target.matches("[data-sort]")) {
    state.sort = event.target.value;
    searchProducts();
    render();
  }
  if (event.target.matches("[data-compare-id]")) {
    toggleCompare(event.target.dataset.compareId);
    render();
  }
  if (event.target.matches("[data-price-range]")) {
    state.filters = collectCheckedFilters();
    searchProducts();
    render();
  }
}

function handleInput(event) {
  if (event.target.matches("[data-price-range]")) {
    const output = document.querySelector("[data-price-output]");
    if (output) output.textContent = `〜¥${Number(event.target.value).toLocaleString()}`;
    return;
  }
  if (!event.target.matches("[data-search-input]")) return;
  state.keyword = event.target.value;
  state.filters = collectCheckedFilters();
  searchProducts();
}

async function init() {
  renderShell(`<div class="loading">${icon.bean}<span>読み込み中...</span></div>`);
  loadSavedState();
  await fetchProducts();
  cleanSavedIds();
  const params = new URLSearchParams(location.hash.split("?")[1] || "");
  if (params.get("keyword")) state.keyword = params.get("keyword");
  searchProducts();
  window.addEventListener("hashchange", render);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("click", handleClick);
  document.addEventListener("change", handleChange);
  document.addEventListener("input", handleInput);
  render();
}

window.DecafSearch = {
  state,
  searchProducts,
  normalizeFilters,
  toggleFavorite,
  toggleCompare,
  clearCompare,
  render,
};

document.addEventListener("DOMContentLoaded", init);
