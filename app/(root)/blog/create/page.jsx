// app/(root)/blog/create/page.jsx
import { auth } from '@/auth';
import AddBlogClient from '@/components/AddBlogClient';
import { notFound } from 'next/navigation';

export default async function AddBlogPage() {
  const session = await auth(); // ✅ Safe in Server Component
  if(session&& session.isAuthorized){
  return <AddBlogClient session={session} />;
  }else{
    return notFound();
  }
}