export const Item: React.FC<{ id: number; name?: string }> = ({ name }) => {
  const style = {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    margin: "10px 0",
    background: "#1c293c",
  };

  return <div style={style}>{name}</div>;
};