// Определим перечисление для статусов заказа
enum OrderStatus {
    Pending = "Ожидание",
    Confirmed = "Подтвержден",
    Shipped = "Отправлен",
    Delivered = "Доставлен",
    Cancelled = "Отменен",
}

// Интерфейс товара
interface IProduct {
    id: number;
    name: string;
    price: number;
}

// Класс товара
class Product implements IProduct {
    constructor(
        public id: number,
        public name: string,
        public price: number
    ) {}
}

// Класс заказа
class Order {
    public products: Product[];
    public status: OrderStatus;

    constructor(public id: number, products: Product[], public total: number) {
        this.products = products;
        this.status = OrderStatus.Pending;
    }

    // Изменение статуса заказа
    changeStatus(newStatus: OrderStatus): void {
        this.status = newStatus;
    }

    // Вывод информации о заказе
    getOrderInfo(): string {
        return `ID заказа: ${this.id}, Статус: ${this.status}, Итоговая сумма: ${this.total}`;
    }
}

// Класс корзины
class Cart {
    private products: Product[] = [];

    // Добавление товара в корзину
    addProduct(product: Product): void {
        this.products.push(product);
    }

    // Удаление товара из корзины
    removeProduct(productId: number): void {
        this.products = this.products.filter(p => p.id !== productId);
    }

    // Получение текущего списка товаров в корзине
    getCartItems(): Product[] {
        return this.products;
    }

    // Подсчет общей стоимости товаров в корзине
    calculateTotal(): number {
        return this.products.reduce((sum, product) => sum + product.price, 0);
    }

    // Очистка корзины
    clearCart(): void {
        this.products = [];
    }
}

// Класс управления товарами
class ProductManager {
    private products: Product[] = [];

    // Добавление товара
    addProduct(product: Product): void {
        this.products.push(product);
    }

    // Получение информации о всех товарах
    getAllProducts(): Product[] {
        return this.products;
    }

    // Поиск товара по ID
    getProductById(productId: number): Product | undefined {
        return this.products.find(p => p.id === productId);
    }
}

// Класс управления заказами
class OrderManager {
    private orders: Order[] = [];
    private orderCounter: number = 1;

    // Добавление нового заказа
    createOrder(products: Product[], total: number): Order {
        const newOrder = new Order(this.orderCounter++, products, total);
        this.orders.push(newOrder);
        return newOrder;
    }

    // Получение всех заказов
    getAllOrders(): Order[] {
        return this.orders;
    }

    // Получение заказа по ID
    getOrderById(orderId: number): Order | undefined {
        return this.orders.find(order => order.id === orderId);
    }
}

// Демонстрация работы системы

// Создание экземпляров менеджеров и корзины
const productManager = new ProductManager();
const cart = new Cart();
const orderManager = new OrderManager();

// Добавляем товары
const product1 = new Product(1, "Ноутбук", 1500);
const product2 = new Product(2, "Мышь", 25);
const product3 = new Product(3, "Клавиатура", 75);

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

// Просмотр товаров в магазине
console.log("Доступные товары:", productManager.getAllProducts());

// Добавляем товары в корзину
cart.addProduct(product1);
cart.addProduct(product2);

// Проверяем содержимое корзины и общую стоимость
console.log("Товары в корзине:", cart.getCartItems());
console.log("Общая стоимость корзины:", cart.calculateTotal());

// Создаем заказ на основе содержимого корзины
const order = orderManager.createOrder(cart.getCartItems(), cart.calculateTotal());
console.log("Новый заказ:", order.getOrderInfo());

// Изменяем статус заказа
order.changeStatus(OrderStatus.Confirmed);
console.log("Обновленный заказ:", order.getOrderInfo());

// Просмотр всех заказов
console.log("Все заказы:", orderManager.getAllOrders());
