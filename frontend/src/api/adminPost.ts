import axiosInstance, { endpoints } from 'src/utils/axios';

// Types (should be in a types file)
interface AdminPostData {
  content: string;
  author: string; // Assuming author ID is passed
}

interface AdminCommentData {
  user: string; // Assuming user ID is passed
  text: string;
}

// ----------------------------------------------------------------------

export async function createAdminPost(postData: AdminPostData) {
  const URL = endpoints.adminPost.create;
  const res = await axiosInstance.post(URL, postData);
  return res.data;
}

export async function getAdminPosts() {
  const URL = endpoints.adminPost.list;
  const res = await axiosInstance.get(URL);
  return res.data;
}

export async function likeAdminPost(id: string, userId: string) {
  const URL = endpoints.adminPost.like(id);
  const res = await axiosInstance.post(URL, { userId });
  return res.data;
}

export async function addAdminComment(id: string, commentData: AdminCommentData) {
  const URL = endpoints.adminPost.addComment(id);
  const res = await axiosInstance.post(URL, commentData);
  return res.data;
}

export async function deleteAdminComment(postId: string, commentId: string) {
  const URL = endpoints.adminPost.deleteComment(postId, commentId);
  const res = await axiosInstance.delete(URL);
  return res.data;
} 