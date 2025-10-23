import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminEntryPage() {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get?.('adminToken')?.value ?? null;

    if (!adminToken) {
        redirect('/admin-login');
    }

    redirect('/admin/dashboard');
}