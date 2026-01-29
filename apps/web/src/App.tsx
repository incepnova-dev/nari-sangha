import { BrowserRouter } from "react-router-dom";
import Routes from "./component/routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { I18nProvider } from "./i18n/index";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./component/shared/CartDrawer";
import { ChatbotProvider } from "./context/ChatbotContext";
import ChatbotPopup from "./component/shared/ChatbotPopup";
import ChatbotTrigger from "./component/shared/ChatbotTrigger";
import "./styles/global/index.css";

function App() {
  return (
    <I18nProvider>
      <ChatbotProvider>
        <CartProvider>
          <AuthProvider>
            <BrowserRouter>
              <div className="app-container">
                <Routes />
                <CartDrawer />
                <ChatbotPopup />
                <ChatbotTrigger />
              </div>
            </BrowserRouter>
          </AuthProvider>
        </CartProvider>
      </ChatbotProvider>
    </I18nProvider>
  );
}

export default App;
