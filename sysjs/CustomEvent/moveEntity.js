   /* 
   可以拖拽实体
   */
        var leftDownFlag = false;
        var pointDraged = null;
        leftDownHandel=new Cesium.ScreenSpaceEventHandler(viewer.canvas).setInputAction(leftDownAction,Cesium.ScreenSpaceEventType.LEFT_DOWN)
        leftUpHandel=new Cesium.ScreenSpaceEventHandler(viewer.canvas).setInputAction(leftUpAction,Cesium.ScreenSpaceEventType.LEFT_UP)
        moseMoveHandel=new Cesium.ScreenSpaceEventHandler(viewer.canvas).setInputAction(mouseMoveAction,Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        function leftDownAction(e){
            console.log("按下左键")
            pointDraged = viewer.scene.pick(e.position);//选取当前的entity 
            leftDownFlag = true;
            if (pointDraged) {
                viewer.scene.screenSpaceCameraController.enableRotate = false;//锁定相机
            }
        }

        function leftUpAction(e){
            console.log("左键抬起")
            if(pointDraged != null&&pointDraged.id!=undefined ){
                for (let iterator of entitiesArray) {
                    if(iterator.id===pointDraged.id.id){
                        //笛卡尔（世界坐标系）转地理坐标系（经纬度）
                        var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pointDraged.id.position.getValue());
                        let positionArrayTmp = []
                        let position = {}
                        position.lon = Cesium.Math.toDegrees(cartographic.longitude);
                        position.lat = Cesium.Math.toDegrees(cartographic.latitude);
                        positionArrayTmp.push(position)
                        iterator.positionArray=positionArrayTmp
                        break
                    }
                }
            }
            leftDownFlag = false;
            pointDraged = null;
            viewer.scene.screenSpaceCameraController.enableRotate = true;//锁定相机
            viewer.scene.screenSpaceCameraController.enableInputs = true;
            // clearEffects()
        }

        function mouseMoveAction(e){
            if(pointDraged != null&&pointDraged.id!=undefined ){
                if (leftDownFlag === true && pointDraged != null) {
                    console.log("移动")
                    let ray = viewer.camera.getPickRay(e.endPosition);
                    let cartesian = viewer.scene.globe.pick(ray, viewer.scene);
                    console.log(cartesian);

                    pointDraged.id.position = new Cesium.CallbackProperty(function () {
                        return cartesian;
                    }, false);//防止闪烁，在移动的过程
                }
            }

        }

