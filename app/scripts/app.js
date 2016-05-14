// (function() {
//     var langLength = $('.list-group a').length;
//     if (langLength >= 6) {
//         console.log("greater than 5");
//         $(".languageModel").css({ "max-width": "390px" });
//         var lg1 = $('.list-group');
//         lg2 = $('<div>').attr('class', 'list-group');
//         listgroup2Content = $('.list-group').find('a:gt(4)');
//         lg2.append(listgroup2Content);
//         lg2.insertAfter(lg1);
//         $(".list-group").removeClass('col-md-20').addClass('col-md-10');
//     } else {
//         $(".languageModel").css({ "max-width": "250px" });
//         $(".list-group").removeClass('col-md-10').addClass('col-md-20');
//     }

// })();

(function() {
   
$(function() {
  $('body').moombaPreloader({
              type        : 2,                  // Rectangle(1), Square(2)
              bg_color    : 'rgb(225,225,225)', // Background Color
              // Rectangle(1) 
              r_box_color : 'rgb(254,254,254)', // Outer shell
              r_bar_color : 'rgb(204,102,51)' , // Inner Bar
              // Square(2)
              s_box_color : 'rgb(254,254,254)', // Outer shell
              s_square_1  : 'rgb(40,55,64)',    // Top Left
              s_square_2  : 'rgb(138,178,159)', // Top Right
              s_square_3  : 'rgb(191,168,118)', // Bottom Left
              s_square_4  : 'rgb(89,51,37)',    // Bottom Right 
            });
});




    
})();
