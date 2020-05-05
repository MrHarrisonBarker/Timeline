using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Timeline.Migrations
{
    public partial class invitetoguid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "InviteToken",
                table: "Teams",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext CHARACTER SET utf8mb4",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "InviteToken",
                table: "Teams",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true,
                oldClrType: typeof(Guid));
        }
    }
}
