/*
*绘制椭圆形区域
*/
var loadedModels = [];
var tempPoints = [];
var tempEntities = [];
var tempPinEntities = [];
var tempPinLon, tempPinLat;
var handler = null;
var scene = viewer.scene;

function clearEffects() {
    if (handler != null) {
        handler.destroy();
    }
}
//(function () {
//    var c1 = [119.5047, 28.0813];
//    var d1 = [118.2922, 26.4815];
//    var e1 = [118.2729, 27.0810];
//viewer.scene.globe.depthTestAgainstTerrain = false;

var EARTH_RADIUS = 6378137.0;    //单位M
var PI = Math.PI;
function Rad(d) {
    return d * PI / 180.0;
}

function getFlatternDistance(p1, p2) {
    var radLat1 = Rad(p1[0]);
    var radLat2 = Rad(p2[0]);
    var a = radLat1 - radLat2;
    var b = Rad(p1[1]) - Rad(p2[1]);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(4);
    return s;
}

//生成点
function creatPoints(_p1, _p2, _p3) {
    var points = [];
    var len1 = getFlatternDistance(_p3, _p1);
    var len2 = getFlatternDistance(_p1, _p2);
    var len3 = getFlatternDistance(_p2, _p3);
    var p1, p2, p3;
    if (len1 > len2 && len1 > len3) {
        p1 = _p1;
        p2 = _p2;
        p3 = _p3;
    } else if (len2 > len1 && len2 > len3) {
        p1 = _p2;
        p2 = _p3;
        p3 = _p1;
    } else {
        p1 = _p3;
        p2 = _p1;
        p3 = _p2;
    }

    var pp1 = [(-1 * ((p3[0] - p2[0]) * 0.75) / 2) + p1[0], (-1 * ((p3[1] - p2[1]) * 0.75) / 2) + p1[1]];
    var pp9 = [((p3[0] - p2[0]) * 0.75) / 2 + p1[0], ((p3[1] - p2[1]) * 0.75) / 2 + p1[1]];

    var pp4 = [(-1 * ((p1[0] - p2[0]) * 0.75) / 2) + p3[0], (-1 * ((p1[1] - p2[1]) * 0.75) / 2) + p3[1]];
    var pp5 = [((p1[0] - p2[0]) * 0.75) / 2 + p3[0], ((p1[1] - p2[1]) * 0.75) / 2 + p3[1]];
    //px1为直线p1,p2和直线pp2 pp4的交点，p2-px1=pp4-p3
    //px1-pp2=pp9-p1
    //即pp2=p2-p3+pp4-p1+pp9
    var px1 = [p2[0] + (p3[0] - pp4[0]), p2[1] + (p3[1] - pp4[1])];
    var pp2 = [px1[0] + p1[0] - pp9[0], px1[1] + p1[1] - pp9[1]];
    //px2为直线p2,p2和直线pp2 pp1的交点，
    //p2-px2=pp1-p1
    //px2-pp3=pp5-p3
    //即pp3=p2-p3+pp5-p1+pp1
    var px2 = [p2[0] + (p1[0] - pp1[0]), p2[1] + (p1[1] - pp1[1])];
    var pp3 = [px2[0] + p3[0] - pp5[0], px2[1] + p3[1] - pp5[1]];

    var pp7 = [(p1[0] + p3[0]) / 2, (p1[1] + p3[1]) / 2];
    var pp6 = [(p3[0] - pp7[0]) * 0.35 + pp7[0], (p3[1] - pp7[1]) * 0.35 + pp7[1]];
    var pp8 = [(p1[0] - pp7[0]) * 0.35 + pp7[0], (p1[1] - pp7[1]) * 0.35 + pp7[1]];

    points = [
            p1[0], p1[1],
            pp1[0], pp1[1],
            pp2[0], pp2[1],
            p2[0], p2[1],
            pp3[0], pp3[1],
            pp4[0], pp4[1],
            p3[0], p3[1],
            pp5[0], pp5[1],
            pp6[0], pp6[1],
            pp7[0], pp7[1],
            pp8[0], pp8[1],
            pp9[0], pp9[1],
        ]
    return points;
}


