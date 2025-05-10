
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, ShieldHeart, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#contexto', label: 'NR-1' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#contato', label: 'Contato' },
  { href: '/portal', label: 'Portal do Cliente' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="PsychoSocial Solutions Logo" width={36} height={36} data-ai-hint="abstract brainwave" />
          <span className="text-xl font-semibold text-primary">PsychoSocial Solutions</span>
        </Link>

        <nav className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              asChild
              className={cn(
                'text-sm font-medium',
                (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)))
                  ? 'text-primary hover:text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                   <Link href="/" className="flex items-center gap-2">
                     <Image src="/logo.svg" alt="PsychoSocial Solutions Logo" width={28} height={28} data-ai-hint="abstract brainwave" />
                     <span className="text-lg font-semibold text-primary">PsychoSocial</span>
                   </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Fechar menu</span>
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.label} asChild>
                       <Link
                        href={link.href}
                        className={cn(
                          'block px-3 py-2 rounded-md text-base font-medium',
                           (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)))
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground hover:bg-muted'
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
