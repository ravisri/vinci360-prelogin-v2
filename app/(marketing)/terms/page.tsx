import { LegalLayout } from "@/components/layout/LegalLayout"
import { termsAndConditions as doc } from "@/content/legal"
import { breadcrumb, buildMetadata, JsonLd } from "@/lib/seo"

export const metadata = buildMetadata({ title: doc.meta.title, description: doc.meta.description, path: doc.href })

export default function TermsPage() {
  return (
    <>
      <LegalLayout doc={doc} />
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/" },
          { name: doc.title, path: doc.href },
        ])}
      />
    </>
  )
}
