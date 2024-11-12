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
const productWrapper = $.querySelector('.product-wrapper');
const productTextWrapper = $.querySelector('.product-text-wrapper')



let gallery = [
    "./Images/image-product-1.jpg",
    "./Images/image-product-2.jpg",
    "./Images/image-product-3.jpg",
    "./Images/image-product-4.jpg"
]
let galleryIndex = 0
let productCount = 1
let listProduct = []



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
            let productPictures = $.querySelector('.product-pictures')

            let productPictureMain = $.querySelector('.product-picture__main')

            let activeImageMain = $.querySelector('.active-images__main')
            
            let activeImagesWrapper = $.querySelector('.active-images__wrapper')

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



