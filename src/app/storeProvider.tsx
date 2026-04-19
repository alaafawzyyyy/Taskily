'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';

type childrenProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: childrenProps) {
  return <Provider store={store}>{children}</Provider>;
}
