import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Portfolio } from 'src/app/services/portfolio.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  types: string[];
  private _selectedType: string ='all';

  get selectedType(){
    return this._selectedType;
  }

  set selectedType(newValue: string)
  {
    if(newValue !== this._selectedType)
    {
      this._selectedType=newValue;
      this.loadPortfolios(this._selectedType);
    }
  }
  portfolios: Portfolio[];
  constructor(private portfolioSvc:PortfolioService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    const filter=this.route.snapshot.queryParamMap.get('filter');
    if(filter)
    {
      this._selectedType=filter;
    }
    this.loadPortfolios(this._selectedType);
  }
  loadPortfolios(selectedType:string):void{
    this.portfolioSvc.get().subscribe(data=>{
      this.types=data.map(p=>p.type).filter((value,index,self)=>self.indexOf(value) === index);
      this.portfolios = data.filter(p => p.type === selectedType || selectedType === 'all');
    });
  }
}
