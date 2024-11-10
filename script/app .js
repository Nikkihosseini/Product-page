const $ = document
const productMinus = $.querySelector('.product-minus')
const productPlus = $.querySelector('.product-plus')
const productNumber = $.querySelector('.product-number')
const productNumberMax = $.querySelector('.product-number--max')
const productPictureSmall = $.querySelectorAll('.product-picture__small')
const productPictureMain = $.querySelector('.product-picture__main')
const activeImages = $.querySelector('.active-images')
const activeImagesClose = $.querySelector('.active-images--close')





let productCount = 0 

function smallGallery(className,productPucture,item){
    $.querySelector(`.${className}`).classList.remove(className)
    item.classList.add(className);
    productPucture.src = item.src
}

productPlus.addEventListener('click', () => {
    
   if(productCount == 0 ||  productCount > 0 || productCount < 10){
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
      
      
})

productMinus.addEventListener('click', () => {

    if(productCount > 0){
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
    //   $.querySelector('.product-picture__small--active').classList.remove('product-picture__small--active')
    //   item.classList.add('product-picture__small--active');
    //   productPictureMain.src = item.src
    })
})


productPictureMain.addEventListener('click', () =>{
    activeImages.style.display = 'flex';
})

activeImagesClose.addEventListener('click', ( )=>{
    activeImages.style.display = 'none';
})


// productPictureSmall.forEach(item => {
//     item.addEventListener('click', () => {
//       $.querySelector('.product-picture__small--active').classList.remove('product-picture__small--active')
//       item.classList.add('product-picture__small--active');
//       productPictureMain.src = item.src
//     })
// })
