var updateBtns = document.getElementsByClassName('update-cart')

for(var i =0;i < updateBtns.length;i++){
    updateBtns[i].addEventListener('click',function(){
        var productid = this.dataset.product
        var action = this.dataset.action
        console.log('productid:',productid,'action:',action)
        console.log('user',user)
        if(user === 'AnonymousUser'){
            addCookieItem(productid,action)
        }
        else{
            updateUserOrder(productid,action)
        }
    })
}

function addCookieItem(productid,action){
    console.log('user not authenticated')
    if(action === 'add'){
        if(cart[productid] === undefined){
            cart[productid] = {'quantity':1}
        }
        else{
            cart[productid]['quantity'] += 1
        }
    }

    if(action === 'remove'){
        cart[productid]['quantity'] -= 1

        if(cart[productid]['quantity'] <= 0){
            delete cart[productid]
            console.log('remove item')
        }
    }

    console.log('cart:',cart)
    document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/"
    location.reload()
}


function updateUserOrder(productid,action){
    

    var url = '/update_item/'

    fetch(url,{
        method: 'POST',
        headers : {
            'Content-Type':'application/json',
            'X-CSRFToken' : csrftoken,
        },
        body:JSON.stringify({'productid':productid,'action':action})
    })

    .then((response) =>{
        return response.JSON()
    })
    .then((data) =>{
        location.reload()
    })
}