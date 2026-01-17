const KATANA_API_KEY = '1688b81f-111e-4929-b436-ba436fd1d99e'; // TODO: Move to environment variable
const BASE_URL = 'https://api.katanamrp.com/v1';

export async function fetchKatanaProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      headers: {
        'Authorization': `Bearer ${KATANA_API_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Katana API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Katana products:', error);
    return [];
  }
}

export async function fetchKatanaInventory() {
  try {
    const response = await fetch(`${BASE_URL}/inventory`, {
      headers: {
        'Authorization': `Bearer ${KATANA_API_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Katana API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Katana inventory:', error);
    return [];
  }
}

















