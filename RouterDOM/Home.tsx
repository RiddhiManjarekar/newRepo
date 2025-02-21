import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    navigate(`?query=${encodeURIComponent(value)}`);
  };

  return (
    <div>
      <h2>Home</h2>
      <input type="text" value={inputValue} onChange={handleChange} placeholder="Type something..." />
      <p>Current URL: {location.search}</p>
    </div>
  );
};

export default Home;
