export class Post {
    public postId: string;
    public title: string;
    public body: string;
    public userId: string;
    public date: Date;
    public userName: string;
    public userEmail: string;
    public createdAt: string;
    public updatedAt: string;
    //public date: Date;
    constructor(id: string, title: string, body: string,) {
        this.postId = id;
        this.title = title;
        this.body = body;
        //this.date = date;
    }
}
