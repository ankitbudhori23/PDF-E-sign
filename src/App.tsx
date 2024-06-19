import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignNewFile from "@/pages/signNewFile";

function App(): JSX.Element {
  return (
    <Router basename="/pdf-sign/">
      <Routes>
        <Route path="/" element={<SignNewFile />} />
      </Routes>
    </Router>
  );
}

export default App;
