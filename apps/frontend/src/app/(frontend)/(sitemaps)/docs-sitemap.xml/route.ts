import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'
import fs from 'fs'
import path from 'path'

const getDocsSitemap = unstable_cache(
  async () => {
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const dateFallback = new Date().toISOString()

    const docsPath = path.join(process.cwd(), 'src/app/(frontend)/docs')

    const docPages: string[] = []

    try {
      const entries = fs.readdirSync(docsPath, { withFileTypes: true })

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const pagePath = path.join(docsPath, entry.name, 'page.mdx')
          if (fs.existsSync(pagePath)) {
            docPages.push(entry.name)
          }
        }
      }
    } catch (error) {
      console.error('Error reading docs directory:', error)
    }

    const sitemap = [
      {
        loc: `${SITE_URL}/docs`,
        lastmod: dateFallback,
      },
      ...docPages.map((slug) => ({
        loc: `${SITE_URL}/docs/${slug}`,
        lastmod: dateFallback,
      })),
    ]

    return sitemap
  },
  ['docs-sitemap'],
  {
    tags: ['docs-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getDocsSitemap()

  return getServerSideSitemap(sitemap)
}
