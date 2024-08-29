import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { verifyPayment } from 'src/actions/paymentAction';
import AuthGuard from 'src/auth/AuthGuard';

const Paystack = () => {
  const {
    query: { reference },
  } = useRouter();

  const verifyTxn = useCallback(async () => {
    // console.log(reference);
    if (!reference) {
      console.log('no ref');
      return;
    }
    try {
      const {
        data: { status, id: txnId },
      } = await verifyPayment(`/users/transaction/${reference}/verify`);
      if (status === 'success') {
        window.localStorage.setItem(`${reference}-payment`, JSON.stringify({ txnId }));
        window.close();
      }
    } catch (error) {
      console.log(error);
    }
  }, [reference]);

  useEffect(() => {
    verifyTxn();
  }, [verifyTxn]);

  return <AuthGuard>redirecting you....</AuthGuard>;
};

export default Paystack;
