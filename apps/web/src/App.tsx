import { BrowserRouter, Routes, Route } from "react-router-dom";
import NariSangha from "./pages/narisangha/NariSangha";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/narisangha" element={<NariSangha />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


