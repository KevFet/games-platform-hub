import { createClient } from '@/lib/supabase-server'
import { Auth } from '@/components/Auth'
import { Dashboard } from '@/components/Dashboard'

export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <Auth />
  }

  return <Dashboard user={user} />
}
