import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { isMobileDevice, isTabletDevice } from './_helpers/tools';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})

export class AppComponent implements OnInit {

  iconMail = faEnvelope
  iconDownload = faFileArrowDown

  isMobile!: boolean;
  isTabletDevice!: boolean

  constructor() { }
  ngOnInit() {
    this.isMobile = isMobileDevice()
    this.isTabletDevice = isTabletDevice()
  }


  @HostListener('window:resize')
  onResize() {
    this.isMobile = isMobileDevice()
    this.isTabletDevice = isTabletDevice()
  }

  @ViewChild('animH1About') animH1About!: ElementRef;
  ngAfterViewInit() {
    const threshold = 0.2; // how much % of the element is in view
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {  
                observer.disconnect(); // disconnect if you want to stop observing else it will rerun every time its back in view. Just make sure you disconnect in ngOnDestroy instead
                }
            });
        },
        { threshold }
    );
    observer.observe(this.animH1About.nativeElement);
}
  @ViewChild('animH2About')
  animH2About!: ElementRef;
  @ViewChild('animTitleAbout')
  animTitleAbout!: ElementRef;
  @ViewChild('animTitle2About')
  animTitle2About!: ElementRef;
  @ViewChild('animH1Skills')
  animH1Skills!: ElementRef;
  @ViewChild('animH2Skills')
  animH2Skills!: ElementRef;
  @ViewChild('animH1Portfolio')
  animH1Portfolio!: ElementRef;
  @ViewChild('animH2Portfolio')
  animH2Portfolio!: ElementRef;
}
