using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Timeline.Migrations
{
    public partial class auditteam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TeamId",
                table: "Audits",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Audits_TeamId",
                table: "Audits",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Audits_Teams_TeamId",
                table: "Audits",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Audits_Teams_TeamId",
                table: "Audits");

            migrationBuilder.DropIndex(
                name: "IX_Audits_TeamId",
                table: "Audits");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Audits");
        }
    }
}
