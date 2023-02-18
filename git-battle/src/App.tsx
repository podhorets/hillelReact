import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Popular } from "./Popular";
import { Battle } from "./Battle";
import { NotFound } from "./NotFound";
import { Home } from "./Home";
import { RoutePath } from "./RoutePath";
import { Nav } from "./Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="pl-40 pt-4">
        <Nav />
        <Routes>
          <Route path={RoutePath.Home} element={<Home />}></Route>
          <Route path={RoutePath.Popular} element={<Popular />}></Route>
          <Route path={RoutePath.Battle} element={<Battle />}></Route>
          <Route path={RoutePath.NotFound} element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
