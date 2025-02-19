import { ContourConfig } from '../../../types/ContourTypes';

const defaultContourConfig: ContourConfig = {
  renderOutline: true,
  outlineWidthAutoGenerated: 3,
  outlineWidthActive: 1,
  outlineWidthInactive: 1,
  outlineOpacity: 1,
  outlineOpacityInactive: 0.85,
  outlineDashActive: undefined,
  outlineDashInactive: undefined,
  outlineDashAutoGenerated: '5,3',
  activeSegmentOutlineWidthDelta: 0,
  renderFill: false,
  fillAlpha: 0.5,
  fillAlphaInactive: 0.3,
  fillAlphaAutoGenerated: 0.3,
};

function getDefaultContourConfig(): ContourConfig {
  return defaultContourConfig;
}

export default getDefaultContourConfig;
