  [
    'title' => 'Iron Ore',
    'desc' => 'High-grade smelting quality'
  ],
  [
    'title' => 'Gold Ore',
    'desc' => 'Purest in the Sword Coast'
  ]
];

$homePageCss = '/pages/homepage/assets/css/homepage.css';
?>


<link rel="stylesheet" href="<?= htmlspecialchars($carouselCss) ?>">
<main class="homepage-container">
<section class="hero-section">
  <div class="hero-carousel">
    <?php foreach ($carousel_items as $item): ?>
      <div class="carousel-item">
        <img src="/pages/homepage/assets/img/<?= htmlspecialchars($item['src']) ?>"
             alt="<?= htmlspecialchars($item['alt'])?>">
      </div>
      <?php endforeach; ?>
   </div> 
    <div class = "hero-overlay"></div>
    <div class = "hero-content">
      <h1>KINGDOM OF WYRMFORGE</h1>
      <p>Mine the most exquisite, high-grade veins beneath the Sword Coast mountains.</p>
      <div class="hero-btn">
        <a href="store" class="btn-gold">Browse Our Wares</a>
        <a href="aboutUs" class="btn-outline">Learn Our History</a>
      </div>
    </div>
