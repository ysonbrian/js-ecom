import { register } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await register({
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
    if (getUserInfo().name) {
      document.location.hash = '/';
    }
    return `
      <div class="form-container">
        <form id="register-form">
          <ul class="form-items">
            <li>
              <h1>회원가입</h1>
            </li>
            <li>
              <label for"name">이름</label>
              <input type="name" name="name" id="name"/>
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
              <label for"repassword">비밀번호 재입력</label>
              <input type="password" name="repassword" id="repassword"/>
            </li>
            <li>
              <button type="submit" class="primary">가입하기</button>
            </li>
            <li>
              <div>
                이미 회원가입을 하셨나요?
                <a href="/#/register"><strong>로그인</strong></a>
              </div>
            </li>
          </ul>
        </form>
      </div>
    `;
  },
};

export default RegisterScreen;
