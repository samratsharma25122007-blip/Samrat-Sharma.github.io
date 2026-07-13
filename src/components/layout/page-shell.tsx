import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/page-header';
import { Footer } from '@/components/layout/footer';

/**
 * PageShell — shared chrome for the content pages: sticky glass header, the page
 * content, and the footer, over the ambient water-wash background.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
