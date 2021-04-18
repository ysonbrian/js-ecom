import { update } from '../api';
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
  render: () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    if (getUserInfo().name) {
      document.location.hash = '/profile';
    }
    return `
      <div class="form-container">
        <form id="profile-form">
          <ul class="form-items">
            <li>
              <h1>고객정보</h1>
            </li>
            <li>
              <label for"name">이름</label>
              <input type="name" name="name" id="name" value="${name}"/>
            </li>
            <li>
              <label for"email">이메일</label>
              <input type="email" name="email" id="email" value="${email}"/>
            </li>
            <li>
              <label for"password">비밀번호</label>
              <input type="password" name="password" id="password"/>
            </li>
            <li>
              <button type="submit" class="primary">수정하기</button>
            </li>
            <li>
              <button type="button" id="signout-button">로그아웃</button>
            </li>
          </ul>
        </form>
      </div>
    `;
  },
};

export default ProfileScreen;
