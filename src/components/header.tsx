import { useEffect, useRef } from 'react';

import Navigation from '@/components/navigation.tsx';
import SearchPrompt from '@/components/search-prompt.tsx';
import { Button } from '@/components/ui/button.tsx';

const Header = () => {
  const summarizeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      summarizeButton.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="border-bottom flex h-auto flex-nowrap border p-2">
      <div className="flex w-full items-center justify-between gap-x-2">
        <div className="border-r pr-2">
          <Navigation />
        </div>
        <SearchPrompt />
        <Button ref={summarizeButton} variant="secondary" size="sm">
          Summarize
        </Button>
      </div>
    </header>
  );
};

export default Header;
