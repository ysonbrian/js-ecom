import { getUserInfo } from '../localStorage';

const Header = {
  render: () => {
    const { name } = getUserInfo();
    return `
      <div class="brand">
          <a href="/#/">YDMarket</a>
      </div>
      <div>
      ${
        name
          ? `<a href="/#/profile">${name}</a>`
          : `<a href="/#/signin">로그인</a>`
      }
        <a href="/#/cart">카트</a>
      </div>
    `;
  },
  after_render: () => {},
};

export default Header;
