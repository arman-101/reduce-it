import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="py-4 px-6 border-b border-border">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
            <Image src="/icon.png" alt="Reduce It Logo" width={32} height={32} className="rounded-md"/>
            <h1 className="text-3xl font-serif font-bold text-foreground tracking-wider group-hover:text-primary transition-colors">
              Reduce It
            </h1>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
