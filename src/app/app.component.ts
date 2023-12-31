import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { isMobileDevice, isTabletDevice } from './_helpers/tools';
import { faCloudArrowDown, faPaperPlane, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { bounceInRightOnEnterAnimation, bounceOutRightOnLeaveAnimation, fadeInUpOnEnterAnimation, fadeOutUpOnLeaveAnimation, tadaAnimation } from 'angular-animations';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    fadeInUpOnEnterAnimation(),
    fadeOutUpOnLeaveAnimation(),
    tadaAnimation({ anchor: 'hello', duration: 2000 }),
    bounceInRightOnEnterAnimation(),
    bounceOutRightOnLeaveAnimation(),
  ]
})

export class AppComponent implements OnInit {
  animState = false;
  iconMail = faPaperPlane
  iconDownload = faCloudArrowDown
  iconHandShake = faHandshake
  iconSeedling = faSeedling

  isMobile!: boolean;
  isTabletDevice!: boolean


  galleryId = 'myLightbox';
  items: GalleryItem[] = [
    new ImageItem({
      src: "../assets/image/portfolio-gallery/dashboard-bibli-screen.PNG",
      thumb: "../assets/image/portfolio-gallery/dashboard-bibli-screen.PNG",
    }),
    new ImageItem({
      src: "../assets/image/portfolio-gallery/dashboard-screen.PNG",
      thumb: "../assets/image/portfolio-gallery/dashboard-screen.PNG",
    }),
    new ImageItem({
      src: "../assets/image/portfolio-gallery/dashboard-whishlist-screen.PNG",
      thumb: "../assets/image/portfolio-gallery/dashboard-whishlist-screen.PNG",
    }),
  ];


  constructor(
    public gallery: Gallery
  ) { }

  ngOnInit() {
    this.isMobile = isMobileDevice()
    this.isTabletDevice = isTabletDevice()

    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }


  @HostListener('window:resize')
  onResize() {
    this.isMobile = isMobileDevice()
    this.isTabletDevice = isTabletDevice()
  }

  @ViewChild('aboutTitleContainer') aboutTitleContainer!: ElementRef;
  animH1AboutVisible: boolean = false
  animH2AboutVisible: boolean = false

  @ViewChild('emojiContainer') emojiContainer!: ElementRef;
  animEmojiVisible: boolean = false

  @ViewChild('skillsTitleContainer') skillsTitleContainer!: ElementRef;
  animH1SkillsVisible: boolean = false
  animH2SkillsVisible: boolean = false

  @ViewChild('skillsCardsContainer') skillsCardsContainer!: ElementRef;
  animCard1SkillsVisible: boolean = false
  animCard2SkillsVisible: boolean = false
  animCard3SkillsVisible: boolean = false

  @ViewChild('portfolioTitleContainer') portfolioTitleContainer!: ElementRef;
  animH1PortfolioVisible: boolean = false
  animH2PortfolioVisible: boolean = false

  _createIntersectionObser(element: ElementRef) {
    const threshold = 0.2; // how much % of the element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = entry.target.id
            this._toggleAnimation(targetId)
          }
        });
      },
      { threshold }
    )
    observer.observe(element.nativeElement)
  }

  private _toggleAnimation(id: string) {
    switch (id) {
      case 'emojiContainer':
        this.animEmojiVisible = true
        break
      case 'aboutTitleContainer':
        this.animH1AboutVisible = true
        setTimeout(() => {
          this.animH2AboutVisible = true
        }, 500)
        break
      case 'skillsTitleContainer':
        this.animH1SkillsVisible = true
        setTimeout(() => {
          this.animH2SkillsVisible = true
        }, 500)
        break
      case 'skillsCardsContainer':
        this.animCard1SkillsVisible = true
        setTimeout(() => {
          this.animCard2SkillsVisible = true
        }, 500)
        setTimeout(() => {
          this.animCard3SkillsVisible = true
        }, 1000)
        break
      case 'portfolioTitleContainer':
        this.animH1PortfolioVisible = true
        setTimeout(() => {
          this.animH2PortfolioVisible = true
        }, 500)
        break
    }
  }

  ngAfterViewInit() {
    this._createIntersectionObser(this.emojiContainer)
    this._createIntersectionObser(this.aboutTitleContainer)
    this._createIntersectionObser(this.skillsTitleContainer)
    this._createIntersectionObser(this.skillsCardsContainer)
    this._createIntersectionObser(this.portfolioTitleContainer)
  }
}
