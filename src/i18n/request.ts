import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = 'en'; // You can make this dynamic later
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});