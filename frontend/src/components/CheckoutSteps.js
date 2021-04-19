const CheckoutSteps = {
  render: (props) => `<div class="checkout-steps">
      <div class="${props.step1 ? 'active' : ''}">로그인</div>
      <div class="${props.step2 ? 'active' : ''}">배송</div>
      <div class="${props.step3 ? 'active' : ''}">결제</div>
      <div class="${props.step4 ? 'active' : ''}">주문하기</div>
    </div>`,
};

export default CheckoutSteps;
