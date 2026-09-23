export interface CreateOrderParams {
  amount: number;
  currency?: string;
  receiptId: string;
  notes?: Record<string, string>;
}

export interface PaymentVerificationParams {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export async function createPaymentOrder(params: CreateOrderParams) {
  const isMockMode = process.env.NEXT_PUBLIC_ENABLE_MOCK_PAYMENTS === 'true' || !process.env.RAZORPAY_KEY_ID;

  if (isMockMode) {
    return {
      id: `order_mock_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      amount: params.amount * 100, // paise
      currency: params.currency || 'INR',
      receipt: params.receiptId,
      status: 'created',
      isMock: true,
    };
  }

  // Real Razorpay API integration fallback when keys are configured
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
      },
      body: JSON.stringify({
        amount: params.amount * 100,
        currency: params.currency || 'INR',
        receipt: params.receiptId,
        notes: params.notes,
      }),
    });

    const data = await response.json();
    return { ...data, isMock: false };
  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);
    // Fallback to mock order if Razorpay connection fails
    return {
      id: `order_fallback_${Date.now()}`,
      amount: params.amount * 100,
      currency: 'INR',
      receipt: params.receiptId,
      status: 'created',
      isMock: true,
    };
  }
}
