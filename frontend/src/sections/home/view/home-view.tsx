import Box from '@mui/material/Box';

import HomeSplash from '../home-splash';

export default function HomeView() {
  return (
    <>
      <HomeSplash />
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      />
    </>
  );
}
