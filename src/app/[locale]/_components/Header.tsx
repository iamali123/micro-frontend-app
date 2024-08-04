'use client'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import LangSwitcher from './LangSwitcher'
import ThemeSwitch from './ThemeSwitch'
import { FiLogIn } from "react-icons/fi";

interface Props {
  locale: string
}
export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('')
  return (
    <div className='mx-auto flex max-w-screen-2xl flex-row items-center justify-between p-5'>
      <Link lang={locale} href='/'>
        <div className='flex flex-row items-center'>
          <strong className='mx-2 select-none'>Micro Frontend</strong>
        </div>
      </Link>
      <div className='flex flex-row items-center gap-3'>
        <nav className='mr-10 inline-flex gap-5'>
        <Link href="/">Home</Link>
        <Link lang={locale} href={`/about`}>
            {t('About')}
          </Link>
          <Link lang={locale} href="/client">Client</Link>
          <Link lang={locale} href="/server">Dashboard</Link>
        </nav>
        <ThemeSwitch />
        <LangSwitcher />
        <Link  className='text-destructive text-nowrap' lang={locale} href={`api/auth/signout`}>Sign Out</Link>
        <Link className='rounded focus:outline-none focus:shadow-outline  px-2 py-2 text-sm bg-button text-button-text text-destructive inline-flex  items-center justify-between gap-2' lang={locale} href={`Signapi/auth/signin`}>Sign In <FiLogIn /></Link>
      </div>
    </div>
  )
}
