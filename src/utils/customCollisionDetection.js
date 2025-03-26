import {
    rectIntersection,
    getFirstCollision,
  } from "@dnd-kit/core";
  
  /**
   * DragOverlay が並び替え対象に「触れた瞬間」に反応し、
   * 被りすぎによる誤判定ループを防ぐ柔らかめの衝突判定
   */
  export function relaxedCollisionDetection(args) {
    const intersections = rectIntersection(args);
    const overId = getFirstCollision(intersections, "id");
  
    if (overId != null) {
      return [{ id: overId }];
    }
  
    return [];
  }
  