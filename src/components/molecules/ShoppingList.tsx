import { useAppDispatch } from "../../store/hooks";
import { clearCompleted, toggleItem } from "../../store/shoppingList";
import { ShoppingItem } from "../organisms/WeeklyMealPlanModal";

type ShoppingListDrawerType = {
    open: boolean
    setOpen: (val: boolean) => void
    items: ShoppingItem[]
}

export const ShoppingListDrawer = ({ items, open, setOpen }: ShoppingListDrawerType) => {
    const dispatch = useAppDispatch()

    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40"
                />
            )}

            {/* Drawer */}
            <div
                className={`
                    fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-4 overflow-y-auto z-50
                    transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
            >
                <h2 className="text-xl font-bold mb-4">Shopping List</h2>

                <ul className="space-y-2">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-black">
                            <input
                                type="checkbox"
                                checked={item.purchased}
                                onChange={() => dispatch(toggleItem(item.name))}
                                className="mt-1"
                            />
                            <span>{item.measure} {item.name}</span>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => dispatch(clearCompleted())}
                    className="text-sm text-blue-600 border border-blue-600 hover:bg-gray-300 transition-colors mt-4"
                >
                    Clear Completed
                </button>

                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-2 right-2 text-gray-600"
                >
                    ✕
                </button>
            </div>
        </>
    );
};

