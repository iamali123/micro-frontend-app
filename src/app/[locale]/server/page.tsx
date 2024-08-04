import { options } from "../../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import UserCard from "../_components/UserCard"
import { redirect } from "next/navigation"
import { useTranslations } from 'next-intl'

export default function ServerPage() {
    const session =  getServerSession(options)
    const t = useTranslations('')

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }

    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Server"} />
        </section>
    )

}