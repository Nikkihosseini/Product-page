const $ = document
const productMinus = $.querySelector('.product-minus')
const productPlus = $.querySelector('.product-plus')
const productNumber = $.querySelector('.product-number')
const productNumberMax = $.querySelector('.product-number--max')
const productPictureSmall = $.querySelectorAll('.product-picture__small')
const productPictureMain = $.querySelector('.product-picture__main')
const activeImages = $.querySelector('.active-images')
const activeImagesClose = $.querySelector('.active-images--close')
const activeImagesSmall = $.querySelectorAll('.active-images__small')
const activeImagesMain = $.querySelector('.active-images__main')
const previousBtn = $.querySelector('.active-images__previous--svg')
const nextBtn = $.querySelector('.active-images__next--svg')



let gallery = [
    "./Images/image-product-1.jpg",
    "./Images/image-product-2.jpg",
    "./Images/image-product-3.jpg",
    "./Images/image-product-4.jpg"
]
let galleryIndex = 0
let productCount = 1

// *** Functions ***

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


// *** Events ***

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


productPictureMain.addEventListener('click', () =>{
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
    galleryIndex ++
    if(galleryIndex >= gallery.length){
        galleryIndex = 0
    }
    activeImagesMain.setAttribute('src' , gallery[galleryIndex])

    activeImage()
})

previousBtn.addEventListener('click', () =>{
    galleryIndex --
    if(galleryIndex < 0){
        galleryIndex = gallery.length - 1 
    }

    activeImagesMain.setAttribute('src' , gallery[galleryIndex])

    activeImage()
})

