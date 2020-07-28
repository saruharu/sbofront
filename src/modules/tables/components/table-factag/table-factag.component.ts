import { Component, OnInit } from '@angular/core';
import { FactureAgService } from '@modules/cheque/services';
import { FactureAgresso } from '@modules/cheque/models';

@Component({
  selector: 'sb-table-factag',
  templateUrl: './table-factag.component.html',
  styleUrls: ['./table-factag.component.scss']
})
export class TableFactagComponent implements OnInit {

  public factureAgresso: FactureAgresso[];
  constructor( private factAgService: FactureAgService) { 
    console.log("im right here");
    this.factureAgresso = this.factAgService.facturesChecked;
  }

  ngOnInit(): void {
    console.log("im right here");
    this.factureAgresso = this.factAgService.facturesChecked;

  }

  
}

