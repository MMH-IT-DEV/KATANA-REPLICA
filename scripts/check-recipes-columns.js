const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRecipes() {
    console.log('🔍 FETCHING RECIPES TABLE COLUMNS');

    const { data: recipes } = await supabase.from('recipes').select('*').limit(1);

    if (recipes && recipes[0]) {
        console.log('Columns in recipes table:', Object.keys(recipes[0]));
    } else {
        // If empty, try to get from another row if any
        const { data: allRecipes } = await supabase.from('recipes').select('*');
        if (allRecipes && allRecipes.length > 0) {
            console.log('Columns in recipes table:', Object.keys(allRecipes[0]));
        } else {
            console.log('Recipes table is empty.');
        }
    }
}

checkRecipes();
