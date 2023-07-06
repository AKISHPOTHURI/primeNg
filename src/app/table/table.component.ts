import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../services/productservice.service';
import {Product } from '../product';
import { MenuItem,MessageService } from 'primeng/api'
import * as FileSaver from 'file-saver';
import { P } from '../classdatatype';
import { state } from '@angular/animations';

// class P {
//   constructor(id:number,
//     code:string,
//     name:string,
//     price:number,
//     state:string,
//     city:string
//     ) {}
 
// };

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [MessageService]
})



export class TableComponent implements OnInit {
  
  // a = new P(100);
  infos!:Product[];
  
  cols!: any[];
  sales!: any[];
  rowGroupMetadata: any;

  first = 0;

  rows = 10;

  selectedProducts3!: Product;

  items!: MenuItem[];

  selectedProduct!: Product;

  columns!:any;

  // name = "Akish";

  dialogVisible: boolean = false;

  constructor(private productService: ProductserviceService,private messageService:MessageService) { }

  ngOnInit(): void {

    this.cols = [
      {field: 'id',header: 'id'},
      {field: 'code',header: 'code'},
      {field: 'name',header: 'name'},
      {field: 'price',header: 'price'},
      {field: 'state',header: 'state'}
    ];

    this.sales = [
      { brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
      { brand: 'Samsung', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122' },
      { brand: 'Microsoft', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500' },
      { brand: 'Philips', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323' },
      { brand: 'Song', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332' },
      { brand: 'LG', lastYearSale: '52%', thisYearSale: ' 65%', lastYearProfit: '$421,132', thisYearProfit: '$150,005' },
      { brand: 'Sharp', lastYearSale: '82%', thisYearSale: '12%', lastYearProfit: '$131,211', thisYearProfit: '$100,214' },
      { brand: 'Panasonic', lastYearSale: '44%', thisYearSale: '45%', lastYearProfit: '$66,442', thisYearProfit: '$53,322' },
      { brand: 'HTC', lastYearSale: '90%', thisYearSale: '56%', lastYearProfit: '$765,442', thisYearProfit: '$296,232' },
      { brand: 'Toshiba', lastYearSale: '75%', thisYearSale: '54%', lastYearProfit: '$21,212', thisYearProfit: '$12,533' }
  ];

    this.getinfo();
    this.updateRowGroupMetaData();
    this.items = [
      {label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewProduct(this.selectedProduct)},
      {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteProduct(this.selectedProduct)}
  ];
  console.log(this.selectedProducts3);
  }

  getinfo(){
    this.productService.getProductsSmall().subscribe(data => {
      return this.infos = data;     
    });
  }

  onSort() {
    this.updateRowGroupMetaData(); 
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.infos) {
        for (let i = 0; i < this.infos.length; i++) {
            let rowData = this.infos[i];
            let state = rowData.state;
            if (i == 0) {
                this.rowGroupMetadata[state] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.infos[i - 1];
                let previousRowGroup = previousRowData.state;
                // console.log(previousRowData);
                // console.log(state);
                // console.log(previousRowGroup);            
                if (state === previousRowGroup)
                {
                  // console.log(this.rowGroupMetadata[state].size++);
                  this.rowGroupMetadata[state].size++;
                }
                else
                {
                  this.rowGroupMetadata[state] = { index: i, size: 1 };
                  // console.log(this.rowGroupMetadata[state]);
                  
                }              
            }
          console.log(this.rowGroupMetadata[state].size);               
        }       
    }
  }

//   exportPdf() {
//     console.log("PDF called");
    
//     // import("jspdf").then(jsPDF => {
//     //     import("jspdf-autotable").then(x => {
//     //         const doc = new jsPDF.default(0,0);
//     //         doc.autoTable(this.columns, this.infos);
//     //         doc.save('primengTable.pdf');
//     //     })
//     // })
// }


// exportExcel() {
  // console.log("called");
  //   import("xlsx").then(xlsx => {
  //       const worksheet = xlsx.utils.json_to_sheet(this.infos);
  //       const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //       // this.saveAsExcelFile(excelBuffer, "primengTable");
  //       FileSaver.saveAs(excelBuffer, "primengTable")
  //   });
// }

// saveAsExcelFile(buffer: any, fileName: string): void {
//   console.log("save called");
  
//     import("file-saver").then(FileSaver => {
//         let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//         let EXCEL_EXTENSION = '.xlsx';
//         const data: Blob = new Blob([buffer], {
//             type: EXCEL_TYPE
//         });
//         FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
//     });
// }


  selectProduct(msg:Product) {
    console.log(msg);
    this.messageService.add({severity:'info', summary:'Product Selected', detail: msg.name});
  }

  selecteddProduct(msg:Product) {
    console.log(msg);
    this.messageService.add({severity:'info', summary:'Product Selected', detail: msg.name});
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.infos ? this.first === (this.infos.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.infos ? this.first === 0 : true;
  }

  viewProduct(product: Product) {
    this.messageService.add({severity: 'info', summary: 'Product Selected', detail: product.name });
}

deleteProduct(product: Product) {
    this.infos = this.infos.filter((p:any) => p.id !== product.id);
    this.messageService.add({severity: 'info', summary: 'Product Deleted', detail: product.name});
    // this.selectedProduct;
}

showDialog() {
  this.dialogVisible = true;
}

}
