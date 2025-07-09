import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00b3b3", // Your brand color
      contrastText: "#fff", // Button text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Prevent uppercase text
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "#009e9e", // <-- custom hover color
          },
        },
      },
    },
  },
});

export default theme;
