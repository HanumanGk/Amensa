import { Component, Input, OnInit, Output } from "@angular/core";
import * as EventEmitter from "events";

@Component({
  selector: "app-select-dropdown",
  templateUrl: "./select-dropdown.component.html",
  styleUrls: ["./select-dropdown.component.scss"],
})
export class SelectDropdownComponent implements OnInit {
  @Input() list: any[];

  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();

  checkedList: any[];
  showDropDown: boolean;
  currentSelected: {};
  constructor() {
  }

  ngOnInit(): void {
    console.log('Component init');
  }

  getSelectedValue(event) {
    console.log("Seleted Value =",event)
    // if (event) {
    //   this.checkedList.push(value);
    // } else {
    //   var index = this.checkedList.indexOf(value);
    //   this.checkedList.splice(index, 1);
    // }

    // this.currentSelected = { checked: status, name: value };

    //share checked list
    // this.shareCheckedlist();

    //share individual selected item
    // this.shareIndividualStatus();
  }
  shareCheckedlist($event) {
     this.shareCheckedList.emit('shareCheckedList',this.checkedList);
    // this.shareCheckedList.emit($event);
  }
  shareIndividualStatus($event) {
    this.shareIndividualCheckedList.emit("shareIndividualCheckedList",this.currentSelected);
    // this.shareIndividualCheckedList.emit($event);
  }
}
