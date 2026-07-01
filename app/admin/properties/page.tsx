import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { getAllPropertyShowcases } from "@/lib/properties";

export default async function AdminPropertiesListPage() {
  const properties = await getAllPropertyShowcases();

  return (
    <AdminShell
      title="Biens en gestion"
      subtitle="Ajoutez de nouveaux biens, leurs photos et les légendes en français, espagnol et anglais."
    >
      <div className="mb-6">
        <Link href="/admin/properties/new" className="admin-primary-btn inline-block">
          + Nouveau bien
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#ddd6cc] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#ece7df] bg-[#faf8f5]">
            <tr>
              <th className="px-4 py-3 font-semibold">Identifiant</th>
              <th className="px-4 py-3 font-semibold">Titre (FR)</th>
              <th className="px-4 py-3 font-semibold">Statut</th>
              <th className="px-4 py-3 font-semibold">Ordre</th>
              <th className="px-4 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-b border-[#f0ebe4]">
                <td className="px-4 py-3 font-mono text-xs">{property.id}</td>
                <td className="px-4 py-3">{property.translations.fr.label}</td>
                <td className="px-4 py-3">
                  {property.published ? "Publié" : "Brouillon"}
                </td>
                <td className="px-4 py-3">{property.sortOrder}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/properties/${property.id}`}
                    className="font-medium text-[#8b6f61] hover:underline"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
