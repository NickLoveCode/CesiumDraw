/*生成菜单栏*/
function getMenuList(){
    $.ajax({
        url: "data/menu.xml",
        dataType: 'xml',
        type: 'GET',
        timeout: 2000,
        error: function(xml)
        {
            alert("加载XML 文件出错！");
        },
        success: function(xml)
        {
            var infoList = document.getElementById('menuslist');
            // 清空原有列表
            for (var i = infoList.childNodes.length - 1; i >= 0; i--)
            {
                infoList.removeChild(infoList.lastChild);
                var Uptd = document.getElementById('menuslist');
                $(xml).find("menu").each(function(i)
                {
			        var id=$(this).attr("id");
                    var menuid = $(this).children("menuid").text();
                    var menuname = $(this).children("menuname").text();  
                    var menuurl = $(this).children("menuurl").text();         
              
                    var li = document.createElement("li");
                    li.setAttribute("class", "li1"); 
                    if(menuurl=="")     
                        li.innerHTML = "<a class='menu1' target='mainFrame'>"+menuname+"</a>";
                    else
                        li.innerHTML = "<a class='menu1' onclick='"+menuurl+"' target='mainFrame'>"+menuname+"</a>";
                    var ul = document.createElement("ul");
                    ul.setAttribute("class", "ul2");  
                    $(this).children("menuChild").each(function () {//循环遍历获取到的元素对象
                        var childid = $(this).children("Childid").text();
                        var childname = $(this).children("Childname").text();  
                        var childurl = $(this).children("Childurl").text();     
                        var li1 = document.createElement("li");
                        if(childurl=="")     
                            li1.innerHTML = "<input type='checkbox' name='hide' value="+childname+" onclick='hide(this)'/><a class='menu2' target='mainFrame' >"+childname+"</a>";
                        else
                            li1.innerHTML = "<input type='checkbox' name='hide' value="+childname+" onclick='hide(this)'/><a class='menu2' onclick="+childurl+" target='mainFrame'>"+childname+"</a>";
                        ul.appendChild(li1);
                    });                    

                    
                    li.appendChild(ul);
                    Uptd.appendChild(li);
                });
            }    
        }
    });    
}

/*生成右侧栏*/
function getJunList(){
    $.ajax({
        url: "data/menu.xml",
        dataType: 'xml',
        type: 'GET',
        timeout: 2000,
        error: function(xml)
        {
            alert("加载XML 文件出错！");
        },
        success: function(xml)
        {
            var junList = document.getElementById('junimage');
            // 清空原有列表
            for (var i = junList.childNodes.length - 1; i >= 0; i--)
            {
                junList.removeChild(junList.lastChild);
                var Uptd = document.getElementById('junimage');
                $(xml).find("menu").each(function(i)
                {
			        var id=$(this).attr("id");
                    var title = $(this).children("menuname").text();  
                    var junsrc= $(this).children("menuname").text();
                    var junurl = $(this).children("menuurl").text();         
              
                    var li = document.createElement("li");
                    li.setAttribute("class", "li2"); 
                    li.setAttribute("id", title); 
                    li.innerHTML = "<img src="+junsrc+" title="+title+" width='25px' height='25px' onclick='addJunBoard('"+junurl+"')'/>";
                    Uptd.appendChild(li);
                });
            }    
        }
    });    
}


