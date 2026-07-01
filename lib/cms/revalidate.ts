import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateBlogContent() {
  revalidateTag("blog");
  revalidatePath("/blog");
  revalidatePath("/es/blog");
  revalidatePath("/en/blog");
}

export function revalidatePropertyContent() {
  revalidateTag("properties");
  revalidatePath("/biens");
  revalidatePath("/es/biens");
  revalidatePath("/en/biens");
  revalidatePath("/");
  revalidatePath("/es");
  revalidatePath("/en");
}
