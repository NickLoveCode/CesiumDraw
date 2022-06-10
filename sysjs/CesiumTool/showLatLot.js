/* 
*经纬度
*/
var scene = viewer.scene;
(function(){
//得到当前三维场景
 getPosition();
 //地图底部工具栏显示地图坐标信息
 var coordinatesDiv = document.getElementById("_coordinates");
 if (coordinatesDiv) {
    coordinatesDiv.style.display = "block";
 }
 else {
     //var scale;
     var _divID_coordinates = "_coordinates";
     coordinatesDiv = document.createElement("div");
     coordinatesDiv.id = _divID_coordinates;
     coordinatesDiv.className = "map3D-coordinates";
     coordinatesDiv.innerHTML = "<span id='cd_label' style='font-size:13px;text-align:center;font-family:微软雅黑;color:#edffff;'>暂无坐标信息</span>";
    $("#cesiumContainer").append(coordinatesDiv);
     var handler3D = new Cesium.ScreenSpaceEventHandler(
         viewer.scene.canvas);
         
     handler3D.setInputAction(function(movement) {
         var pick= new Cesium.Cartesian2(movement.endPosition.x,movement.endPosition.y);
         if(pick){
             var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick), viewer.scene);
             if(cartesian){
                 //世界坐标转地理坐标（弧度）
                 var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                 if(cartographic){
                     //海拔
                     var height = viewer.scene.globe.getHeight(cartographic);
                     //视角海拔高度
                     var he = Math.sqrt(viewer.scene.camera.positionWC.x * viewer.scene.camera.positionWC.x + viewer.scene.camera.positionWC.y * viewer.scene.camera.positionWC.y + viewer.scene.camera.positionWC.z * viewer.scene.camera.positionWC.z);
                     var he2 = Math.sqrt(cartesian.x * cartesian.x + cartesian.y * cartesian.y + cartesian.z * cartesian.z);
                     //地理坐标（弧度）转经纬度坐标
                     var point=[ cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
                     if(!height){
                         height = 0;
                     }
                     if(!he){
                         he = 0;
                     }
                     if(!he2){
                         he2 = 0;
                     }
                     if(!point){
                         point = [0,0];
                     }
                     coordinatesDiv.innerHTML = "<span id='cd_label' style='font-size:13px;text-align:center;font-family:微软雅黑;color:#edffff;'>"+"视角海拔高度:"+(he - he2).toFixed(2)+"米"+"&nbsp;&nbsp;&nbsp;&nbsp;海拔:"+height.toFixed(2)+"米"+"&nbsp;&nbsp;&nbsp;&nbsp;经度：" + point[0].toFixed(6) + "&nbsp;&nbsp;纬度：" + point[1].toFixed(6)+ "</span>";
                 }
             }
         }
     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
 }
})()
   

function getPosition() {
    //得到当前三维场景的椭球体
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var entity = viewer.entities.add({
        label : {
            show : false
        }
    });
    var longitudeString = null;
    var latitudeString = null;
    var height = null;
    var cartesian = null;
    // 定义当前场景的画布元素的事件处理
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    //设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
    handler.setInputAction(function(movement) {
        //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
        cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
        if (cartesian) {
            //将笛卡尔坐标转换为地理坐标
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            //将弧度转为度的十进制度表示
            longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            //获取相机高度
            height = Math.ceil(viewer.camera.positionCartographic.height);
            entity.position = cartesian;
            entity.label.show = false;
            entity.label.font='10pt monospace',
            entity.label.verticalOrigin = Cesium.VerticalOrigin.BUTTON,
            entity.label.text = '(' + longitudeString.toFixed(2) + ', ' + latitudeString.toFixed(2) + "," + height.toFixed(2) + ')' ;
        }else {
            entity.label.show = false;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //设置鼠标滚动事件的处理函数，这里负责监听高度值变化
    handler.setInputAction(function(wheelment) {
        height = Math.ceil(viewer.camera.positionCartographic.height);
        entity.position = cartesian;
        entity.label.show = false;
        entity.label.font='10pt monospace',
        entity.label.verticalOrigin = Cesium.VerticalOrigin.BUTTON,
        entity.label.text = '(' + longitudeString.toFixed(2) + ', ' + latitudeString.toFixed(2)+ "," + height.toFixed(2) + ')' ;
    }, Cesium.ScreenSpaceEventType.WHEEL);
}