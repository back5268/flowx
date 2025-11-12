"use client"

import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { Activity, CreditCard, LayoutTemplate, LogOut, Settings, User, Workflow } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { name: "Overview", href: "/dashboard", icon: Activity },
  { name: "Workflows", href: "/dashboard/workflows", icon: Workflow },
  { name: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

const SideBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <div className='w-64 bg-[#121826] border-r border-[#1e293b] flex flex-col'>
      <div className='px-4 pt-3 pb-2'>
        {/* <Image src={require("@/assets/logo.png")} alt="" width={200} height={190} className='-my-15' /> */}
      </div>

      <nav className='flex-1 px-4 pt-0'>
        <ul className='space-y-5'>
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href || item.href !== "/dashboard" && pathname.startsWith(item.href)
            return (
              <li key={index}>
                <Link href={item.href} className={cn("flex items-center space-x-3 px-3 py-1.5 rounded text-sm font-medium leading-tight transition-all duration-300",
                  isActive ? "bg-green-500/10 text-green-400 glow" : "text-gray-300 hover:bg-[#1e293b]")}>
                  <Icon className='h-4 w-4' />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className='mt-auto p-3 border-t border-[#1e293b] space-y-4 mb-2'>
        <Link href={"/dashboard/settings"} className='flex items-center px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#1e293b] hover:text-white transition-colors'>
          <User className='w-4 h-4' />
          <span>Profile</span>
        </Link>

        <button type='button' onClick={async () => {
          await logout();
          router.push("/")
        }} className='w-full flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#1e293b] hover:text-white transition-colors cursor-pointer'>
          <LogOut className='h-4 w-4 text-red-400' />
          <span className='text-red-400'>Log Out</span>
        </button>
      </div>
    </div>
  )
}

export default SideBar
