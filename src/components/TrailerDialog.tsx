import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Movie } from "@/data/movies";

export function TrailerDialog({ movie, open, onOpenChange }: { movie: Movie; open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl border-border bg-card p-0 overflow-hidden">
        <DialogTitle className="sr-only">{movie.title} trailer</DialogTitle>
        <DialogDescription className="sr-only">Official trailer for {movie.title} ({movie.year})</DialogDescription>
        {open && movie.trailer && (
          <div className="aspect-video w-full">
            <iframe
              className="size-full"
              src={`https://www.youtube-nocookie.com/embed/${movie.trailer}?autoplay=1&rel=0`}
              title={`${movie.title} trailer`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
