// products_simple.jsonから読み込んだ商品を入れておく箱です
let allProducts = [];

// 今選ばれている条件を覚えておくための変数です
let selectedFilter = null;

// 画面に表示する条件ボタンの一覧です
const filterGroups = [
  {
    title: "焙煎度",
    key: "roast",
    values: ["浅煎り", "中浅煎り", "中深煎り", "深煎り", "極深煎り"],
  },
  {
    title: "生産地",
    key: "origin",
    values: ["エチオピア", "コロンビア", "ブラジル", "グアテマラ", "インドネシア", "メキシコ"],
  },
  {
    title: "除去率",
    key: "caffeine_removal_rate",
    values: ["90%以上", "97%以上", "99%以上"],
  },
  {
    title: "フレーバー",
    key: "flavor_category",
    values: ["チョコ", "ナッツ", "フルーティ", "フローラル", "甘味", "ハーバル"],
  },
  {
    title: "種類",
    key: "coffee_type",
    values: ["シングル", "ブレンド"],
  },
  {
    title: "処理方法",
    key: "decaf_method",
    values: ["水抽出", "CO2", "有機溶媒抽出"],
  },
  {
    title: "豆 / 粉",
    key: "bean_type",
    values: ["豆", "粉"],
  },
  {
    title: "内容量",
    key: "volume",
    values: ["100g", "200g", "500g以上"],
  },
  {
    title: "認証",
    key: "certification",
    values: ["有機JAS", "フェアトレード"],
  },
];

// HTMLに文字を入れる時に、特殊な文字で表示が壊れないようにする関数です
function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// 価格を「¥1,480」のように表示するための関数です
function formatPrice(price) {
  const numberText = String(price).replaceAll(",", "");
  const number = Number(numberText);

  if (Number.isNaN(number)) {
    return `¥${price}`;
  }

  return `¥${number.toLocaleString()}`;
}

// 商品が条件に合っているかを調べる関数です
function productMatchesFilter(product, filter) {
  if (filter === null) {
    return true;
  }

  if (filter.key === "volume") {
    return productMatchesVolume(product, filter.value);
  }

  if (filter.key === "caffeine_removal_rate") {
    return productMatchesRate(product, filter.value);
  }

  const productValue = String(product[filter.key] || "");
  return productValue.includes(filter.value);
}

// 内容量の条件だけ、100gなどの文字と数字を比べる必要があります
function productMatchesVolume(product, filterValue) {
  const volume = Number(product.volume);

  if (filterValue === "100g") {
    return volume === 100;
  }

  if (filterValue === "200g") {
    return volume === 200;
  }

  if (filterValue === "500g以上") {
    return volume >= 500;
  }

  return false;
}

// 除去率の条件は「99%以上」のような文字から数字を取り出して比べます
function productMatchesRate(product, filterValue) {
  const productRate = getFirstNumber(product.caffeine_removal_rate);
  const filterRate = getFirstNumber(filterValue);

  return productRate >= filterRate;
}

// 文字の中から最初に出てくる数字を取り出す関数です
function getFirstNumber(text) {
  const result = String(text).match(/\d+(\.\d+)?/);

  if (result === null) {
    return 0;
  }

  return Number(result[0]);
}

// 条件ボタンを画面に作る関数です
function renderFilterButtons() {
  const filterButtonsArea = document.getElementById("filter-buttons");
  filterButtonsArea.innerHTML = "";

  filterGroups.forEach(function (group) {
    const groupElement = document.createElement("div");
    groupElement.className = "filter-group";

    const titleElement = document.createElement("h3");
    titleElement.textContent = group.title;

    const buttonListElement = document.createElement("div");
    buttonListElement.className = "button-list";

    group.values.forEach(function (value) {
      const button = document.createElement("button");
      button.className = "filter-button";
      button.type = "button";
      button.textContent = value;
      button.dataset.key = group.key;
      button.dataset.value = value;

      button.addEventListener("click", function () {
        selectedFilter = {
          key: group.key,
          value: value,
        };

        updateActiveButton();
        renderProducts(getFilteredProducts());
      });

      buttonListElement.appendChild(button);
    });

    groupElement.appendChild(titleElement);
    groupElement.appendChild(buttonListElement);
    filterButtonsArea.appendChild(groupElement);
  });
}

// 選ばれているボタンだけ見た目を変える関数です
function updateActiveButton() {
  const filterButtons = document.querySelectorAll(".filter-button");
  const showAllButton = document.getElementById("show-all-button");

  filterButtons.forEach(function (button) {
    const isActive =
      selectedFilter !== null &&
      button.dataset.key === selectedFilter.key &&
      button.dataset.value === selectedFilter.value;

    button.classList.toggle("active", isActive);
  });

  showAllButton.classList.toggle("active", selectedFilter === null);
}

// 条件に合う商品だけを選ぶ関数です
function getFilteredProducts() {
  return allProducts.filter(function (product) {
    return productMatchesFilter(product, selectedFilter);
  });
}

// 商品カードを作る関数です
function createProductCard(product) {
  return `
    <article class="product-card">
      <h3>${escapeHtml(product.name)}</h3>
      <p class="brand">${escapeHtml(product.brand)}</p>
      <p class="price">${formatPrice(product.price)}</p>

      <dl class="product-info">
        <div>
          <dt>内容量</dt>
          <dd>${escapeHtml(product.volume)}g</dd>
        </div>
        <div>
          <dt>焙煎度</dt>
          <dd>${escapeHtml(product.roast)}</dd>
        </div>
        <div>
          <dt>生産地</dt>
          <dd>${escapeHtml(product.origin)}</dd>
        </div>
        <div>
          <dt>除去方法</dt>
          <dd>${escapeHtml(product.decaf_method)}</dd>
        </div>
        <div>
          <dt>味の特徴</dt>
          <dd>${escapeHtml(product.flavor_category)}</dd>
        </div>
      </dl>
    </article>
  `;
}

// 商品一覧を画面に表示する関数です
function renderProducts(products) {
  const productList = document.getElementById("product-list");
  const resultCount = document.getElementById("result-count");

  resultCount.textContent = `${products.length}件の商品が見つかりました`;

  if (products.length === 0) {
    productList.innerHTML = `<p class="empty-message">条件に合う商品がありませんでした。</p>`;
    return;
  }

  productList.innerHTML = products.map(createProductCard).join("");
}

// 「すべて表示」ボタンが押された時の処理です
function setupShowAllButton() {
  const showAllButton = document.getElementById("show-all-button");

  showAllButton.addEventListener("click", function () {
    selectedFilter = null;
    updateActiveButton();
    renderProducts(allProducts);
  });
}

// products_simple.jsonを読み込む関数です
async function loadProducts() {
  const response = await fetch("products_simple.json");
  allProducts = await response.json();
}

// 最初に実行する処理です
async function init() {
  renderFilterButtons();
  setupShowAllButton();

  try {
    await loadProducts();
    updateActiveButton();
    renderProducts(allProducts);
  } catch (error) {
    const resultCount = document.getElementById("result-count");
    resultCount.textContent = "商品データの読み込みに失敗しました。";
    console.error(error);
  }
}

init();
