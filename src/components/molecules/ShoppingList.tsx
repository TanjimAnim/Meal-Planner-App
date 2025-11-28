import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearCompleted, toggleItem } from "../../store/shoppingList";

export const ShoppingListDrawer = () => {
    const [open, setOpen] = useState(false);
    const items = useAppSelector(state => state.shoppingList.items);
    const dispatch = useAppDispatch();

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Open Shopping List
            </button>

            {open && (
                <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-4 overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">Shopping List</h2>
                    <ul className="space-y-2">
                        {items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-black">
                                <input
                                    type="checkbox"
                                    checked={item.purchased}
                                    onChange={() => dispatch(toggleItem(item.name))}
                                />
                                <span>{item.measure} {item.name}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => dispatch(clearCompleted())}
                        className="text-sm text-gray-600 mt-4"
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
            )}
        </>
    );
};
