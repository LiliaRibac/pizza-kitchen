const numberOfCustomers = 10;

let pizzasCooked = [];
let pizzasOrdered = [];
let ordersWaiting = [];
let customerId = 1;


let cook = document.getElementById("chef");
let freezer = document.getElementById('freezer');
let cashierChef = document.getElementById("cashier-chef")
let cookingOven = document.getElementById("oven-with-cooked-pizza")
let intervalId = setInterval(orderRecieved, 2000)

function movePizzaToOven(e) {
    console.log( e)
    switch (e.animationName) {
        case "moveToOven":
            console.log("Animation Start")
            cook.attributes['src'].nodeValue = "img/pizza-man-right.gif";
            freezer.attributes['src'].nodeValue = "img/freezer-open.png";
            cook.attributes['src'].nodeValue = "img/pizza-man-frozen.gif";

            switch(e.type){
                case "animationend": 
                    cookingOven.attributes['src'].nodeValue = 'img/oven-closed.png';
                    cook.style.left = '540px';
                    cook.style.top = '440px';
                    cook.style.animationName = 'moveToFreezer';
                break
            }
            
        break;

        case "moveToFreezer":
            console.log("Moving to Freezer")
            cook.attributes['src'].nodeValue = "img/pizza-man-right.gif";

            switch(e.type){
                case "animationend":
                    cook.style.left = '1050px';
                    cook.style.top = '520px';
                    freezer.attributes['src'].nodeValue = "img/freezer-closed1.jpg";
                break;
            }
            
        break;
    }


}

let oven = {
    isEmpty: true,
    pizzasInOven: []
}

function orderRecieved(e) {
    if(pizzasCooked.length < numberOfCustomers) {
        console.log("Pizza Ordered: ", customerId);
        pizzasOrdered.push(customerId);


        if(oven.isEmpty == true){
            putPizzaInOven(customerId);
            movePizzaToOven()
        } else {
            console.log("Outstanding orders!")
            ordersWaiting.push(customerId);
        }
    
        customerId++;
    } else {
        alert("Kitchens Closed!");
        clearInterval(intervalId)
    }
}

function putPizzaInOven(pizzaId) {
    console.log("Putting pizza in oven: ", pizzaId);
    if(oven.pizzasInOven.length < 4){
        let pizza = pizzasOrdered.indexOf(pizzaId);
        let order = pizzasOrdered.splice(pizza);
        oven.pizzasInOven.push(order);
        
    } else {
        oven.isEmpty = false; 
        console.log("Oven is full!", oven.isEmpty);

        setTimer(oven.pizzasInOven);
    }

    // TODO: Remove pizza from pizzasOrdered (don't forget to use index so you get the right pizza)
    // TODO: push pizza to oven set oven object to isnotempty
}

function setTimer(order){
    setTimeout(function(){ takePizzaOutOfOven(order) }, 5000);
}

function takePizzaOutOfOven(order){
    console.log("Order being removed: ", order)
    
    for(let i = 0; i < order.length; i++){
        let pizzasRemoved = order.splice();
        pizzasCooked.push(pizzasRemoved);
    }
    
    oven.isEmpty = true;
}



cook.addEventListener("animationstart", movePizzaToOven, false);
cook.addEventListener("animationend", movePizzaToOven, false);
cook.addEventListener("animationiteration", movePizzaToOven, false);

// b.addEventListener("click", toggleChef, false);