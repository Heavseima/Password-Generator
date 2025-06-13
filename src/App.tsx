import Header from "./component/Header"
import ToggleTabs from "./component/ToggleTabs"
import { useEffect } from "react";
import { useSettingStore } from "./store/useSettingStore";
import Footer from "./component/Footer";
import Cookie from "./component/Cookie";

const App = () => {

  const hasHydrated = useSettingStore(state => state.hasHydrated);

  useEffect(() => {
    document.body.setAttribute("data-hydrated", hasHydrated ? "true" : "false");
  }, [hasHydrated]);

  if (!hasHydrated) return null;

  return <>
    <Header />
    <ToggleTabs />
    <Footer />

    <Cookie />
  </>
}

export default App