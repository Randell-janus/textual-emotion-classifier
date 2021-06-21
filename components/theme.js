import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "gray.100",
        fontSize: ['md', null, 'lg'],
      },
    }),
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  textStyles: {
    reg: {
      color: "blue.300",
    },
    white: {
      color: "white",
    },
  },
  layerStyles: {
    reg: {
      bgColor: "blue.300",
    },
    hover: {
      bgColor: "blue.200",
    },
    gray: {
      bgColor: "gray.200",
    },
  },
  components: {
    Button: {
      sizes: {
        md: {
          fontSize: ["sm", "sm", "md"],
        },
      },
    },
  },
});

export const completeStyle = "blue.300";