//***贝塞尔曲线 */
//anchorpoints：贝塞尔基点
//pointsAmount：生成的点数
//return 路径点的Array
function CreateBezierPoints(anchorpoints, pointsAmount) {
    var points = [];
    for (var i = 0; i < pointsAmount; i++) {
        var point = MultiPointBezier(anchorpoints, i / pointsAmount);
        points.push(point);
    }
    return points;
}
function MultiPointBezier(points, t) {
    var len = points.length;
    var x = 0, y = 0;
    var erxiangshi = function (start, end) {
        var cs = 1, bcs = 1;
        while (end > 0) {
            cs *= start;
            bcs *= end;
            start--;
            end--;
        }
        return (cs / bcs);
    };
    for (var i = 0; i < len; i++) {
        var point = points[i];
        x += point[0] * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
        y += point[1] * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
    }
    return [x, y];
}


//将经纬度进行转化
function Lng2deg(lng) {
    for (var i = 0; i < lng.length; i++) {
        a = String(lng[i]).split('.')[0];
        b = String(lng[i]).split('.')[1];
        c = b.substring(0, 2);
        d = b.substring(2);
        e = parseFloat(a) + parseFloat(c) / 60 + parseFloat(d) / 3600;
        lng[i] = e;
    }
    return lng;
}

function inPut(c1, d1, e1) {
    var points = creatPoints(c1, d1, e1);
    //画出 p1,pp1,pp2,p2; p2,pp3,pp4,p3; p3,pp5,pp6,pp7; pp7,pp8,pp9,p1的贝塞尔曲线相互衔接
    var p1 = [[points[0], points[1]], [points[2], points[3]], [points[4], points[5]], [points[6], points[7]]]
    var po1 = CreateBezierPoints(p1, 15);
    var p2 = [[points[6], points[7]], [points[8], points[9]], [points[10], points[11]], [points[12], points[13]]]
    var po2 = CreateBezierPoints(p2, 15);
    var p3 = [[points[12], points[13]], [points[14], points[15]], [points[16], points[17]], [points[18], points[19]]]
    var po3 = CreateBezierPoints(p3, 15);
    var p4 = [[points[18], points[19]], [points[20], points[21]], [points[22], points[23]], [points[0], points[1]]]
    var po4 = CreateBezierPoints(p4, 15);
    ps = [po1, po2, po3, po4];
    var pos = [];
    for (var i = 0; i < ps.length; i++) {
        for (var j = 0; j < ps[i].length; j++) {
            for (var k = 0; k < ps[i][j].length; k++) {
                pos.push(ps[i][j][k]);
            }
        }
    }
    return pos;

}
function addAre() {
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (click) {
        var cartesian = viewer.camera.pickEllipsoid(click.position, scene.globe.ellipsoid);
        if (cartesian) {
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            tempPoints.push([longitudeString, latitudeString]);
            var tempLength = tempPoints.length;
            drawPoint(longitudeString,latitudeString);
            if (tempLength >= 3) {
                var pointData = inPut(tempPoints[tempPoints.length - 3], tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length-1]);
                areDraw(pointData);
                tempPoints = [];
                clearEffects();
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function (click) {
        tempPoints = [];
        clearEffects();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
//进行区域绘制
function areDraw(data) {
    //var data = inPut(c1, d1, e1);
    viewer.entities.add({
        name: 'Red polygon on surface',
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(data),
            height: 0,
            material: Cesium.Color.RED.withAlpha(1),
            outline: true,
            outlineColor: Cesium.Color.BLACK
        },
        label: {
            fillColor: Cesium.Color.CHARTREUSE,
            font: "11pt Lucida Console",
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            outlineColor: Cesium.Color.CHARTREUSE,
            outlineWidth: 2,
            pixelOffset: new Cesium.Cartesian2(12, 0),
            show: true,
            style: Cesium.LabelStyle.FILL,
            text: '    ',
            verticalOrigin: Cesium.VerticalOrigin.CENTER
        }
    });
}
/* 绘制点 */
function drawPoint(lon,lat) {
   
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lon, lat),
        point: {
            pixelSize: 4,
            color: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            disableDepthTestDistance: 100.0,
            show: true
        }
    });
   // tempEntities.push(entity);
}
//})()