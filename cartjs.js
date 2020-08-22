var cart={};
var cost=0;
var el = document.getElementsByClassName('menu_list');
   for(var i=0; i<el.length; i++) {
   el[i].addEventListener("click", showSub, false);;
}



function showSub(e) {
      $('.menu_drop').css('top','0');
      $('.menu_drop').css('opacity','1');
}
function hideSub(e) {
      this.style.top = "-99999em";
       this.style.opacity = "0";
}

function loadcart(){
      if(localStorage.getItem('cart')){
          cart=JSON.parse(localStorage.getItem('cart'));
          if(!isEmpty(cart)){
            $('#main-cart').html('Корзина пуста!');
          }
          else{
            showcart();
          }
      }
      else{
          $('#main-cart').html('Корзина пуста!');

      }
}
function showcart(){
    $.getJSON('goods.json',function(data){
        var goods = data;
        var out="<ul class=\u0022shop-cart\u0022>";
        for(var id in cart){
            out+="<li class=\u0022item\u0022>";
            out+=`<a class=\u0022img-prod\u0022><div class=\u0022img\u0022><img src="pic/${goods[id].img} "></div></a>`;
            out+=`<div class="name-div"><p class="name-cart">${goods[id].name}</p></div>`;
            out+=`<div class="descr-div"><p class="descr">${goods[id].description}</p></div>`;
            out+=`<div class="cost-div"><p class="cost">${goods[id].cost} рублей</p></div>`;
            out+=" <div class=\u0022numb-div\u0022><p class=\u0022numb\u0022> "+cart[id]+" шт. </p></div>";
            out+="<div class=\u0022main-cost-div\u0022><p class=\u0022main-cost\u0022>Всего за блюдо:"+goods[id].cost*cart[id]+" рублей</p></div>";
            out+="</li>";
            cost+=goods[id].cost*cart[id]
        }
        out+="\u003C\u002Ful\u003E";
        $('#main-cart').html(out);
        if(cost<800){cost+=100;
          $('.delivery').html('Доставка:100 рублей');}
        else{$('.delivery').html('Бесплатная доставка');}
        $('.total').html('К оплате: '+cost+' рублей')
        console.log(cost);

    });

}


function isEmpty(object){
  for(var key in object)
  if(object.hasOwnProperty(key)) return true;
  return false;
}
function sendEmail(){
  var ename=$('#ename').val();
  var ephone=$('#ephone').val();
  var edress=$('#edress').val();
  if(ename!=''&&ephone!=''&&edress!=''){
    if(isEmpty(cart)){
     $.post(
        "core/mail.php",
        {
          "ename":ename,
          "ephone":ephone,
          "edress":edress,
          "cart":cart,
        },
        function (data){
          console.log(data);
        }
        );
        $('.email-field').html('Ваш заказ принят!Мы скоро свяжемся с вами)');
    }
    else{
      alert('Выберите что-нибудь')
    }
  }
    else{alert('Заполните поля')}
}
$(document).ready(function(){
    loadcart();
    $('.send-email').on('click',sendEmail);
});