import { FRONT_GROUND_GROUP_RESIZE_AREA_Z_INDEX } from 'src/common/constant';
import { DisplayObject, Group } from '@antv/g';
import { ResizeInfo, ResizeStyleProps } from '@/common/interface/resize';
import { SpreadSheet } from '@/sheet-type/spread-sheet';
import { ResizeDirectionType } from '@/common/constant/resize';
import { SimpleBBox } from '@/common';

export const getResizeAreaAttrs = (
  options: Omit<ResizeInfo, 'size'>,
): ResizeStyleProps => {
  const {
    type,
    id,
    theme,
    width: resizeAreaWidth,
    height: resizeAreaHeight,
    ...otherOptions
  } = options;
  const width = type === ResizeDirectionType.Horizontal ? theme.size : null;
  const height = type === ResizeDirectionType.Vertical ? theme.size : null;

  return {
    fill: theme.background,
    fillOpacity: theme.backgroundOpacity,
    cursor: `${type}-resize`,
    width,
    height,
    appendInfo: {
      ...otherOptions,
      isResizeArea: true,
      type,
      id,
      width: resizeAreaWidth,
      height: resizeAreaHeight,
      size: theme.size,
    } as ResizeInfo,
  };
};

export const getOrCreateResizeAreaGroupById = (
  spreadsheet: SpreadSheet,
  id: string,
): Group => {
  if (!spreadsheet.foregroundGroup) {
    return;
  }

  const existedResizeArea = spreadsheet.foregroundGroup.find(
    (node: DisplayObject) => node.id === id,
  ) as Group;

  return (
    existedResizeArea ||
    spreadsheet.foregroundGroup.appendChild(
      new Group({
        id,
        zIndex: FRONT_GROUND_GROUP_RESIZE_AREA_Z_INDEX,
      }),
    )
  );
};

export const shouldAddResizeArea = (
  resizeArea: SimpleBBox,
  resizeClipArea: SimpleBBox,
  scrollOffset?: {
    scrollX?: number;
    scrollY?: number;
  },
) => {
  const { scrollX = 0, scrollY = 0 } = scrollOffset ?? {};

  // x轴上有重叠
  const overlapInXAxis = !(
    resizeArea.x - scrollX > resizeClipArea.x + resizeClipArea.width ||
    resizeArea.x + resizeArea.width - scrollX < resizeClipArea.x
  );

  // y轴上有重叠
  const overlapInYAxis = !(
    resizeArea.y - scrollY > resizeClipArea.y + resizeClipArea.height ||
    resizeArea.y + resizeArea.height - scrollY < resizeClipArea.y
  );

  return overlapInXAxis && overlapInYAxis;
};
