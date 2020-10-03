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


  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnInit(): void {
    this.disableCanvasContextMenu(this.canvas);
    this.disableKeyBindings();
    this.initializeViewer();

  }

  disableKeyBindings(): void {
    document.body.addEventListener('keydown', event => {
      if (event.ctrlKey && 'as'.indexOf(event.key) !== -1) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  disableCanvasContextMenu = (canvas) => {
    canvas.nativeElement.oncontextmenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  }

  initializeViewer = () => {
    this.pdfViewService.getPage(2)
      .subscribe(async (img: ArrayBuffer) => {
        this.file = new Blob([img], {type: 'image/png'});
        const imageBitmap = await createImageBitmap(this.file, {resizeQuality: 'high'});
        this.ctx.drawImage(imageBitmap, 0, 0);
      });
  }

}






