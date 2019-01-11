import {Post} from "../models/post"
class Store {
    public newPost: Post
    public searchText: string
    public newComment: Object
    public confirmDelete: Boolean
}

let store = new Store()
export default store;
