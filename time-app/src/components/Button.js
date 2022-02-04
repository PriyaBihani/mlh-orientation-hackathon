const Button = ({ onClick }) => (
  <div className="btn-container gap-top-600">
    <button type="button" onClick={onClick} className="button radius">
      Get overlapping hours
    </button>
  </div>
);

export default Button;
