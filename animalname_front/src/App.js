import { Route, Routes } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Main from "./common/Main";
import NameStat from "./name/NameStat";
import NameCompatibility from "./name/NameCompatibility";
import NameLuck from "./name/NameLuck";
import NameDetail from "./name/NameDetail";

function App() {
  return (
    <div className="wrap">
      <Header />
      <div className="main-wrap">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/name-stat" element={<NameStat />} />
          <Route path="/name-compatibility" element={<NameCompatibility />} />
          <Route path="/name-luck" element={<NameLuck />} />
          <Route path="/name-detail/:nameNo" element={<NameDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
