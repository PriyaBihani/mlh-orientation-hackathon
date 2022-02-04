const FormatOptionLabel = ({ value, label, timezone }) => (
  <div style={{ display: "flex" }}>
    <div>{label}</div>
    <div style={{ marginLeft: "10px", color: "#ccc" }}>{timezone}</div>
  </div>
);

export default FormatOptionLabel;
