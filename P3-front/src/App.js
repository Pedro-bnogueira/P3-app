import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/login-signup/LoginSignup";
import Home from "./pages/home/Home";
import PageNotas from "./pages/notes/PageNotas";
import IndexNotas from "./pages/notes/IndexNotas";
import IndexFinancas from "./pages/financas/IndexFinancas";
import Timer from "./pages/timer/Timer";
import NoMatch from './pages/no-match/noMatch';

function App() {
    return (
        <>
        <BrowserRouter>
            <div className="wrapper-app">

                    <Routes>
                        <Route path="*" element={<NoMatch />}/>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/login" exact element={<LoginSignup />} />
                        <Route path="/notas" exact element={<IndexNotas />} />
                        <Route path="/notas/:id" exact element={<PageNotas />} />
                        <Route path="/financas" exact element={<IndexFinancas />} />
                        <Route path="/timer" exact element={<Timer />} />
                    </Routes>

            </div>
        </BrowserRouter>
        </>
    );
}

export default App;
