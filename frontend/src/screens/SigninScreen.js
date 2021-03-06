import { signin } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, redirectUser, showLoading, showMessage } from '../utils';

const SigninScreen = {
  after_render: () => {
    document
      .getElementById('signin-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await signin({
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          redirectUser();
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }
    return `
      <div class="form-container">
        <form id="signin-form">
          <ul class="form-items">
            <li>
              <h1>로그인</h1>
            </li>
            <li>
              <label for"email">이메일</label>
              <input type="email" name="email" id="email"/>
            </li>
            <li>
              <label for"password">비밀번호</label>
              <input type="password" name="password" id="password"/>
            </li>
            <li>
              <button type="submit" class="primary">로그인</button>
            </li>
            <li>
              <div>
                처음 이신가요?
                <a href="/#/register"><strong>회원가입</strong></a>
              </div>
            </li>
          </ul>
        </form>
      </div>
    `;
  },
};

export default SigninScreen;
