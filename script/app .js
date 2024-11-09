const $ = document
const productMinus = $.querySelector('.product-minus')
const productPlus = $.querySelector('.product-plus')
const productNumber = $.querySelector('.product-number')
const productNumberMax = $.querySelector('.product-number--max')



let productCount = 0 

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
   
    console.log(productCount)

})

