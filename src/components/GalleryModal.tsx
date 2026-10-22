import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import type { SpritzEvent } from '../data/events';

interface GalleryModalProps {
  event: SpritzEvent | null;
  onClose: () => void;
}

export default function GalleryModal({ event, onClose }: GalleryModalProps) {
  if (!event) return null;

  return (
    <Lightbox
      open={true}
      close={onClose}
      slides={(event.photos ?? []).map((src) => ({ src }))}
      plugins={[Zoom, Counter]}
      carousel={{ finite: true }}
      render={{ slideFooter: () => null }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
