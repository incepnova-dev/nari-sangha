import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./component/shared/ScrollToTop";

import Routes from "./component/routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { I18nProvider } from "./i18n/index";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./component/shared/CartDrawer";
import { ChatbotProvider } from "./context/ChatbotContext";
import ChatbotPopup from "./component/shared/ChatbotPopup";
import ChatbotTrigger from "./component/shared/ChatbotTrigger";
import "./styles/global/index.css";

import { Phase2Provider } from "./component/phase2/components/Phase2Provider";
import { Phase2UI } from "./component/phase2/components/Phase2UI";

function App() {
  return (
    <I18nProvider>
      <ChatbotProvider>
        <CartProvider>
          <AuthProvider>
            <Phase2Provider>
              <BrowserRouter>
                <ScrollToTop />
                <div className="app-container">
                  <Routes />
                  <CartDrawer />
                  <ChatbotPopup />
                  <ChatbotTrigger />
                  <Phase2UI />
                </div>
              </BrowserRouter>
            </Phase2Provider>
          </AuthProvider>
        </CartProvider>
      </ChatbotProvider>
    </I18nProvider>
  );
}

export default App;
