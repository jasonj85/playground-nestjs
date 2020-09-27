import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuotesService } from '../quotes.service';
import { Quote } from '../quotes/quote';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: Observable<Quote>;

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {

    this.quote = this.quotesService.getLatest();
  }

}
