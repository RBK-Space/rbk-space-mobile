import Skills from "./Skills";
import Portofolio from "./Portofolio";
export default interface UserProfile {
  userId: Number;
  userName: string;
  image: string;
  email: string;
  cohort: string;
  bio: string;
  employment: boolean;
  skills: Skills[];
  Portofolio: Portofolio[];
  job: string;
  facebooklink: string;
  githublink: string;
  twitterlink: string;
  linkedinlink: string;
}
