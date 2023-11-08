using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShareLink.Migrations.Migrations.ApplicationMigrations
{
    /// <inheritdoc />
    public partial class RenameField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserDisplayName",
                table: "Links",
                newName: "UserNickname");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserNickname",
                table: "Links",
                newName: "UserDisplayName");
        }
    }
}
