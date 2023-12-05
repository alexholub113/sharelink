using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShareLink.Migrations.Migrations.ApplicationMigrations
{
    /// <inheritdoc />
    public partial class AddedDislikes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserDislikedLinks",
                columns: table => new
                {
                    DislikedByUserId = table.Column<string>(type: "text", nullable: false),
                    DislikedLinksId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDislikedLinks", x => new { x.DislikedByUserId, x.DislikedLinksId });
                    table.ForeignKey(
                        name: "FK_UserDislikedLinks_Links_DislikedLinksId",
                        column: x => x.DislikedLinksId,
                        principalTable: "Links",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserDislikedLinks_UserProfiles_DislikedByUserId",
                        column: x => x.DislikedByUserId,
                        principalTable: "UserProfiles",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserDislikedLinks_DislikedLinksId",
                table: "UserDislikedLinks",
                column: "DislikedLinksId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserDislikedLinks");
        }
    }
}
