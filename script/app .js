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

            let productTextWrapper = $.querySelector('.product-text-wrapper')


            productWrapper.dataset.id = product.id;

            // console.log(product.id)

            productPictures.insertAdjacentHTML('afterbegin', 
                `
             <div class="product-picture__frame">
                        <img class="product-picture__main" src="${product.mainImg}" alt="Product-img">
                    </div>
                    <div class="product-pictures__wrapper">
                        <div class="product-pictures__small-frame">
                            <img class="product-picture__small
                            product-picture__small--active" src="${product.img1}" alt="Product-img">
                        </div>
                        <div class="product-pictures__small-frame">
                            <img class="product-picture__small" src="${product.img2}" alt="Product-img">
                        </div>
                        <div class="product-pictures__small-frame">
                            <img class="product-picture__small" src="${product.img3}" alt="Product-img">
                        </div>
                        <div class="product-pictures__small-frame">
                            <img class="product-picture__small" src="${product.img4}" alt="Product-img">
                        </div>
                    </div>
            `
            ) 

            productTextWrapper.insertAdjacentHTML('afterbegin' ,
                `
                       <div class="product-text">
                        <h4 class="product-company">${product.companyName}</h4>
                        <h1 class="product-name" alt="name">${product.name}</h1>
                        <p class="product-description">${product.description}</p>
                        <div class="product-sale">
                            <h5 class="product-sale-price">${product.price}</h5>
                            <h6 class="product-sale-percent">${product.percent}%</h6>
                        </div>
                        <span class="product-previous-price">$${product.previousPrice}</span>
                       </div>
                 `
            ) 

            // console.log(productPictures)
        
        

            
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



