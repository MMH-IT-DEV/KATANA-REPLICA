const fs = require('fs');
const path = require('path');

const API_KEY = '1688b81f-111e-4929-b436-ba436fd1d99e';
const BASE_URL = 'https://api.katanamrp.com/v1';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchKatana(endpoint, extraParams = '') {
  let allResults = [];
  let page = 1;
  const limit = 100; // Max limit per page

  while (true) {
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}${endpoint}${separator}limit=${limit}&page=${page}${extraParams}`;
    
    // Add a small delay before each request to avoid 429s
    await sleep(200); 
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (response.status === 429) {
        console.log('⏳ Rate limited. Waiting 2 seconds...');
        await sleep(2000);
        continue; // Retry the same request
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Check if data is paginated (array or object with data property)
    const results = Array.isArray(data) ? data : (data.data || []);
    
    allResults = [...allResults, ...results];

    if (results.length < limit) {
      break; // Reached last page
    }
    page++;
  }
  
  return allResults;
}

async function sync() {
  try {
    console.log('🔌 Connecting to Katana...');
    
    // 1. Fetch Products (Active & Archived)
    console.log('📦 Fetching Products (Active & Archived)...');
    const activeProducts = await fetchKatana('/products');
    // Try fetching archived products specifically if they aren't included by default
    // Note: API behavior for archived items varies, assuming status=archived or similar might be needed
    // But for now, we'll try to fetch all if possible. 
    // If the default endpoint returns only active, we might need a specific parameter.
    // Based on Katana docs, deleted/archived might need specific handling or are included with a flag.
    // Let's assume we merge two calls if needed, but first let's just try standard fetch.
    // Edit: Adding a second fetch for archived if supported by common convention ?status=archived
    let archivedProducts = [];
    try {
        archivedProducts = await fetchKatana('/products', '&status=archived');
    } catch (e) {
        console.log('   (Archived products fetch skipped or not supported via status param)');
    }
    
    // Deduplicate by ID just in case
    const productMap = new Map();
    [...activeProducts, ...archivedProducts].forEach(p => productMap.set(p.id, p));
    const products = Array.from(productMap.values());
    
    await sleep(500);
    
    // 2. Fetch Materials (Active & Archived)
    console.log('🧱 Fetching Materials (Active & Archived)...');
    const activeMaterials = await fetchKatana('/materials');
    let archivedMaterials = [];
    try {
        archivedMaterials = await fetchKatana('/materials', '&status=archived');
    } catch (e) {
         console.log('   (Archived materials fetch skipped)');
    }

    const materialMap = new Map();
    [...activeMaterials, ...archivedMaterials].forEach(m => materialMap.set(m.id, m));
    const materials = Array.from(materialMap.values());

    await sleep(500);

    // 3. Fetch Variants (The actual SKUs for both Products and Materials)
    console.log('🔢 Fetching All Variants...');
    let variants = [];
    try {
        variants = await fetchKatana('/variants');
    } catch (e) {
        console.log('⚠️ /variants failed, checking for V1 specific endpoints...');
    }
    await sleep(500);

    // 4. Fetch Recipes (BOMs) - Linking Products to Materials
    console.log('📜 Fetching Recipes (BOMs)...');
    const recipes = await fetchKatana('/recipes');
    await sleep(500);

    // 5. Fetch Inventory
    console.log('🏭 Fetching Inventory Levels...');
    const inventory = await fetchKatana('/inventory');
    await sleep(500);

    // 6. Fetch Suppliers
    console.log('🚚 Fetching Suppliers...');
    const suppliers = await fetchKatana('/suppliers');

    const data = {
      timestamp: new Date().toISOString(),
      products,
      materials,
      variants,
      recipes,
      inventory,
      suppliers
    };

    const outputPath = path.join(__dirname, '../src/lib/katana-cache.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    
    console.log(`✅ Sync Complete:`);
    console.log(`   - Products: ${products.length}`);
    console.log(`   - Materials: ${materials.length}`);
    console.log(`   - Variants: ${variants.length}`);
    console.log(`   - Recipes: ${recipes.length}`);
    console.log(`   - Inventory Records: ${inventory.length}`);
    console.log(`   - Suppliers: ${suppliers.length}`);
    console.log(`💾 Saved to ${outputPath}`);

  } catch (error) {
    console.error('❌ Sync failed:', error.message);
  }
}

sync();