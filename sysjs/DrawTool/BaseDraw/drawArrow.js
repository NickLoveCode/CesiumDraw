/* 
* 标绘各种箭头
*/
(function () {

    // start the draw helper to enable shape creation and editing
    var drawHelper = new DrawHelper(viewer.cesiumWidget);
    var scene = viewer.scene;
    var toolbar = drawHelper.addToolbar(document.getElementById("toolbar"), {
        buttons: [ 'extent','qianjin','zhijiao',"tailedAttackArrow"]
    });

    //前进
    toolbar.addListener('polygonCreated2', function (event) {
        var polygon = new DrawHelper.PolygonPrimitive2({
            positions: event.positions,
            custom: event.custom,
            material: Cesium.Material.fromType(Cesium.Material.ColorType)
        });
        scene.primitives.add(polygon);
        polygon.setEditable();
        polygon.addListener('onEdited', function (event) {
        });

    });
    //攻击
    toolbar.addListener('tailedAttackCreated', function (event) {
        var polygon = new DrawHelper.TailedAttackPrimitive({
            positions: event.positions,
            custom: event.custom,
            material: Cesium.Material.fromType(Cesium.Material.ColorType)
        });
        scene.primitives.add(polygon);
        polygon.setEditable();
        polygon.addListener('onEdited', function (event) {
        });

    });
    //直角        
    toolbar.addListener('straightArrowCreated', function (event) {
        var arrow = event.arrow;
        var straightArrowPrimitive = new DrawHelper.StraightArrowPrimitive({
            arrow: arrow,
            material: Cesium.Material.fromType(Cesium.Material.ColorType)
        });
        scene.primitives.add(straightArrowPrimitive);
        straightArrowPrimitive.setEditable();
        straightArrowPrimitive.addListener('onEdited', function (event) {
        });
    });


    //scene.globe.depthTestAgainstTerrain = false;

    var logging = document.getElementById('logging');
        function loggingMessage(message) {
            logging.innerHTML = message;
        }

})()