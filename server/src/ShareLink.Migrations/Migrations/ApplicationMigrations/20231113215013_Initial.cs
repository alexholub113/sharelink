using System;
using Microsoft.EntityFrameworkCore.Migrations;
using ShareLink.Domain.Models;

#nullable disable

namespace ShareLink.Migrations.Migrations.ApplicationMigrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Links",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Youtube = table.Column<YoutubeData>(type: "jsonb", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    UserNickname = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Links", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "LinkTag",
                columns: table => new
                {
                    LinksId = table.Column<string>(type: "text", nullable: false),
                    TagsName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LinkTag", x => new { x.LinksId, x.TagsName });
                    table.ForeignKey(
                        name: "FK_LinkTag_Links_LinksId",
                        column: x => x.LinksId,
                        principalTable: "Links",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LinkTag_Tags_TagsName",
                        column: x => x.TagsName,
                        principalTable: "Tags",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLikedLinks",
                columns: table => new
                {
                    LikedByUserId = table.Column<string>(type: "text", nullable: false),
                    LikedLinksId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLikedLinks", x => new { x.LikedByUserId, x.LikedLinksId });
                    table.ForeignKey(
                        name: "FK_UserLikedLinks_Links_LikedLinksId",
                        column: x => x.LikedLinksId,
                        principalTable: "Links",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserLikedLinks_UserProfiles_LikedByUserId",
                        column: x => x.LikedByUserId,
                        principalTable: "UserProfiles",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserSavedLinks",
                columns: table => new
                {
                    SavedByUserId = table.Column<string>(type: "text", nullable: false),
                    SavedLinksId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSavedLinks", x => new { x.SavedByUserId, x.SavedLinksId });
                    table.ForeignKey(
                        name: "FK_UserSavedLinks_Links_SavedLinksId",
                        column: x => x.SavedLinksId,
                        principalTable: "Links",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSavedLinks_UserProfiles_SavedByUserId",
                        column: x => x.SavedByUserId,
                        principalTable: "UserProfiles",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Links_CreatedAt",
                table: "Links",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Links_Title",
                table: "Links",
                column: "Title");

            migrationBuilder.CreateIndex(
                name: "IX_Links_Type",
                table: "Links",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_Links_UserId",
                table: "Links",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LinkTag_TagsName",
                table: "LinkTag",
                column: "TagsName");

            migrationBuilder.CreateIndex(
                name: "IX_UserLikedLinks_LikedLinksId",
                table: "UserLikedLinks",
                column: "LikedLinksId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSavedLinks_SavedLinksId",
                table: "UserSavedLinks",
                column: "SavedLinksId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LinkTag");

            migrationBuilder.DropTable(
                name: "UserLikedLinks");

            migrationBuilder.DropTable(
                name: "UserSavedLinks");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Links");

            migrationBuilder.DropTable(
                name: "UserProfiles");
        }
    }
}
