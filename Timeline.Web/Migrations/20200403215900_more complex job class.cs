using Microsoft.EntityFrameworkCore.Migrations;

namespace Timeline.Migrations
{
    public partial class morecomplexjobclass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssociatedUrl",
                table: "Job",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Commit",
                table: "Job",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Flagged",
                table: "Job",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "JobStatus",
                table: "Job",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "JobType",
                table: "Job",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Pings",
                table: "Job",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Job",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssociatedUrl",
                table: "Job");

            migrationBuilder.DropColumn(
                name: "Commit",
                table: "Job");

            migrationBuilder.DropColumn(
                name: "Flagged",
                table: "Job");

            migrationBuilder.DropColumn(
                name: "JobStatus",
                table: "Job");

            migrationBuilder.DropColumn(
                name: "JobType",
                table: "Job");

            migrationBuilder.DropColumn(
                name: "Pings",
                table: "Job");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Job");
        }
    }
}
