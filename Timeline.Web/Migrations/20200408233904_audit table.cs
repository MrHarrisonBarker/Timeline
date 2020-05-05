using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Timeline.Migrations
{
    public partial class audittable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Associations_Job_JobId",
                table: "Associations");

            migrationBuilder.DropForeignKey(
                name: "FK_Job_Users_CreatedById",
                table: "Job");

            migrationBuilder.DropForeignKey(
                name: "FK_JobWorker_Job_JobId",
                table: "JobWorker");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Job",
                table: "Job");

            migrationBuilder.RenameTable(
                name: "Job",
                newName: "Jobs");

            migrationBuilder.RenameIndex(
                name: "IX_Job_CreatedById",
                table: "Jobs",
                newName: "IX_Jobs_CreatedById");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Jobs",
                table: "Jobs",
                column: "JobId");

            migrationBuilder.CreateTable(
                name: "Audits",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TimeStamp = table.Column<DateTime>(nullable: false),
                    Action = table.Column<int>(nullable: false),
                    Log = table.Column<string>(nullable: true),
                    Origin = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Audits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Audits_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Audits_UserId",
                table: "Audits",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Associations_Jobs_JobId",
                table: "Associations",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Users_CreatedById",
                table: "Jobs",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_JobWorker_Jobs_JobId",
                table: "JobWorker",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Associations_Jobs_JobId",
                table: "Associations");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Users_CreatedById",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_JobWorker_Jobs_JobId",
                table: "JobWorker");

            migrationBuilder.DropTable(
                name: "Audits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Jobs",
                table: "Jobs");

            migrationBuilder.RenameTable(
                name: "Jobs",
                newName: "Job");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_CreatedById",
                table: "Job",
                newName: "IX_Job_CreatedById");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Job",
                table: "Job",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_Associations_Job_JobId",
                table: "Associations",
                column: "JobId",
                principalTable: "Job",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Job_Users_CreatedById",
                table: "Job",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_JobWorker_Job_JobId",
                table: "JobWorker",
                column: "JobId",
                principalTable: "Job",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
