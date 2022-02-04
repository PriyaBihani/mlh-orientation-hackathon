const Header = ({ children, title }) => (
  <header className="key-header splitter gap-top-700">
    <h2 className="text-600">{title}</h2>
    {children}
  </header>
);

export default Header;
