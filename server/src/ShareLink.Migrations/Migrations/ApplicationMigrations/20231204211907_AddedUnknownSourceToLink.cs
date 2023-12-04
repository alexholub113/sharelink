using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShareLink.Migrations.Migrations.ApplicationMigrations
{
    /// <inheritdoc />
    public partial class AddedUnknownSourceToLink : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UnknownSource",
                table: "Links",
                type: "jsonb",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UnknownSource",
                table: "Links");
        }
    }
}
