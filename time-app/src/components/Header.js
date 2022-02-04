const Header = ({ children, title }) => (
  <header className="key-header splitter">
    <h2>{title}</h2>
    {children}
  </header>
);

export default Header;
