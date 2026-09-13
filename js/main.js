/* ============================================================
   JAN — Full Application JavaScript
   Auth | Session | Cart | Buy-Again | Qty | Filters
   ============================================================ */

'use strict';

/* ═══════════════════════════════════════════
   PRODUCT DATABASE
═══════════════════════════════════════════ */
/* ═══════════════════════════════════════════
   PRODUCT DATABASE (B2B Wholesale Marketplace - Multi-Brand & Variants)
═══════════════════════════════════════════ */
/* ═══════════════════════════════════════════
   PRODUCT DATABASE (B2B Wholesale Marketplace - Multi-Brand & Multi-Variant Catalog)
═══════════════════════════════════════════ */
const PRODUCTS = [
  // 🧃 COLD DRINKS & BEVERAGES (beverages)
  { id:'b_coca_1',    name:'Coca-Cola Soft Drink 250ml Can (24 Can Tray)',            brand:'Coca-Cola',     category:'beverages', price:420,  oldPrice:528,  moq:24, rating:4.9, reviews:18200, img:'assets/images/products/cola.jpg' },
  { id:'b_coca_2',    name:'Coca-Cola 600ml PET Bottle (24 Bottle Case)',             brand:'Coca-Cola',     category:'beverages', price:780,  oldPrice:960,  moq:24, rating:4.9, reviews:21400, img:'assets/images/products/cola.jpg' },
  { id:'b_coca_3',    name:'Coca-Cola 2.25L Party Bottle (9 Bottle Case)',            brand:'Coca-Cola',     category:'beverages', price:720,  oldPrice:900,  moq:9,  rating:4.8, reviews:14500, img:'assets/images/products/cola.jpg' },
  { id:'b_coca_4',    name:'Coca-Cola ₹10 Pocket Bottle 200ml (24 Case)',             brand:'Coca-Cola',     category:'beverages', price:210,  oldPrice:240,  moq:24, rating:4.9, reviews:29000, img:'assets/images/products/cola.jpg' },
  { id:'b_sprite_1',  name:'Sprite Lemon-Lime Drink 250ml Can (24 Can Tray)',         brand:'Sprite',        category:'beverages', price:420,  oldPrice:528,  moq:24, rating:4.9, reviews:16800, img:'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80' },
  { id:'b_sprite_2',  name:'Sprite 750ml PET Bottle (24 Bottle Case)',                brand:'Sprite',        category:'beverages', price:840,  oldPrice:1080, moq:24, rating:4.9, reviews:19300, img:'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80' },
  { id:'b_thums_1',   name:'Thums Up Charged Carbonated Drink 250ml (24 Tray)',        brand:'Thums Up',      category:'beverages', price:420,  oldPrice:528,  moq:24, rating:4.9, reviews:22100, img:'assets/images/products/cola.jpg' },
  { id:'b_thums_2',   name:'Thums Up 2.25L Party Bottle (9 Bottle Case)',             brand:'Thums Up',      category:'beverages', price:720,  oldPrice:900,  moq:9,  rating:4.9, reviews:18700, img:'assets/images/products/cola.jpg' },
  { id:'b_dew_1',     name:'Mountain Dew Citrus Drink 250ml Can (24 Tray)',           brand:'Mountain Dew',  category:'beverages', price:420,  oldPrice:528,  moq:24, rating:4.8, reviews:14200, img:'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80' },
  { id:'b_redbull_1', name:'Red Bull Energy Drink 250ml Can (24 Can Case)',          brand:'Red Bull',      category:'beverages', price:2640, oldPrice:3000, moq:24, rating:5.0, reviews:11900, img:'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80' },
  { id:'b_campa_1',   name:'Campa Cola Carbonated Drink 200ml (24 Bottle Case)',      brand:'Campa',         category:'beverages', price:180,  oldPrice:240,  moq:24, rating:4.7, reviews:8400,  img:'assets/images/products/cola.jpg' },
  { id:'b_frooti_1',  name:'Frooti Fresh Mango Juice 125ml Tetra (40 Carton)',        brand:'Frooti',        category:'beverages', price:360,  oldPrice:400,  moq:40, rating:4.9, reviews:25400, img:'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80' },
  { id:'b_frooti_2',  name:'Frooti Mango Drink 600ml Bottle (24 Case)',               brand:'Frooti',        category:'beverages', price:780,  oldPrice:960,  moq:24, rating:4.9, reviews:19800, img:'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80' },
  { id:'b_bisleri_1', name:'Bisleri Mineral Water 1L (24 Bottle Master Case)',        brand:'Bisleri',       category:'beverages', price:360,  oldPrice:480,  moq:24, rating:4.9, reviews:31000, img:'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80' },

  // 🍿 BISCUITS, BAKERY & RUSK (snacks)
  { id:'s_parleg_1',  name:'Parle-G Glucose Biscuit ₹5 Pack (120 Box)',               brand:'Parle',         category:'snacks',    price:540,  oldPrice:600,  moq:120,rating:4.9, reviews:48000, img:'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80' },
  { id:'s_parleg_2',  name:'Parle-G Glucose Biscuit ₹10 Pack (60 Box)',              brand:'Parle',         category:'snacks',    price:540,  oldPrice:600,  moq:60, rating:4.9, reviews:39000, img:'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80' },
  { id:'s_parleg_3',  name:'Parle-G Glucose Biscuit 800g Family Pack (12 Box)',       brand:'Parle',         category:'snacks',    price:1080, oldPrice:1200, moq:12, rating:4.9, reviews:21000, img:'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80' },
  { id:'s_goodday_1', name:'Britannia Good Day Cashew ₹10 Pack (60 Box)',            brand:'Britannia',     category:'snacks',    price:540,  oldPrice:600,  moq:60, rating:4.9, reviews:34000, img:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80' },
  { id:'s_goodday_2', name:'Britannia Good Day Butter 120g (48 Pack Box)',           brand:'Britannia',     category:'snacks',    price:1150, oldPrice:1440, moq:48, rating:4.9, reviews:28000, img:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80' },
  { id:'s_marie_1',   name:'Britannia Marie Gold Biscuit ₹10 Pack (60 Box)',         brand:'Britannia',     category:'snacks',    price:540,  oldPrice:600,  moq:60, rating:4.8, reviews:27000, img:'assets/images/products/biscuits.jpg' },
  { id:'s_bourbon_1', name:'Britannia Bourbon Chocolate Biscuit 150g (36 Box)',       brand:'Britannia',     category:'snacks',    price:1080, oldPrice:1260, moq:36, rating:4.9, reviews:24000, img:'assets/images/products/biscuits.jpg' },
  { id:'s_hideseek_1',name:'Parle Hide & Seek Choco Chip ₹10 Pack (60 Box)',         brand:'Parle',         category:'snacks',    price:540,  oldPrice:600,  moq:60, rating:4.9, reviews:31000, img:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80' },
  { id:'s_hideseek_2',name:'Parle Hide & Seek Choco Chip 200g (24 Box)',             brand:'Parle',         category:'snacks',    price:1150, oldPrice:1320, moq:24, rating:4.9, reviews:18500, img:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80' },
  { id:'s_unibic_1',  name:'Unibic Butter Cookies 75g (48 Wholesale Box)',            brand:'Unibic',        category:'snacks',    price:960,  oldPrice:1200, moq:48, rating:4.8, reviews:14200, img:'assets/images/products/biscuits.jpg' },
  { id:'s_unibic_2',  name:'Unibic Choco Ripple Cookies 150g (24 Box)',               brand:'Unibic',        category:'snacks',    price:1150, oldPrice:1440, moq:24, rating:4.8, reviews:11800, img:'assets/images/products/biscuits.jpg' },
  { id:'s_sunfeast_1',name:'Sunfeast Dark Fantasy Choco Fills ₹10 Pack (60 Box)',     brand:'Sunfeast',      category:'snacks',    price:540,  oldPrice:600,  moq:60, rating:4.9, reviews:29000, img:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80' },
  { id:'s_rusk_1',    name:'Britannia Toastea Milk Rusk ₹10 Pack (60 Box)',          brand:'Britannia',     category:'snacks',    price:540,  oldPrice:600,  moq:60, rating:4.8, reviews:19800, img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
  { id:'s_rusk_2',    name:'Britannia Toastea Premium Wheat Rusk 300g (24 Box)',     brand:'Britannia',     category:'snacks',    price:1080, oldPrice:1320, moq:24, rating:4.8, reviews:15400, img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
  { id:'s_lays_1',    name:'Lay\'s Magic Masala Chips ₹10 Pack (60 Box)',             brand:'Lay\'s',        category:'snacks',    price:540,  oldPrice:600,  moq:60, rating:4.8, reviews:41000, img:'assets/images/products/chips.jpg' },

  // 🍬 CHOCOLATES & CANDY (confectionery)
  { id:'conf_dairymilk_1', name:'Cadbury Dairy Milk Chocolate ₹5 Pack (120 Box)',    brand:'Cadbury',       category:'confectionery', price:540, oldPrice:600, moq:120, rating:4.9, reviews:32000, img:'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80' },
  { id:'conf_dairymilk_2', name:'Cadbury Dairy Milk Chocolate ₹10 Pack (60 Box)',   brand:'Cadbury',       category:'confectionery', price:540, oldPrice:600, moq:60,  rating:4.9, reviews:28000, img:'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80' },
  { id:'conf_dairymilk_3', name:'Cadbury Dairy Milk Silk 150g Bar (24 Box)',         brand:'Cadbury',       category:'confectionery', price:3600,oldPrice:4200,moq:24,  rating:5.0, reviews:19000, img:'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80' },
  { id:'conf_vicks_1',      name:'Vicks Cough Drops Menthol (500 Sachet Jar)',       brand:'Vicks',         category:'confectionery', price:450, oldPrice:500, moq:1,   rating:4.9, reviews:24000, img:'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80' },
  { id:'conf_happydent_1',  name:'Happydent Wave Spearmint Gum (24 Bottle Box)',    brand:'Happydent',     category:'confectionery', price:1150,oldPrice:1440,moq:24,  rating:4.8, reviews:15600, img:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80' },
  { id:'conf_coffeebite_1', name:'Coffee-Bite Toffee Pack (200 Pcs Jar)',           brand:'Coffee-Bite',   category:'confectionery', price:180, oldPrice:200, moq:1,   rating:4.8, reviews:11200, img:'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80' },
  { id:'conf_candyman_1',   name:'Candyman Fantastik Choco Sticks (100 Pcs Jar)',    brand:'Candyman',      category:'confectionery', price:360, oldPrice:400, moq:1,   rating:4.8, reviews:9800,  img:'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80' },

  // 🧴 SOAPS, SHAMPOO, HAIR OIL & ORAL CARE (fmcg)
  { id:'f_santoor_1', name:'Santoor Sandal Soap 100g 4-Pack (24 Case)',               brand:'Santoor',       category:'fmcg',      price:2640, oldPrice:2980, moq:24, rating:4.9, reviews:28000, img:'https://images.unsplash.com/photo-1607006482602-764988d07d72?auto=format&fit=crop&w=600&q=80' },
  { id:'f_santoor_2', name:'Santoor Sandal Soap ₹10 Small Bar (72 Case)',             brand:'Santoor',       category:'fmcg',      price:640,  oldPrice:720,  moq:72, rating:4.8, reviews:21000, img:'https://images.unsplash.com/photo-1607006482602-764988d07d72?auto=format&fit=crop&w=600&q=80' },
  { id:'f_lux_1',     name:'Lux Rose & Vitamin E Soap 100g (48 Soap Case)',           brand:'Lux',           category:'fmcg',      price:1920, oldPrice:2400, moq:48, rating:4.8, reviews:24000, img:'assets/images/products/soap.jpg' },
  { id:'f_dettol_1',  name:'Dettol Original Antiseptic Soap 125g (48 Case)',          brand:'Dettol',        category:'fmcg',      price:2160, oldPrice:2400, moq:48, rating:4.9, reviews:32000, img:'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80' },
  { id:'f_lifebuoy_1',name:'Lifebuoy Total 10 Soap Bar ₹10 Pack (72 Case)',           brand:'Lifebuoy',      category:'fmcg',      price:640,  oldPrice:720,  moq:72, rating:4.8, reviews:35000, img:'assets/images/products/soap.jpg' },
  { id:'f_mysore_1',  name:'Mysore Sandal Soap Original 150g (36 Bar Case)',          brand:'Mysore Sandal', category:'fmcg',      price:2880, oldPrice:3240, moq:36, rating:5.0, reviews:41000, img:'https://images.unsplash.com/photo-1607006482602-764988d07d72?auto=format&fit=crop&w=600&q=80' },
  { id:'f_clinic_1',  name:'Clinic Plus Strong & Long Shampoo ₹1 Sachet (640 Box)',   brand:'Clinic Plus',   category:'fmcg',      price:560,  oldPrice:640,  moq:640,rating:4.9, reviews:38000, img:'assets/images/products/shampoo.jpg' },
  { id:'f_clinic_2',  name:'Clinic Plus Shampoo 175ml Bottle (24 Bottle Case)',       brand:'Clinic Plus',   category:'fmcg',      price:2880, oldPrice:3360, moq:24, rating:4.9, reviews:29000, img:'assets/images/products/shampoo.jpg' },
  { id:'f_sunsilk_1', name:'Sunsilk Black Shine Shampoo ₹1 Sachet (640 Box)',         brand:'Sunsilk',       category:'fmcg',      price:560,  oldPrice:640,  moq:640,rating:4.8, reviews:31000, img:'assets/images/products/shampoo.jpg' },
  { id:'f_sunsilk_2', name:'Sunsilk Yellow Shampoo 180ml Bottle (24 Case)',            brand:'Sunsilk',       category:'fmcg',      price:3120, oldPrice:3600, moq:24, rating:4.8, reviews:22000, img:'assets/images/products/shampoo.jpg' },
  { id:'f_head_1',    name:'Head & Shoulders Anti-Dandruff 180ml (24 Case)',          brand:'Head & Shoulders',category:'fmcg',   price:3840, oldPrice:4400, moq:24, rating:4.9, reviews:27000, img:'assets/images/products/shampoo.jpg' },
  { id:'f_parachute_1',name:'Parachute Coconut Hair Oil ₹1 Sachet (500 Box)',         brand:'Parachute',     category:'fmcg',      price:450,  oldPrice:500,  moq:500,rating:4.9, reviews:34000, img:'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80' },
  { id:'f_parachute_2',name:'Parachute Pure Coconut Oil 100ml Bottle (36 Case)',       brand:'Parachute',     category:'fmcg',      price:1350, oldPrice:1500, moq:36, rating:4.9, reviews:26000, img:'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80' },
  { id:'f_navratna_1', name:'Navratna Ayurvedic Cool Hair Oil 100ml (36 Case)',       brand:'Navratna',      category:'fmcg',      price:1620, oldPrice:1800, moq:36, rating:4.8, reviews:19000, img:'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80' },
  { id:'f_colgate_1', name:'Colgate Strong Teeth Toothpaste ₹10 Tube (48 Box)',        brand:'Colgate',       category:'fmcg',      price:432,  oldPrice:480,  moq:48, rating:4.9, reviews:39000, img:'assets/images/products/toothpaste.jpg' },
  { id:'f_colgate_2', name:'Colgate Strong Teeth Toothpaste 150g (24 Box)',            brand:'Colgate',       category:'fmcg',      price:2160, oldPrice:2520, moq:24, rating:4.9, reviews:36000, img:'assets/images/products/toothpaste.jpg' },
  { id:'f_dabur_1',   name:'Dabur Red Ayurvedic Toothpaste 100g (24 Box)',            brand:'Dabur',         category:'fmcg',      price:1440, oldPrice:1680, moq:24, rating:4.8, reviews:21000, img:'assets/images/products/toothpaste.jpg' },

  // 🥛 HEALTH DRINKS, TEA & COFFEE (health)
  { id:'h_horlicks_1',name:'Horlicks Classic Malt 500g Jar (12 Jar Case)',            brand:'Horlicks',      category:'health',    price:2880, oldPrice:3240, moq:12, rating:4.9, reviews:28000, img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' },
  { id:'h_horlicks_2',name:'Horlicks Classic Malt 1kg Refill Pack (12 Case)',          brand:'Horlicks',      category:'health',    price:4680, oldPrice:5280, moq:12, rating:4.9, reviews:22000, img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' },
  { id:'h_horlicks_3',name:'Horlicks ₹10 Sachet Pack (120 Sachet Box)',              brand:'Horlicks',      category:'health',    price:1080, oldPrice:1200, moq:120,rating:4.8, reviews:18000, img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' },
  { id:'h_boost_1',   name:'Boost Energy Health Drink 500g Refill (12 Case)',         brand:'Boost',         category:'health',    price:2760, oldPrice:3120, moq:12, rating:4.9, reviews:24000, img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' },
  { id:'h_bournvita_1',name:'Bournvita Chocolate Drink 500g Jar (12 Case)',           brand:'Bournvita',     category:'health',    price:2760, oldPrice:3120, moq:12, rating:4.9, reviews:26000, img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' },
  { id:'h_complan_1', name:'Complan Royale Chocolate 500g Refill (12 Case)',          brand:'Complan',       category:'health',    price:2880, oldPrice:3240, moq:12, rating:4.8, reviews:14200, img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' },
  { id:'h_bru_1',      name:'Bru Instant Coffee Powder ₹2 Sachet (100 Pouch Box)',    brand:'Bru',           category:'health',    price:180,  oldPrice:200,  moq:100,rating:4.9, reviews:23000, img:'assets/images/products/coffee.jpg' },
  { id:'h_bru_2',      name:'Bru Instant Coffee 100g Glass Jar (12 Case)',            brand:'Bru',           category:'health',    price:2160, oldPrice:2400, moq:12, rating:4.9, reviews:17500, img:'assets/images/products/coffee.jpg' },
  { id:'h_nescafe_1',  name:'Nescafé Classic Coffee Powder ₹2 Sachet (100 Box)',      brand:'Nescafé',       category:'health',    price:180,  oldPrice:200,  moq:100,rating:4.9, reviews:29000, img:'assets/images/products/coffee.jpg' },
  { id:'h_nescafe_2',  name:'Nescafé Classic Coffee 50g Glass Jar (24 Case)',         brand:'Nescafé',       category:'health',    price:3360, oldPrice:3840, moq:24, rating:4.9, reviews:21000, img:'assets/images/products/coffee.jpg' },
  { id:'h_redlabel_1', name:'Brooke Bond Red Label Tea Powder ₹10 Pouch (60 Box)',   brand:'Red Label',     category:'health',    price:540,  oldPrice:600,  moq:60, rating:4.9, reviews:32000, img:'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
  { id:'h_redlabel_2', name:'Brooke Bond Red Label Tea 250g Pack (24 Case)',         brand:'Red Label',     category:'health',    price:3120, oldPrice:3600, moq:24, rating:4.9, reviews:27000, img:'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
  { id:'h_tajmahal_1', name:'Taj Mahal Tea 250g Premium Pack (24 Case)',              brand:'Taj Mahal',     category:'health',    price:4320, oldPrice:4800, moq:24, rating:5.0, reviews:19800, img:'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },

  // 🧹 CLEANING PRODUCTS & DETERGENTS (cleaning)
  { id:'c_harpic_1',  name:'Harpic Power Plus Toilet Cleaner 500ml (24 Case)',        brand:'Harpic',        category:'cleaning',  price:2160, oldPrice:2520, moq:24, rating:4.9, reviews:29000, img:'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80' },
  { id:'c_harpic_2',  name:'Harpic Power Plus Toilet Cleaner 1L (12 Case)',           brand:'Harpic',        category:'cleaning',  price:1980, oldPrice:2280, moq:12, rating:4.9, reviews:24000, img:'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80' },
  { id:'c_lizol_1',   name:'Lizol Floor Cleaner Citrus 500ml (24 Case)',              brand:'Lizol',         category:'cleaning',  price:2160, oldPrice:2520, moq:24, rating:4.8, reviews:21000, img:'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80' },
  { id:'c_lizol_2',   name:'Lizol Floor Cleaner Citrus 2L (6 Bottle Case)',           brand:'Lizol',         category:'cleaning',  price:1860, oldPrice:2160, moq:6,  rating:4.8, reviews:17500, img:'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80' },
  { id:'c_vim_1',     name:'Vim Dishwash Bar ₹10 Pack (72 Bar Case)',                 brand:'Vim',           category:'cleaning',  price:640,  oldPrice:720,  moq:72, rating:4.9, reviews:33000, img:'assets/images/products/dishwash.jpg' },
  { id:'c_vim_2',     name:'Vim Dishwash Gel Lemon 750ml (12 Refill Case)',           brand:'Vim',           category:'cleaning',  price:1440, oldPrice:1680, moq:12, rating:4.9, reviews:26000, img:'assets/images/products/dishwash.jpg' },
  { id:'c_surf_1',    name:'Surf Excel Easy Wash Detergent Powder ₹10 Pouch (72 Box)',brand:'Surf Excel',    category:'cleaning',  price:640,  oldPrice:720,  moq:72, rating:4.9, reviews:35000, img:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80' },
  { id:'c_surf_2',    name:'Surf Excel Easy Wash Detergent Powder 1kg (12 Case)',     brand:'Surf Excel',    category:'cleaning',  price:1680, oldPrice:1920, moq:12, rating:4.9, reviews:31000, img:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80' },
  { id:'c_surf_3',    name:'Surf Excel Easy Wash Detergent Powder 5kg (4 Box)',       brand:'Surf Excel',    category:'cleaning',  price:2100, oldPrice:2400, moq:4,  rating:4.9, reviews:27000, img:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80' },
  { id:'c_tide_1',    name:'Tide Plus Extra Power Detergent Powder 1kg (12 Case)',     brand:'Tide',          category:'cleaning',  price:1320, oldPrice:1560, moq:12, rating:4.8, reviews:23000, img:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80' },
  { id:'c_wheel_1',   name:'Wheel Active 2 in 1 Detergent Powder ₹10 Pack (72 Case)', brand:'Wheel',         category:'cleaning',  price:640,  oldPrice:720,  moq:72, rating:4.8, reviews:29000, img:'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80' },

  // 👶 DIAPERS & BABY CARE (baby)
  { id:'bby_mamypoko_1', name:'MamyPoko Pants Extra Absorb Small (4 Diaper Pack x 24)', brand:'MamyPoko',   category:'baby',      price:1150, oldPrice:1320, moq:24, rating:4.9, reviews:19000, img:'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80' },
  { id:'bby_mamypoko_2', name:'MamyPoko Pants Extra Absorb Medium (20 Diaper Pack x 8)',brand:'MamyPoko',   category:'baby',      price:2760, oldPrice:3120, moq:8,  rating:4.9, reviews:23000, img:'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80' },
  { id:'bby_pampers_1',  name:'Pampers All-in-One Pants Medium (28 Diaper Pack x 6)',   brand:'Pampers',       category:'baby',      price:2520, oldPrice:2880, moq:6,  rating:4.9, reviews:27000, img:'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80' },
  { id:'bby_pampers_2',  name:'Pampers Baby Wipes Fresh Clean (72 Wipes x 12 Box)',    brand:'Pampers',       category:'baby',      price:1800, oldPrice:2160, moq:12, rating:4.9, reviews:16500, img:'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80' },

  // 🌾 GROCERY STAPLES, ATTA & OILS (grocery)
  { id:'g_atta_1',   name:'Aashirvaad Whole Wheat Atta 10kg (5 Bag Pack)',           brand:'Aashirvaad',    category:'grocery',   price:2050, oldPrice:2300, moq:5,  rating:4.9, reviews:38000, img:'assets/images/products/atta.jpg' },
  { id:'g_rice_1',   name:'Royal Sona Masoori Raw Rice 25kg (2 Bag Pack)',           brand:'Karnataka Agro',category:'grocery',   price:2650, oldPrice:2980, moq:2,  rating:4.9, reviews:42000, img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80' },
  { id:'g_oil_1',    name:'Fortune Sunlite Sunflower Oil 15L Bulk Tin',              brand:'Fortune Oils',  category:'grocery',   price:2180, oldPrice:2450, moq:2,  rating:4.9, reviews:34000, img:'assets/images/products/oil.jpg' },
  { id:'g_oil_2',    name:'Freedom Refined Sunflower Oil 5L (4 Can Case)',           brand:'Freedom Oil',   category:'grocery',   price:2320, oldPrice:2600, moq:4,  rating:4.8, reviews:26000, img:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80' },
  { id:'g_ghee_1',   name:'Nandini Pure Cow Ghee 1kg (12 Pouch Case)',               brand:'Nandini Dairy', category:'grocery',   price:6960, oldPrice:7680, moq:12, rating:5.0, reviews:49000, img:'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=80' },

  // ✏️ STATIONERY & SHOP SUPPLIES (stationery)
  { id:'st_classmate_1', name:'Classmate Long Notebook 172 Pages (60 Book Carton)', brand:'Classmate',   category:'stationery',price:2400, oldPrice:2700, moq:60, rating:4.9, reviews:18000, img:'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80' },
  { id:'st_nataraj_1',   name:'Nataraj 621 HB Pencils (50 Pencil Box x 10 Packs)',   brand:'Nataraj',     category:'stationery',price:450,  oldPrice:500,  moq:10, rating:4.9, reviews:15000, img:'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80' },
  { id:'st_cello_1',     name:'Cello Butterflow Blue Ball Pen (50 Pen Box x 10)',     brand:'Cello',       category:'stationery',price:950,  oldPrice:1100, moq:10, rating:4.9, reviews:21000, img:'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80' },
  { id:'st_fevicol_1',   name:'Fevicol MR Squeezy Bottle 50g (24 Bottle Box)',        brand:'Pidilite',    category:'stationery',price:432,  oldPrice:480,  moq:24, rating:4.9, reviews:13500, img:'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80' }
];

/* ═══════════════════════════════════════════
   AUTH SYSTEM
═══════════════════════════════════════════ */
const Auth = {
  SESSION_KEY: 'jan_user',

  get() {
    try { return JSON.parse(localStorage.getItem(this.SESSION_KEY)); }
    catch { return null; }
  },

  login(data) {
    const user = { ...data, loginAt: Date.now(), orders: data.orders || 0, totalSaved: data.totalSaved || 0 };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    location.reload();
  },

  isLoggedIn() { return !!this.get(); },

  updateStats(ordersAdd = 0, savedAdd = 0) {
    const u = this.get();
    if (!u) return;
    u.orders = (u.orders || 0) + ordersAdd;
    u.totalSaved = (u.totalSaved || 0) + savedAdd;
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(u));
  }
};

/* ═══════════════════════════════════════════
   CART
═══════════════════════════════════════════ */
const Cart = {
  KEY: 'jan_cart',

  get() { try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch { return []; } },

  save(items) { localStorage.setItem(this.KEY, JSON.stringify(items)); updateCartBadge(); },

  add(product, qty) {
    const items = this.get();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ ...product, qty });
    }
    this.save(items);
  },

  remove(id) {
    this.save(this.get().filter(i => i.id !== id));
  },

  updateQty(id, qty) {
    const items = this.get();
    const item = items.find(i => i.id === id);
    if (item) { item.qty = Math.max(item.moq || 10, qty); }
    this.save(items);
  },

  total() {
    return this.get().reduce((s, i) => s + i.price * i.qty, 0);
  },

  count() {
    return this.get().reduce((s, i) => s + i.qty, 0);
  },

  clear() { this.save([]); }
};

/* ═══════════════════════════════════════════
   PURCHASE HISTORY
═══════════════════════════════════════════ */
const PurchaseHistory = {
  KEY: 'jan_purchases',

  get() { try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch { return []; } },

  save(orders) { localStorage.setItem(this.KEY, JSON.stringify(orders)); },

  addOrder(items, total) {
    const orders = this.get();
    const order = {
      id: 'JAN' + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      items: items.map(i => ({ ...i })),
      total,
      status: 'processing'
    };
    orders.unshift(order);
    this.save(orders);
    // Simulate delivery status change after 2s demo
    Auth.updateStats(1, items.reduce((s,i) => s + ((i.oldPrice||0)-i.price)*i.qty, 0));
    return order;
  },

  getRecentProducts() {
    const orders = this.get();
    const seen = new Set();
    const products = [];
    for (const order of orders) {
      for (const item of order.items) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          products.push(item);
        }
      }
    }
    return products;
  }
};

/* ═══════════════════════════════════════════
   UI HELPERS
═══════════════════════════════════════════ */
function updateCartBadge() {
  const count = Cart.count();
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

let toastTimeout;
function showToast(msg, type = 'success') {
  let t = document.getElementById('global-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'global-toast';
    t.className = 'toast';
    t.innerHTML = `<span class="toast-icon"></span><span class="toast-text"></span><button class="toast-close" onclick="document.getElementById('global-toast').classList.remove('show')">✕</button>`;
    document.body.appendChild(t);
  }
  t.querySelector('.toast-icon').textContent = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  t.querySelector('.toast-text').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 3500);
}

function hideToast() {
  document.getElementById('global-toast')?.classList.remove('show');
}

/* ═══════════════════════════════════════════
   AUTH MODAL
═══════════════════════════════════════════ */
function openAuthModal(tab = 'login') {
  const overlay = document.getElementById('auth-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  switchAuthTab(tab);
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  document.getElementById('auth-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('login-form-section').style.display = tab === 'login' ? 'flex' : 'none';
  document.getElementById('register-form-section').style.display = tab === 'register' ? 'flex' : 'none';
}

function handleLogin(e) {
  e.preventDefault();
  const mobile = document.getElementById('login-mobile').value.trim();
  const pass   = document.getElementById('login-pass').value;
  if (!mobile || !pass) { showToast('Please fill all fields', 'error'); return; }

  // Check saved user
  const savedUsers = JSON.parse(localStorage.getItem('jan_registered_users') || '[]');
  const found = savedUsers.find(u => u.mobile === mobile && u.password === pass);

  if (found) {
    Auth.login(found);
    closeAuthModal();
    showToast(`Welcome back, ${found.name}! 👋`);
    setTimeout(() => refreshAuthUI(), 100);
  } else {
    showToast('Invalid mobile or password', 'error');
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name   = document.getElementById('reg-name').value.trim();
  const shop   = document.getElementById('reg-shop').value.trim();
  const mobile = document.getElementById('reg-mobile').value.trim();
  const pass   = document.getElementById('reg-pass').value;
  const city   = document.getElementById('reg-city').value.trim();

  if (!name || !mobile || !pass || !shop) { showToast('Please fill all required fields', 'error'); return; }
  if (mobile.length !== 10) { showToast('Enter a valid 10-digit mobile number', 'error'); return; }
  if (pass.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }

  const userData = { name, shopName: shop, mobile, password: pass, city, orders: 0, totalSaved: 0 };

  // Save to registered users store
  const savedUsers = JSON.parse(localStorage.getItem('jan_registered_users') || '[]');
  if (savedUsers.find(u => u.mobile === mobile)) {
    showToast('Account with this mobile already exists', 'error'); return;
  }
  savedUsers.push(userData);
  localStorage.setItem('jan_registered_users', JSON.stringify(savedUsers));

  Auth.login(userData);
  closeAuthModal();
  showToast(`Welcome to Jan, ${name}! 🎉 You got ₹500 credit!`);
  setTimeout(() => refreshAuthUI(), 100);
}

/* ═══════════════════════════════════════════
   AUTH UI REFRESH
═══════════════════════════════════════════ */
function refreshAuthUI() {
  const user = Auth.get();
  const orders = PurchaseHistory.get().length;

  // Sidebar profile
  const sidebar = document.getElementById('sidebar-profile');
  if (sidebar) {
    if (user) {
      sidebar.innerHTML = `
        <div class="profile-logged-in">
          <div class="profile-user-row">
            <div class="profile-avatar">${user.name[0].toUpperCase()}</div>
            <div class="profile-user-info">
              <div class="name">${user.name}</div>
              <div class="role">${user.shopName || 'Shop Owner'}</div>
            </div>
          </div>
          <div class="profile-stats">
            <div class="profile-stat">
              <div class="ps-num">${orders}</div>
              <div class="ps-label">Orders</div>
            </div>
            <div class="profile-stat">
              <div class="ps-num">₹${((user.totalSaved || 0)/100).toFixed(0)}K+</div>
              <div class="ps-label">Saved</div>
            </div>
          </div>
          <div class="sidebar-auth-btns">
            <a href="purchases.html" class="sidebar-btn sidebar-btn-secondary">📦 My Orders</a>
            <button class="sidebar-btn sidebar-btn-danger" onclick="Auth.logout()">↩ Sign Out</button>
          </div>
        </div>`;
    } else {
      sidebar.innerHTML = `
        <div class="profile-guest">
          <div class="profile-greeting">Welcome to Jan</div>
          <div class="profile-name" style="color:rgba(255,255,255,0.7);font-size:14px">Sign in for the best<br>wholesale prices</div>
          <div class="sidebar-auth-btns" style="margin-top:8px">
            <button class="sidebar-btn sidebar-btn-primary" onclick="openAuthModal('login')">🔐 Sign In</button>
            <button class="sidebar-btn sidebar-btn-secondary" onclick="openAuthModal('register')">✨ Register Free</button>
          </div>
          <div class="auth-benefits" style="margin-top:10px">
            <div class="auth-benefit"><span class="icon">✓</span> ₹500 credit on first order</div>
            <div class="auth-benefit"><span class="icon">✓</span> 30-day buy now, pay later</div>
            <div class="auth-benefit"><span class="icon">✓</span> Track your orders easily</div>
          </div>
        </div>`;
    }
  }

  // Nav display
  const navUser = document.getElementById('nav-user-widget');
  if (navUser) {
    if (user) {
      navUser.innerHTML = `
        <div class="nav-user-display" onclick="openAuthModal('login')">
          <div class="nav-user-avatar">${user.name[0].toUpperCase()}</div>
          <span class="nav-user-name">Hi, ${user.name.split(' ')[0]}</span>
        </div>`;
    } else {
      navUser.innerHTML = `<button class="btn btn-primary btn-sm" onclick="openAuthModal('login')" id="nav-signin-btn">Sign In</button>`;
    }
  }

  // Buy again section
  renderBuyAgain();
}

/* ═══════════════════════════════════════════
   PRODUCT CARD RENDERING
═══════════════════════════════════════════ */
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function discount(p) {
  if (!p.oldPrice || p.oldPrice <= p.price) return '';
  return Math.round((1 - p.price / p.oldPrice) * 100);
}

function buildAmzCard(p, qty = null) {
  const minQty = p.moq || 10;
  const startQty = qty || minQty;
  const disc = discount(p);
  return `
  <div class="amz-card" id="card-${p.id}" data-category="${p.category}" data-price="${p.price}">
    <div class="amz-card-img">
      ${disc ? `<div class="amz-img-badge"><span class="badge badge-success">${disc}% off</span></div>` : ''}
      <div class="amz-wishlist" id="wish-${p.id}" onclick="toggleWishlist('${p.id}',event)">♡</div>
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/products/atta.jpg'" />
    </div>
    <div class="amz-card-body">
      <div class="amz-brand">${p.brand}</div>
      <div class="amz-name">${p.name}</div>
      <div class="amz-rating">
        <span class="amz-stars">${renderStars(p.rating)}</span>
        <span class="amz-review-count">(${p.reviews.toLocaleString('en-IN')})</span>
      </div>
      <div class="amz-moq">Min. Order: ${minQty} units</div>
      <div class="amz-price-row">
        <div class="amz-price"><sup>₹</sup>${p.price}</div>
        ${p.oldPrice > p.price ? `<div class="amz-old-price">₹${p.oldPrice}</div><div class="amz-discount">${disc}% off</div>` : ''}
      </div>
      <div class="amz-qty-row">
        <div class="qty-selector">
          <button onclick="changeAmzQty('${p.id}', -1, ${minQty})">−</button>
          <span class="qty-display" id="qty-${p.id}">${startQty}</span>
          <button onclick="changeAmzQty('${p.id}', 1, ${minQty})">+</button>
        </div>
        <button class="amz-add-btn" id="addbtn-${p.id}" onclick="addAmzToCart('${p.id}')">
          🛒 Add
        </button>
      </div>
    </div>
  </div>`;
}

function changeAmzQty(id, delta, min = 10) {
  const el = document.getElementById(`qty-${id}`);
  if (!el) return;
  const current = parseInt(el.textContent) || min;
  el.textContent = Math.max(min, current + delta);
}

function addAmzToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const qtyEl = document.getElementById(`qty-${id}`);
  const qty = parseInt(qtyEl?.textContent) || product.moq || 10;
  Cart.add(product, qty);

  const btn = document.getElementById(`addbtn-${id}`);
  if (btn) {
    btn.textContent = '✓ Added!';
    btn.classList.add('added');
    setTimeout(() => { btn.innerHTML = '🛒 Add'; btn.classList.remove('added'); }, 1800);
  }
  showToast(`${product.name} × ${qty} added to cart!`);
}

function toggleWishlist(id, e) {
  e.stopPropagation();
  const el = document.getElementById(`wish-${id}`);
  if (!el) return;
  el.classList.toggle('active');
  el.textContent = el.classList.contains('active') ? '♥' : '♡';
  showToast(el.classList.contains('active') ? 'Added to wishlist ❤️' : 'Removed from wishlist', 'info');
}

/* ═══════════════════════════════════════════
   BUY AGAIN WIDGET
═══════════════════════════════════════════ */
function renderBuyAgain() {
  const container = document.getElementById('buy-again-container');
  if (!container) return;

  const products = PurchaseHistory.getRecentProducts();

  if (products.length === 0) {
    container.innerHTML = `
      <div class="buy-again-empty">
        <div style="font-size:32px;margin-bottom:8px">📦</div>
        <div>No previous orders yet. <a href="products.html" style="color:var(--amber)">Shop now</a> to get started!</div>
      </div>`;
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="buy-again-card">
      <img src="${p.img || 'assets/images/products/atta.jpg'}" alt="${p.name}" onerror="this.onerror=null;this.src='assets/images/products/atta.jpg'" />
      <div class="ba-name">${p.name}</div>
      <div class="ba-price">₹${p.price}<span style="font-size:10px;color:var(--grey-500);font-weight:400">/${p.unit||'unit'}</span></div>
      <button class="ba-reorder-btn" onclick="reorderItem('${p.id}')">↺ Reorder</button>
    </div>
  `).join('');
}

function reorderItem(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const min = product.moq || 10;
  Cart.add(product, min);
  showToast(`${product.name} × ${min} added to cart!`);
}

/* ═══════════════════════════════════════════
   HOMEPAGE PRODUCT SECTIONS
═══════════════════════════════════════════ */
function renderHomepageProducts() {
  const categories = [
    { id: 'beverages',  label: '🧃 Cold Drinks & Beverages' },
    { id: 'snacks',     label: '🍿 Biscuits, Bakery & Rusk' },
    { id: 'fmcg',       label: '🧴 Soaps, Shampoo & Personal Care' },
    { id: 'health',     label: '🥛 Health Drinks & Nutrition' },
    { id: 'cleaning',   label: '🧹 Cleaning Products & Detergents' },
    { id: 'grocery',    label: '🌾 Grocery Staples & Cooking Oils' },
    { id: 'stationery', label: '✏️ Stationery & Shop Supplies' }
  ];

  const wrap = document.getElementById('category-sections');
  if (!wrap) return;

  let html = '';
  for (const cat of categories) {
    const products = PRODUCTS.filter(p => p.category === cat.id);
    if (!products.length) continue;
    html += `
      <div class="home-section" id="sec-${cat.id}">
        <div class="home-section-header">
          <div class="home-section-title">${cat.label}</div>
          <a href="products.html?cat=${cat.id}" class="home-section-link">See all →</a>
        </div>
        <div class="amz-products-grid">${products.map(p => buildAmzCard(p)).join('')}</div>
      </div>`;
  }

  // All products section at bottom
  html += `
    <div class="home-section" id="sec-all">
      <div class="home-section-header">
        <div class="home-section-title">🏭 All Wholesale Bulk Inventory</div>
        <a href="products.html" class="home-section-link">View full catalog →</a>
      </div>
      <div class="amz-products-grid">${PRODUCTS.map(p => buildAmzCard(p)).join('')}</div>
    </div>`;

  wrap.innerHTML = html;
}

/* ═══════════════════════════════════════════
   LIVE SEARCH (homepage)
═══════════════════════════════════════════ */
function homepageSearch(query) {
  const q = query.trim().toLowerCase();
  document.querySelectorAll('.amz-card').forEach(card => {
    const name  = card.querySelector('.amz-name')?.textContent.toLowerCase() || '';
    const brand = card.querySelector('.amz-brand')?.textContent.toLowerCase() || '';
    const cat   = card.dataset.category?.toLowerCase() || '';
    card.style.display = (!q || name.includes(q) || brand.includes(q) || cat.includes(q)) ? '' : 'none';
  });

  // Hide empty sections
  document.querySelectorAll('.home-section').forEach(sec => {
    const visible = [...sec.querySelectorAll('.amz-card')].some(c => c.style.display !== 'none');
    sec.style.display = visible ? '' : 'none';
  });
}

/* ═══════════════════════════════════════════
   HERO BANNER SLIDER
═══════════════════════════════════════════ */
let slideIndex = 0, slideTimer;
const SLIDES = [
  { label: 'B2B Wholesale Marketplace 🏭', title: 'Bulk Inventory Supplies\nfor Retail Shop Owners', sub: 'Atta, Rice, Cooking Oil & Ghee at direct warehouse prices with GST invoices', color: '#1A1133', img: 'assets/images/hero_warehouse.jpg' },
  { label: 'FMCG & Hygiene Wholesale 🧴', title: 'Stock Up on Soaps,\nShampoos & Detergents', sub: 'Mysore Sandal, Dettol, Surf Excel & Vim bulk cartons delivered in 24-48 hrs', color: '#2D1B69', img: 'assets/images/products/soap.jpg' },
  { label: 'Beverages & Packaged Goods 🧃', title: 'Packaged Drinks &\nRetail Snack Cartons', sub: 'Nandini GoodLife Milk, Cothas Coffee, Bisleri & Chips master boxes for Kirana shops', color: '#1A1133', img: 'assets/images/products/cola.jpg' },
];

function initSlider() {
  const container = document.getElementById('hero-slides');
  const dotsEl    = document.getElementById('slider-dots');
  if (!container || !dotsEl) return;

  container.innerHTML = SLIDES.map((s, i) => `
    <div class="hero-slide">
      <div class="hero-slide-bg" style="background-image:url('${s.img}')"></div>
      <div class="hero-slide-content">
        <div class="hero-slide-label">${s.label}</div>
        <div class="hero-slide-title">${s.title.replace('\n','<br>')}</div>
        <div class="hero-slide-sub">${s.sub}</div>
        <a href="products.html" class="btn btn-primary" style="font-size:13px;padding:10px 20px">Shop Now →</a>
      </div>
    </div>`).join('');

  dotsEl.innerHTML = SLIDES.map((_, i) =>
    `<div class="slider-dot${i===0?' active':''}" onclick="goSlide(${i})"></div>`
  ).join('');

  startSlider();
}

function goSlide(n) {
  slideIndex = (n + SLIDES.length) % SLIDES.length;
  const container = document.getElementById('hero-slides');
  if (container) container.style.transform = `translateX(-${slideIndex * 100}%)`;
  document.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === slideIndex));
}

function startSlider() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goSlide(slideIndex + 1), 4500);
}

/* ═══════════════════════════════════════════
   CART PAGE RENDER
═══════════════════════════════════════════ */
function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  const items = Cart.get();

  if (items.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:80px 20px;background:#fff;border-radius:20px;border:1.5px solid var(--grey-100)">
        <div style="font-size:80px;margin-bottom:20px">🛒</div>
        <p style="font-family:var(--font-head);font-size:22px;font-weight:700;color:var(--navy);margin-bottom:8px">Your cart is empty</p>
        <p style="font-size:14px;color:var(--grey-500);margin-bottom:24px">Browse our wholesale catalog and add products to get started</p>
        <a href="index.html" class="btn btn-primary">Continue Shopping</a>
      </div>`;
    updateOrderSummary();
    return;
  }

  container.innerHTML = items.map((item, idx) => `
    <div class="cart-item" id="cart-item-${idx}">
      <div class="cart-item-img">
        <img src="${item.img || 'assets/images/products/atta.jpg'}" alt="${item.name}"
          style="width:100%;height:100%;object-fit:contain;padding:6px"
          onerror="this.src='assets/images/products/atta.jpg'" />
      </div>
      <div class="cart-item-info">
        <div class="cart-item-brand">${item.brand || 'Jan Wholesale'}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Min. Qty: ${item.moq || 10} units · ₹${item.price}/unit</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="cartChangeQty(${idx}, -${item.moq||10})">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="cartChangeQty(${idx}, ${item.moq||10})">+</button>
      </div>
      <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
      <button class="cart-item-remove" onclick="cartRemove('${item.id}')">🗑</button>
    </div>`).join('');

  updateOrderSummary();
}

function cartChangeQty(idx, delta) {
  const items = Cart.get();
  if (!items[idx]) return;
  items[idx].qty = Math.max(items[idx].moq || 10, items[idx].qty + delta);
  Cart.save(items);
  renderCart();
}

function cartRemove(id) {
  Cart.remove(id);
  renderCart();
  showToast('Item removed', 'info');
}

function updateOrderSummary() {
  const items    = Cart.get();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const savings  = items.reduce((s, i) => s + ((i.oldPrice||0) - i.price) * i.qty, 0);
  const delivery = subtotal > 5000 ? 0 : 149;
  const total    = subtotal + delivery;

  const $  = id => document.getElementById(id);
  $('summary-subtotal') && ($('summary-subtotal').textContent = '₹' + subtotal.toLocaleString('en-IN'));
  $('summary-savings')  && ($('summary-savings').textContent  = savings > 0 ? '−₹' + savings.toLocaleString('en-IN') : '₹0');
  $('summary-delivery') && ($('summary-delivery').textContent = delivery === 0 ? 'FREE' : '₹' + delivery);
  $('summary-total')    && ($('summary-total').textContent    = '₹' + total.toLocaleString('en-IN'));
}

/* ═══════════════════════════════════════════
   CHECKOUT
═══════════════════════════════════════════ */
function handleCheckout(e) {
  e.preventDefault();
  if (!Auth.isLoggedIn()) {
    openAuthModal('login');
    showToast('Please sign in to place an order', 'error');
    return;
  }
  const items = Cart.get();
  if (!items.length) { showToast('Your cart is empty', 'error'); return; }

  const total = Cart.total() + (Cart.total() > 5000 ? 0 : 149);
  PurchaseHistory.addOrder(items, total);
  Cart.clear();
  renderCart();

  showToast('🎉 Order placed! Delivery in 24-48 hours.');
  setTimeout(() => { window.location.href = 'purchases.html'; }, 2000);
}

/* ═══════════════════════════════════════════
   PURCHASE HISTORY PAGE
═══════════════════════════════════════════ */
function renderPurchasesPage() {
  const container = document.getElementById('purchases-container');
  if (!container) return;

  if (!Auth.isLoggedIn()) {
    container.innerHTML = `
      <div style="text-align:center;padding:80px 20px;background:#fff;border-radius:20px;border:1.5px solid var(--grey-100)">
        <div style="font-size:64px;margin-bottom:20px">🔐</div>
        <p style="font-family:var(--font-head);font-size:22px;font-weight:700;color:var(--navy);margin-bottom:8px">Sign in to view your orders</p>
        <p style="font-size:14px;color:var(--grey-500);margin-bottom:24px">Your purchase history is saved securely to your account.</p>
        <button class="btn btn-primary" onclick="openAuthModal('login')">Sign In</button>
      </div>`;
    return;
  }

  const orders = PurchaseHistory.get();

  if (!orders.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:80px 20px;background:#fff;border-radius:20px;border:1.5px solid var(--grey-100)">
        <div style="font-size:64px;margin-bottom:20px">📦</div>
        <p style="font-family:var(--font-head);font-size:22px;font-weight:700;color:var(--navy);margin-bottom:8px">No orders yet</p>
        <p style="font-size:14px;color:var(--grey-500);margin-bottom:24px">Your wholesale orders will appear here after you place them.</p>
        <a href="index.html" class="btn btn-primary">Start Shopping</a>
      </div>`;
    return;
  }

  // Simulate delivery status for demo
  const statuses = ['delivered', 'delivered', 'shipped', 'processing'];

  container.innerHTML = orders.map((order, oi) => {
    const date = new Date(order.date);
    const dateStr = date.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
    const status = order.status || statuses[oi % statuses.length];
    const statusLabel = { delivered: '✅ Delivered', shipped: '🚚 Shipped', processing: '⏳ Processing' };
    const statusClass = { delivered: 'status-delivered', shipped: 'status-shipped', processing: 'status-processing' };
    return `
      <div class="order-card">
        <div class="order-header">
          <div>
            <div class="order-id">Order #${order.id}</div>
            <div class="order-date">${dateStr}</div>
          </div>
          <span class="order-status ${statusClass[status]}">${statusLabel[status]}</span>
          <div class="order-total">₹${order.total.toLocaleString('en-IN')}</div>
        </div>
        <div class="order-items-list">
          ${order.items.map(item => `
            <div class="order-item">
              <img class="order-item-img" src="${item.img || 'assets/images/products/atta.jpg'}"
                alt="${item.name}" onerror="this.src='assets/images/products/atta.jpg'" />
              <div class="order-item-info">
                <div class="order-item-brand">${item.brand || 'Jan'}</div>
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-meta">Qty: ${item.qty} units · ₹${item.price}/unit</div>
              </div>
              <div class="order-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
            </div>`).join('')}
        </div>
        <div class="order-footer">
          <button class="btn btn-sm btn-outline" onclick="reorderAll(${oi})">↺ Reorder All</button>
          <a href="products.html" class="btn btn-sm btn-dark">🛒 Shop More</a>
        </div>
      </div>`;
  }).join('');
}

function reorderAll(orderIndex) {
  const orders = PurchaseHistory.get();
  const order  = orders[orderIndex];
  if (!order) return;
  order.items.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (product) Cart.add(product, item.qty);
  });
  showToast('✅ All items added to cart!');
  setTimeout(() => window.location.href = 'cart.html', 1200);
}

/* ═══════════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrollTop = document.getElementById('scroll-top-btn');
  if (window.scrollY > 60) {
    navbar?.classList.remove('transparent');
    navbar?.classList.add('scrolled');
    scrollTop?.classList.add('visible');
  } else {
    if (navbar?.classList.contains('transparent-capable')) {
      navbar?.classList.add('transparent');
      navbar?.classList.remove('scrolled');
    }
    scrollTop?.classList.remove('visible');
  }
});

document.getElementById('scroll-top-btn')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ═══════════════════════════════════════════
   HAMBURGER / MOBILE NAV
═══════════════════════════════════════════ */
document.getElementById('hamburger')?.addEventListener('click', () => {
  const mobileNav = document.getElementById('mobile-nav');
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('home-sidebar');
  mobileNav?.classList.toggle('open');
  sidebar?.classList.toggle('mobile-open');
  hamburger?.classList.toggle('open');
  const spans = hamburger?.querySelectorAll('span') || [];
  if (hamburger?.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

/* ═══════════════════════════════════════════
   FILTER BY CATEGORY (products page)
═══════════════════════════════════════════ */
function filterByCategory(cat) {
  document.querySelectorAll('.amz-card, .product-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
  });
  document.querySelectorAll('.cat-filter-btn, .cat-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });
  const el = document.getElementById('product-count');
  if (el) {
    const visible = document.querySelectorAll('.amz-card:not([style*="display: none"]),.product-card:not([style*="display: none"])').length;
    el.textContent = visible;
  }
}

/* ═══════════════════════════════════════════
   PAYMENT OPTIONS
═══════════════════════════════════════════ */
document.querySelectorAll('.payment-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    const radio = opt.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  });
});

/* ═══════════════════════════════════════════
   PROMO CODE
═══════════════════════════════════════════ */
document.getElementById('apply-promo')?.addEventListener('click', () => {
  const input = document.getElementById('promo-input');
  const code  = input?.value.trim().toUpperCase();
  const promos = { 'JAN10': '10% discount applied!', 'WELCOME': 'Welcome! Free delivery applied!', 'FIRST500': '₹500 credit added to your account!' };
  if (promos[code]) {
    showToast('🎉 ' + promos[code]);
    if (input) input.value = '';
  } else {
    showToast('Invalid promo code. Try JAN10 or WELCOME', 'error');
  }
});

/* ═══════════════════════════════════════════
   VIEW TOGGLE (grid/list on products page)
═══════════════════════════════════════════ */
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const grid = document.querySelector('.products-full-grid, .amz-products-grid');
    if (grid) grid.classList.toggle('list-view', btn.dataset.view === 'list');
  });
});

/* ═══════════════════════════════════════════
   INTERSECTION OBSERVER — FADE IN
═══════════════════════════════════════════ */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ═══════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════ */
function animateCount(el, target, suffix = '') {
  const dur = 1800, start = performance.now();
  (function step(ts) {
    const p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('en-IN') + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}

const cntObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const numEl = e.target.querySelector('.num');
      if (numEl) animateCount(numEl, parseInt(e.target.dataset.count), e.target.dataset.suffix || '');
      cntObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cntObserver.observe(el));

/* ═══════════════════════════════════════════
   INITIALISE ON DOM READY
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  refreshAuthUI();

  // Homepage
  if (document.getElementById('category-sections')) {
    renderHomepageProducts();
    initSlider();
  }

  // Cart page
  renderCart();

  // Purchases page
  renderPurchasesPage();

  // Checkout form
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckout);

  // Auth form listeners
  document.getElementById('login-form')?.addEventListener('submit', handleLogin);
  document.getElementById('register-form')?.addEventListener('submit', handleRegister);

  // Close modal on overlay click
  document.getElementById('auth-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'auth-overlay') closeAuthModal();
  });

  // Set active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href && path.includes(href.replace('.html', ''))) link.classList.add('active');
  });

  // Auto-filter from URL param
  const urlCat = new URLSearchParams(window.location.search).get('cat');
  if (urlCat) setTimeout(() => filterByCategory(urlCat), 200);
});
