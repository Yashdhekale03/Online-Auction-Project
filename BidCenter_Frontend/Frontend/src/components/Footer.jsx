import { Link } from "react-router-dom"; // Using React Router DOM

export default function Footer() {
  return (
    <footer className="custom-footer-bg pt-5">
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-3 g-3 "style={{alignContent:"center"}}>
          {/* About Us Section */}
          <div>
            <div className="h5 mb-3 about-link">
              <Link to="/about">About Us</Link>
            </div>
            <p className="text-muted">
              Bid Center is your trusted platform for online auctions. Find
              unique items and great deals!
            </p>
          </div>
          {/* Quick Links Section */}
          <div>
            <h3 className="h5 mb-3">Quick Links</h3>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/how-it-works"
                  className="text-muted text-decoration-none hover-text-primary"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted text-decoration-none hover-text-primary"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted text-decoration-none hover-text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Legal Section */}
          <div>
            <h3 className="h5 mb-3">Legal</h3>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/terms"
                  className="text-muted text-decoration-none hover-text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted text-decoration-none hover-text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-5 border-top pt-4 text-center">
          <p className="text-muted small">
            &copy; 2025 Bid Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}