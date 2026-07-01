import AdminShell from "@/components/admin/AdminShell";
import PropertyEditor from "@/components/admin/PropertyEditor";
import { defaultPropertyShowcase } from "@/lib/properties.shared";

export default function AdminPropertyNewPage() {
  return (
    <AdminShell
      title="Nouveau bien"
      subtitle="Ajoutez 5 photos, les légendes multilingues et publiez le bien sur la page d'accueil et /biens."
    >
      <PropertyEditor initial={defaultPropertyShowcase()} mode="create" />
    </AdminShell>
  );
}
