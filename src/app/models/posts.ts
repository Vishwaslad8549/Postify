export interface Post {
    id:string|null,
    title: string;
    content: string;
    image?:any,
    imagePath:string|null,
    isExpanded?:boolean
    creator:any,
    creationDate:string
    likes?:string[];
    comments?:any[]
    _id?:string
  }
  export interface Comment{
    user:object
    text: string,
    _id: string,
    createdAt: string
 }
  