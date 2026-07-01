import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import PropertyEditor from "@/components/admin/PropertyEditor";
import { getPropertyById } from "@/lib/properties";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminPropertyEditPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  return (
    <AdminShell
      title="Modifier le bien"
      subtitle={property.translations.fr.label}
    >
      <PropertyEditor initial={property} mode="edit" />
    </AdminShell>
  );
}
