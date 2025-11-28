import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/organisms/SearchBar";
import { WeeklyMealPlan } from "./components/organisms/WeeklyMealPlan";

function App() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  return (
    <>
      <div className="">
        <h1 className="text-2xl font-bold mb-4">My Weekly Meal Plan</h1>

        {/* Weekly plan grid */}
        <WeeklyMealPlan onSelectDay={(day) => setSelectedDay(day)} />
        <SearchBar />
      </div>
    </>
  );
}

export default App;
