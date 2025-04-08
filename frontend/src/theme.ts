import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Define the config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Create the theme
const theme = extendTheme({
  config,
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      50: "#e6f6ff",
      100: "#bae3ff",
      200: "#90d5ff",
      300: "#66c6ff",
      400: "#3bb7ff",
      500: "#3182CE", // Primary blue
      600: "#2B6CB0", // Darker blue
      700: "#1e4e8c",
      800: "#153e73",
      900: "#0c2f5a",
    },
    yellow: {
      50: "#fffbea",
      100: "#fff3c4",
      200: "#fce588",
      300: "#fadb5f",
      400: "#f7c948",
      500: "#f0b429",
      600: "#de911d",
      700: "#cb6e17",
      800: "#b44d12",
      900: "#8d2b0b",
    },
    orange: {
      50: "#fff8f1",
      100: "#feebcb",
      200: "#fcd9a8",
      300: "#fac285",
      400: "#f7ae62",
      500: "#ed8936",
      600: "#c05621",
      700: "#9c4221",
      800: "#7b341e",
      900: "#652b19",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "medium",
      },
      sizes: {
        sm: {
          fontSize: "xs",
          px: 3,
          py: 1,
        },
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
        outline: {
          borderColor: "gray.200",
          color: "gray.600",
          _hover: {
            bg: "gray.50",
          },
        },
      },
    },
    Progress: {
      baseStyle: {
        track: {
          bg: "gray.100",
        },
        filledTrack: {
          bg: "brand.500",
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "medium",
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
});

export default theme;
