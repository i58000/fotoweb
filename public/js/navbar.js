/**
 * Created by ANJINSHUO on 2017/7/2.
 */
$(document).ready(function(){
    let path = window.location.pathname;
    let ll = $('#navbar').children('li');//.childNodes;
    for(let i = 0; i < ll.length; i++){
        if(ll[i].children[0].pathname === path)
            ll[i].children[0].className = 'active'
    }
    console.log("\n\
 │\\＿╭╭╭╭╭＿／│ 　\n\
 │           │\n\
 │ ●       ● │\n\
 │ ○ ╰┬┬┬╯ ○ │\n\
 │    ╰—╯    │\n\
 ╰—┬○——————┬○╯\n\
  ╭│  PZSB │╮\n\
  ╰┴———————┴╯\n\
    \ ");
});





