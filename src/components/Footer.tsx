
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">SarkariForm</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted source for latest Sarkari offline job forms and government recruitment notifications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Home
              </Link>
              <Link to="/category/all" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                All Categories
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <div className="space-y-2">
              <Link to="/disclaimer" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Disclaimer
              </Link>
              <Link to="#" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 SarkariForm. All rights reserved. This website is not affiliated with any government agency.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
