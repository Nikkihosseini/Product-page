const $ = document
const hamburgerMenu = $.querySelector('.open-menu--svg')
const closeMobileMenu = $.querySelector('.close-mobile-menu')
const mobileMenu = $.querySelector('.mobile-menu')
const productMinus = $.querySelector('.product-minus')
const productPlus = $.querySelector('.product-plus')
const productNumber = $.querySelector('.product-number')
const productNumberMax = $.querySelector('.product-number--max')
const productPictureSmall = $.querySelectorAll('.product-picture__small')
const productPictureFrame = $.querySelector('.product-picture__frame')
const productPictureMain = $.querySelector('.product-picture__main')
const activeImages = $.querySelector('.active-images')
const activeImagesClose = $.querySelector('.active-images--close')
const activeImagesSmall = $.querySelectorAll('.active-images__small')
const activeImagesMain = $.querySelector('.active-images__main')
const previousBtn = $.querySelector('.active-images__previous--svg')
const nextBtn = $.querySelector('.active-images__next--svg')
const productWrapper = $.querySelector('.product-wrapper');
const productTextWrapper = $.querySelector('.product-text-wrapper')
const productBtnAdd = $.querySelector('.product-btn__add')
const productBtnNumber = $.querySelector('.product-btn__number')
const cartQuantity = $.querySelector('.header-cart__number')
const cartBoxProduct = $.querySelector('.cart-box__product')
const cartBoxLink = $.querySelector('.cart-box__link')
const cartBoxProductWrapper = $.querySelector('.cart-box__product--wrapper')
const previousBtnMobile = $.querySelector('.product-picture__previous')
const nextBtnMobile = $.querySelector('.product-picture__next')
const productPictureMobileImg = $.querySelector('.product-picture-mobile__img')
const empty = $.querySelector('.empty-cart-box')






let gallery = [
    "./Images/image-product-1.jpg",
    "./Images/image-product-2.jpg",
    "./Images/image-product-3.jpg",
    "./Images/image-product-4.jpg"
]

let galleryIndex = 0
let productCount = 1
let listProduct = []
let cart = []
let totalCartQty = 0;



// console.log(cart)

// *** Get Product Data ***
function inItApp(){
    fetch('products.json')
     .then((res) => res.json())
     .then(data => {
        listProduct = data;
        // console.log(listProduct)
        addDataToHtml()
     });
}
inItApp();




// *** Functions ***

function emptyCartBox(){
    let cartBoxProductWrapper = $.querySelector('.cart-box__product--wrapper')

    if(cartBoxProductWrapper.children.length === 0){
        empty.style.display = 'flex'
        cartBoxLink.style.display = 'none'
    }else if(cartBoxProductWrapper.children.length > 0){
        empty.style.display = 'none'
        cartBoxLink.style.display = 'flex'
    }
}
emptyCartBox()

function updateTotalCartQty(){
    let cartBoxProduct = document.querySelectorAll(".cart-box__product");
    totalCartQty = 0;
    cartBoxProduct.forEach((item) => {
      totalCartQty += parseInt(item.dataset.quantity);
      console.log(item.dataset.quantity)
    });
    cartQuantity.innerHTML = totalCartQty
}

function removeProductFromCart(event){
    productNumber.innerHTML = 1
    let productId = event.target.parentElement.dataset.id

    let positionThisProductInCart = cart.findIndex((value) => value.productId == productId)


    let cartBoxProductWrapper = $.querySelector('.cart-box__product--wrapper')

    let cartBoxProduct = $.querySelector('.cart-box__product')


    cart.splice(positionThisProductInCart, 1)
     
    cartBoxProductWrapper.removeChild(cartBoxProduct)

    if(cart.length === 0){
        emptyCartBox()
    }

    if(productBtnAdd.dataset.id == productId){
         productBtnAdd.style.display = 'flex'
    }
    
    updateTotalCartQty()
    
}

function mobileMenuHandler(style1 , style2){
    hamburgerMenu.style.display = style1
    mobileMenu.style.left = style2
}

function nextimg(mainImage){
    galleryIndex ++
    if(galleryIndex >= gallery.length){
        galleryIndex = 0
    }
    mainImage.setAttribute('src' , gallery[galleryIndex])
}

function previousImg(mainImage){
    galleryIndex --
    if(galleryIndex < 0){
        galleryIndex = gallery.length - 1 
    }

    mainImage.setAttribute('src' , gallery[galleryIndex])
}

function activeImagesDisplay(){
    window.onresize = displayWindowSize;
    window.onload = displayWindowSize;
    function displayWindowSize() {
        let screenWidth = window.innerWidth;
        if(screenWidth < 576){
            activeImages.style.display = "none";
        }
      };

}
activeImagesDisplay()


function smallGallery(className,productPucture,item){
    $.querySelector(`.${className}`).classList.remove(className)
    item.classList.add(className);
    productPucture.src = item.src
}

function activeImage(){
    $.querySelectorAll('.active-images__small').forEach((item) =>{
        if(activeImagesMain.src == item.src){
            item.classList.add('active-images__small--active')
        }else{
            item.classList.remove('active-images__small--active')
        }
    })
}


