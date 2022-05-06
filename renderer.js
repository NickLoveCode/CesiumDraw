var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate: false,   
    baseLayerPicker: false,  
    automaticallyTrackDataSourceClocks: true,
    animation: true,
    baseLayerPicker: true, 
    geocoder: false,
    scene3DOnly: false,
    timeline: true,
    sceneModePicker: true,
    navigationHelpButton: false,
    infoBox: true,
    selectionIndicator: true,
    vrButton: false,
    homeButton: false,
    showRenderLoopErrors: true,
    skyAtmosphere: false,
    contextOptions:{
        webgl:{
            alpha:true,
            depth:true,
            stencil:true,
            antialias:true,
            premultipliedAlpha:true,
            preserveDrawingBuffer:true,
            failIfMajorPerformanceCaveat:true
        }
    },
    imageryProvider: Cesium.createTileMapServiceImageryProvider({
        url: './lib/Cesium-1.51/Build/Cesium/Assets/Textures/NaturalEarthII/',
        })
});

viewer._cesiumWidget._creditContainer.style.display = "none";
viewer.scene.globe.depthTestAgainstTerrain = false;
options = {};
options.defaultResetView = Cesium.Rectangle.fromDegrees(80, 22, 130, 50);
options.enableCompass = true;
options.enableZoomControls = true;
options.enableDistanceLegend = true;
options.enableCompassOuterRing = true;
viewer.extend(Cesium.viewerCesiumNavigationMixin, options);

var entitiesArray=[];

function getEntityObj(id,name,positionArray,dataObjArray,descri){
    var enetityObj={};
    enetityObj.id=id;
    enetityObj.name=name;
    enetityObj.positionArray=positionArray;
    enetityObj.dataAttributeArr=dataObjArray;
    enetityObj.descri=descri;
    return enetityObj;
}
