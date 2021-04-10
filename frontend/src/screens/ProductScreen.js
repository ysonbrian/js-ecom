import { getProduct } from '../api';
import { parseRequestUrl } from '../utils';
import Rating from '../components/Rating';

const ProductScreen = {
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
    <div class="content>
      <div class="back-to-result">
        <a href="/#/">Back to result</a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}"/>
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
              ${Rating.render({
                value: product.rating,
                text: `${product.numReviews} 리뷰`,
              })}
            </li>
            <li>
              Price: <strong>${product.price}원</strong>
            </li>
            <li>
              상품정보:
              <div>
                ${product.description}
              </div>
            </li>
          </ul>
        </div>
        <div class="details-action">
            <ul>
              <li>
                주문금액: ${product.price}
              </li>
              <li>
                재고: ${
                  product.countInStock > 0
                    ? `<span class="success">재고 있음</span>`
                    : `<span class="error" >재고 없음</span>`
                }
              </li>
              <li>
                <button id="add-button" class="fw primary">바로구매</button>
              </li>
            </ul>
        </div>
      </div>
    </div>
    `;
  },
};

export default ProductScreen;
