import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import icon from "../assets/gold_icon.png";

const NavBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 2,
        backgroundColor: "#010A13",
        borderBottom: "1px solid #e2a222",
        color: "#C8AA6E",
      }}
    >
      {/* LEFT SIDE */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/champions">Champions</NavLink>
      </Box>

      {/* CENTER LOGO */}
      <Box sx={{ mx: 5 }}>
        <Link to="/">
          <img src={icon} width="55px" alt="Logo" />
        </Link>
      </Box>

      {/* RIGHT SIDE */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <NavLink to="/summoner">Summoner</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </Box>
    </Box>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    style={{
      color: "#C8AA6E",
      textDecoration: "none",
      fontSize: "1.1rem",
      fontWeight: 500,
    }}
  >
    {children}
  </Link>
);

export default NavBar;
