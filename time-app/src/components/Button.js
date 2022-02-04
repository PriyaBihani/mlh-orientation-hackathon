const Button = ({ onClick }) => (
  <div className="btn-container">
    <button type="button" onClick={onClick} className="button radius">
      Get overlapping hours
    </button>
  </div>
);

export default Button;
