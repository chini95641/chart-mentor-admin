import { Helmet } from 'react-helmet-async';

import RoleView from 'src/sections/role/view';

// ----------------------------------------------------------------------

export default function PageRole() {
  return (
    <>
      <Helmet>
        <title> Role Management</title>
      </Helmet>

      <RoleView />
    </>
  );
}
