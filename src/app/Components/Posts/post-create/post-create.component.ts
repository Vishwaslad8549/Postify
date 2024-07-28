import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from 'src/app/models/posts';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  Posts:Post[]=[];
  Post:Post={
    id: '',
    title: '',
    content: '',
    imagePath:""
  };
  reactiveForm: FormGroup;
  private mode:string="";
  formdata= new FormData
  private postId!:string;
  imagePreview: string | ArrayBuffer;
  constructor(private fb: FormBuilder,private postsService:PostService,private http:HttpClient,private activateroute:ActivatedRoute,private router:Router){
    //this.postsService.mode="create"
  }
  ngOnInit(): void {
    this.reactiveForm = this.fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
      image: [null, Validators.required] // This will be used for the file input
    });
    this.activateroute.paramMap.subscribe(params=>{
            if(params.has('id')){
               this.postId=params.get('id')
              this.mode='edit';
              console.log(this.postId)
              this.postsService.getPost(this.postId).subscribe(postData => {
                
                this.Post = {
                  id: postData._id, 
                  title: postData.title, 
                  content: postData.content,
                  imagePath:postData.imagePath};

                this.reactiveForm.get('name').setValue(postData.title);
                this.reactiveForm.get('content').setValue(postData.content);
                this.reactiveForm.get('image').setValue(postData.imagePath)
              });
              console.log(this.Post)
            }
            else{
              this.mode='create'
              this.postId=null;
            }
          })
    }
  

  onSubmit() {
    // Access form values
    if(this.reactiveForm.invalid){
      return
    }
    this.Post.title= this.reactiveForm.get('name').value;
    this.Post.content = this.reactiveForm.get('content').value;
    this.Post.image = this.reactiveForm.get('image').value;
    if (this.mode === "create") {
      
            this.postsService.addPost(this.Post);
            
          } else {
            this.postsService.updatePost(
              this.postId,
              this.Post
            );
           
          }
          //this.router.navigateByUrl('/home/list');
          //this.reactiveForm.reset()
         
          
  }
  onUpload(event: any) {
    const file = event.target.files[0];
    this.reactiveForm.get('image').setValue(file);
  }
}
//   ngOnInit(): void {
//     this.activateroute.paramMap.subscribe(params=>{
//       if(params.has('id')){
//          this.postId=params.get('id')
//         this.mode='edit';
//         console.log(this.postId)
//         this.postsService.getPost(this.postId).subscribe(postData => {
//           this.Post = {id: postData._id, title: postData.title, content: postData.content};
//         });
//         console.log(this.Post)
//       }
//       else{
//         this.mode='create'
//         this.postId=null;
//       }
//     })

//   }
//   onSavePost() {
//     if (this.mode === "create") {
      
//       this.postsService.addPost(this.Post,this.formdata );
//       this.router.navigateByUrl('/home/list');
//     } else {
//       this.postsService.updatePost(
//         this.postId,
//         this.Post
//       );
//       this.router.navigateByUrl('/home/list');
//     }
//     this.Post={
//       id: '',
//       title: '',
//       content: ''
//     };
//   }
//   onUpload(e:any){
//     const file = e.value[0];
//     this.formdata.append('file',file);
   
// }


// this.postsService.getPosts();
//       this.postsService.getPostUpdateListener()
//       .subscribe((posts: Post[]) => {
//         console.log(posts)
//         this.Posts = posts;
//       });
//     this.activateroute.paramMap.subscribe((paramMap:ParamMap)=>{
//       if(paramMap.has('postId')){
//         this.mode="edit"
//         this.postId=paramMap.get('postId')
//         this.Post=this.Posts.find(p=>{p.id===this.postId})
//         console.log(this.Post)
//       }
//       else {
//         this.mode="create";
//         this.postId=null;
//         console.log(this.mode)
//       }
//     })