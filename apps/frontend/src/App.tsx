import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

function App() {
  return (
    <Provider value={client}>
      <NavbarComponent />
      <Outlet />
    </Provider>
  );
}

export default App;
