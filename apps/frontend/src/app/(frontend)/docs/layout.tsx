import type { ReactNode } from 'react'
import { Layout } from 'nextra-theme-docs'
import { Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style-prefixed.css'

export const metadata = {
  title: 'ColdFlow Docs',
  description: 'Documentation for ColdFlow — open-source cold email and outreach automation.',
}

function StyledSearch() {
  return (
    <div className="relative w-64">
      <Search
        className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-1.5 text-sm transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:border-gray-300 dark:hover:border-gray-600 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500"
      />
    </div>
  )
}

export default async function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  const pageMap = await getPageMap('/docs')

  return (
    <Layout
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/pypes-dev/coldflow/tree/main/apps/frontend/"
      navbar={<StyledSearch />}
    >
      {children}
    </Layout>
  )
}
