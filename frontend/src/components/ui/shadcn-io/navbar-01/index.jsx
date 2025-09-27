'use client';;
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Login from '@/components/authentication/Login';
import Register from '@/components/authentication/Register';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Simple logo component for the navbar
const Logo = (props) => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 324 323'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <rect
        x='88.1023'
        y='144.792'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 88.1023 144.792)'
        fill='currentColor' />
      <rect
        x='85.3459'
        y='244.537'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 85.3459 244.537)'
        fill='currentColor' />
    </svg>
  );
};

// Hamburger icon component
const HamburgerIcon = ({
  className,
  ...props
}) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
  </svg>
);

// Default navigation links
const defaultNavigationLinks = [
  { href: '#', label: 'Home', active: true },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
];

export const Navbar01 = React.forwardRef((
  {
    className,
    logo = <Logo />,
    navigationLinks = defaultNavigationLinks,
    signInText = 'Sign In',
    ctaText = 'Get Started',
    onSignInClick,
    onCtaClick,
    ...props
  },
  ref
) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const containerRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setIsMobile(width < 768); // 768px is md breakpoint
      }
    };

    checkWidth();

    const resizeObserver = new ResizeObserver(checkWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Combine refs
  const combinedRef = React.useCallback((node) => {
    containerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);

  return (
    <header
      ref={combinedRef}
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/30 bg-background/20 backdrop-blur-md supports-[backdrop-filter]:bg-background/20 px-4 md:px-6 [&_*]:no-underline',
        className
      )}
      {...props}>
      <div
        className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          {isMobile && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                  variant="ghost"
                  size="icon">
                  <HamburgerIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-48 p-2">
              <NavigationMenu className="max-w-none">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <button
                        onClick={(e) => e.preventDefault()}
                        className={cn(
                          "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer no-underline",
                          link.active 
                            ? "bg-accent text-accent-foreground" 
                            : "text-foreground/80"
                        )}>
                        {link.label}
                      </button>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              </PopoverContent>
            </Popover>
          )}
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={(e) => e.preventDefault()}
              className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer">
              <div className="text-2xl">
                {logo}
              </div>
              <span className="hidden font-bold text-xl sm:inline-block">shadcn.io</span>
            </button>
            {/* Navigation menu */}
            {!isMobile && (
              <NavigationMenu className="flex">
              <NavigationMenuList className="gap-1">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                        link.active 
                          ? "bg-accent text-accent-foreground" 
                          : "text-foreground/80 hover:text-foreground"
                      )}>
                      {link.label}
                    </button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <span className="text-sm text-foreground/80">Welcome!</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={async (e) => {
                  e.preventDefault();
                  await logout();
                }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Popover open={showLoginModal} onOpenChange={setShowLoginModal}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLoginModal(true);
                      if (onSignInClick) onSignInClick();
                    }}>
                    {signInText}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">Sign In</h3>
                      <p className="text-sm text-muted-foreground">
                        Enter your credentials to access your account
                      </p>
                    </div>
                    <Login
                      onAuthSuccess={(success) => {
                        if (success) {
                          setShowLoginModal(false);
                        }
                      }}
                    />
                    <div className="text-center">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-sm"
                        onClick={() => {
                          setShowLoginModal(false);
                          setShowRegisterModal(true);
                        }}>
                        Don't have an account? Sign up
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover open={showRegisterModal} onOpenChange={setShowRegisterModal}>
                <PopoverTrigger asChild>
                  <Button
                    size="sm"
                    className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowRegisterModal(true);
                      if (onCtaClick) onCtaClick();
                    }}>
                    {ctaText}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">Get Started</h3>
                      <p className="text-sm text-muted-foreground">
                        Create your account to get started
                      </p>
                    </div>
                    <Register
                      onAuthSuccess={(success) => {
                        if (success) {
                          setShowRegisterModal(false);
                        }
                      }}
                    />
                    <div className="text-center">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-sm"
                        onClick={() => {
                          setShowRegisterModal(false);
                          setShowLoginModal(true);
                        }}>
                        Already have an account? Sign in
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
    </header>
  );
});

Navbar01.displayName = 'Navbar01';

export { Logo, HamburgerIcon };