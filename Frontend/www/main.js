// масив з піцами
const pizza_list = [
    {
        id: 1,
        icon: 'assets/images/pizza_7.jpg',
        title: "Імпреза",
        type: 'М’ясна піца',
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['курка'],
            cheese: ['сир моцарела', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size: {
            weight: 370,
            size: 30,
            price: 111
        },
        big_size: {
            weight: 660,
            size: 40,
            price: 269
        },
        is_new: true,
        is_popular: true

    },
    {
        id: 2,
        icon: 'assets/images/pizza_2.jpg',
        title: "BBQ",
        type: 'М’ясна піца',
        content: {
            meat: ['мисливські ковбаски', 'ковбаски пепероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['печериці'],
            additional: ['петрушка', 'оливки']
        },
        small_size: {
            weight: 460,
            size: 30,
            price: 139
        },
        big_size: {
            weight: 840,
            size: 40,
            price: 199
        },
        is_popular: true
    },
    {
        id: 3,
        icon: 'assets/images/pizza_1.jpg',
        title: "Міксовий поло",
        type: 'М’ясна піца',
        content: {
            meat: ['шинка', 'курка копчена'],
            cheese: ['сир моцарела'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size: {
            weight: 430,
            size: 30,
            price: 115
        },
        big_size: {
            weight: 780,
            size: 40,
            price: 179
        }
    },
    {
        id: 4,
        icon: 'assets/images/pizza_5.jpg',
        title: "Модна піца 2",
        type: 'М’ясна піца',
        content: {
            meat: ['шинка', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['печериці'],
            additional: ['перець болгарський', 'соус томатний']
        },
        small_size: {
            weight: 450,
            size: 30,
            price: 111
        },
        big_size: {
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id: 17,
        icon: 'assets/images/pizza_3.jpg',
        title: "Маргарита",
        type: 'Вега піца',
        content: {
            cheese: ['сир моцарела', 'сир домашній'],
            tomato: ['помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        small_size: {
            weight: 370,
            size: 30,
            price: 101
        },
        big_size: {
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id: 43,
        icon: 'assets/images/pizza_6.jpg',
        title: "Модна піца",
        type: 'М’ясна піца',
        content: {
            meat: ['ковбаски'],
            cheese: ['сир моцарела'],
            mushroom: ['печериці'],
            pineapple: ['ананаси'],
            additional: ['цибуля', 'солені огірки']
        },
        small_size: {
            weight: 470,
            size: 30,
            price: 115
        },
        big_size: {
            weight: 780,
            size: 40,
            price: 180
        }
    },
    {
        id: 90,
        icon: 'assets/images/pizza_8.jpg',
        title: "Дольче Маре",
        type: 'Морська піца',
        content: {
            seafood: ['креветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
            cheese: ['сир моцарела'],
            additional: ['оливкова олія']
        },
        big_size: {
            weight: 845,
            size: 40,
            price: 399
        }
    },
    {
        id: 6,
        icon: 'assets/images/pizza_10.jpg',
        title: "Россо Густо",
        type: 'Морська піца',
        content: {
            seafood: ['ікра червона', 'лосось копчений'],
            cheese: ['сир моцарела'],
            additional: ['оливкова олія', 'вершки', 'secret third thing']
        },
        small_size: {
            weight: 400,
            size: 30,
            price: 100
        },
        big_size: {
            weight: 700,
            size: 40,
            price: 222
        }
    }
];


window.addEventListener('load', function () {
    for (let card of pizza_list) //цикл по масиву піц щоб додати картки до ДОМ
        addPizzaCard(card);

    //отримання даних з локал сторедж
    const storedData = localStorage.getItem('pizzasInCart');
    let pizzasInCart = [];
    if (storedData) pizzasInCart = JSON.parse(storedData);
    else localStorage.setItem('pizzasInCart', JSON.stringify([]));
    
    // Додати піци з cart data до cart section
    pizzasInCart.forEach(pizza => addPizzaToCart(pizza.card, pizza.size, pizza.amount));

    // Додати івент лісенер до кнопок фільтрів і очистки
    let filterSpans = document.querySelectorAll('.pizza-filter');
    for (let span of filterSpans)
        span.addEventListener('click', filter);

    document.querySelector('.clear-cart-button').addEventListener('click', clearOrder);

    updatePizzaCartAmount();
    updateCartPrice();
});

// Функція для очищення замовлення
function clearOrder() {
    document.querySelector('.cart-items-container').innerHTML = "";
    localStorage.setItem('pizzasInCart', JSON.stringify([]));
    updatePizzaCartAmount();
    updateCartPrice();
}

// Функція що відповідає за фільтр
function filter(e) {
    const span = e.target;
    toggleChosenFilter(span);
    const filter = span.getAttribute("data-filter");
    document.querySelector('#pizza_list').innerHTML = '';
    let filteredPizza;
    if (filter === 'all') filteredPizza = pizza_list;
    if (filter === 'meat') filteredPizza = pizza_list.filter(pizza => pizza.content.meat);
    if (filter === 'pineapple') filteredPizza = pizza_list.filter(pizza => pizza.content.pineapple);
    if (filter === 'mushroom') filteredPizza = pizza_list.filter(pizza => pizza.content.mushroom);
    if (filter === 'seafood') filteredPizza = pizza_list.filter(pizza => pizza.content.seafood);
    if (filter === 'vega') filteredPizza = pizza_list.filter(pizza => !pizza.content.meat && !pizza.content.seafood);
    // додати відсортовані піци до ДОМ
    filteredPizza.forEach(pizza => addPizzaCard(pizza));
    // оновити число піц після сортування
    updateNumOfAllPizza(filteredPizza.length);
}

// Функція перемикання вибраного класу фільтру
function toggleChosenFilter(span) {
    const lastFilter = document.querySelector(".chosen-filter");
    lastFilter.setAttribute('class', 'pizza-filter');
    span.setAttribute('class', 'pizza-filter chosen-filter')
}

// Функція для оновлення кількості піц, показаних після фільтрації
function updateNumOfAllPizza(amount) {
    document.querySelector('.amount-of-pizza').textContent = amount.toString();
}

// Функція додавання картки піци в DOM
function addPizzaCard(card) {
    const cardContainer = document.querySelector('#pizza_list');
    const pizzaCard = document.createElement('div');
    pizzaCard.setAttribute('class', 'col-sm-12 col-md-6 col-lg-4 pizza-container');
    const html = `<div class="thumbnail pizza-card">
        <div class="caption">
            <div class="pizza-picture"><img src="${card.icon}" class="full-pizza"></div>
            <h3 class="pizza-name">${card.title}</h3>
            <p class="pizza-type">${card.type}</p>
            <p class="pizza-ingr">${getDecription(card)}</p>
        </div>
        <section class="pizza-size-info-container">
                   </section>
    </div>`;
    pizzaCard.innerHTML = html;
    setSizes(card, pizzaCard); // встановлює розміри
    setBadge(card, pizzaCard); // встановлює бейдж нова/популярна
    cardContainer.appendChild(pizzaCard); // додати картку піци до контейнера
}

// додавання розмірів піц 
function setSizes(card, pizzaCard) {
    let html = '';
    if (card.small_size) {
        const cont = document.createElement("div");
        cont.setAttribute("class", 'pizza-size-info');
        cont.innerHTML = `<div class="cart-item-desc-container">
            <article class="cart-item-desc">
                <img src="assets/images/size-icon.svg" alt="size" />
                <span class="cart-item-size">${card.small_size.size}</span>
            </article>
            <article class="cart-item-desc">
                <img src="assets/images/weight.svg" />
                <span class="cart-item-weight">${card.small_size.weight}</span>
            </article>
        </div>
        <span class="pizza-cost-for-size">${card.small_size.price}</span>
        <span class="money-type">грн.</span>
        <button class="btn btn-warning login-button btn-buy">Купити</button>`;
        cont.getElementsByClassName('btn-buy')[0].addEventListener('click', function () { buyPizza(card, true) });
        pizzaCard.getElementsByClassName('pizza-size-info-container')[0].appendChild(cont);
    }
    if (card.big_size) {
        const cont = document.createElement("div");
        cont.setAttribute("class", 'pizza-size-info');
        cont.innerHTML = `<div class="cart-item-desc-container">
            <article class="cart-item-desc">
                <img src="assets/images/size-icon.svg" alt="size" />
                <span class="cart-item-size">${card.big_size.size}</span>
            </article>
            <article class="cart-item-desc">
                <img src="assets/images/weight.svg" />
                <span class="cart-item-weight">${card.big_size.weight}</span>
            </article>
        </div>
        <span class="pizza-cost-for-size">${card.big_size.price}</span>
        <span class="money-type">грн.</span>
        <button class="btn btn-warning login-button btn-buy">Купити</button>`;
        cont.getElementsByClassName('btn-buy')[0].addEventListener('click', function () { buyPizza(card, false) });
        pizzaCard.getElementsByClassName('pizza-size-info-container')[0].appendChild(cont);
    }
}

// Функція для додавання в кошик
function buyPizza(card, isSmall) {
    if (isInCart(card, isSmall))
        increasePizza(card, isSmall);
    else {
        let pizzasInCart = JSON.parse(localStorage.getItem('pizzasInCart'));
        pizzasInCart.push({
            card: card,
            size: isSmall,
            amount: 1
        });
        localStorage.setItem('pizzasInCart', JSON.stringify(pizzasInCart));
        addPizzaToCart(card, isSmall, 1);
    }
}

// Функція для перевірки чи піца вже є в кошику
function isInCart(card, isSmall) {
    const cartItem = document.getElementById(`${card.id}${isSmall}`);
    return !!cartItem;
}

// Функція для збільшення кількості піци в кошику
function increasePizza(card, isSmall) {
    const cartItem = document.getElementById(`${card.id}${isSmall}`);
    const newValue = parseInt(cartItem.getElementsByClassName('cart-item-amount-pizza')[0].textContent) + 1;
    cartItem.getElementsByClassName('cart-item-amount-pizza')[0].textContent = newValue.toString();
    cartItem.getElementsByClassName('cart-item-cost')[0].textContent = `${newValue * (isSmall ? card.small_size.price : card.big_size.price)}грн`;
    refreshPizzaStorage(card, isSmall, newValue);
    updatePizzaCartAmount();
    updateCartPrice();
}

// Функція для апдейту локал стореджу коли кількість піци змінена
function refreshPizzaStorage(card, isSmall, newValue) {
    let pizzasInCart = JSON.parse(localStorage.getItem('pizzasInCart'));
    const index = pizzasInCart.findIndex(pizza => pizza.card.title === card.title && pizza.size === isSmall);
    if (index !== -1) {
        pizzasInCart[index].amount = newValue;
        localStorage.setItem('pizzasInCart', JSON.stringify(pizzasInCart));
    }
}

// Функція апдейту кількості піц в кошику
function updatePizzaCartAmount() {
    document.querySelector('.cart-amount').textContent = document.getElementsByClassName('cart-item').length.toString();
}

// Функція для апдейту загальної ціни 
function updateCartPrice() {
    let price = 0;
    let pizzasInCart = JSON.parse(localStorage.getItem('pizzasInCart')) || [];
    for (let pizza of pizzasInCart) {
        price += pizza.amount * (pizza.size ? pizza.card.small_size.price : pizza.card.big_size.price);
    }
    document.querySelector(".order-cost").textContent = `${price}грн`;
}

// Функція щоб додати піцу до кошику
function addPizzaToCart(card, isSmall, amount) {
    const item = document.createElement("div");
    item.setAttribute("class", "cart-item");
    item.setAttribute('id', `${card.id}${isSmall}`);
    item.innerHTML = `<div class="cart-item-text-info">
        <span class="cart-item-name">${isSmall ? card.title + "(Мала)" : card.title + "(Велика)"}</span>
        <article class="cart-item-desc">
            <img src="assets/images/size-icon.svg" alt="size" />
            <span class="cart-item-size">${isSmall ? card.small_size.size : card.big_size.size}</span>
            <img src="assets/images/weight.svg" alt="weight" />
            <span class="cart-item-weight">${isSmall ? card.small_size.weight : card.big_size.weight}</span>
        </article>
        <article class="cart-item-amount">
            <span class="cart-item-cost">${isSmall ? card.small_size.price * amount : card.big_size.price * amount}грн</span>
            <button class="decrease-button">-</button>
            <span class="cart-item-amount-pizza">${amount}</span>
            <button class="increase-button">+</button>
            <button class="delete-cart-item">×</button>
        </article>
    </div>
    <div class="cart-item-img"><img src="${card.icon}" class="half-pizza"></div>`;
    item.getElementsByClassName('decrease-button')[0].addEventListener('click', function () { decreasePizza(card, isSmall) });
    item.getElementsByClassName('delete-cart-item')[0].addEventListener('click', function () { removePizza(card, isSmall) });
    item.getElementsByClassName('increase-button')[0].addEventListener('click', function () { increasePizza(card, isSmall) });
    document.querySelector(".cart-items-container").appendChild(item);
    updatePizzaCartAmount();
    updateCartPrice();
}

// Функція щоб зменшити кількість піци в кошику
function decreasePizza(card, isSmall) {
    const cartItem = document.getElementById(`${card.id}${isSmall}`);
    const newValue = parseInt(cartItem.getElementsByClassName('cart-item-amount-pizza')[0].textContent) - 1;
    if (newValue === 0) {
        removePizza(card, isSmall);
        return;
    }
    cartItem.getElementsByClassName('cart-item-amount-pizza')[0].textContent = newValue.toString();
    cartItem.getElementsByClassName('cart-item-cost')[0].textContent = `${newValue * (isSmall ? card.small_size.price : card.big_size.price)}грн`;
    refreshPizzaStorage(card, isSmall, newValue);
    updatePizzaCartAmount();
    updateCartPrice();
}

// Функція щоб видалити піцу з кошику
function removePizza(card, isSmall) {
    const cartItem = document.getElementById(`${card.id}${isSmall}`);
    cartItem.remove();
    let pizzasInCart = JSON.parse(localStorage.getItem('pizzasInCart')) || [];
    pizzasInCart = pizzasInCart.filter(pizza => pizza.card.title !== card.title || pizza.size !== isSmall);
    localStorage.setItem('pizzasInCart', JSON.stringify(pizzasInCart));
    updatePizzaCartAmount();
    updateCartPrice();
}

// Функція щоб поставити бейдж 
function setBadge(card, pizzaCard) {
    if (card.is_new || card.is_popular) {
        let badge = document.createElement('div');
        badge.setAttribute('class', `${card.is_new ? 'badge-new' : 'badge-popular'}`);
        badge.innerText = `${card.is_new ? 'Нова' : 'Популярна'}`;
        pizzaCard.getElementsByClassName('pizza-card')[0].appendChild(badge);
    }
}

// Функція для отримання опису
function getDecription(card) {
    let content = [];
    Object.values(card.content).forEach(array => content = content.concat(array));
    let contentString = content.join(', ');
    return contentString.charAt(0).toUpperCase() + contentString.slice(1);
}

// для прозорості хедера при гортанні
const stickyElm = document.querySelector('.heading');
const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
    { threshold: [1] }
);
observer.observe(stickyElm);

