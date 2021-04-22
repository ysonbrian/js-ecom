/* eslint-disable no-use-before-define */
import {
  showLoading,
  hideLoading,
  showMessage,
  parseRequestUrl,
  rerender,
} from '../utils';
import { getOrder, getPaypalClientId, payOrder } from '../api';

const addPaypalSdk = async (totalPrice) => {
  const clientId = await getPaypalClientId();
  showLoading();
  if (!window.paypal) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.paypalobjects.com/api/checkout.js';
    script.async = true;
    script.onload = () => handlePayment(clientId, totalPrice);
    document.body.appendChild(script);
  } else {
    handlePayment(clientId, totalPrice);
  }
};

const handlePayment = (clientId, totalPrice) => {
  window.paypal.Button.render(
    {
      env: 'sandbox',
      client: {
        sandbox: clientId,
        production: '',
      },
      locale: 'en_US',
      style: {
        size: 'responsive',
        color: 'gold',
        shape: 'pill',
      },

      commit: true,
      payment(data, actions) {
        return actions.payment.create({
          transactions: [
            {
              amount: {
                total: totalPrice,
                currency: 'USD',
              },
            },
          ],
        });
      },
      onAuthorize(data, actions) {
        return actions.payment.execute().then(async () => {
          showLoading();
          await payOrder(parseRequestUrl().id, {
            orderID: data.orderID,
            payerID: data.payerID,
            paymentID: data.paymentID,
          });
          hideLoading();
          showMessage('Payment was successfull.', () => {
            // eslint-disable-next-line no-use-before-define
            rerender(OrderScreen);
          });
        });
      },
    },
    '#paypal-button'
  ).then(() => {
    hideLoading();
  });
};

const OrderScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    const {
      _id,
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isDeleivered,
      deliveredAt,
      isPaid,
      paidAt,
    } = await getOrder(request.id);
    if (!isPaid) {
      addPaypalSdk(totalPrice);
    }
    return `
      <div>
        <h1>주문번호 ${_id}</h1>
        <div class="order">
          <div class="order-info">
            <div>
              <h2>배송 주소</h2>
              <div>
                ${shipping.address} ${shipping.city} ${shipping.postalCode}
                ${shipping.country}
              </div>
              ${
                isDeleivered
                  ? `<div class="success"> ${deliveredAt} 으로 배송 되었습니다 </div>`
                  : `<div class="error">아직 배송 되지 않았습니다</div>`
              }
            </div>
          <div>
            <h2>결제정보</h2>
            <div>
              결제 방식 : ${payment.paymentMethod}
            </div>
            ${
              isPaid
                ? `<div class="success"> ${paidAt} 으로 결제 됐습니다 </div>`
                : `<div class="error">미결제 상품 입니다</div> `
            }
          </div>
          <div>
            <ul class="cart-list-container">
              <li>
                <h2>장바구니</h2>
                <div>가격</div>
              </li>
              ${orderItems
                .map(
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
                )
                .join('\n')}
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
                <li><div class="fw" id="paypal-button"></div></li>
          </ul>
        </div>
      </div>
    `;
  },
};

export default OrderScreen;
