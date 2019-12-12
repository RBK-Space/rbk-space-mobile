import Skills from "./Skills";
import Portofolio from "./Portofolio";
export default interface User {
  userId: Number;
  username: string;
  fullName: string;
  image: string;
  email: string;
  cohort: string;
  fb: string;
  gh: string;
  li: string;
  tw: string;
  bio: string;
  empStat: string;
  skills: Skills[];
  Portofolio: Portofolio[];
  job: string;
}
