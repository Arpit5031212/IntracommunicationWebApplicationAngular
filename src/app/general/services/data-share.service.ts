import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private groupId!: number;

  constructor() { }

  setGroupId(id: number) {
    this.groupId = id;
  }

  getGroupId() {
    return this.groupId;
  }
}
