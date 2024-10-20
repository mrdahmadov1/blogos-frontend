import { Component, OnInit, ViewChild } from '@angular/core';
import { AddPostModalComponent } from './add-post-modal/add-post-modal.component';
import { PostService } from './posts.service';

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
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  @ViewChild('addPostModal') addPostModal!: AddPostModalComponent;

  deleteCache: { [key: string]: { confirm: boolean } } = {};
  posts: Post[] = [];
  postsOfCurrentPageData: readonly Post[] = [];
  currentUser: any | null = null;

  constructor(private postsService: PostService) {}

  onCurrentPageDataChange($event: readonly Post[]): void {
    this.postsOfCurrentPageData = $event;
  }

  ngOnInit(): void {
    this.loadPosts();

    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
  }

  loadPosts(): void {
    this.postsService.getAllPosts().subscribe({
      next: (response: PostsResponse) => {
        this.posts = response.data.filter((post) => post.user !== null);
      },
      error: (error) =>
        this.setMessage(
          error.error.message || 'Failed to load posts!',
          'error'
        ),
    });
  }

  showAddPostModal(): void {
    this.addPostModal.show();
  }

  handlePostAdded(newPost: Omit<Post, '_id' | 'createdAt'>): void {
    this.postsService.createPost(newPost).subscribe({
      next: () => {
        this.loadPosts();
        this.setMessage('Post Created Successfully!', 'success');
      },
      error: (error) => this.setMessage(error.error.message, 'error'),
    });
  }

  startDelete(id: string): void {
    if (!this.deleteCache[id]) {
      this.deleteCache[id] = { confirm: false };
    }

    this.deleteCache[id].confirm = true;
    this.resetMessages();
  }

  cancelDelete(id: string): void {
    if (this.deleteCache[id]) {
      this.deleteCache[id].confirm = false;
    }
  }

  deletePost(id: string): void {
    console.log('Deleting post with id:', id); // Check if the ID is passed correctly

    this.postsService.deletePost(id).subscribe({
      next: () => {
        const postIndex = this.posts.findIndex((post) => post._id === id);
        if (postIndex !== -1) {
          this.posts.splice(postIndex, 1);
        }
        this.setMessage('Post Deleted Successfully!', 'success');
        this.loadPosts();
        this.cancelDelete(id);
      },
      error: (error) => this.setMessage(error.error.message, 'error'),
    });
  }

  trackById(index: number, item: Post): string {
    return item._id;
  }

  private setMessage(message: string, type: 'success' | 'error'): void {
    if (type === 'success') {
      this.addPostModal.setSuccessMessage(message);
      this.addPostModal.setErrorMessage('');
    } else {
      this.addPostModal.setErrorMessage(message);
      this.addPostModal.setSuccessMessage('');
    }
  }

  private resetMessages(): void {
    this.addPostModal.setErrorMessage('');
    this.addPostModal.setSuccessMessage('');
  }
}
