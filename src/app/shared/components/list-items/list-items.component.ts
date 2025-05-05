import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PostService } from '../../../components/posts/service/post.service';
import { Post } from '../../../home/models/Post';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list-items',
  imports: [
    MatListModule,
    NgFor,
    MatIcon,
    NgIf,
    MatProgressSpinner,
    NgClass
  ],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.scss'
})
export class ListItemsComponent {

  @Input() items: any[] = []
  @Input() fields: { key: string; label?: string; isDate?: boolean }[] = [];
  @Input() isAtHomeContent: boolean = true;
  @Output() itemDeletado = new EventEmitter<void>();
  loadingItemId: number | null = null;

  constructor(private router: Router, private postService: PostService, private sharedService: SharedService) {}

  formatDate(dateString: string): string {
    return this.postService.formatDate(dateString);
  }

  visualizar(item: Post) {
    // Exemplo: navegar para rota de detalhes
    this.router.navigate(['posts/view-post', item.id]);
  }
  
  editar(item: Post) {
    this.router.navigate(['posts/edit', item.id]);
  }
  
  deletar(item: Post) {
    this.loadingItemId = item.id;
    this.postService.deletePost(item.id).pipe().subscribe({
      next: response => {
        setTimeout(() => {
          this.sharedService.openSuccessDialog('Post', 'removido')
          this.itemDeletado.emit();
          this.loadingItemId = null;
        }, 1500)
      },
      error: error => {
        setTimeout(() => {
          this.sharedService.openSuccessDialog('Falha na remoção', error.error)
          this.loadingItemId = null;
        }, 1500)
      }
    });

  }

}
