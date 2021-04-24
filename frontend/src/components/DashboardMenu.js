const DashboardMenu = {
  render: (props) => `
      <div class="dashboard-menu">
        <ul>
          <li class="${props.selected === 'dashboard' ? 'selected' : ''}">
            <a href="/#/dashboard">관리</a>
          </li>
          <li class="${props.selected === 'orders' ? 'selected' : ''}">
            <a href="/#/orderlist">주문 목록</a>
          </li>
          <li class="${props.selected === 'products' ? 'selected' : ''}">
            <a href="/#/productlist">물품 목록</a>
          </li>
        </ul>
      </div>
    `,
};

export default DashboardMenu;
