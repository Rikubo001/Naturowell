const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
}: {
  query: string;
  variables?: any;
  cache?: RequestCache;
}): Promise<{ status: number; body: T }> {
  try {
    const endpoint = `https://${domain}/api/2024-04/graphql.json`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken || '',
      },
      body: JSON.stringify({ query, variables }),
      cache,
      next: { revalidate: 3600 }, // Cache on edge for 1 hour
    });

    return {
      status: res.status,
      body: await res.json(),
    };
  } catch (error) {
    console.error('Error fetching from Shopify Storefront API:', error);
    throw error;
  }
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
        };
      };
    }>;
  };
}

const productsQuery = `
  query getProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getProducts(): Promise<ShopifyProduct[]> {
  const res = await shopifyFetch<any>({ query: productsQuery });
  if (!res.body || !res.body.data || !res.body.data.products) {
    // Return mock products for local UI development if credentials aren't set yet!
    return [
      {
        id: "gid://shopify/Product/1",
        title: "N° 01 / DEEP SLEEP GUMMIES",
        handle: "naturowell-deep-sleep-gummies",
        description: "Premium Entspannungs- & Einschlaf-Gummis mit Ashwagandha, Melisse, Kamille & Lavendel.",
        featuredImage: { url: "/naturowell_sleep_label_center.png" },
        priceRange: { minVariantPrice: { amount: "24.90", currencyCode: "EUR" } },
        variants: { edges: [{ node: { id: "gid://shopify/ProductVariant/1", title: "Default Title", price: { amount: "24.90" } } }] }
      },
      {
        id: "gid://shopify/Product/2",
        title: "N° 02 / BEAUTY & GLOW GUMMIES",
        handle: "naturowell-beauty-glow-gummies",
        description: "Premium Multivitamin- & Beauty-Gummis mit Biotin, Zink & Vitamin-Komplex.",
        featuredImage: { url: "/naturowell_beauty_label_center.png" },
        priceRange: { minVariantPrice: { amount: "24.90", currencyCode: "EUR" } },
        variants: { edges: [{ node: { id: "gid://shopify/ProductVariant/2", title: "Default Title", price: { amount: "24.90" } } }] }
      },
      {
        id: "gid://shopify/Product/3",
        title: "Naturowell Beauty Sleep Duo Pack",
        handle: "naturowell-beauty-sleep-duo-pack",
        description: "Das ultimative Set für Schlaf & Schönheit. Enthält 1x Deep Sleep & 1x Beauty & Glow.",
        featuredImage: { url: "/naturowell_duo_pack_mockup.png" },
        priceRange: { minVariantPrice: { amount: "39.90", currencyCode: "EUR" } },
        variants: { edges: [{ node: { id: "gid://shopify/ProductVariant/3", title: "Default Title", price: { amount: "39.90" } } }] }
      }
    ];
  }
  return res.body.data.products.edges.map((edge: any) => edge.node);
}

const productQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      featuredImage {
        url
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 5) {
        edges {
          node {
            id
            title
            price {
              amount
            }
          }
        }
      }
    }
  }
`;

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const res = await shopifyFetch<any>({
    query: productQuery,
    variables: { handle },
  });
  if (!res.body || !res.body.data || !res.body.data.product) {
    const products = await getProducts();
    return products.find(p => p.handle === handle) || null;
  }
  return res.body.data.product;
}

const cartCreateMutation = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
      }
    }
  }
`;

export async function getCheckoutUrl(variantId: string, quantity: number = 1): Promise<string> {
  const res = await shopifyFetch<any>({
    query: cartCreateMutation,
    variables: {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity: quantity,
          },
        ],
      },
    },
    cache: 'no-store', // Always dynamic checkout urls
  });

  if (!res.body || !res.body.data || !res.body.data.cartCreate) {
    // If not connected yet, fall back to shopify mock redirect
    return `https://${domain || 'naturowell-de.myshopify.com'}/cart/${variantId}:${quantity}`;
  }
  return res.body.data.cartCreate.cart.checkoutUrl;
}
