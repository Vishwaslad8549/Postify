import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/posts';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit{
  Posts:Post[]=[];
  Post:Post={
    id: '',
    title: '',
    content: '',
    imagePath:"",
    creator:"",
    creationDate:"",
    comments:[],
    likes:[]
  };
  reactiveForm!: FormGroup;
  private mode:string="";
  formdata= new FormData
  private postId!:string;
  imagePreview!: string | ArrayBuffer;
  imageError: string = '';
  private allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  constructor(private fb: FormBuilder,private postsService:PostService,private http:HttpClient,private activateroute:ActivatedRoute,private router:Router,public loaderService: LoaderService){
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
               this.postId=params.get('id') as string
              this.mode='edit';
              //console.log(this.postId)
              this.postsService.getPost(this.postId).subscribe(postData => {
                
                this.Post = {
                  id: postData._id, 
                  title: postData.title, 
                  content: postData.content,
                  imagePath:postData.imagePath,
                  creator:postData.creator,
                  creationDate:postData.creationDate,
                  comments:postData.comments,
                  likes:postData.likes
                };

                this.reactiveForm.get('name').setValue(postData.title);
                this.reactiveForm.get('content').setValue(postData.content);
                this.reactiveForm.get('image').setValue(postData.imagePath)
              });
              //console.log(this.Post)
            }
            else{
              this.mode='create'
              this.postId=null ;
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
    //console.log(this.Post)
    if (this.mode === "create") {
            this.loaderService.show();
            this.postsService.addPost(this.Post).subscribe({
              next: () => {
                this.loaderService.hide();
                // success handled in service (state update)
              },
              error: (err) => {
                this.loaderService.hide();
                console.error(err);
              }
            });
          } else {
            this.loaderService.show();
            this.postsService.updatePost(
              this.postId,
              this.Post
            ).subscribe({
              next: () => {
                this.loaderService.hide();
                
              },
              error: (err) => {
                this.loaderService.hide();
                console.error(err);
              }
            });
          }
          this.reactiveForm.reset();
  }
  
  onUpload(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      if (!this.allowedImageTypes.includes(file.type)) {
        this.imageError = `Invalid image type. Allowed types: JPEG, PNG, JPG.`;
        this.reactiveForm.get('image').reset();
        return;
      }
      this.imageError = '';
      this.reactiveForm.get('image').setValue(file);
    }
  }
}

