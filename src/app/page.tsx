import { redirect } from 'next/navigation';

export default function HomePage() {
  // For now, redirect to login. In a real app, check auth status.
  redirect('/login');
  return null; 
}
