'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Factory,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: BarChart3,
      current: pathname === '/',
    },
    {
      name: 'Production',
      href: '/production',
      icon: Factory,
      current: pathname === '/production',
    },
    {
      name: 'Documentation',
      href: '/documentation',
      icon: FileText,
      current: pathname === '/documentation',
    },
  ];

  const userNavigation = [
    { name: 'Your Profile', href: '#', icon: User },
    { name: 'Settings', href: '#', icon: Settings },
    { name: 'Sign out', href: '#', icon: LogOut },
  ];

  return (
    <header className="border-b border-orange-500 bg-black-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                <Factory className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-white">Latinhas LLC</h1>
                <p className="text-xs text-gray-300">Demand Planning System</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  item.current
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-orange-500',
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu - Desktop */}
          <div className="hidden items-center space-x-4 md:flex">
            <div className="flex items-center space-x-3 rounded-lg bg-gray-800 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  Albert Johnson
                </span>
                <span className="text-xs text-gray-300">Administrator</span>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-700 md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 rounded-md px-3 py-2 text-base font-medium',
                    item.current
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile User Menu */}
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center space-x-3 px-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">
                    Albert Johnson
                  </span>
                  <span className="text-xs text-gray-300">Administrator</span>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
