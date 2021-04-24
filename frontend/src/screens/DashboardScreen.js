import DashboardMenu from '../components/DashboardMenu';

const DashboradScreen = {
  after_render: () => {},
  render: () => `
    <div class="dashboard">
      ${DashboardMenu.render({ selected: 'dashboard' })}
      <div class="dashboard-content">
        <h1>관리</h1>
        <div>
          모든 정보와 차트를 볼 수 있습니다
        </div>
      </div>
    </div>
  `,
};

export default DashboradScreen;
