import { Provider } from "react-redux";
import "./App.css";
import appStore from "./redux/store/appStore";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./components/Browse/Browse";
import Login from "../src/components/Login/Login";
import Header from "../src/components/Header/Header";
import GptSearchPage from "./components/GPTSearch/GptSearchPage";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/GPTSearch",
        element: <GptSearchPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRoute} />
    </Provider>
  );
}

export default App;
