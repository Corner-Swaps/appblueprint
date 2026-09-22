import React, { useState, useRef, useCallback, useEffect } from 'react';

export interface UseFluidDragReorderOptions<T> {
  items: T[];
  onReorder: (newItems: T[]) => void;
  scrollContainer?: HTMLElement | null | React.RefObject<HTMLElement | null>;
  enabled?: boolean;
}

interface DragState {
  activeIndex: number;
  currentOverIndex: number;
  pointerId: number;
  startY: number;
  startScrollTop: number;
  currentPointerY: number;
  rects: (DOMRect | null)[];
  targetElement: HTMLElement | null;
}

export function useFluidDragReorder<T>({
  items,
  onReorder,
  scrollContainer,
  enabled = true,
}: UseFluidDragReorderOptions<T>) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const dragStateRef = useRef<DragState | null>(null);
  const autoScrollAnimRef = useRef<number | null>(null);

  // Keep latest items and onReorder in refs to avoid stale closures
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const onReorderRef = useRef(onReorder);
  onReorderRef.current = onReorder;

  const scrollContainerRef = useRef(scrollContainer);
  scrollContainerRef.current = scrollContainer;

  // Resolve container whether passed as element or React ref object
  const getContainer = useCallback((): HTMLElement | null => {
    const sc = scrollContainerRef.current;
    if (!sc) return null;
    if ('current' in sc) return sc.current;
    return sc;
  }, []);

  // Measure scroll position
  const getScrollTop = useCallback(() => {
    const container = getContainer();
    if (container) {
      return container.scrollTop;
    }
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }, [getContainer]);

  // Update drag position and over index
  const updateDrag = useCallback((pointerY: number) => {
    const state = dragStateRef.current;
    if (!state) return;
    state.currentPointerY = pointerY;

    const currentScrollTop = getScrollTop();
    const deltaScroll = currentScrollTop - state.startScrollTop;
    const deltaY = (pointerY - state.startY) + deltaScroll;

    setDragOffset(deltaY);

    const activeRect = state.rects[state.activeIndex];
    if (!activeRect) return;

    // Center of dragged element in scroll-adjusted space
    const draggedCenterY = activeRect.top + activeRect.height / 2 + deltaY;

    let newOverIndex = state.activeIndex;
    const rects = state.rects;

    for (let k = 0; k < rects.length; k++) {
      const r = rects[k];
      if (!r || k === state.activeIndex) continue;
      const midY = r.top + r.height / 2;

      if (state.activeIndex < k) {
        // Dragging downwards
        if (draggedCenterY > midY) {
          newOverIndex = k;
        }
      } else if (state.activeIndex > k) {
        // Dragging upwards
        if (draggedCenterY < midY) {
          newOverIndex = k;
          break; // First one passing downward
        }
      }
    }

    if (newOverIndex !== state.currentOverIndex) {
      state.currentOverIndex = newOverIndex;
      setOverIndex(newOverIndex);
      try {
        if (navigator?.vibrate) navigator.vibrate(10);
      } catch {}
    }
  }, [getScrollTop]);

  // Auto-scroll loop
  const runAutoScroll = useCallback(() => {
    if (!dragStateRef.current) return;
    const { currentPointerY } = dragStateRef.current;
    const container = getContainer();

    let scrollSpeed = 0;

    if (container) {
      const containerRect = container.getBoundingClientRect();
      const topThreshold = 65;
      const bottomThreshold = 85;
      if (currentPointerY < containerRect.top + topThreshold) {
        const dist = Math.max(0, (containerRect.top + topThreshold) - currentPointerY);
        scrollSpeed = -Math.max(2, Math.min(22, (dist / topThreshold) * 22));
      } else if (currentPointerY > containerRect.bottom - bottomThreshold) {
        const dist = Math.max(0, currentPointerY - (containerRect.bottom - bottomThreshold));
        scrollSpeed = Math.max(2, Math.min(22, (dist / bottomThreshold) * 22));
      }
    } else {
      // Window scroll
      const viewportHeight = window.innerHeight;
      const topThreshold = 95;
      const bottomThreshold = 125;
      if (currentPointerY < topThreshold) {
        const dist = Math.max(0, topThreshold - currentPointerY);
        scrollSpeed = -Math.max(2, Math.min(22, (dist / topThreshold) * 22));
      } else if (currentPointerY > viewportHeight - bottomThreshold) {
        const dist = Math.max(0, currentPointerY - (viewportHeight - bottomThreshold));
        scrollSpeed = Math.max(2, Math.min(22, (dist / bottomThreshold) * 22));
      }
    }

    if (scrollSpeed !== 0) {
      if (container) {
        container.scrollTop += scrollSpeed;
      } else {
        window.scrollBy({ top: scrollSpeed, behavior: 'instant' });
      }
      updateDrag(dragStateRef.current.currentPointerY);
    }

    if (dragStateRef.current) {
      autoScrollAnimRef.current = requestAnimationFrame(runAutoScroll);
    }
  }, [getContainer, updateDrag]);

  // Window pointer listeners
  const handleWindowPointerMove = useCallback((e: PointerEvent) => {
    if (!dragStateRef.current) return;
    e.preventDefault();
    updateDrag(e.clientY);
  }, [updateDrag]);

  const handleWindowPointerUp = useCallback((e: PointerEvent) => {
    const state = dragStateRef.current;
    if (!state) return;

    if (state.targetElement) {
      try {
        state.targetElement.releasePointerCapture(state.pointerId);
      } catch {}
    }

    if (autoScrollAnimRef.current) {
      cancelAnimationFrame(autoScrollAnimRef.current);
      autoScrollAnimRef.current = null;
    }

    window.removeEventListener('pointermove', handleWindowPointerMove);
    window.removeEventListener('pointerup', handleWindowPointerUp);
    window.removeEventListener('pointercancel', handleWindowPointerUp);

    const { activeIndex, currentOverIndex } = state;
    const currentItems = itemsRef.current;

    if (currentOverIndex !== activeIndex && currentOverIndex >= 0 && currentOverIndex < currentItems.length) {
      const reordered = [...currentItems];
      const [moved] = reordered.splice(activeIndex, 1);
      reordered.splice(currentOverIndex, 0, moved);
      onReorderRef.current(reordered);
      try {
        if (navigator?.vibrate) navigator.vibrate(15);
      } catch {}
    }

    dragStateRef.current = null;
    setDraggingIndex(null);
    setOverIndex(null);
    setDragOffset(0);
  }, [handleWindowPointerMove]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollAnimRef.current) {
        cancelAnimationFrame(autoScrollAnimRef.current);
      }
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };
  }, [handleWindowPointerMove, handleWindowPointerUp]);

  // Start dragging
  const handleDragStart = useCallback((index: number, e: React.PointerEvent) => {
    if (!enabled || itemsRef.current.length <= 1) return;
    // Only primary mouse button or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget as HTMLElement;
    try {
      target.setPointerCapture(e.pointerId);
    } catch {}

    const rects = itemRefs.current.map(el => (el ? el.getBoundingClientRect() : null));
    const startScrollTop = getScrollTop();

    dragStateRef.current = {
      activeIndex: index,
      currentOverIndex: index,
      pointerId: e.pointerId,
      startY: e.clientY,
      startScrollTop,
      currentPointerY: e.clientY,
      rects,
      targetElement: target,
    };

    setDraggingIndex(index);
    setOverIndex(index);
    setDragOffset(0);

    try {
      if (navigator?.vibrate) navigator.vibrate(12);
    } catch {}

    window.addEventListener('pointermove', handleWindowPointerMove, { passive: false });
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);

    // Start auto-scroll monitoring
    if (autoScrollAnimRef.current) {
      cancelAnimationFrame(autoScrollAnimRef.current);
    }
    autoScrollAnimRef.current = requestAnimationFrame(runAutoScroll);
  }, [enabled, getScrollTop, handleWindowPointerMove, handleWindowPointerUp, runAutoScroll]);

  // Style calculator for each item
  const getItemStyle = useCallback((index: number): React.CSSProperties => {
    if (draggingIndex === null || !dragStateRef.current) {
      return {};
    }

    const { activeIndex, rects } = dragStateRef.current;
    const activeRect = rects[activeIndex];
    const targetOverIndex = overIndex ?? activeIndex;

    if (index === activeIndex) {
      return {
        transform: `translate3d(0, ${dragOffset}px, 0) scale(1.025)`,
        zIndex: 60,
        position: 'relative',
        boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.22), 0 10px 15px -5px rgba(0, 0, 0, 0.12)',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'grabbing',
      };
    }

    if (!activeRect) return {};

    // Sibling spacing shift amount based on active item height + measured gap
    const firstRect = rects[0];
    const secondRect = rects[1];
    const measuredGap = (firstRect && secondRect) ? Math.max(8, Math.round(secondRect.top - firstRect.bottom)) : 12;
    const shiftAmount = activeRect.height + measuredGap;

    if (targetOverIndex > activeIndex) {
      if (index > activeIndex && index <= targetOverIndex) {
        return {
          transform: `translate3d(0, -${shiftAmount}px, 0)`,
          transition: 'transform 240ms cubic-bezier(0.2, 0, 0, 1)',
          zIndex: 1,
        };
      }
    } else if (targetOverIndex < activeIndex) {
      if (index >= targetOverIndex && index < activeIndex) {
        return {
          transform: `translate3d(0, ${shiftAmount}px, 0)`,
          transition: 'transform 240ms cubic-bezier(0.2, 0, 0, 1)',
          zIndex: 1,
        };
      }
    }

    return {
      transform: 'translate3d(0, 0, 0)',
      transition: 'transform 240ms cubic-bezier(0.2, 0, 0, 1)',
      zIndex: 1,
    };
  }, [draggingIndex, overIndex, dragOffset]);

  const bindItemRef = useCallback((index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  }, []);

  return {
    isDragging: draggingIndex !== null,
    draggingIndex,
    overIndex,
    dragOffset,
    handleDragStart,
    getItemStyle,
    bindItemRef,
  };
}
