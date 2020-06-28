using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Timeline.Neo.Migrations
{
    public partial class jobTeam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TeamId",
                table: "Jobs",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_TeamId",
                table: "Jobs",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Teams_TeamId",
                table: "Jobs",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Teams_TeamId",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_TeamId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Jobs");
        }
    }
}
