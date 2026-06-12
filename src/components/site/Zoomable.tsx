import { useState, type ImgHTMLAttributes } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

/**
 * Image that opens a full-size lightbox when clicked.
 * The image is rendered uncropped (object-contain) inside the modal.
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
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] p-0 bg-background/95 border-foreground/10 overflow-hidden">
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

