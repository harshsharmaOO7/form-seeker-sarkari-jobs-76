import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* News Ticker */}
      <div className="news-ticker">
        <div className="ticker-content">
          <span className="mr-8">
            🔥 Latest Updates: Railway Group D Result 2024 Released
          </span>
          <span className="mr-8">
            📢 Police Constable Recruitment 2024 - Apply Now
          </span>
          <span className="mr-8">
            ⚡ Bank PO Notification Out - Last Date Extended
          </span>
          <span className="mr-8">
            📋 Teaching Staff Vacancy - 5000+ Posts Available
          </span>
        </div>
      </div>

      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-2xl font-bold text-primary">Sarkari</span>
                <span className="text-2xl font-bold text-accent">Forms</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-slate-700 hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/job-forms"
                className="text-slate-700 hover:text-primary transition-colors font-medium"
              >
                Job Forms
              </Link>
              <Link
                to="/category/all"
                className="text-slate-700 hover:text-primary transition-colors font-medium"
              >
                All Categories
              </Link>
              <Link
                to="/category/latest"
                className="text-slate-700 hover:text-primary transition-colors font-medium"
              >
                Latest Jobs
              </Link>
              <Link
                to="/category/results"
                className="text-slate-700 hover:text-primary transition-colors font-medium"
              >
                Results
              </Link>
              <Link
                to="/about"
                className="text-slate-700 hover:text-primary transition-colors font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-slate-700 hover:text-primary transition-colors font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Notification Bell */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border bg-white">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-slate-700 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/job-forms"
                  className="text-slate-700 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Job Forms
                </Link>
                <Link
                  to="/category/all"
                  className="text-slate-700 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Categories
                </Link>
                <Link
                  to="/category/latest"
                  className="text-slate-700 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Latest Jobs
                </Link>
                <Link
                  to="/about"
                  className="text-slate-700 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-slate-700 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
