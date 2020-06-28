using Microsoft.EntityFrameworkCore.Migrations;

namespace Timeline.Neo.Migrations
{
    public partial class teamDomain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Domain",
                table: "Teams",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Domain",
                table: "Teams");
        }
    }
}
