import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/posts.service';

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
  deleteCache: { [key: string]: { confirm: boolean } } = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;

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
        (this.errorMessage = error.error.message || 'Failed to load posts!'),
    });
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

  deletePost(id: string): void {
    console.log('Deleting post with id:', id);

    this.postsService.deletePost(id).subscribe({
      next: () => {
        const postIndex = this.posts.findIndex((post) => post._id === id);
        if (postIndex !== -1) {
          this.posts.splice(postIndex, 1);
        }
        this.successMessage = 'Post Deleted Successfully!';
        this.loadPosts();
        this.cancelDelete(id);
      },
      error: (error) => (this.errorMessage = error.error.message),
    });
  }

  trackById(index: number, item: Post): string {
    return item._id;
  }
}
