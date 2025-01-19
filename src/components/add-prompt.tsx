import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const AddPrompt = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddPrompt;
