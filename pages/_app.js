import "../styles/globals.css";
import { AppContextProvider } from "../components/utils/context";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
