/* 
绘制图形
*/

var tempEntities = [];
var handler = null;
var scene = viewer.scene;//场景定义
var activeShapePoints = [];

var activeShape;         //动态绘制的形状
var floatingPointEntity;       //动态点
var drawingMode = "";


/* 
获取鼠标位置笛卡尔坐标
*/
function getPointCartesian3(event){
    var earthPosition = viewer.camera.pickEllipsoid(event.position, scene.globe.ellipsoid);
    return earthPosition
}

function getPointCartesian3Move(movement){
    var earthPosition = viewer.camera.pickEllipsoid(movement.endPosition, scene.globe.ellipsoid);
    return earthPosition
}

/* 
绘制线
*/
function addLine() {
    terminateShape();
    drawingMode = "line";
    handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    //左键事件
    handler.setInputAction(function (event) {
        earthPosition=getPointCartesian3(event)
        if (Cesium.defined(earthPosition)) {
            if (activeShapePoints.length === 0) {
                floatingPointEntity = createPoint(earthPosition);
                activeShapePoints.push(earthPosition);
                var dynamicPositions = new Cesium.CallbackProperty(function () {
                    if (drawingMode === "polygon") {
                        return new Cesium.PolygonHierarchy(activeShapePoints);
                    }
                    return activeShapePoints;
                }, false);
                activeShape = drawShape(dynamicPositions);
            }
            activeShapePoints.push(earthPosition);
            createPoint(earthPosition);
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //移动事件
    handler.setInputAction(function (movement) {
        if (Cesium.defined(floatingPointEntity)) {
            var newPosition = getPointCartesian3Move(movement)
            if (Cesium.defined(newPosition)) {
                floatingPointEntity.position.setValue(newPosition);
                activeShapePoints.pop();
                activeShapePoints.push(newPosition);
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(function (event) {
        terminateShape();
        clearEffects();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

/* 
绘制多边形
*/
function addPolygon() {
    terminateShape();
    drawingMode = "polygon";
    handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction(function (event) {
        var earthPosition = getPointCartesian3(event)
        if (Cesium.defined(earthPosition)) {
            if (activeShapePoints.length === 0) {
                floatingPointEntity = createPoint(earthPosition);
                activeShapePoints.push(earthPosition);
                var dynamicPositions = new Cesium.CallbackProperty(function () {
                    if (drawingMode === "polygon") {
                        return new Cesium.PolygonHierarchy(activeShapePoints);
                    }
                    return activeShapePoints;
                }, false);
                activeShape = drawShape(dynamicPositions);
            }
            activeShapePoints.push(earthPosition);
            createPoint(earthPosition);
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function (movement) {
        if (Cesium.defined(floatingPointEntity)) {
            var newPosition= getPointCartesian3Move(movement)
            if (Cesium.defined(newPosition)) {
                floatingPointEntity.position.setValue(newPosition);
                activeShapePoints.pop();
                activeShapePoints.push(newPosition);
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(function (event) {
        terminateShape();
        clearEffects();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

/* 
绘制矩形
*/
function addRectangle() {
    terminateShape();
    drawingMode = "rectangle";
    handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction(function (event) {
        var earthPosition = getPointCartesian3(event)
        if (Cesium.defined(earthPosition)) {
            if (activeShapePoints.length === 0) {
                floatingPointEntity = createPoint(earthPosition);
                activeShapePoints.push(earthPosition);
                var dynamicPositions = new Cesium.CallbackProperty(function () {
                    if (drawingMode === "polygon") {
                        return new Cesium.PolygonHierarchy(activeShapePoints);
                    }
                    return activeShapePoints;
                }, false);
                activeShape = drawShape(dynamicPositions);
            }
            activeShapePoints.push(earthPosition);
            createPoint(earthPosition);
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function (movement) {
        if (Cesium.defined(floatingPointEntity)) {
            var newPosition= getPointCartesian3Move(movement)
            if (Cesium.defined(newPosition)) {
                floatingPointEntity.position.setValue(newPosition);
                activeShapePoints.pop();
                activeShapePoints.push(newPosition);
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(function (event) {
        terminateShape();
        clearEffects();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

//标绘圆形
function addCircle() {
    terminateShape();
    drawingMode = "circle";
    handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction(function (event) {
        var earthPosition = getPointCartesian3(event)
        if (Cesium.defined(earthPosition)) {
            if (activeShapePoints.length === 0) {
                floatingPointEntity = createPoint(earthPosition);
                activeShapePoints.push(earthPosition);
                var dynamicPositions = new Cesium.CallbackProperty(function () {
                    if (drawingMode === "polygon") {
                        return new Cesium.PolygonHierarchy(activeShapePoints);
                    }
                    return activeShapePoints;
                }, false);
                activeShape = drawShape(dynamicPositions);
            }
            activeShapePoints.push(earthPosition);
            createPoint(earthPosition);
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function (movement) {
        if (Cesium.defined(floatingPointEntity)) {
            var newPosition= getPointCartesian3Move(movement)
            if (Cesium.defined(newPosition)) {
                floatingPointEntity.position.setValue(newPosition);
                activeShapePoints.pop();
                activeShapePoints.push(newPosition);
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(function (event) {
        terminateShape();
        clearEffects();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

/**
 * 绘制点
 * @param {*} worldPosition 
 */
function createPoint(worldPosition) {
  var pointEntity = viewer.entities.add({
    position: worldPosition,
    point: {
      color: Cesium.Color.BLACK,
      pixelSize: 5,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
  });
  tempEntities.push(pointEntity);
  return pointEntity;
}

/* 
绘制形状
*/
function drawShape(positionData) {
  var shape;
    if (drawingMode === 'line') {
        shape = viewer.entities.add({
            polyline: {
                positions: positionData,
                material: Cesium.Color.YELLOW,
                clampToGround: true,
                width: 3
            }
        });
    } else if (drawingMode === "polygon") {
        shape = viewer.entities.add({
              polygon: {
                    hierarchy: positionData,
                    material: new Cesium.ColorMaterialProperty(
                      Cesium.Color.GREEN.withAlpha(0.5)
                    )
              }
        });
  }else if (drawingMode === 'circle') {
        //当positionData为数组时绘制最终图，如果为function则绘制动态图
        var value = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData;
        shape = viewer.entities.add({
            position: activeShapePoints[0],
            name: 'Blue translucent, rotated, and extruded ellipse with outline',
            type:'Selection tool',
            ellipse: {
                semiMinorAxis: new Cesium.CallbackProperty(function () {
                    //半径 两点间距离
                    var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math.pow(value[0].y - value[value.length - 1].y, 2));
                    return r ? r : r + 1;
                }, false),
                semiMajorAxis: new Cesium.CallbackProperty(function () {
                    var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math.pow(value[0].y - value[value.length - 1].y, 2));
                    return r ? r : r + 1;
                }, false),
                material: Cesium.Color.BLUE.withAlpha(0.5),
                outline: true
            }
        });
    } else if (drawingMode === 'rectangle') {
        //当positionData为数组时绘制最终图，如果为function则绘制动态图
        var arr = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData;
        shape = viewer.entities.add({
            name: 'Blue translucent, rotated, and extruded ellipse with outline',
            rectangle : {
                coordinates :  new Cesium.CallbackProperty(function () {
                    return Cesium.Rectangle.fromCartesianArray(arr);

                }, false),
                material : Cesium.Color.RED.withAlpha(0.5),
                outline: true
            }
        });
    }
  return shape;
}

// Redraw the shape so it's not dynamic and remove the dynamic shape.
function terminateShape() {
  activeShapePoints.pop();
  drawShape(activeShapePoints);
  viewer.entities.remove(floatingPointEntity);
  viewer.entities.remove(activeShape);
  floatingPointEntity = undefined;
  activeShape = undefined;
  activeShapePoints = [];
}



/* 绘制点 */
function drawPoint(point) {
    var entity =
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat),
        point: {
            pixelSize: 5,
            color: Cesium.Color.BLUE,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            disableDepthTestDistance: 100.0,
            show: true
        }
    });
    tempEntities.push(entity);
}

/*两点绘制线*/
function drawLine(point1, point2) {
    var entity =
    viewer.entities.add({
        polyline: {
            positions: [Cesium.Cartesian3.fromDegrees(point1.lon, point1.lat), Cesium.Cartesian3.fromDegrees(point2.lon, point2.lat)],
            width: 2.0,
            material:  Cesium.Color.GREEN,
            clampToGround: true
        }
    });
    tempEntities.push(entity);
}


function clearEffects() {
    if (handler != null) {
        handler.destroy();
    }
}