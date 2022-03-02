import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.scss']
})
export class EditQuoteComponent implements OnInit {
  quote = {
    title: '',
    author: ''
  };

  id: string;

  constructor(
    private quotesService: QuotesService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      this.quotesService.getQuote(this.id).subscribe(res => {
        this.quote = res;
      });
    }
  }

  onSave(form) {
    const data = form.value;

    if (this.id) {
      this.quotesService.updateQuote(this.id, data).subscribe(res => {
        console.log(res);
      });
    } else {
      this.quotesService.createQuote(data).subscribe(res => {
        console.log(res);
      });
    }

    this.router.navigateByUrl('/quotes');
  }

}
