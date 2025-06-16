import { FormattedMessage } from 'react-intl';
import { IconBrandChrome } from '@tabler/icons-react';

const icons = {
  IconBrandChrome
};
const otherPage = {
  id: 'other-page',
  title: <FormattedMessage id="other-page" />,
  icon: icons.IconBrandChrome,
  type: 'group',
  url: '/other-page'
};

export default otherPage;
