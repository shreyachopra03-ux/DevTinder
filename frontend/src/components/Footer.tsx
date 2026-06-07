const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-300 px-5 py-5 text-base-content sm:px-8 sm:py-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
        <nav className="flex flex-col gap-1.5">
          <h6 className="footer-title mb-1">Services</h6>
          <a className="link-hover link">Branding</a>
          <a className="link-hover link">Design</a>
          <a className="link-hover link">Marketing</a>
        </nav>

        <nav className="flex flex-col gap-1.5">
          <h6 className="footer-title mb-1">Company</h6>
          <a className="link-hover link">About us</a>
          <a className="link-hover link">Contact</a>
          <a className="link-hover link">Jobs</a>
        </nav>

        <nav className="col-span-2 flex flex-col gap-2 sm:col-span-1">
          <h6 className="footer-title mb-1">Social</h6>

          <div className="flex gap-4">
            <a className="link-hover link">Twitter</a>
            <a className="link-hover link">YouTube</a>
            <a className="link-hover link">Facebook</a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;