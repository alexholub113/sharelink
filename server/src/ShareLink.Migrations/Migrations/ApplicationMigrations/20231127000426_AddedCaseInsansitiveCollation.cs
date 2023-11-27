using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShareLink.Migrations.Migrations.ApplicationMigrations
{
    /// <inheritdoc />
    public partial class AddedCaseInsansitiveCollation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:CollationDefinition:secondary_strength", "@colStrength=secondary,@colStrength=secondary,icu,False");
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Links",
                type: "text",
                nullable: false,
                collation: "secondary_strength",
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .OldAnnotation("Npgsql:CollationDefinition:secondary_strength", "@colStrength=secondary,@colStrength=secondary,icu,False");
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Links",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldCollation: "secondary_strength");
        }
    }
}