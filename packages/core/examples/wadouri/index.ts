import {
  RenderingEngine,
  Types,
  Enums,
  getRenderingEngine,
} from '@cornerstonejs/core';
import {
  addButtonToToolbar,
  setTitleAndDescription,
  ctVoiRange,
} from '../../../../utils/demo/helpers';
import initCornerstoneDICOMImageLoader from '../../../../utils/demo/helpers/initCornerstoneDICOMImageLoader';
import { init as csRenderInit } from '@cornerstonejs/core';
import {wadoURICreateImageIds} from '../../../../utils/demo/helpers';

// This is for debugging purposes
console.warn(
  'Click on index.ts to open source code for this example --------->'
);

const { ViewportType } = Enums;

// ======== Set up page ======== //
setTitleAndDescription('WADO URI example', 'WADO URI example');

const content = document.getElementById('content');
const element = document.createElement('div');
element.id = 'cornerstone-element';
element.style.width = '500px';
element.style.height = '500px';

content.appendChild(element);
// ============================= //

const studyUID = '1.2.840.113619.6.476.306145829699788921213815080524558067149';
const contentType = 'application%2Fdicom';
const wadoURIRoot = 'http://172.16.204.218:3002/dicomweb/wado-uri';

const ctSeriesUID = '1.2.840.113619.2.476.138869320696845249102598031758684709369';
const ctObjectUID = '1.2.840.113619.2.476.2720845313853366573030549613824443582.1';

const ptSeriesUID = '1.3.6.1.4.1.25403.345050719074.3824.20170125112950.1';
const ptObjectUID = '1.3.6.1.4.1.25403.345050719074.3824.20170125112959.5';

// Instantiate a rendering engine
const renderingEngineId = 'myRenderingEngine';
const viewportId = 'CT_STACK';

const createWADOURIImageId = (params) => {
  return `wadouri:${params.wadoURIRoot}?requestType=WADO&studyUID=${params.studyUID}&seriesUID=${params.seriesUID}&objectUID=${params.objectUID}&contentType=${params.contentType}`;
};

// const ctImageId = createWADOURIImageId({
//   wadoURIRoot,
//   studyUID,
//   seriesUID: ctSeriesUID,
//   objectUID: ctObjectUID,
//   contentType,
// });

const ctImageId = wadoURICreateImageIds()

const ptImageId = createWADOURIImageId({
  wadoURIRoot,
  studyUID,
  seriesUID: ptSeriesUID,
  objectUID: ptObjectUID,
  contentType,
});

addButtonToToolbar({
  title: 'Load CT Image',
  onClick: () => {
    // Get the rendering engine
    const renderingEngine = getRenderingEngine(renderingEngineId);

    // Get the stack viewport
    const viewport = <Types.IStackViewport>(
      renderingEngine.getViewport(viewportId)
    );

    viewport.setStack(ctImageId);
  },
});

addButtonToToolbar({
  title: 'Load PT Image',
  onClick: () => {
    // Get the rendering engine
    const renderingEngine = getRenderingEngine(renderingEngineId);

    // Get the stack viewport
    const viewport = <Types.IStackViewport>(
      renderingEngine.getViewport(viewportId)
    );

    viewport.setStack([ptImageId]);
  },
});
/**
 * Runs the demo
 */
async function run() {
  // Init Cornerstone and related libraries
  initCornerstoneDICOMImageLoader();
  await csRenderInit();

  const renderingEngine = new RenderingEngine(renderingEngineId);

  // Create a stack viewport
  const viewportInput = {
    viewportId,
    type: ViewportType.STACK,
    element,
    defaultOptions: {
      background: <Types.Point3>[0.2, 0, 0.2],
    },
  };

  renderingEngine.enableElement(viewportInput);

  // Get the stack viewport that was created
  const viewport = <Types.IStackViewport>(
    renderingEngine.getViewport(viewportId)
  );

  // Define a stack containing a single image
  const stack = ctImageId;

  // Set the stack on the viewport
  await viewport.setStack(stack);

  // Set the VOI of the stack
  // viewport.setProperties({ voiRange: ctVoiRange });

  // Render the image
  viewport.render();
}

run();
