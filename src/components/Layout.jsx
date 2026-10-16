import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, HeartHandshake, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from '../lib/api';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/explore', label: 'Explore Food' },
  { to: '/impact', label: 'Impact' },
  { to: '/about', label: 'About' },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let active = true;

    const loadCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (active) setUser(currentUser || null);
      } catch {
        if (active) setUser(null);
      }
    };

    loadCurrentUser();

    return () => {
      active = false;
    };
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      navigate('/');
    }
  };

  const isLoggedIn = Boolean(user);

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 font-bold text-forest">
            <div className="rounded-full bg-forest p-2 text-white shadow-soft">
              <Leaf className="h-5 w-5" />
            </div>
            FoodBridge
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-forest' : 'text-slate-600 hover:text-forest'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <>
                <span className="text-sm font-semibold text-forest">Hi, {user?.name?.split(' ')[0] || 'there'}</span>
                <button type="button" onClick={handleLogout} className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-forest">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-forest">
                  Login
                </Link>
                <Link to="/signup" className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white shadow-soft">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="rounded-full border border-slate-200 p-2 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu className="h-5 w-5 text-forest" />
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-emerald-100 bg-white px-4 py-4 shadow-lg md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2.5 text-sm font-semibold ${isActive ? 'bg-emerald-50 text-forest' : 'text-slate-600'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-2 grid gap-2 border-t border-slate-100 pt-3">
                {isLoggedIn ? (
                  <button type="button" onClick={handleLogout} className="rounded-full border border-emerald-200 px-4 py-2.5 text-center text-sm font-semibold text-forest">Log out</button>
                ) : (
                  <>
                    <Link onClick={() => setMenuOpen(false)} to="/login" className="rounded-full border border-emerald-200 px-4 py-2.5 text-center text-sm font-semibold text-forest">Login</Link>
                    <Link onClick={() => setMenuOpen(false)} to="/signup" className="rounded-full bg-forest px-4 py-2.5 text-center text-sm font-semibold text-white">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-emerald-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3 text-lg font-bold text-forest">
              <div className="rounded-full bg-forest p-2 text-white">
                <HeartHandshake className="h-5 w-5" />
              </div>
              FoodBridge
            </div>
            <p className="text-sm text-slate-600">Rescue Food. Share Hope.</p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Navigate</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/how-it-works">How it works</Link></li>
              <li><Link to="/explore">Explore food</Link></li>
              <li><Link to="/impact">Impact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Support</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Safety</h3>
            <p className="text-sm text-slate-600">Food safety is a shared responsibility. Donors and organizations must follow local food handling rules.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
