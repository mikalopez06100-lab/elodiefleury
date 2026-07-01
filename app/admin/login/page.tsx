import { Suspense } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#f4f1ec] px-5 py-10">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
