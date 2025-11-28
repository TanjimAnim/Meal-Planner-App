import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { CiViewList } from 'react-icons/ci';
import { FaShoppingCart } from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';
import { ShoppingListDrawer } from '../molecules/ShoppingList';
import { WeeklyMealPlanModal } from '../organisms/WeeklyMealPlanModal';

const Topbar = () => {
    const [openShoppingList, setOpenShoppingList] = useState(false)
    const [openPlan, setOpenPlan] = useState(false);
    const mealPlan = useAppSelector((state: RootState) => state.mealPlan.plan);
    const items = useAppSelector(state => state.shoppingList.items);
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl">
                <div className="text-2xl md:text-4xl font-bold mb-4 flex items-center gap-2">
                    <FaBowlFood />
                    My Weekly Meal Plan
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <button
                        onClick={() => {
                            setOpenPlan(true)
                        }}
                        className="w-full md:w-fit bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-500 transition-colors"
                    >
                        <CiViewList size={20} />
                        Open Weekly Meal Plan
                        <div className="w-6 h-6 rounded-full bg-white text-black">{Object.entries(mealPlan).length}</div>
                    </button>
                    <button
                        onClick={() => setOpenShoppingList(true)}
                        className="w-full md:w-fit flex items-center justify-between bg-black rounded-md py-[11px] px-2 gap-1 cursor-pointer"
                    >

                        <FaShoppingCart className="text-white" />
                        <div className="text-white rounded cursor-pointer">
                            Open Shopping List
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white text-black">{items.length}</div>
                        {/* <ShoppingListDrawer /> */}
                    </button>
                </div>
            </div>
            <WeeklyMealPlanModal
                open={openPlan}
                onClose={() => setOpenPlan(false)}
            />
            <ShoppingListDrawer
                items={items}
                open={openShoppingList}
                setOpen={setOpenShoppingList}
            />
        </>
    )
}

export default Topbar