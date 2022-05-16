//标点
function showRosca() {
    if (document.getElementById("toollist").style.display == "none") {
        document.getElementById("toollist").style.display = "block";
        document.getElementById("twolist").style.display = "none"
        document.getElementById("toolbar").style.display = "none";
        document.getElementById("junlist").style.display = "none";
        document.getElementById("junlist2").style.display = "none";
        document.getElementById("junlist3").style.display = "none";
        document.getElementById("junlist4").style.display = "none";
        document.getElementById("junlist5").style.display = "none";
    }
    else {
        document.getElementById("toollist").style.display = "none";
    }
}
function show2DTool(){
    if (document.getElementById("twolist").style.display == "none") {
        document.getElementById("toollist").style.display = "none";
        document.getElementById("twolist").style.display = "block";
    }
}
function showJunTool(){
    if (document.getElementById("toolbar").style.display == "none") {
        document.getElementById("toollist").style.display = "none";
        document.getElementById("toolbar").style.display = "block";
    }
}
function showJbTool(){
    if (document.getElementById("junlist").style.display == "none") {
        document.getElementById("toollist").style.display = "none";
        document.getElementById("junlist").style.display = "block";
        document.getElementById("junlist2").style.display = "none";
        document.getElementById("junlist3").style.display = "none";
        document.getElementById("junlist4").style.display = "none";
        document.getElementById("junlist5").style.display = "none";
    }
}
function showJb2Tool(){
    if (document.getElementById("junlist2").style.display == "none") {
        document.getElementById("toollist").style.display = "none";
        document.getElementById("junlist").style.display = "none";
        document.getElementById("junlist2").style.display = "block";
        document.getElementById("junlist3").style.display = "none";
        document.getElementById("junlist4").style.display = "none";
        document.getElementById("junlist5").style.display = "none";
    }
}
function showJb3Tool(){
    if (document.getElementById("junlist3").style.display == "none") {
        document.getElementById("toollist").style.display = "none";
        document.getElementById("junlist").style.display = "none";
        document.getElementById("junlist2").style.display = "none";
        document.getElementById("junlist3").style.display = "block";
        document.getElementById("junlist4").style.display = "none";
        document.getElementById("junlist5").style.display = "none";
    }
}
function showJb4Tool(){
    if (document.getElementById("junlist4").style.display == "none") {
        document.getElementById("toollist").style.display = "none";
        document.getElementById("junlist").style.display = "none";
        document.getElementById("junlist2").style.display = "none";
        document.getElementById("junlist3").style.display = "none";
        document.getElementById("junlist4").style.display = "block";
        document.getElementById("junlist5").style.display = "none";
    }
}

function showJb5Tool(){
    if (document.getElementById("junlist5").style.display == "none") {
        document.getElementById("toollist").style.display = "none";
        document.getElementById("junlist").style.display = "none";
        document.getElementById("junlist2").style.display = "none";
        document.getElementById("junlist3").style.display = "none";
        document.getElementById("junlist4").style.display = "none";
        document.getElementById("junlist5").style.display = "block";
    }
}

// 读取文件
function importFile(){
    var selectedFile=document.getElementById("files").files[0];
    var reader=new FileReader();
    reader.readAsText(selectedFile);
    reader.onload=function(){
        console.log(this.result)
        //清空当前页面元素内容（部分）
        var Objs=JSON.parse(this.result)
        Objs.forEach(element => {
            drawShapeUtil(element.id,element.name,element.positionArray,element.dataAttributeArr,element.descri)
        });
    }
}

// 读取文件
function readScenario(){
    // 写入事件
}

function saveFile(){
    var timers=new Date();
    var fullYear=timers.getFullYear();
    var month=timers.getMonth()+1;
    var date=timers.getDate();
    var randoms=Math.random()+'';
    //年月日加上随机数
    var numberFileName=fullYear+''+month+date+randoms.slice(3,10);
    var entitiesJsonStr=JSON.stringify(entitiesArray)
    var blob=new Blob([entitiesJsonStr],{type:"text/plain;charset=utf-8"});
    saveAs(blob,numberFileName+"态势.json")
    var arrObj=[]
    for (var i=0;i<entitiesArray.length;i++){
        arrObj.append(entitiesArray[i].id)
    }
    if(arrObj.length>0){
        $.ajax({
            url: "",
            dataType: 'json',
            type: 'post',
            data:arrObj,
            timeout: 2000,
            success: function(xml)
            {
 
                console.log("successs")
            }
        });     }
}

function addJunBoard(obj){
    var dataJun={};
    tempPoints = [];
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (click) {
        var cartesian = viewer.camera.pickEllipsoid(click.position, scene.globe.ellipsoid);
        if (cartesian) {
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            tempPoints.push({ lon: longitudeString, lat: latitudeString });
            dataJun["type"]="point";
            dataJun["tempPoints"]=tempPoints;
            dataJun["image"]='./img/menuIcon/icons/'+obj.JBWJM;
            dataJun["show"]=true;
            var tempLength = tempPoints.length;
                    // 绘制数据
                    let id = obj.JBMC;
                    let positionArray = []
                    let position = {}
                    position.lon = longitudeString;
                    position.lat = latitudeString;
                    positionArray.push(position)
                    let dataEntityArray = [];
                    let obj = {};
                    obj.billboard ={
                        image: './img/menuIcon/icons/'+imagePath,
                        scale:0.4,
                        show: true
                    } ;
                    obj.label ={
                        text: id,
                        font: "14px 微软雅黑"
                    } ;
                    dataEntityArray.push(obj);
                    drawShapeUtil(id, id, positionArray, dataEntityArray, obj.SL);
            tempPoints = [];
        clearEffects();

        document.getElementById(id).hide()

        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function (click) {
        tempPoints = [];
        clearEffects();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}


function PrintTool(){
    html2canvas(document.querySelector('#cesiumContainer'),{useCORS:true}).then(function (canvas) {
        var timers=new Date();
        var fullYear=timers.getFullYear();
        var month=timers.getMonth()+1;
        var date=timers.getDate();
        var randoms=Math.random()+'';
        //年月日加上随机数
        var numberFileName=fullYear+''+month+date+randoms.slice(3,10);
        var imgData=canvas.toDataURL();
        //保存图片
        var saveFile = function(data, filename){
            var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href = data;
            save_link.download = filename;

            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
        };
        //最终文件名+文件格式
        var filename = numberFileName + '.png';
        saveFile(imgData,filename);
    })
}


function yunPic()
{
    alert("暂无气象数据");
}


// 读取文件
function readScenario(){
 //读取文件
}

function subScenbtu(){
    // todo
}

// 取消
function canclebtu(){
    document.getElementById('subtext').value=""
    document.getElementById('scenario').style.display='none'
}

// 显示
function sendStiuation(){
    document.getElementById('subtext').value=""
    document.getElementById('scenario').style.display="block"
}

function showhidemenu(){
    if(document.getElementById('showhide').src.indexOf("icoLeft")!=-1){
        document.getElementsByClassName('div-b')[0].style.marginLeft="-13%"
        document.getElementById('filetool').style.marginLeft="6%"
        document.getElementById('scenario').style.left="6%"
        document.getElementById('showhide').src="./img/icoRight.png"
    }else{
        document.getElementsByClassName('div-b')[0].style.marginLeft="0"
        document.getElementById('filetool').style.marginLeft="18%"
        document.getElementById('scenario').style.left="18%"
        document.getElementById('showhide').src="./img/icoLeft.png"
    }
}
