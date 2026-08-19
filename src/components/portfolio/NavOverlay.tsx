const links = [
  { href: '/', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: 'mailto:toribryan.design@gmail.com', label: 'Contact' },
];

export default function NavOverlay() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-between px-6 pt-6 text-white md:px-12">
      <a href="/" className="pointer-events-auto">
        <p className="font-serif text-lg">tori bryan</p>
        <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-[0.52px] opacity-70">
          open to work
        </p>
      </a>
      <nav className="pointer-events-auto">
        <ul className="flex items-center gap-5 font-sans text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="opacity-80 transition-opacity hover:opacity-100">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
