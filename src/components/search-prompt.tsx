import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { cn } from '@/lib/utils.ts';
import { useAppStore } from '@/services/store/use-app-store.ts';

const SearchPrompt = () => {
  const [open, setOpen] = React.useState(false);

  const availablePrompts = useAppStore((state) => state.availablePrompts);

  const selectedPromptId = useAppStore((state) => state.selectedPromptId);
  const setSelectedPromptId = useAppStore((state) => state.setSelectedPromptId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedPromptId
            ? availablePrompts.find((prompt) => prompt.id === selectedPromptId)?.title
            : 'Select prompt...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[430px] p-0">
        <Command>
          <CommandInput placeholder="Search prompt..." />
          <CommandList>
            <CommandEmpty>No prompt found.</CommandEmpty>
            <CommandGroup>
              {availablePrompts.map((prompt) => (
                <CommandItem
                  key={prompt.id}
                  value={prompt.id}
                  onSelect={(currentValue) => {
                    setSelectedPromptId(currentValue === selectedPromptId ? '' : prompt.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedPromptId === prompt.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className="flex gap-2 truncate">
                    <span>{prompt.title}</span>
                    <span className="truncate text-primary/60">{prompt.prompt}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchPrompt;
