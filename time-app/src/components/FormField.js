const FormField = ({ onChange, label }) => (
  <div className="form__field">
    <label className="form__field__label" htmlFor="time">
      {label}
    </label>
    <input className="form__field__input" type="time" onChange={onChange} required />
  </div>
);

export default FormField;
