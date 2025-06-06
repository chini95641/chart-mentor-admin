import { Helmet } from 'react-helmet-async';

import VideosView from 'src/sections/videos/view/create-view';

// ----------------------------------------------------------------------

export default function VideoCreatePage() {
  return (
    <>
      <Helmet>
        <title> Videos: Create</title>
      </Helmet>

      <VideosView />
    </>
  );
}
