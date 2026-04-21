import { useEffect } from "react";

export function usePageMeta(title: string) {
  useEffect(() => {
    document.title = `Kurniawan Dwi Saputra - ${title}`;
  }, [title]);
}
