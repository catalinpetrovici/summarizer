import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Input } from '@/components/ui/input.tsx';
import { LanguageModelProvider, useAppStore } from '@/services/store/use-app-store.ts';
import { useListModelsQuery } from '@/services/api/list-models.ts';
import { Label } from '@/components/ui/label.tsx';
import { RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

const Settings = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const languageModels = useAppStore((state) => state.languageModels);
  const updateLanguageModelConfig = useAppStore((state) => state.updateLanguageModelConfig);

  const selectedLanguageModelId = useAppStore((state) => state.selectedLanguageModelId);
  const setSelectedLanguageModelId = useAppStore((state) => state.setSelectedLanguageModelId);

  const selectedModelId = useAppStore((state) => state.selectedModelId);
  const setSelectedModelId = useAppStore((state) => state.setSelectedModelId);

  const currentLanguageModel = languageModels.find(
    (llm) => llm.id === selectedLanguageModelId
  );

  const {
    data: availableModels,
    isLoading,
    isError,
    error,
    refetch,
  } = useListModelsQuery({
    APIKey: currentLanguageModel?.APIKey,
    endpoint: currentLanguageModel?.endpoint,
    enabled: false,
  });

  function handleRefreshModels() {
    refetch();
  }

  useEffect(() => {
    if (currentLanguageModel) {
      updateLanguageModelConfig({
        ...currentLanguageModel,
        models: availableModels,
      });
    }
  }, [availableModels]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="flex flex-col gap-4"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="text-left">
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Configure your language model provider, API key, and select a model.
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 flex flex-col gap-2">
            <Label>LLM</Label>
            <Select
              disabled={isLoading}
              value={selectedLanguageModelId}
              onValueChange={(value: LanguageModelProvider) => {
                if (value !== selectedLanguageModelId) {
                  setSelectedLanguageModelId(value);
                  setSelectedModelId('');
                }
              }}
            >
              <SelectTrigger className={!selectedLanguageModelId ? 'text-gray-400' : ''}>
                <SelectValue placeholder="Select LLM" />
              </SelectTrigger>
              <SelectContent>
                {languageModels.map((llm) => (
                  <SelectItem key={llm.id} value={llm.id}>
                    {llm.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-3 grid w-full max-w-sm items-center gap-1.5">
            <Label>API key</Label>
            <Input
              disabled={isLoading}
              type="password"
              placeholder="Enter API key"
              value={currentLanguageModel?.APIKey}
              onChange={(e) => {
                if (currentLanguageModel) {
                  updateLanguageModelConfig({
                    ...currentLanguageModel,
                    APIKey: e.target.value,
                  });
                }
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 flex flex-col gap-2">
            <Label>Models</Label>
            <Select
              disabled={!availableModels?.length}
              value={selectedModelId}
              onValueChange={setSelectedModelId}
            >
              <SelectTrigger className={!selectedModelId ? 'text-gray-400' : ''}>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {Boolean(currentLanguageModel?.models?.length) &&
                  currentLanguageModel?.models?.map((model) => {
                    return (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-3 pt-5">
            <Button disabled={isLoading} variant="secondary" onClick={handleRefreshModels}>
              <RefreshCw className={isLoading ? 'animate-spin' : ''} />
            </Button>
          </div>
        </div>

        {isError && <div className="text-red-600">Error loading models: {error.message}</div>}
        <SheetFooter>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
