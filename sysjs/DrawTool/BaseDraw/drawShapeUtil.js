/**
 * 绘制对象
 * @param {*} id 
 * @param {*} name 
 * @param {*} positionArray
 * @param {*} dataObjArray 
 * @param {*} descri 
 */
function drawShapeUtil(id, name, positionArray, dataObjArray, descri) {
    //存放全局对象
    var entityObj = getEntityObj(id, name, positionArray, dataObjArray, descri);
    entitiesArray.push(entityObj);

    var entityUse = {}
    entityUse.id = id;
    entityUse.name = name;
    entityUse.description = descri;

    //判断点的个数来确定属性为position或positions
    if (positionArray.length > 1) {
        var positionsTmp = []
        positionArray.forEach(element => {
            positionsTmp.push(Cesium.Cartesian3.fromDegrees(element.lon, element.lat));
        });
        entityUse.positions = positionsTmp;
    } else if (positionArray.length === 1) {
        entityUse.position = Cesium.Cartesian3.fromDegrees(positionArray[0].lon, positionArray[0].lat);
    }

    //图像类型和属性
    if (dataObjArray.length != 0) {
        dataObjArray.forEach(element => {
            for (const key in element) {
                if (element.hasOwnProperty(key)) { 
                    entityUse[key] = element[key];
                    for (const keyAttr in element[key]) {
                        if (element[key].hasOwnProperty(keyAttr)){
                            if(keyAttr==="material"){
                                entityUse[key].material=Cesium.Color.RED.withAlpha(0.1);
                            }
        
                        }
                    }
                }
            }
        });
    }
    //绘制
    viewer.entities.add(entityUse);
}

/* 
删除对象
*/
leftDeleteDownHandel=new Cesium.ScreenSpaceEventHandler(viewer.canvas).setInputAction(getEntity,Cesium.ScreenSpaceEventType.LEFT_CLICK)
var entityId=""
function getEntity(e){
    entity=viewer.scene.pick(e.position);//选取当前的entity 
    entityId=entity.id.id
}

function deleted(){
    if(entityId!=""){
        viewer.entities.removeById(entityId);
        document.getElementById(entityId).hide()
        entityId=""
    }
}





