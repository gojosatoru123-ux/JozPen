// app/(root)/blog/create/page.jsx
import { auth } from '@/auth';
import AddBlogClient from '@/components/AddBlogClient';

export default async function AddBlogPage() {
  const session = await auth(); // ✅ Safe in Server Component
  return <AddBlogClient session={session} />;
}
