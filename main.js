var cart = {};
var el = document.getElementsByClassName('menu_list');
   for(var i=0; i<el.length; i++) {
   el[i].addEventListener("click", showSub, false);;
}



function showSub(e) {
      $('.menu_drop').css('top','0')
      $('.menu_drop').css('opacity','1')
}
function hideSub(e) {
      this.style.top = "-99999em";
       this.style.opacity = "0";
}

$('.add-to-cart').on('click',addToCart);
function addToCart(){
    var id=$(this).attr('data-id');
    if(cart[id]==undefined){
        cart[id]=1;
    }
    else{
        cart[id]++;
    }
    console.log(cart);
    showminicart();
   saveCart();
}

function saveCart(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
function showminicart(){
  $.getJSON('goods.json',function(data){
    var goods = data;
    var out="<ul>";
    for(var key in cart){
      out +="<li>";
      out +=`<button data-id="${key}" class="minus"> - </button>`;
      out +=`${goods[key].name}`;
      out +="- "+cart[key]+" шт.";
      out +=`<button data-id="${key}" class="plus">+</button>`
      out +="</li>";

    }
      out +='</ul>';
      out +='<a class="in-cart" href="cart.html">В корзину</a>'
    $('.mini-cart').html(out);
    $('.minus').on('click',minusgoods);
    $('.plus').on('click',plusgoods);
  })
}
function delgoods(){
  var id= $(this).attr('data-id')
  delete cart[id];
  saveCart();
  showminicart();
}
function plusgoods(){
  var id= $(this).attr('data-id')
  cart[id]++;
  saveCart();
  showminicart();
}
function minusgoods(){
  var id= $(this).attr('data-id')
  if(cart[id]==1){
    delete cart[id];
  }
  else{
    cart[id]--;
  }
  saveCart();
  showminicart();
}

function loadcart(){
      if(localStorage.getItem('cart')){
          cart=JSON.parse(localStorage.getItem('cart'));
          if(!isEmpty(cart)){
            $('#main-cart').html('Корзина пуста!');
          }
          else{
            showminicart();
          }
      }
      else{
          $('.mini-cart').html('Корзина пуста!');
      }
    }
function isEmpty(object){
  for(var key in object)
  if(object.hasOwnProperty(key)) return true;
  return false;
}

function json(data){
   // var goods=JSON.parse(data);
    console.log(data);
}



$(document).ready(function(){
    $.getJSON("goods.json",json);
    loadcart();

});