import { useState, type ImgHTMLAttributes } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

/**
 * Image that opens a full-size lightbox when clicked.
 * The image is rendered at full natural size (contain) in the modal,
 * so nothing is cropped.
 */
export function Zoomable({ src, alt, className, ...rest }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        {...rest}
        src={src}
        alt={alt}
        className={`${className ?? ""} cursor-zoom-in`}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[95vw] sm:max-w-[90vw] p-0 bg-background/95 border-foreground/10 overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 rounded-full bg-background/90 text-foreground p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
          <div className="flex items-center justify-center w-full max-h-[90vh] overflow-auto">
            <img
              src={src}
              alt={alt}
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
