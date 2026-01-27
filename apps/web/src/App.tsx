import { BrowserRouter } from "react-router-dom";
import Routes from "./component/routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { I18nProvider } from "./i18n/index";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./component/shared/CartDrawer";
import "./styles/global/index.css";

function App() {
  return (
    <I18nProvider>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="app-container">
              <Routes />
              <CartDrawer />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </I18nProvider>
  );
}

export default App;


