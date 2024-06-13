// Sample data for pizzas
const pizzas = [
    { name: 'Pizza 1', size: 30, weight: 460, image: 'assets/images/pizza1.jpg' },
    { name: 'Pizza 2', size: 25, weight: 500, image: 'assets/images/pizza2.jpg' },
    { name: 'Pizza 3', size: 35, weight: 550, image: 'assets/images/pizza3.jpg' },
    { name: 'Pizza 4', size: 40, weight: 600, image: 'assets/images/pizza4.jpg' },
    { name: 'Pizza 5', size: 28, weight: 480, image: 'assets/images/pizza5.jpg' },
    // Add more pizzas as needed
];

// Function to create pizza elements
function createPizzaElement(pizza) {
    const pizzaItem = document.createElement('div');
    pizzaItem.classList.add('pizza-item');

    const pizzaImage = document.createElement('img');
    pizzaImage.src = pizza.image;
    pizzaImage.alt = pizza.name;
    
    const pizzaDetails = document.createElement('div');
    pizzaDetails.classList.add('pizza-details');

    const pizzaName = document.createElement('h3');
    pizzaName.classList.add('pizza-name');
    pizzaName.textContent = pizza.name;

    const pizzaInfo = document.createElement('div');
    pizzaInfo.classList.add('pizza-info');

    const sizeIcon = document.createElement('img');
    sizeIcon.src = 'assets/images/size-icon.svg';
    sizeIcon.alt = 'size';
    
    const sizeSpan = document.createElement('span');
    sizeSpan.classList.add('cart-item-size');
    sizeSpan.textContent = pizza.size;
    
    const weightIcon = document.createElement('img');
    weightIcon.src = 'assets/images/weight.svg';
    weightIcon.alt = 'weight';
    
    const weightSpan = document.createElement('span');
    weightSpan.classList.add('cart-item-weight');
    weightSpan.textContent = pizza.weight;

    pizzaInfo.appendChild(sizeIcon);
    pizzaInfo.appendChild(sizeSpan);
    pizzaInfo.appendChild(weightIcon);
    pizzaInfo.appendChild(weightSpan);

    pizzaDetails.appendChild(pizzaName);
    pizzaDetails.appendChild(pizzaInfo);

    pizzaItem.appendChild(pizzaImage);
    pizzaItem.appendChild(pizzaDetails);

    return pizzaItem;
}

// Function to render pizzas
function renderPizzas() {
    const gridContainer = document.querySelector('.grid-container');
    pizzas.forEach(pizza => {
        const pizzaElement = createPizzaElement(pizza);
        gridContainer.appendChild(pizzaElement);
    });
}

// Call render function on page load
document.addEventListener('DOMContentLoaded', renderPizzas);
