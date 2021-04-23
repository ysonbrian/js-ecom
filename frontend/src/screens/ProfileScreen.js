import { getMyOrders, update } from '../api';
import { clearUser, getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';

const ProfileScreen = {
  after_render: () => {
    document.getElementById('signout-button').addEventListener('click', () => {
      clearUser();
      document.location.hash = '/';
    });
    document
      .getElementById('profile-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await update({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = '/';
        }
      });
  },
  render: async () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    const orders = await getMyOrders();
    return `
    <div class="content profile">
      <div class="profile-info">
      <div class="form-container">
      <form id="profile-form">
        <ul class="form-items">
          <li>
            <h1>사용자 정보</h1>
          </li>
          <li>
            <label for="name">이름</label>
            <input type="name" name="name" id="name" value="${name}" />
          </li>
          <li>
            <label for="email">이메일</label>
            <input type="email" name="email" id="email" value="${email}" />
          </li>
          <li>
            <label for="password">비밀번호</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <button type="submit" class="primary">수정</button>
          </li>
          <li>
          <button type="button" id="signout-button" >로그아웃</button>
        </li>
        </ul>
      </form>
    </div>
      </div>
      <div class="profile-orders">
      <h2>Order History</h2>
        <table>
          <thead>
            <tr>
              <th>주문번호</th>
              <th>날짜</th>
              <th>총금액</th>
              <th>결제여부</th>
              <th>배송여부</th>
              <th>세부사항</th>
            </tr>
          </thead>
          <tbody>
            ${
              orders.length === 0
                ? `<tr><td colspan="6">주문 정보를 확인 할 수 없습니다.</tr>`
                : orders
                    .map(
                      (order) => `
          <tr>
            <td>${order._id}</td>
            <td>${order.createdAt}</td>
            <td>${order.totalPrice}</td>
            <td>${order.paidAt || 'No'}</td>
            <td>${order.deliveryAt || 'No'}</td>
            <td><a href="/#/order/${order._id}">세부사항</a> </td>
          </tr>
          `
                    )
                    .join('\n')
            }
          </tbody>
        </table>
      </div>
    </div>

    `;
  },
};
export default ProfileScreen;
