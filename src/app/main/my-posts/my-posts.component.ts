import { Component, ViewChild } from '@angular/core';
import { AddPostModalComponent } from './add-post-modal/add-post-modal.component';
import { PostService } from '../posts/posts.service';

interface User {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  user: User;
  title: string;
  content: string;
  createdAt: string;
  id: string;
}

interface PostsResponse {
  status: string;
  results: number;
  data: Post[];
}

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent {
  @ViewChild('addPostModal') addPostModal!: AddPostModalComponent;

  editCache: { [key: string]: { edit: boolean; data: Post } } = {};
  deleteCache: { [key: string]: { confirm: boolean } } = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;

  posts: Post[] = [];
  postsOfCurrentPageData: readonly Post[] = [];

  constructor(private postsService: PostService) {}

  onCurrentPageDataChange($event: readonly Post[]): void {
    this.postsOfCurrentPageData = $event;
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postsService.getMyPosts().subscribe({
      next: (response: PostsResponse) => {
        this.posts = response.data.filter((post) => post.user !== null);
      },
      error: (error) =>
        (this.errorMessage = error.error.message || 'Failed to load posts!'),
    });
  }

  showAddPostModal(): void {
    this.addPostModal.show();
  }

  handlePostAdded(newUser: Post): void {
    this.postsService.createPost(newUser).subscribe({
      next: () => {
        this.loadPosts();
        this.successMessage = 'Post Created Successfully!';
      },
      error: (error) => (this.errorMessage = error.error.message),
    });
  }

  startEdit(id: string): void {
    if (!this.editCache[id]) {
      const post = this.posts.find((post) => post._id === id);
      if (post) {
        this.editCache[id] = { edit: false, data: { ...post } };
      }
    }

    this.editCache[id].edit = true;
    this.successMessage = null;
    this.errorMessage = null;
  }

  cancelEdit(id: string): void {
    if (this.editCache[id]) {
      this.editCache[id].edit = false;
    }
  }

  saveEdit(id: string): void {
    const postIndex = this.posts.findIndex((post) => post._id === id);
    if (postIndex !== -1) {
      this.postsService.updatePost(id, this.editCache[id].data).subscribe({
        next: () => {
          this.posts[postIndex] = { ...this.editCache[id].data };
          this.successMessage = 'Post Updated Successfully!';
          this.errorMessage = null;
          this.loadPosts();
          this.cancelEdit(id);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.successMessage = null;
        },
      });
    }
  }

  startDelete(id: string): void {
    if (!this.deleteCache[id]) {
      this.deleteCache[id] = { confirm: false };
    }

    this.deleteCache[id].confirm = true;
    this.successMessage = null;
    this.errorMessage = null;
  }

  cancelDelete(id: string): void {
    if (this.deleteCache[id]) {
      this.deleteCache[id].confirm = false;
    }
  }

  deleteUser(id: string): void {
    this.postsService.deletePost(id).subscribe({
      next: () => {
        const postIndex = this.posts.findIndex((post) => post._id === id);
        if (postIndex !== -1) {
          this.posts.splice(postIndex, 1);
          delete this.editCache[id];
          delete this.deleteCache[id];
        }
        this.successMessage = 'Post Deleted Successfully!';
        this.loadPosts();
        this.cancelDelete(id);
      },
      error: (error) => (this.errorMessage = error.error.message),
    });
  }

  updateEditCache(): void {
    this.posts.forEach((post) => {
      this.editCache[post._id] = { edit: false, data: { ...post } };
      this.deleteCache[post._id] = { confirm: false };
    });
  }

  trackById(index: number, item: Post): string {
    return item._id;
  }
}