function addDataToHtml(){
    if(listProduct.length > 0){
        listProduct.forEach(product => {

            let productPictureMain = $.querySelector('.product-picture__main')

            let activeImageMain = $.querySelector('.active-images__main')

            let mainThumbnailImg1 = $.getElementById('main-thumbnail-img1')
            let mainThumbnailImg2 = $.getElementById('main-thumbnail-img2')
            let mainThumbnailImg3 = $.getElementById('main-thumbnail-img3')
            let mainThumbnailImg4 = $.getElementById('main-thumbnail-img4')

            let activeThumbnailImg1 = $.getElementById('activeThumbnailImg1')
            let activeThumbnailImg2 = $.getElementById('activeThumbnailImg2')
            let activeThumbnailImg3 = $.getElementById('activeThumbnailImg3')
            let activeThumbnailImg4 = $.getElementById('activeThumbnailImg4')
            
            productPictureMain.src = product.mainImg

            activeImageMain.src = product.mainImg

            activeThumbnailImg1.src = product.img1
            activeThumbnailImg2.src = product.img2
            activeThumbnailImg3.src = product.img3
            activeThumbnailImg4.src = product.img4

            mainThumbnailImg1.src = product.img1
            mainThumbnailImg2.src = product.img2
            mainThumbnailImg3.src = product.img3
            mainThumbnailImg4.src = product.img4

            productWrapper.dataset.id = product.id;
            productBtnAdd.dataset.id = product.id;


            productTextWrapper.insertAdjacentHTML('afterbegin' ,`
                       <div class="product-text">
                        <h4 class="product-company">${product.companyName}</h4>
                        <h1 class="product-name" alt="name">${product.name}</h1>
                        <p class="product-description">${product.description}</p>
                        <div class="product-sale">
                            <h5 class="product-sale-price">$${product.price}</h5>
                            <h6 class="product-sale-percent">${product.percent}%</h6>
                        </div>
                        <span class="product-previous-price">$${product.previousPrice}</span>
                       </div>
                 `
            ) 
        })
 }
}

function addToCart(productId){
    let positionThisProductInCart = cart.findIndex((value) => value.productId == productId)

    let mainProduct = listProduct.find((product) => {
        return product.id == productId 
    })
     
    if(cart.length <= 0){
        cart=[{
            productId : productId,
            name : mainProduct.name,
            quantity : 1,
        }]
    }else if(positionThisProductInCart < 0){
        cart.push({
            productId : productId,
            name : mainProduct.name,
            quantity : 1,
        })
    }

   addCartToHtml(productId)
}


function addCartToHtml(productId){
    if(cart.length > 0){
        cart.forEach(cart => {
            let cartBoxProductWrapper = $.querySelector('.cart-box__product--wrapper')
        
            let cartBoxProduct = $.createElement('div')
            cartBoxProduct.classList.add('cart-box__product')
             

            let positionProduct = listProduct.findIndex((value) => value.id == cart.productId);
            let info = listProduct[positionProduct]

            console.log(cart.productId)

            cartBoxProduct.dataset.quantity = productCount;
            cartBoxProduct.dataset.id = info.id
            cartBoxProduct.innerHTML= `
                <img class="product-box__img" src="${info.img1}" alt="Product">
                        <div class="product-box__content">
                           <div class="product-box__wrapper">
                            <p class="product-box__name">${info.name}</p>
                            <div class="product-box__prices">
                                <span class="product-price">$${info.price} × ${productCount}</span>
                                <span class="product-Total-price">$${(info.price * productCount).toFixed(2)}</span>
                            </div>
                           </div>
                        <div onclick="removeProductFromCart(event)" data-id ="${info.id}" class="product-box__delete--wrapper">
                           <svg onclick="removeProductFromCart(event)" class="product-box__delete" data-id ="${info.id}">
                            <use onclick="removeProductFromCart(event)" href="#delete"></use>
                        </svg>
                        </div>
                </div>
            `

            cartBoxProductWrapper.append(cartBoxProduct)

            updateTotalCartQty()
            
            if(cartBoxProductWrapper.innerHTML != ''){
                empty.style.display = 'none'
                cartBoxLink.style.display = 'flex'
            }

        })
    }
}



// *** Events ***

productWrapper.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('add-to-cart')){
        let productId = productBtnAdd.dataset.id;
        productBtnAdd.style.display = 'none'
        addToCart(productId)
    }
})

hamburgerMenu.addEventListener("click" , () => {
   mobileMenuHandler("none" , "0")

})

closeMobileMenu.addEventListener("click" , () => {
  mobileMenuHandler("block" , "-18rem")
})


productPlus.addEventListener('click', () => {
    
   if(productCount == 1 ||  productCount > 1 || productCount < 10){
       productCount++
   }

    if(productCount > 10  || productCount > 9){ 
        productCount = 10
    }

    if(productCount == 10){
        productNumberMax.style.display = "block";
    }

    if(productCount < 10){
        productNumberMax.style.display = "none";
    }

    productNumber.innerHTML = productCount
    updateTotalCartQty()
})

productMinus.addEventListener('click', () => {

    if(productCount > 1){
        productCount--
    }

    if(productCount < 10){
        productNumberMax.style.display = "none";
    }

    productNumber.innerHTML = productCount

})


productPictureSmall.forEach(item => {
    item.addEventListener('click', () => {
      smallGallery("product-picture__small--active",productPictureMain,item)
    })
})

productPictureFrame.addEventListener('click', () =>{
    activeImages.style.display = 'flex';
})


activeImagesClose.addEventListener('click', ( )=>{
    activeImages.style.display = 'none';
})


activeImagesSmall.forEach(item => {
    item.addEventListener('click', () => {
        smallGallery("active-images__small--active",activeImagesMain,item)
    })
})


nextBtn.addEventListener('click',() =>{
    nextimg(activeImagesMain)

    activeImage()
})


previousBtn.addEventListener('click', () =>{
    previousImg(activeImagesMain)

    activeImage()
})

nextBtnMobile.addEventListener('click',() =>{
    nextimg(productPictureMobileImg)
})


previousBtnMobile.addEventListener('click', () =>{
    previousImg(productPictureMobileImg)
})




