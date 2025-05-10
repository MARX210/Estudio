
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu } from 'lucide-react'; // X icon is provided by SheetClose
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
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="PsychoSocial Solutions Logo" width={32} height={32} className="sm:w-9 sm:h-9" data-ai-hint="abstract brainwave" />
          <span className="text-lg sm:text-xl font-semibold text-primary">PsychoSocial</span>
          <span className="hidden xs:inline text-lg sm:text-xl font-semibold text-primary">Solutions</span>
        </Link>

        <nav className="hidden md:flex gap-0.5 lg:gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              asChild
              className={cn(
                'text-xs lg:text-sm font-medium px-2 lg:px-3 py-1.5 h-auto', // Smaller padding and text on medium screens
                (pathname === link.href || (link.href.length > 1 && pathname.startsWith(link.href) && link.href !== '/'))
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
              <Button variant="ghost" size="icon" className="w-9 h-9 sm:w-10 sm:h-10">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px] sm:w-[280px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                   <Link href="/" className="flex items-center gap-2">
                     <Image src="/logo.svg" alt="PsychoSocial Solutions Logo" width={28} height={28} data-ai-hint="abstract brainwave" />
                     <span className="text-lg font-semibold text-primary">PsychoSocial</span>
                   </Link>
                  {/* SheetClose is part of SheetContent and handles the X icon */}
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.label} asChild>
                       <Link
                        href={link.href}
                        className={cn(
                          'block px-3 py-2.5 rounded-md text-sm sm:text-base font-medium',
                           (pathname === link.href || (link.href.length > 1 && pathname.startsWith(link.href) && link.href !== '/'))
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

