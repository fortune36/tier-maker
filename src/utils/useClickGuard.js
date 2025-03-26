import { useRef, useEffect } from "react";

export function useClickGuard(onClick, onDrag, isDragging) {
  const startPosRef = useRef(null);
  const threshold = 8;

  const handlePointerDown = (e) => {
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    startPosRef.current = { x, y };
    console.log("[📍 pointerDown]", { x, y });
  };

  const handlePointerUp = (e) => {
    const start = startPosRef.current;
    if (!start) return;

    const x = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const y = e.clientY ?? e.changedTouches?.[0]?.clientY;
    const dx = Math.abs(x - start.x);
    const dy = Math.abs(y - start.y);
    const dist = Math.sqrt(dx * dx + dy * dy);

    console.log(`[📐 距離] dx: ${dx}, dy: ${dy}, total: ${dist.toFixed(1)}`);

    if (dist < threshold && !isDragging) {
      console.log("[✅ click判定：クリック有効]");
      onClick?.();
    } else {
      console.log("[🚚 drag判定：クリック無効]");
      onDrag?.();
    }
  };

  // ✅ windowに pointerup イベントを追加
  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  return {
    handlePointerDown,
  };
}
