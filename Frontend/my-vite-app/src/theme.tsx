import { extendTheme } from "@chakra-ui/react";
// theme.tsx
const theme = extendTheme({
  colors: {
    primary: "#ff7e67",
    secondary: "#6f42c1",
    // Add more colors as needed
  },
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Poppins, sans-serif",
    // Add more fonts as needed
  },
  // Customize other aspects of your theme
});

export default theme;
