const SigninScreen = {
  after_render: () => {},
  render: () => `
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
              <button type="submit" class="primary">가입하기</button>
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
    `,
};

export default SigninScreen;
