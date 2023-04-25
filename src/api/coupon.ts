export interface Coupon {
  type: string;
  coupon: string;
  description: string;
}

export const getCoupons = (): Coupon[] => {
  return [
    { type: "drinks", coupon: "B2G1", description: "Buy 2 Get 1 FREE" },
    { type: "bakery", coupon: "B1G1", description: "Buy 1 Get 1 FREE" },
  ];
};

export const checkCouponValid = (type: string, quantity: number) => {
  const coupon = getCoupons().find((c) => c.type === type);

  if (coupon === undefined) {
    return false;
  }
  switch (coupon.coupon) {
    case "B2G1":
      if (quantity > 2) return Math.floor(quantity / 3);
      break;
    case "B1G1":
      if (quantity > 1) return Math.floor(quantity / 2);
      break;

    default:
      return false;
  }

  return false;
};

export const testCoupon = () => {
  return { a: 1, b: 2 };
};
