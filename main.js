const numberOfCustomers = 2;

let pizzasCooked = [];
let pizzasOrdered = [];
let ordersWaiting = [];
let customerId = 1;
const OVEN_SIZE = 2;

let intervalId = setInterval(orderRecieved, 6000)

// Cooks
let cook = document.getElementById("chef");
let packChef = document.getElementById("pack-chef");
let cashierChef = document.getElementById("cashier-chef")

// Objects
let freezer = document.getElementById('freezer');
let cookingOven = document.getElementById("oven-with-cooked-pizza")

// Event listeners
cook.addEventListener("animationstart", movePizzaToOven, false);
cook.addEventListener("animationend", movePizzaToOven, false);
cook.addEventListener("animationiteration", movePizzaToOven, false);
packChef.addEventListener("animationstart", removePizzaFromOven, false);
packChef.addEventListener("animationend", removePizzaFromOven, false);
packChef.addEventListener("animationiteration", removePizzaFromOven, false);


//Sounds
let orderUp = document.getElementById('order-up');
let keyboard = document.getElementById('keyboard');
let footsteps1 = document.getElementById('footsteps-1');
let footsteps2 = document.getElementById('footsteps-2');
let fridgeClose = document.getElementById('fridge-close');
let fridgeOpen = document.getElementById('fridge-open');
let ovenOpen = document.getElementById('oven-open');
let ovenClose = document.getElementById('oven-close');
let bell = document.getElementById('bell');

function movePizzaToOven(e) {
    cook.attributes["id"].nodeValue = "chef-animation";

    switch (e.animationName) {
        case "moveToOven":
            cook.attributes['src'].nodeValue = "img/pizza-man-right.gif";
            fridgeOpen.play()
            freezer.attributes['src'].nodeValue = "img/freezer-open.png";
            cook.attributes['src'].nodeValue = "img/pizza-man-frozen.gif";
            footsteps1.play()
           
            switch (e.type) {
                case "animationend":
                    ovenClose.play()
                    cookingOven.attributes['src'].nodeValue = 'img/oven-closed.png';
                    cook.style.left = '540px';
                    cook.style.top = '440px';
                    cook.style.animationName = 'moveToFreezer';
                break
            }

        break;

        case "moveToFreezer":
            cook.attributes['src'].nodeValue = "img/pizza-man-right.gif";
            footsteps1.play()
            
            switch (e.type) {
                case "animationend":
                    cook.style.left = '1050px';
                    cook.style.top = '520px';
                    fridgeClose.play()
                    freezer.attributes['src'].nodeValue = "img/freezer-closed1.jpg";
                    cook.attributes["id"].nodeValue = "chef";
                    cook.style = '';
                break;
            }

        break;
    }


}


function removePizzaFromOven(e) {
    packChef.attributes["id"].nodeValue = "pack-chef-animation";

    switch (e.animationName) {
        case "getPizzaFromOven":
            packChef.attributes['src'].nodeValue = "img/pizza-man-left.gif";
            footsteps2.play()
           
            switch (e.type) {
                case "animationend":
                    ovenOpen.play();
                    cookingOven.attributes['src'].nodeValue = 'img/oven-open.png';
                    packChef.attributes['src'].nodeValue = "img/pizza-man.gif";
                    packChef.style.bottom = "120";
                    packChef.style.right = "100";
                    packChef.style.animationName = "deliverPizza";
                 
                break
            }

            break;

        case "deliverPizza":
            cook.attributes['src'].nodeValue = "img/pizza-man-right.gif";

            switch (e.type) {
                case "animationend":
                    cook.style.left = '1050px';
                    cook.style.top = '520px';
                    freezer.attributes['src'].nodeValue = "img/freezer-closed1.jpg";
                    footsteps2.play()
                    packChef.attributes['src'].nodeValue = "img/pizza-man.gif";
                    packChef.attributes["id"].nodeValue = "pack-chef";
                    packChef.style = "";
                    packChef.attributes['src'].nodeValue = "img/pizza-man-left.gif";

                break;
            }

        break;
    }


}

let oven = {
    isEmpty: true,
    pizzasInOven: [],
    cookTime: 5000
}

function orderRecieved() {
    keyboard.play();
    orderUp.play();
    pizzasOrdered.push(customerId);
    
    
    if (oven.isEmpty = true || oven.isEmpty !== false) {
        console.log("Oven is empty", oven.isEmpty)
        putPizzaInOven(customerId);
        movePizzaToOven(cook);
        
    } else {
        console.warn("Outstanding order: ", customerId)
        ordersWaiting.push(customerId);
    }

    customerId++;
}

function putPizzaInOven(pizzaId) {
    if (oven.pizzasInOven.length < OVEN_SIZE) {
        
        if(ordersWaiting.length > 0) {
            let orderWaiting = ordersWaiting.pop()
            oven.pizzasInOven.push(orderWaiting);

            console.error("Taking order Waiting: ", orderWaiting)
        } else {
            let pizza = pizzasOrdered.indexOf(pizzaId);
            let order = pizzasOrdered.splice(pizza);
            oven.isEmpty = false;
            
            oven.pizzasInOven.push(order);
           
        }
        
        movePizzaToOven(cook);
    } else {
        oven.isEmpty = false;

        console.warn("Oven state: ", oven.isEmpty);

        setTimer(oven.pizzasInOven);
    }

}

function setTimer(order) {
    console.log("Timer set: ", setTimeout(function () {
        takePizzaOutOfOven(order);
        bell.play()
    }, oven.cookTime));
}

function takePizzaOutOfOven(order) {
    console.error("Order being removed: ", order)
    removePizzaFromOven(packChef);

    for (let i = 0; i < order.length; i++) {
        let pizzasRemoved = order.splice();
        pizzasCooked.push(pizzasRemoved);

        if(pizzasCooked.length == numberOfCustomers){
         
            clearInterval(intervalId)
        }
    } 

    oven.isEmpty = true;
}
