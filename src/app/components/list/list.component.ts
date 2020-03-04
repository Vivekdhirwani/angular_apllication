import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  searchForm: FormGroup

  input: string
  data: string[]
  chunk: string[]
  totalItem = 0
  perPage = 25
  page = 1

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      input: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  fetchData() {
    if (this.searchForm.valid && (this.input.length === 7 || this.input.length === 10)) {
      this.data = [];
      this.chunk = [];
      this.dataService.fetchData(this.input).subscribe(res => {
        this.data = res.body.data;
        this.chunk = this.data.slice(0, this.perPage);
        this.totalItem = res.body.count;
      });
    }
  }

  next() {
    if (this.page <= this.totalItem / this.perPage) {
      this.page++;
      const offset = (this.page - 1) * this.perPage;
      this.chunk = this.data.slice(offset, offset + this.perPage);
    }
  }

  previous() {
    if (this.page > 1) {
      this.page--;
      const offset = (this.page - 1) * this.perPage;
      this.chunk = this.data.slice(offset, offset + this.perPage);
    }
  }

  updateList() {
    const offset = (this.page - 1) * this.perPage;
    this.chunk = this.data.slice(offset, offset + this.perPage);
  }

  onPerPageChange(value: number) {
    this.perPage = value;
    this.updateList();
  }

  onKey(event:any) { // without type info
    if (event.target.value.length != 7 || event.target.value.length != 10){
      this.chunk =[]
    }
    this.data = ["click search"]
  }
}
