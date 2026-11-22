import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Layers, FolderKanban, Mail, Briefcase, FileText } from 'lucide-react';

/** `to` = real route (crawlable <a href>), `href` = section on the home page. */
export const navLinks = [
  { name: 'Services', to: '/services', icon: Briefcase },
  { name: 'About', href: '#about', icon: User },
  { name: 'Expertise', href: '#expertise', icon: Layers },
  { name: 'Projects', href: '#projects', icon: FolderKanban },
  { name: 'Resume', to: '/resume', icon: FileText },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export const scrollToHash = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

/**
 * One nav entry that behaves correctly everywhere:
 *  - route links and every link while off the home page render as router <Link>s (real hrefs)
 *  - on the home page, section links smooth-scroll.
 */
export const NavEntry = ({ link, onNavigate, children, ...rest }) => {
  const { pathname } = useLocation();
  if (link.to) {
    return (
      <Link to={link.to} onClick={onNavigate} {...rest}>
        {children}
      </Link>
    );
  }
  if (pathname !== '/') {
    return (
      <Link to={`/${link.href}`} onClick={onNavigate} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={() => {
        onNavigate?.();
        scrollToHash(link.href);
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export const useIsActive = (link, activeHash) => {
  const { pathname } = useLocation();
  if (link.to) return pathname === link.to || pathname.startsWith(`${link.to}/`);
  return pathname === '/' && activeHash === link.href;
};
