import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "../src/Body";
import Login from "../src/Login";
import Profile from "../src/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
          <Route path="/" element={<Body />}>
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
          </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
     </>
  )};

export default App;

