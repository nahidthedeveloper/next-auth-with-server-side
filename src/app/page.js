import { authOptions } from '@/utils/nextAuth'
import { getServerSession } from 'next-auth'
import DrawerButton from '@/components/DrawerButton'

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div>
            <DrawerButton />
            {session && <div>User Email: {session.user.email}</div>}
        </div>
    )
}
