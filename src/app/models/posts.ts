export interface Post {
    id:string|null,
    _id?:string|null,
    title: string;
    content: string;
    image?:any,
    imagePath:string|null,
    isExpanded?:boolean,
    creator:string,
    creationDate:string
    likes:string[];
    comments:string[]
  }
  