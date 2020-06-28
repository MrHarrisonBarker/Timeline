using Microsoft.EntityFrameworkCore.Migrations;

namespace Timeline.Neo.Migrations
{
    public partial class PermanentBoards : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Permanent",
                table: "Boards",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Permanent",
                table: "Boards");
        }
    }
}
