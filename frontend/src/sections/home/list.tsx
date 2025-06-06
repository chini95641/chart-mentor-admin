import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function HomeListView() {
  const settings = useSettingsContext();

  return <Container maxWidth={settings.themeStretch ? false : 'xl'}>Home List</Container>;
}
