import AdminLoginForm from "@/components/admin/AdminLoginForm";

type Props = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { next } = await searchParams;

  return (
    <div className="px-5 py-10">
      <AdminLoginForm nextPath={next ?? "/admin"} />
    </div>
  );
}
