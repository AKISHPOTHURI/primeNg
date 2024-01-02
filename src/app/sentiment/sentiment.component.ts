import { Component, OnInit } from '@angular/core';
import { SentimentService } from '../services/sentiment.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit {

  constructor(private senti:SentimentService) { }

  sentimentResult: any = []

  ngOnInit(): void {
    this.senti.getSentiment().then(result => {
      this.sentimentResult = result;
      console.log(this.sentimentResult)
      this.generateFake(5)
      // this.loading = false;
  });
}

generateFake(count: number): Array<number> {
  const indexes = [];
  for (let i = 0; i < count; i++) {
    indexes.push(i);
  }
  return indexes;
}

}
