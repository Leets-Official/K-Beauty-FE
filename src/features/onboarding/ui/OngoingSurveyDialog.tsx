import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';

interface OngoingSurveyDialogProps {
  open: boolean;
  onContinue: () => void;
  onOpenChange: (open: boolean) => void;
}

function OngoingSurveyDialog({ open, onContinue, onOpenChange }: OngoingSurveyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-3" showCloseButton={false}>
        <DialogHeader className="gap-1">
          <DialogTitle className="text-[20px] leading-7 font-bold">
            {'진행 중인 설문이 있습니다'}
          </DialogTitle>
          <DialogDescription className="text-[14px] leading-5 font-normal">
            {'이미 시작한 설문이 있어요. 이어서 답변하시겠어요?'}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid grid-cols-2 gap-2 sm:grid-cols-2">
          <DialogClose render={<Button className="h-11 px-4" variant="secondary" />}>
            {'취소'}
          </DialogClose>
          <Button className="h-11 px-4" onClick={onContinue}>
            {'이동하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { OngoingSurveyDialog, type OngoingSurveyDialogProps };
