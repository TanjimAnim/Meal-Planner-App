import "./App.css";
import { SearchBar } from "./components/organisms/SearchBar";
import Topbar from "./components/templates/Topbar";

function App() {
  return (
    <>
      <div className="font-poppins">
        <Topbar />
        <SearchBar />
      </div>
    </>
  );
}

export default App;
