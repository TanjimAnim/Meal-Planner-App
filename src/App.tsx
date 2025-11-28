import "./App.css";
import { SearchBar } from "./components/organisms/SearchBar";
import { WeeklyMealPlan } from "./components/organisms/WeeklyMealPlan";

function App() {
  return (
    <>
      <div className="">
        <h1 className="text-2xl font-bold mb-4">My Weekly Meal Plan</h1>
        <WeeklyMealPlan />
        <SearchBar />
      </div>
    </>
  );
}

export default App;
