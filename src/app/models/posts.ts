export interface Post {
    id:string|null,
    title: string;
    content: string;
    image?:any,
    imagePath:string|null,
    isExpanded?:boolean
    creator:string
  }
  