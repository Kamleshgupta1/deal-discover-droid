import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const siteUrl = 'https://cfnwpbhurcvijkfvyzgc.supabase.co';
    const currentDate = new Date().toISOString();

    // Fetch all published posts
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, updated_at')
      .eq('published', true)
      .order('updated_at', { ascending: false });

    // Fetch all categories
    const { data: categories } = await supabase
      .from('categories')
      .select('slug, updated_at')
      .order('updated_at', { ascending: false });

    // Fetch all tags
    const { data: tags } = await supabase
      .from('tags')
      .select('slug, updated_at')
      .order('updated_at', { ascending: false });

    const staticPages = [
      { url: '', changefreq: 'daily', priority: '1.0' },
      { url: 'blog', changefreq: 'daily', priority: '0.9' },
      { url: 'categories', changefreq: 'weekly', priority: '0.8' },
      { url: 'contact', changefreq: 'monthly', priority: '0.5' },
      { url: 'privacy', changefreq: 'monthly', priority: '0.3' },
      { url: 'terms', changefreq: 'monthly', priority: '0.3' },
    ];

    let urls = staticPages.map(page => `
  <url>
    <loc>${siteUrl}/${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

    // Add blog posts
    posts?.forEach(post => {
      urls += `
  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updated_at}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Add categories
    categories?.forEach(cat => {
      urls += `
  <url>
    <loc>${siteUrl}/category/${cat.slug}</loc>
    <lastmod>${cat.updated_at}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    // Add tags
    tags?.forEach(tag => {
      urls += `
  <url>
    <loc>${siteUrl}/tag/${tag.slug}</loc>
    <lastmod>${tag.updated_at}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
