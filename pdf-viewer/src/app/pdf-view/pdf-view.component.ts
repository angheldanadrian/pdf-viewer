import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PdfViewService} from './pdf-view.service';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css']
})
export class PdfViewComponent implements OnInit, AfterViewInit {

  constructor(private pdfViewService: PdfViewService) {
  }

  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  file: Blob;
  nrPages: number;
  currentPage: number;

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnInit(): void {
    this.disableCanvasContextMenu(this.canvas);
    this.disableKeyBindings();
    this.initViewer();

  }


  /* previousPage = (): void => {
     if (this.currentPage >= 1) {
       this.pdfViewService.getPage(this.currentPage - 1)
         .subscribe(async (img: ArrayBuffer) => {
           this.currentPage--;
           this.file = new Blob([img], {type: 'image/png'});
           const imageBitmap = await createImageBitmap(this.file, {resizeQuality: 'high'});
           this.ctx.drawImage(imageBitmap, 0, 0);
         });
     }
   };


   nextPage = (): void => {
     if (this.currentPage <= this.nrPages) {
       this.pdfViewService.getPage(this.currentPage + 1)
         .subscribe(async (img: ArrayBuffer) => {
           this.currentPage++;
           this.file = new Blob([img], {type: 'image/png'});
           const imageBitmap = await createImageBitmap(this.file, {resizeQuality: 'high'});
           this.ctx.drawImage(imageBitmap, 0, 0);
         });
     }
   };
 */
  renderPage = async (imgData: ArrayBuffer): Promise<void> => {
    try {
      this.file = new Blob([imgData], {type: 'image/png'});
      const imageBitmap = await createImageBitmap(this.file, {resizeQuality: 'high'});
      this.ctx.drawImage(imageBitmap, 0, 0);

    } catch (e) {

    }
  };


  nextPage = (): void => {
    if (this.currentPage < this.nrPages) {
      this.pdfViewService.getPage(this.currentPage + 1)
        .subscribe(imgData => {
          this.renderPage(imgData).then(r => this.currentPage++);
        });
    }
  };

  previousPage = (): void => {
    if (this.currentPage > 1) {
      this.pdfViewService.getPage(this.currentPage - 1)
        .subscribe(imgData => {
          this.renderPage(imgData).then(r => this.currentPage--);
        });
    }
  };

  disableKeyBindings = (): void => {
    document.body.addEventListener('keydown', event => {
      if (event.ctrlKey && 'as'.indexOf(event.key) !== -1) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  };

  disableCanvasContextMenu = (canvas): void => {
    canvas.nativeElement.oncontextmenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  };

  initViewer = (): void => {
    this.initPageNumbers();
    this.pdfViewService.getPage(this.currentPage)
      .subscribe(async (img: ArrayBuffer) => {
        this.file = new Blob([img], {type: 'image/png'});
        const imageBitmap = await createImageBitmap(this.file, {resizeQuality: 'high'});
        this.ctx.drawImage(imageBitmap, 0, 0);
      });
  };

  initPageNumbers = (): void => {
    this.pdfViewService.getNrOfPages().subscribe(
      nrPages => {
        this.nrPages = nrPages.data;
      });
    this.currentPage = 1;
  };

}




