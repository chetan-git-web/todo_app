import Inbox from "./Components/Inbox";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import { Provider } from 'react-redux'
import Upcoming from "./Components/Upcoming";

function App() {
  return (
    <Provider store={store}>
    <div className="w-full h-screen">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/inbox" element={<Inbox/>}/>
        <Route path="/upcoming" element={<Upcoming/>}/>
      </Routes>
    </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
