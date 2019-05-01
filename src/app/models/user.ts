
export class User {
    id?: number;
    name?: string;
    aboutUs?: string;
    token?: string;
    gender?: string;
    status?: string;
    email?: string;
    role?: string = "";
    imgUrl?: string;
    ageGroup?: string;
    password?: string;
    question?: string;
    location?: string;
    constructor(user?: User) {
      this.id = user && user.id ? user.id : null;
      this.name = user && user.name ? user.name : '';
      this.aboutUs = user && user.aboutUs ? user.aboutUs : '';
      this.token = user && user.token ? user.token : '';
      this.status = user && user.status ? user.status : '';
      this.email = user && user.email ? user.email : '';
      this.imgUrl = user && user.imgUrl ? user.imgUrl : '';
      this.ageGroup = user && user.ageGroup ? user.ageGroup : '';
      this.password = user && user.password ? user.password : '';
      this.question = user && user.question ? user.question : '';
      this.location = user && user.location ? user.location : '';
  
    }
  
  }
  