import {Component, OnInit} from '@angular/core';
import {SectionService} from '../../services/section.service';
import {Section} from '../../models/section';
import {ConfirmService} from '../../services/confirm.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  listSection: Section[];
  itemSection: Section;

  formSectionCreate: FormGroup;
  formSectionUpdate: FormGroup;

  constructor(private sectionService: SectionService, private confirm: ConfirmService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getListSection();
    this.initFormCreate();
    this.initFormUpdate();
  }

  initFormCreate() {
    this.formSectionCreate = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  initFormUpdate() {
    this.formSectionUpdate = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  getListSection() {
    this.sectionService.getAll().subscribe(res => {
      this.listSection = res;
    });
  }

  deleteSection(section: Section) {
    let confirm = this.confirm.openConfirm('Удаление раздела', 'Вы действительно хотите удалить раздел, ' + section.name + '?')
      .subscribe(res => {
        if (res === true) {
          confirm.unsubscribe();
          this.sectionService.deleteSection(section.id).subscribe(res => {
            this.getListSection();
          });
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  createSection(section: Section) {
    this.sectionService.postSection(section).subscribe(res => {
      if (res.status === 'Ok') {
        this.formSectionCreate.reset();
        this.getListSection();
      }
    });
  }

  setSection(section: Section) {
    this.itemSection = section;
    this.formSectionUpdate.controls['id'].setValue(section.id);
    this.formSectionUpdate.controls['name'].setValue(section.name);
  }

  updateSection(section: Section) {
    this.sectionService.putSection(section).subscribe(res => {
      if (res.status === 'Ok') {
        this.itemSection = null;
        this.getListSection();
      }
    });
  }

}
