import User from "./User";

export default interface PostItem {
  userId: Number;
  postId: Number;
  userName: String;
  fullName: String;
  imgUrl: string;
  postBody: string;
  createdAt: string;
  postType: Number;
}
