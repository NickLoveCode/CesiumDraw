
function addSatellite(){
    var czml1='./data/czml/satellite/GAOFEN1.czml';
    var dataSourcePromise = Cesium.CzmlDataSource.load(czml1);
    viewer.dataSources.add(dataSourcePromise);
    var czml2='./data/czml/satellite/GAOFEN2.czml';
    var dataSourcePromise2 = Cesium.CzmlDataSource.load(czml2);
    viewer.dataSources.add(dataSourcePromise2);
    var czml3='./data/czml/satellite/GAOFEN3.czml';
    var dataSourcePromise3 = Cesium.CzmlDataSource.load(czml3);
    viewer.dataSources.add(dataSourcePromise3);
    // viewer.zoomTo(dataSourcePromise);
    var inputObj=document.getElementsByName("hide");
for(let i=0;i<inputObj.length;i++){
    if(inputObj[i].value==="卫星临空预报"){
        inputObj[i].checked=true;
    }
}
}

/* 移除 */
function removeSatellite(czml){
    viewer.dataSources.removeAll();
}


