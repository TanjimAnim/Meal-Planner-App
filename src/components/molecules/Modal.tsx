import { ReactNode } from "react";

type ModalTypes = {
    open: boolean,
    onClose: () => void,
    children: ReactNode
}

export const Modal = ({ open, onClose, children }: ModalTypes) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow max-h-[90vh] overflow-y-auto w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 text-gray-600"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};
