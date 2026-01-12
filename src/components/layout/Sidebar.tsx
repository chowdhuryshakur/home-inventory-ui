'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { Package, MapPin, Settings, Home, Ticket, Tag, EllipsisVertical, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  onClose?: () => void;
}

const navItems = [
  { href: '/inventory', icon: Package, label: 'Inventory' },
  { href: '/locations', icon: MapPin, label: 'Locations' },
  { href: '/labels', icon: Tag, label: 'Labels' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ onClose }: SidebarProps) {

  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#E2E8F0] min-h-[calc(100vh-73px)]">
      <div className='p-6 border border-[#E2E8F0] flex items-center'>
        <Image src='/images/logo.png' alt='logo' width={41} height={41} className='mr-3'/>
        <div>
            <h3 className='font-bold text-[18px] text-[#0F172A]'>Home Inventory</h3>
            <p className='text-[12px] text-[#64748B]'>Manage your items</p>
        </div>
        <button
          onClick={onClose}
          className="w-1 ms-2 text-gray-500 hover:text-gray-700 lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <nav className="p-4 min-h-[80vh]">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex rounded-lg items-center gap-3 px-4 py-3 transition-colors ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#3B82F6]'
                      : 'text-[#334155] hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className='p-6 border border-[#E2E8F0] flex items-center'>
        <Image src='/images/logo.png' alt='logo' width={41} height={41} className='mr-3 rounded-full'/>
        <div>
            <h3 className='text-[14px] text-[#0F172A]'>{user?.name || 'John Doe'}</h3>
            <p className='text-[12px] text-[#64748B]'>{user?.email || 'john@gmail.com'}</p>
        </div>
        <EllipsisVertical size='16px' className='ms-auto text-[#94A3B8]'/>
      </div>
    </aside>
  );
}