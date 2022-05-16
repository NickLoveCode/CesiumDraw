/* 
*绘制地点
*/
(function () {
  var placeName = ['china'];
  for (var i = 0; i < placeName.length; i++) {
    drawPlace('./data/geography_data/' + placeName[i] + '.json');
  }

  function drawPlace(path) {
    var clampToGround = false;
    var minDis = 0;
    var maxDis = 1000;
    if (path.indexOf('china') < 0) {
      clampToGround = true;
      minDis = 0;
      maxDis = 1000000;
    } else {
      minDis = 1000000;
      maxDis = 10000000;
    }
    var promise = Cesium.GeoJsonDataSource.load(path, {
      stroke: Cesium.Color.WHITE,
      fill: Cesium.Color.BLUE.withAlpha(0),
      strokeWidth: 0,
      clampToGround: true
    }); // load完之后即为一个promise对象

    promise.then(function (dataSource) { // 此处类似于添加3D对象中的动画。
      //viewer.dataSources.add(dataSource); // 先添加对象
      var entities = dataSource.entities.values; // 获取所有对象
      for (var i = 0; i < entities.length; i++) { // 逐一遍历循环
        var entity = entities[i];
        var id = entity.properties.id._value; // 取出id属性内容
        var name = entity.properties.name._value; // 取出name属性内容
        var cp = entity.properties.cp._value; // 取出name属性内容
        viewer.entities.add({
          name: name,
          position: Cesium.Cartesian3.fromDegrees(cp[0], cp[1],10000),
          point: {
            pixelSize: 2,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(minDis, maxDis),
            disableDepthTestDistance: 100.0,
            show: true
          },
          label: {
            text: name,
            font: '10pt italic arial sans-serif',
            fillColor: Cesium.Color.BLACK,
            //style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 1,
            //垂直位置
            verticalOrigin: Cesium.VerticalOrigin.BUTTON,
            //中心位置
            pixelOffset: new Cesium.Cartesian2(0, 20),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(minDis, maxDis),
            disableDepthTestDistance: 100.0,
            show: true
          }
        });
             /*  entity.polygon.material = color; // 设置polygon对象的填充颜色
                entity.polygon.outline = true; // polygon边线显示与否
                entity.polygon.extrudedHeight = entity.properties.POPU * 1000; // 根据POPU属性设置polygon的高度  */
      }
    });
    //viewer.zoomTo(promise);
  }
}
)()

