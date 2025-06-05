import { Helmet } from 'react-helmet-async';

import VideosView from 'src/sections/videos/view';

// ----------------------------------------------------------------------

export default function PageVideos() {
  return (
    <>
      <Helmet>
        <title> Videos</title>
      </Helmet>

      <VideosView />
    </>
  );
}
