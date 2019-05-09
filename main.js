const numberOfCustomers = 10;

let pizzasCooked = [];
let pizzasOrdered = [];
let ordersWaiting = [];
let customerId = 1;
let intervalId = setInterval(orderRecieved, 2000)



let cook = document.getElementById("chef");
let packChef = document.getElementById("pack-chef");
let cashierChef = document.getElementById("cashier-chef")


let freezer = document.getElementById('freezer');
let cookingOven = document.getElementById("oven-with-cooked-pizza")

cook.addEventListener("animationstart", movePizzaToOven, false);
cook.addEventListener("animationend", movePizzaToOven, false);
cook.addEventListener("animationiteration", movePizzaToOven, false);


packChef.addEventListener("animationstart", removePizzaFromOven, false);
packChef.addEventListener("animationend", removePizzaFromOven, false);
packChef.addEventListener("animationiteration", removePizzaFromOven, false);


function movePizzaToOven(e) {
    cook.attributes["id"].nodeValue = "chef-animation";

    switch (e.animationName) {
        case "moveToOven":
            cook.attributes['src'].nodeValue = "img/pizza-man-right.gif";
            freezer.attributes['src'].nodeValue = "img/freezer-open.png";
            cook.attributes['src'].nodeValue = "img/pizza-man-frozen.gif";
           
            switch (e.type) {
                case "animationend":
                    cookingOven.attributes['src'].nodeValue = 'img/oven-closed.png';
                    cook.style.left = '540px';
                    cook.style.top = '440px';
                    cook.style.animationName = 'moveToFreezer';
                break
            }

        break;

        case "moveToFreezer":
            cook.attributes['src'].nodeValue = "img/pizza-man-right.gif";
            
            switch (e.type) {
                case "animationend":
                    cook.style.left = '1050px';
                    cook.style.top = '520px';
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
           
            switch (e.type) {
                case "animationend":
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
                    packChef.attributes['src'].nodeValue = "img/pizza-man.gif";
                    packChef.attributes["id"].nodeValue = "pack-chef";
                    packChef.style = "";

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
    if (pizzasCooked.length < numberOfCustomers) {
        console.log("Pizza Ordered: ", customerId);
        pizzasOrdered.push(customerId);


        if (oven.isEmpty == true) {
            putPizzaInOven(customerId);

        } else {
            console.log("Outstanding order: ", customerId)
            ordersWaiting.push(customerId);
        }

        customerId++;
    } else {
        alert("Kitchens Closed!");
        clearInterval(intervalId)
    }
}

function putPizzaInOven(pizzaId) {
    if (oven.pizzasInOven.length < 1) {
        oven.isEmpty = true;

        if(ordersWaiting.length <0) {
            let orderWaiting = ordersWaiting.pop()
            
            oven.pizzasInOven.push(orderWaiting);
            movePizzaToOven(cook);

            console.log("Taking order from orders Waiting: ", orderWaiting)
        } else {
            let pizza = pizzasOrdered.indexOf(pizzaId);
            let order = pizzasOrdered.splice(pizza);
            oven.pizzasInOven.push(order);
            movePizzaToOven(cook);

            console.log("Order up!", order)
        }
    } else {
        oven.isEmpty = false;

        console.log("Oven state: ", oven.isEmpty);

        setTimer(oven.pizzasInOven);
    }

}

function setTimer(order) {
    setTimeout(function () {
        takePizzaOutOfOven(order)
        removePizzaFromOven(packChef);
        
    }, 5000);
}

function takePizzaOutOfOven(order) {
    console.log("Order being removed: ", order)

    for (let i = 0; i < order.length; i++) {
        let pizzasRemoved = order.splice();
        pizzasCooked.push(pizzasRemoved);
    }

    oven.isEmpty = true;
}






