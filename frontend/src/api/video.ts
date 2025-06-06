import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function createVideo(videoData: {
  youtubeUrl?: string;
  filePath?: string;
}) {
  const URL = endpoints.video.create;
  await axiosInstance.post(URL, videoData);
}

export async function getVideos() {
  const URL = endpoints.video.list;
  const res = await axiosInstance.get(URL);
  return res.data;
}

export async function updateVideo(
  id: string,
  videoData: {
    youtubeUrl?: string;
    filePath?: string;
  }
) {
  const URL = endpoints.video.update(id);
  await axiosInstance.put(URL, videoData);
}

export async function deleteVideo(id: string) {
  const URL = endpoints.video.delete(id);
  await axiosInstance.delete(URL);
} 