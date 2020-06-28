using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Timeline.Neo.Migrations
{
    public partial class fluff : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Accent",
                table: "Teams",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Teams",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "InviteToken",
                table: "Teams",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "Archived",
                table: "Jobs",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "AssociatedUrl",
                table: "Jobs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Commit",
                table: "Jobs",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Deadline",
                table: "Jobs",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Jobs",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "Finished",
                table: "Jobs",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Flagged",
                table: "Jobs",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "JobStatus",
                table: "Jobs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "JobType",
                table: "Jobs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Pings",
                table: "Jobs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Jobs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Jobs",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Accent",
                table: "Boards",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "InviteToken",
                table: "Boards",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Accent",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "InviteToken",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Archived",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "AssociatedUrl",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Commit",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Deadline",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Finished",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Flagged",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "JobStatus",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "JobType",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Pings",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Accent",
                table: "Boards");

            migrationBuilder.DropColumn(
                name: "InviteToken",
                table: "Boards");
        }
    }
}
