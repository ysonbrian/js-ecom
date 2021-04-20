import { getCartItems, getPayment, getShipping } from '../localStorage';
import CheckoutSteps from '../components/CheckoutSteps';

const convertCartToOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) {
    document.location.hash = '/cart';
  }
  const shipping = getShipping();
  if (!shipping.address) {
    document.location.hash = '/shipping';
  }
  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = '/payment';
  }
  const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
const PlaceOrderScreen = {
  after_render: () => {},
  render: () => {
    const {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = convertCartToOrder();
    return `
      <div>
        ${CheckoutSteps.render({
          step1: true,
          step2: true,
          step3: true,
          step4: true,
        })}
        <div class="order">
          <div class="order-info">
            <div>
              <h2>Shipping</h2>
              <div>
                ${shipping.address} ${shipping.city} ${shipping.postalCode}
                ${shipping.country}
              </div>
            </div>
          <div>
            <h2>결제정보</h2>
            <div>
              결제 방식 : ${payment.paymentMethod}
            </div>
          </div>
          <div>
            <ul class="cart-list-container">
              <li>
                <h2>장바구니</h2>
                <div>가격</div>
              </li>
              ${orderItems.map(
                (item) => `
                <li>
                  <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}"/>
                  </div>
                  <div class="cart-name">
                    <div>
                      <a href="/#/product/${item.product}">${item.name}</a>
                    </div>
                    <div>개수: ${item.qty}</div>
                  </div>
                  <div class="cart-price"> ₩${item.price}</div>
                </li>
              `
              )}
            </ul>
          </div>
        </div>
        <div class="order-action">
          <ul>
                <li>
                  <h2>주문 상세정보</h2>
                </li>
                <li>
                  <div>상품</div>
                  <div>₩${itemsPrice}</div>
                </li>
                <li>
                  <div>배송비</div>
                  <div>₩${shippingPrice}</div>
                </li>
                <li>
                  <div>세금</div>
                  <div>₩${taxPrice}</div>
                </li>
                <li class="total">
                  <div>총 주문 가격</div>
                  <div>₩${totalPrice}</div>
                </li>
                <button class="primary fw"> 주문하기 </button>
          </ul>
        </div>
      </div>
    `;
  },
};

export default PlaceOrderScreen;
