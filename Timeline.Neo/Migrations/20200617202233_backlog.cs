using Microsoft.EntityFrameworkCore.Migrations;

namespace Timeline.Neo.Migrations
{
    public partial class backlog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Backlog",
                table: "Jobs",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Backlog",
                table: "Jobs");
        }
    }
}
