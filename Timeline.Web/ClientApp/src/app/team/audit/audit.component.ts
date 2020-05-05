import {Component, OnInit} from '@angular/core';
import {AuditService} from "../../_services/audit.service";
import {Audit} from "../../_models/audit";

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit
{

  audits: Audit[];

  constructor (public auditService: AuditService)
  {
  }

  ngOnInit (): void
  {
    this.auditService.GetAll().subscribe(audits => {
      console.log('audits',audits);
      this.audits = audits
    });
  }

}
