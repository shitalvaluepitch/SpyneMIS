import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { ApiCallService } from "../mis.service";
import { Task } from "../task.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatSort } from "@angular/material";
import * as moment from "moment";
import _ from "lodash";

@Component({
  selector: "app-task-mis",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskMISComponent implements OnInit, OnDestroy {
  @ViewChild("paginator") paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("paginatorDue") paginatorDue: MatPaginator;
  @ViewChild("sortDue") sortDue: MatSort;
  @ViewChild("paginatorWIP") paginatorWIP: MatPaginator;
  @ViewChild("sortWIP") sortWIP: MatSort;
  @ViewChild("paginatorDeny") paginatorDeny: MatPaginator;
  @ViewChild("sortDeny") sortDeny: MatSort;
  completedTasks: Task;
  overdueTasks: Task;
  wipTasks: Task;
  deniedTasks: Task;
  constructor(public taskService: ApiCallService) {}
  completedTaskData: MatTableDataSource<any>;
  overdueTaskData: MatTableDataSource<any>;
  wipTaskData: MatTableDataSource<any>;
  deniedTaskData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "number",
    "name",
    "task",

    "completed",
    "deadline",
    "days",
    "stars",
    "userrating",
  ];
  displayedColumnsOverdue: string[] = [
    "number",
    "name",
    "task",
    "deadline",
    "assigned",
    "days",
  ];
  displayedColumnsWIP: string[] = [
    "number",
    "name",
    "task",
    "created",
    "deadline",
    "status",
    "days",
  ];
  displayedColumnsDeny: string[] = [
    "number",
    "name",
    "task",
    "denied",

    "reason",
  ];

  ngOnInit() {
    this.getCompletedTaskData();
    this.getOverdueTaskData();
    this.getWipTaskData();
    this.getTaskDenyData();
  }

  public getCompletedTaskData: any = () => {
    let obj = {
      data: { status: "5" },
      urlString: "workToDo/getTaskDetailsWithRatings",
    };
    this.taskService.getTaskData(obj).subscribe((data: Task) => {
      this.completedTasks = data.data;
      let dataObj = data.data;
      dataObj.forEach(function(row, index) {
        row.number = index + 1;
        row.days = moment(row.completionDate).diff(
          moment(row.createdBy.date),
          "days"
        );
        row.createdBy.date = moment(row.createdBy.date).format("DD/MM/YYYY");
        row.deadline = moment(row.deadline).format("DD/MM/YYYY");
        row.completionDate = moment(row.completionDate).format("DD/MM/YYYY");
        row.avgTaskRating = Math.round(row.avgTaskRating * 100) / 100;
        row.avgUserRating = Math.round(row.avgUserRating * 100) / 100;
      });
      this.completedTaskData = new MatTableDataSource(dataObj);
      this.completedTaskData.sort = this.sort;
      this.completedTaskData.paginator = this.paginator;
    });
  };

  public getOverdueTaskData: any = () => {
    let obj = {
      data: {},
      urlString: "workToDo/getOverdueTasks",
    };
    this.taskService.getTaskData(obj).subscribe((data: Task) => {
      this.overdueTasks = data.data;
      let dataObj = data.data;
      dataObj.forEach(function(row, index) {
        row.number = index + 1;
        row.days = moment().diff(moment(row.deadline), "days");
        row.createdBy.date = moment(row.createdBy.date).format("DD/MM/YYYY");
        row.deadline = moment(row.deadline).format("DD/MM/YYYY");
        row.assignedTo.date = moment(row.assignedTo.date).format("DD/MM/YYYY");
      });
      this.overdueTaskData = new MatTableDataSource(dataObj);
      this.overdueTaskData.sort = this.sortDue;
      this.overdueTaskData.paginator = this.paginatorDue;
    });
  };

  public getWipTaskData: any = () => {
    let obj = {
      data: {
        status: "1,3,4",
      },
      urlString: "workToDo/getTaskDataWithFilter",
    };
    this.taskService.getTaskData(obj).subscribe((data: Task) => {
      this.wipTasks = data.data;
      let dataObj = data.data;
      dataObj.forEach(function(row, index) {
        row.number = index + 1;
        row.days = moment(row.deadline).diff(moment(), "days");
        row.createdBy.date = moment(row.createdBy.date).format("DD/MM/YYYY");
        row.deadline = moment(row.deadline).format("DD/MM/YYYY");
        row.assignedTo.date = moment(row.assignedTo.date).format("DD/MM/YYYY");
      });
      this.wipTaskData = new MatTableDataSource(dataObj);
      this.wipTaskData.sort = this.sortWIP;
      this.wipTaskData.paginator = this.paginatorWIP;
    });
  };

  public getTaskDenyData: any = () => {
    let obj = {
      data: {
        status: "2",
      },
      urlString: "workToDo/getTaskDataWithFilter",
    };
    this.taskService.getTaskData(obj).subscribe((data: Task) => {
      this.deniedTasks = data.data;
      let dataObj = data.data;
      dataObj.forEach(function(row, index) {
        row.number = index + 1;
        row.days = moment(row.deadline).diff(moment(), "days");
        row.createdBy.date = moment(row.createdBy.date).format("DD/MM/YYYY");
        row.deadline = moment(row.deadline).format("DD/MM/YYYY");
        row.assignedTo.date = moment(row.assignedTo.date).format("DD/MM/YYYY");
        row.remark = _.filter(row.statusDetails, (item, index) => {
          if (item.details === "Denied") {
            return item;
          }
        })[0].remark;
        row.denyDate = moment(
          _.filter(row.statusDetails, (item, index) => {
            if (item.details === "Denied") {
              return item;
            }
          })[0].date
        ).format("DD/MM/YYYY");
      });
      this.deniedTaskData = new MatTableDataSource(dataObj);
      this.deniedTaskData.sort = this.sortDeny;
      this.deniedTaskData.paginator = this.paginatorDeny;
    });
  };

  ngOnDestroy() {}
}
