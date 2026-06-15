import Link from "next/link";
import { NavMenu } from "./nav-menu";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Writing" },
];

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-sm">
      <nav className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-mono text-base font-bold tracking-tight text-foreground">
          sawcodes
        </Link>
        <ul className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <NavMenu links={links} />
      </nav>
    </header>
  );
}
