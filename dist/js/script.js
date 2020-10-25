
let status = true;
$('.show').on('click',function(){



    if (status == true) {
        $('#area').attr('class','col-9');
        $('.earning').attr('style',' margin-left: 30%');
        status = false;      
    }else{
        $('#area').attr('class','col-12');
        $('.earning').attr('style',' margin-left: 35%');
        status = true;
    }

    $('.sidebar_menu').toggle(function(){
      
    })

});


// page input-transfer
$('.pin-verify').on('click',function(){
  $('.input-line').hide();
  $('.form-control').css('border','1px solid #6379f2');
  $('.btn').css('backgroundColor','#6379F4');
  $('.btn').css('color','white');

});      

$('.amount').on('click',function(){
  $('.amount').css('color','#6379F4 !important');
  $('.amount').val('Rp');

});      



// page sign-up feature
$('.input-notes input').on('click',() =>{
  $('.input-notes input').css('border-bottom','1.5px solid #6379F4');
  $('.input-notes input').css('color','#3A3D42');
  $('.input-notes input').css('fontWeight','600');
  $('.icon-pencil').attr('src','assets/icon/pencil-active.svg');
});
// page sign-up feature
$('.username input').on('click',() =>{
  $('.username input').css('border','1.5px solid #6379F4');
  $('.username img').attr('src','assets/icon/person-active.svg');
});
$('.email input').on('click',() =>{
  $('.email input').css('border','1.5px solid #6379F4');
  $('.email img').attr('src','assets/icon/mail-active.svg');
});
$('.password input').on('click',() =>{
  $('.password input').css('border','1.5px solid #6379F4');
  $('.password .icon-input img').attr('src','assets/icon/lock-active.svg');
  $('.btn').css('backgroundColor','#6379F4');
  $('.btn').css('color','white');
});
let eye = true;
$('.eye-crossed').on('click',() =>{ 
  if (eye === true) {
     $('.password input').attr('type','text');
     eye = false;
  }else{
      $('.password input').attr('type','password');
     eye = true;
  }
});






