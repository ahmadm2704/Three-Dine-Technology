-- Portfolio seed: Shopify & WordPress client sites
-- Run this in your Supabase SQL editor

INSERT INTO projects (name, slug, client_name, description, project_type, demo_url, technologies, is_public, is_featured, status)
VALUES
  -- Shopify sites
  (
    'Lowcountry Littles',
    'lowcountry-littles',
    'Lowcountry Littles',
    'Shopify e-commerce store for children''s clothing and accessories.',
    'Shopify',
    'https://lowcountrylittles.com/',
    ARRAY['Shopify', 'Liquid', 'CSS'],
    true, false, 'completed'
  ),
  (
    'Augamis Health',
    'augamis-health',
    'Augamis Health',
    'Shopify storefront for health and wellness products.',
    'Shopify',
    'https://augamishealth.com/',
    ARRAY['Shopify', 'Liquid', 'CSS'],
    true, false, 'completed'
  ),
  (
    'Peblz XO',
    'peblz-xo',
    'Peblz XO',
    'Custom Shopify store with a modern and playful design.',
    'Shopify',
    'https://www.peblz-xo.com/',
    ARRAY['Shopify', 'Liquid', 'CSS'],
    true, false, 'completed'
  ),
  (
    'Golf N Pro Shop',
    'golfn-proshop',
    'Golf N',
    'Shopify pro shop for golf equipment and apparel.',
    'Shopify',
    'https://proshop.golfn.com/',
    ARRAY['Shopify', 'Liquid', 'CSS'],
    true, false, 'completed'
  ),
  (
    'Bu-Ko',
    'bu-ko',
    'Bu-Ko',
    'Shopify online store with a clean and minimal layout.',
    'Shopify',
    'https://bu-ko.online/',
    ARRAY['Shopify', 'Liquid', 'CSS'],
    true, false, 'completed'
  ),
  -- WordPress sites
  (
    'K Nelson Advisory',
    'k-nelson-advisory',
    'K Nelson Advisory',
    'Professional WordPress website for a financial advisory firm.',
    'WordPress',
    'https://knelsonadvisory.com/',
    ARRAY['WordPress', 'PHP', 'CSS'],
    true, false, 'completed'
  ),
  (
    'Buy Cheech Glass',
    'buy-cheech-glass',
    'Cheech Glass',
    'WordPress e-commerce site for premium glass products.',
    'WordPress',
    'https://buycheechglass.com/',
    ARRAY['WordPress', 'WooCommerce', 'PHP', 'CSS'],
    true, false, 'completed'
  ),
  (
    'Alt Bionics',
    'alt-bionics',
    'Alt Bionics',
    'WordPress site for an innovative bionics and prosthetics company.',
    'WordPress',
    'https://www.altbionics.com/',
    ARRAY['WordPress', 'PHP', 'CSS'],
    true, false, 'completed'
  ),
  (
    'Ceiling Tiles By Us',
    'ceiling-tiles-by-us',
    'Ceiling Tiles By Us',
    'WordPress e-commerce store specializing in ceiling tile products.',
    'WordPress',
    'https://www.ceilingtilesbyus.com/',
    ARRAY['WordPress', 'WooCommerce', 'PHP', 'CSS'],
    true, false, 'completed'
  )
ON CONFLICT (slug) DO NOTHING;
