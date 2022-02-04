import Select from "react-select";

const SelectField = ({ onChange, options, title, filterOption, components }) => (
  <div className="form__field">
    <span className="form__field__label">{title}</span>
    <Select onChange={onChange} options={options} filterOption={filterOption} components={components} />
  </div>
);

export default SelectField;
