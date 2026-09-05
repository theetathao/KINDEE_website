import type { Metadata } from 'next';
import CondimentPage from './CondimentPage';

export const metadata: Metadata = {
  title: 'Condiments | KIN DEE',
  description: 'Authentic Kin Dee sauces, pastes and seasonings crafted from quality ingredients.',
};

export default function Page() {
  return <CondimentPage />;
}
