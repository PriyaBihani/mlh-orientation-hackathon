const AppWrapper = ({ children }) => (
  <div className="color-primary font-base">
    <main>
      <article className="wrapper">{children}</article>
    </main>
  </div>
);

export default AppWrapper;
