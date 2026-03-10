import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TutorialState {
  completed: boolean;
  currentStep: number;
  dismissedSteps: string[];
}

export interface TutorialActions {
  advanceStep: () => void;
  dismissStep: (stepId: string) => void;
  skipAll: () => void;
  reset: () => void;
}

export type TutorialStore = TutorialState & TutorialActions;

const TOTAL_STEPS = 5;

const initialState: TutorialState = {
  completed: false,
  currentStep: 1,
  dismissedSteps: [],
};

export const useTutorialStore = create<TutorialStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      advanceStep: () => {
        const { currentStep, completed } = get();
        if (completed) return;
        const nextStep = currentStep + 1;
        if (nextStep > TOTAL_STEPS) {
          set({ completed: true });
        } else {
          set({ currentStep: nextStep });
        }
      },

      dismissStep: (stepId: string) => {
        const { dismissedSteps, completed } = get();
        if (completed) return;
        if (!dismissedSteps.includes(stepId)) {
          set({ dismissedSteps: [...dismissedSteps, stepId] });
        }
      },

      skipAll: () => {
        set({ completed: true });
      },

      reset: () => {
        set({ ...initialState });
      },
    }),
    {
      name: "dnc-tutorial-state",
    }
  )
);
