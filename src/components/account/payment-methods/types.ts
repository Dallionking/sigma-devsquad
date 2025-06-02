
export interface PaymentMethod {
  id: string;
  stripe_payment_method_id: string;
  type: string;
  brand?: string;
  last_four?: string;
  exp_month?: number;
  exp_year?: number;
  is_default: boolean;
}

export interface PaymentMethodCardProps {
  method: PaymentMethod;
  onSetDefault: (methodId: string) => void;
  onRemove: (methodId: string) => void;
}

export interface AddPaymentMethodProps {
  onAdd: () => void;
}
