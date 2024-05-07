import { getSession } from '@/action';

export default async function Page() {
  const profileObject = await getSession();
  const profile = JSON.stringify(profileObject, null, 2);

  return (
    <main className="flex grow divide-x divide-[var(--secondary-gray)]">
      <section>
        <p className="text-white">Email:{profileObject?.payload.email}</p>
      </section>
    </main>
  );
}
