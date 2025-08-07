import { Github, Twitter, Coffee } from 'lucide-react';
import Link from 'next/link';

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
        {children}
    </a>
);

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="container mx-auto p-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p className="text-center md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} ReduceIt - All Rights Reserved.
        </p>
        <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="/about" className="text-lg hover:text-primary transition-colors underline">
                About Me
            </Link>
            <div className="h-4 w-px bg-border"></div>
            <FooterLink href="https://github.com/arman-101/">
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
            </FooterLink>
            <FooterLink href="#">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">X (formerly Twitter)</span>
            </FooterLink>
            <FooterLink href="https://buymeacoffee.com/darknebulax1">
                <Coffee className="w-6 h-6" />
                <span className="sr-only">Buy Me a Coffee</span>
            </FooterLink>
        </div>
      </div>
    </footer>
  );
}
