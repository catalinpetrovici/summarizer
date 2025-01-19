import { ChromeLocalStorage } from '@/lib/zustand-chrome-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type LanguageModelProvider = 'openai' | 'deepseek';

interface LanguageModel {
  id: LanguageModelProvider;
  label: 'OpenAI' | 'Deepseek';
  APIKey: string;
  endpoint: string;
  models: string[];
}

interface AppStore {
  languageModels: LanguageModel[];
  updateLanguageModelConfig: (
    model: Partial<LanguageModel> & { id: LanguageModelProvider }
  ) => void;

  selectedLanguageModelId: LanguageModelProvider;
  setSelectedLanguageModelId: (model: LanguageModelProvider) => void;

  selectedModelId: string;
  setSelectedModelId: (modelName: string) => void;

  availablePrompts: { id: string; title: string; prompt: string }[];
  setAvailablePrompts: (prompts: { id: string; title: string; prompt: string }[]) => void;

  selectedPromptId: string;
  setSelectedPromptId: (promptId: string) => void;
}

const DEFAULT_PROMPTS = [
  {
    id: 'simple',
    title: 'Simple',
    prompt:
      'Straightforward and easy to understand content using basic vocabulary and clear sentence structures. Suitable for general audiences and everyday communication. Avoids technical jargon and complex concepts.',
  },
  {
    id: 'complex',
    title: 'Complex',
    prompt:
      'Sophisticated content with intricate details and nuanced explanations. Incorporates advanced vocabulary, detailed analysis, and interconnected concepts. Suitable for professional contexts and in-depth discussions.',
  },
  {
    id: 'academic',
    title: 'Academic',
    prompt:
      'Scholarly and research-oriented content following formal academic standards. Features specialized terminology, methodological rigor, and extensive references. Appropriate for educational institutions, research papers, and scientific publications.',
  },
];

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      languageModels: [
        {
          id: 'deepseek',
          label: 'Deepseek',
          APIKey: '',
          endpoint: 'api.deepseek.com',
          models: [],
        },
        {
          id: 'openai',
          label: 'OpenAI',
          APIKey: '',
          endpoint: 'api.openai.com/v1',
          models: [],
        },
      ],
      updateLanguageModelConfig: (model) =>
        set((store) => ({
          languageModels: store.languageModels.map((lm) =>
            lm.id === model.id ? { ...lm, ...model } : lm
          ),
        })),

      selectedLanguageModelId: 'deepseek',
      setSelectedLanguageModelId: (model) => set(() => ({ selectedLanguageModelId: model })),

      selectedModelId: '',
      setSelectedModelId: (modelName) => set(() => ({ selectedModelId: modelName })),

      availablePrompts: DEFAULT_PROMPTS,
      setAvailablePrompts: (prompts) => set(() => ({ availablePrompts: prompts })),

      selectedPromptId: '',
      setSelectedPromptId: (promptId) => set(() => ({ selectedPromptId: promptId })),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => ChromeLocalStorage),
    }
  )
);
