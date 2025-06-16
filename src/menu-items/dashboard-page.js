// This is example of menu item without group for horizontal layout. There will be no children.

import { FormattedMessage } from 'react-intl';
import { IconBrandChrome } from '@tabler/icons-react';

const icons = {
  IconBrandChrome
};
const dashboardPage = {
  id: 'dashboard-page',
  title: <FormattedMessage id="dashboard-page" />,
  icon: icons.IconBrandChrome,
  type: 'group',
  url: '/dashboard'
};

export default dashboardPage;
