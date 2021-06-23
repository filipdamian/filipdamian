if(document.readyState=='loading')
{
document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}
function ready()
{
    var removeCartItemButtons=document.getElementsByClassName('btn-danger');
for(var i=0;i<removeCartItemButtons.length;i++)
{
    var button=removeCartItemButtons[i]
    button.addEventListener('click',removeCartItem)       
}


var quantityInputs=document.getElementsByClassName('cart-quantity-input')
for(var i=0;i<quantityInputs.length;i++)
{
    var input= quantityInputs[i]
    input.addEventListener('change',quantityChanged)
}



var addToCartButtons=document.getElementsByClassName('modal-btn')
for(var i=0;i<addToCartButtons.length;i++)
{
    var button=addToCartButtons[i]
    button.addEventListener('click',addToCartClicked)
}
document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)

}
function purchaseClicked()
{
    alert('Comanda a fost trimisa')
    var cartItems=document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event)
{
    var buttonClicked=event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
function quantityChanged(event)
{
    var input=event.target
    if(isNaN(input.value) || input.value<=0)
    {input.value=1}
    updateCartTotal()
}



function addToCartClicked(event)
{
    var button=event.target
    var shopItem=button.parentElement
    //console.log(shopItem)
    var title=shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price=shopItem.getElementsByClassName('shop-item-price')[0].innerText
    console.log(price)
    var imageSrc=shopItem.getElementsByClassName('shop-item-image')[0].src
   // console.log(title)
    addItemToCart(title,price,imageSrc)
    updateCartTotal()
}
function addItemToCart(title,price,imageSrc)
{   var cartRow=document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems=document.getElementsByClassName('cart-items')[0]
    //console.log(cartItems)
    var cartItemNames=cartItems.getElementsByClassName('cart-item-title')
    
    for(var i=0;i<cartItemNames.length;i++)
    {console.log(cartItemNames[i].innerHTML)
        if(cartItemNames[i].innerHTML==title)
        {   console.log(cartItemNames[i].innerText)
            alert('Ati adaugat deja acest item in cosul de cumparaturi')
    return}
    }
    var cartRowContents=`
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
   <span class="cart-item-title">${title}</span> </div>    
     <span class="cart-price cart-column">${price}</span>
     <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger cart-quantity-button" role="button">STERGE</button>
     </div>`
     cartRow.innerHTML=cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}


let indicator=document.querySelector('.indicator').children;
let main=document.querySelector('.shop-items').children;
var buton=document.querySelector('.buton');
var login=document.querySelector('.login');
var modalBg=document.querySelector('.modal-bg');
var overlayBg=document.querySelector('.overlayzzz');
var modalClose=document.querySelector('.modal-close');
var overClose=document.querySelector('.over-close');
overClose.style.color='red'

function updateCartTotal(){
    var cartItemContainer=document.getElementsByClassName('cart-items')[0]
    var cartRows=cartItemContainer.getElementsByClassName('cart-row')
    var total=0
  
    for(var i=0;i<cartRows.length;i++)
    {
        var cartRow=cartRows[i]
        var priceElement=cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement=cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price=parseFloat(priceElement.innerHTML.replace('$',''))
        var quantity=quantityElement.value
        total=total+(price*quantity)
        console.log(priceElement.innerHTML)
    }
    total=Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText='$'+total
}




///modal


modalClose.addEventListener('click',function(){
    modalBg.classList.remove('bg-active');
});
buton.addEventListener('click',function(){
modalBg.classList.add('bg-active');
});


login.addEventListener('click',function(){
    overlayBg.classList.add('over-active');
    });
    
overClose.addEventListener('click',function(){
    overlayBg.classList.remove('over-active');
});




///sortare iteme

for(let i=0;i<indicator.length;i++ )
{
  indicator[i].onclick=function(){
    for(let j=0;j<indicator.length;j++ )
    {
      indicator[j].classList.remove('active');
    }
    this.classList.add('active');
    const displayItems=this.getAttribute('data-filter');
    for(let k=0;k<main.length;k++ )
    {
      main[k].style.trasform='scale(0)';
      setTimeout(()=>{
        main[k].style.display='none';

      },500);
      if((main[k].getAttribute('data-category')==displayItems)|| displayItems=='all')
      {
        main[k].style.transform='scale(1)';
        setTimeout(()=>{
          main[k].style.display='block';
        },500)
      }
    }
  }
}

function navSlide() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    
    burger.addEventListener("click", () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");
        
        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle("toggle");
    });
    
}

navSlide();