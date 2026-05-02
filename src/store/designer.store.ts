import { arrayMove } from '@/lib/arrayMove';
import { FormElementInstance } from '@/types/form';
import { defaultFormStyle, FormStyle } from '@/types/form-style';
import { create } from 'zustand';

type DesignerState = {
    elements: FormElementInstance[];
    selectedElement: FormElementInstance | null;
    activeElementId: string | null;
    style: FormStyle
};

type DesignerActions = {
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;
    updateElement: (id: string, element: FormElementInstance) => void;
    setElements: (elements: FormElementInstance[]) => void;
    setSelectedElement: (element: FormElementInstance | null) => void;
    setActiveElementId: (id: string | null) => void;

    updateStyle: (style: Partial<FormStyle>) => void;

    moveElementUp: (id: string) => void;
    moveElementDown: (id: string) => void;
    moveElementToTop: (id: string) => void;
    moveElementToBottom: (id: string) => void;
};

type DesignerStore = DesignerState & DesignerActions;

export const useDesignerStore = create<DesignerStore>()((set) => ({
    //  Initial State
    elements: [],
    selectedElement: null,
    activeElementId: null,
    style: defaultFormStyle,

    // Actions
    setElements: (elements) => set({ elements }),

    addElement: (index, element) =>
        set((state) => {
            const newElements = [...state.elements];
            newElements.splice(index, 0, element);
            return { elements: newElements };
        }),

    removeElement: (id) =>
        set((state) => ({
            elements: state.elements.filter((el) => el.id !== id),
            selectedElement:
                state.selectedElement?.id === id ? null : state.selectedElement,
        })),

    updateElement: (id, element) =>
        set((state) => ({
            elements: state.elements.map((el) => (el.id === id ? element : el)),
        })),

    setSelectedElement: (selectedElement) => set({ selectedElement }),

    setActiveElementId: (id) => set({ activeElementId: id }),

    updateStyle: (style) =>
        set((state) => ({
            style: { ...state.style, ...style },
        })),

    // Move Elements
    moveElementUp(id) {
        set((state) => {
            const index = state.elements.findIndex((el) => el.id === id);
            if (index <= 0) return { elements: state.elements };
            return { elements: arrayMove(state.elements, index, index - 1) };
        });
    },
    moveElementDown(id) {
        set((state) => {
            const index = state.elements.findIndex((el) => el.id === id);
            if (index === -1 || index === state.elements.length - 1)
                return { elements: state.elements };
            return { elements: arrayMove(state.elements, index, index + 1) };
        });
    },
    moveElementToTop(id) {
        set((state) => {
            const index = state.elements.findIndex((el) => el.id === id);
            if (index <= 0) return { elements: state.elements };
            return { elements: arrayMove(state.elements, index, 0) };
        });
    },
    moveElementToBottom(id) {
        set((state) => {
            const index = state.elements.findIndex((el) => el.id === id);
            if (index === -1 || index === state.elements.length - 1)
                return { elements: state.elements };
            return {
                elements: arrayMove(state.elements, index, state.elements.length - 1),
            };
        });
    },
}));
