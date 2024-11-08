const $ = document
const productMinus = $.querySelector('.product-minus')
const productPlus = $.querySelector('.product-plus')
const productNumber = $.querySelector('.product-number')
const productNumberMax = $.querySelector('.product-number--max')



let productCount = 0 

productPlus.addEventListener('click', () => {
    
    productCount++


    if(productCount > 10 ){
        productCount == 10 
        productNumberMax.style.display = "block";
    }else{
        productNumberMax.style.display = "none";
        productNumber.innerHTML = productCount
    }
      
      
})

productMinus.addEventListener('click', () => {
    productCount--
    if(productNumberMax.style.display == "block" && productCount == 10){
        productCount--
        productNumberMax.style.display = "none";
    }
    if(productCount < 0 ){
        productCount == 0
    } else{
        productNumber.innerHTML = productCount
    }
})