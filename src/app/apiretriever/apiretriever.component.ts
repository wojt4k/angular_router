import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {Meme} from "../models/meme";

@Component({
  selector: 'app-apiretriever',
  templateUrl: './apiretriever.component.html',
  styleUrls: ['./apiretriever.component.css']
})
export class ApiretrieverComponent implements OnInit
{
  meme = new Meme()
  isLoading = false;
  loadingDots: string = ''



  constructor(private service: DataService)
  {
  }

  ngOnInit(): void
  {
    this.meme = this.service.states.apiretriever.meme.getValue() || {};
  }

  getMeme(): void
  {
    this.isLoading = true;
    this.loadingAnim(true)
    setTimeout(() => {
      this.service.getItem().subscribe(
        (response) =>
        {
          this.meme = response;
          this.isLoading = false;
          this.service.states.apiretriever.meme.next(this.meme)
          this.loadingAnim(false)
        })
    }, 1000)
  }

  loadingAnim(running: boolean = true): void
  {
    this.loadingDots = ''
    const interval = setTimeout(() =>
    {
      if (!running) clearInterval(interval);
      if (this.loadingDots.length === 3) this.loadingDots = ''
      this.loadingDots += '.'
    }, 666);
  }
}
