import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button.tsx';
import AddPrompt from '@/components/add-prompt.tsx';
import Settings from '@/components/settings.tsx';
import { SettingsIcon } from 'lucide-react';
import BuyMeCoffeeImage from '@/assets/bmc-logo.png';
import GithubIcon from '@/assets/github-icon.tsx';

const Navigation = () => {
  const [openAddPrompt, setOpenAddPrompt] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full bg-primary/20 text-white"
          >
            <SettingsIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start" sideOffset={8} forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Summarizer</p>
                <p className="text-xs leading-none text-muted-foreground">Happy summarize</p>
              </div>
              <a
                href="https://github.com/catalinpetrovici/summarizer"
                rel="noopener noreferrer"
                target="_blank"
              >
                <GithubIcon width={20} height={20} />
              </a>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpenAddPrompt(true)}>
              Add prompt
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpenSettings(true)}>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpenSettings(true)}>
              <div className="flex gap-2">
                <img
                  className="size-5 rounded-full"
                  src={BuyMeCoffeeImage}
                  alt="Buy me a coffee image"
                />
                <span>Buy me a coffee</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {openAddPrompt && <AddPrompt open={openAddPrompt} setOpen={setOpenAddPrompt} />}
      {openSettings && <Settings open={openSettings} setOpen={setOpenSettings} />}
    </>
  );
};

export default Navigation;
