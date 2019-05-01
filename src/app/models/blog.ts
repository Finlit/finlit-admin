export class Blog {
    id?: number = null;
    title?: string ='';
    description?: string='';
    imgUrl?: string='';
   
    constructor(blog?: Blog) {
        this.id = blog && blog.id ? blog.id : null;
        this.title = blog && blog.title ? blog.title : '';
        this.description = blog && blog.description ? blog.description : '';
        this.imgUrl = blog && blog.imgUrl ? blog.imgUrl : '';
}
}