import { Helmet } from 'react-helmet-async';

import VideoListView from 'src/sections/videos/view/list-view';

// ----------------------------------------------------------------------

export default function VideoListPage() {
  return (
    <>
      <Helmet>
        <title> Videos: List</title>
      </Helmet>

      <VideoListView />
    </>
  );
} 