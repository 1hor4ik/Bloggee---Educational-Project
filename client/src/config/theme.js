import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins";

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === "dark" ? "#212121" : "light",
      color: props.colorMode === "dark" ? "light" : "gray.800",
    },
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
  }),
};

export const theme = extendTheme(styles);
