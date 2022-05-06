$(function(){
    //$(".menu1").click(function(){
        $(document).on('click','a.menu1',function(){
            $(this).css("color","#ffffff");
            $(this).css("background","#0D9B50");
            $(this).parent().siblings().children(".menu1").css("background","");
            $(this).parent().siblings().children(".menu1").css("color","");
            $(this).nextAll().slideToggle(300);
            $(this).parent().siblings().children(".ul2").slideUp();
            $(this).parent().siblings().children(".ul2").children().children(".ul3").slideUp();
            $(this).parent().siblings().children(".ul3").slideUp();
            $(this).parent().siblings().children(".ul2").children().children(".menu2").css("background","");
         });
         
         $(document).on('click','a.menu2',function(){
              //切换上下箭头
             if($(this).children("span").hasClass("openmoreUp")){
                 $(this).children(".openmoreUp").addClass("openmoreDown");
                 $(this).children(".openmoreUp").removeClass("openmoreUp");
             }else if($(this).children("span").hasClass("openmoreDown")){
                 $(this).children(".openmoreDown").addClass("openmoreUp");
                 $(this).children(".openmoreDown").removeClass("openmoreDown");
             }
              if($(this).parent().siblings().children(".menu2").children("span").hasClass("openmoreDown")){
                 $(this).parent().siblings().children(".menu2").children("span").removeClass();
                 $(this).parent().siblings().children(".menu2").children("span").addClass("openmoreUp");
             }
            $(this).css("color","#1DE4A4");
             $(this).parent().siblings().children(".menu2").css("background","");
             $(this).parent().siblings().children(".menu2").css("color","");
             $(this).nextAll().slideToggle(300);
             $(this).parent().siblings().children(".ul3").slideUp();
      
         });
         
         $(document).on('click','a.menu3',function(){
             $(this).css("color","#1DE4A4");
             $(this).parent().siblings().children(".menu3").css("background","");
             $(this).parent().siblings().children(".menu3").css("color","");
      
         });
     });
     
