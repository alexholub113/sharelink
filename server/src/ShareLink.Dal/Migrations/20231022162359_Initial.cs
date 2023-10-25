using System;
using Microsoft.EntityFrameworkCore.Migrations;
using ShareLink.Domain.Models;

#nullable disable

namespace ShareLink.Dal.Migrations
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
                    Youtube = table.Column<YoutubeData>(type: "jsonb", nullable: false, defaultValueSql: "'{}'::jsonb"),
                    Likes = table.Column<int>(type: "integer", nullable: false),
                    User = table.Column<string>(type: "text", nullable: false),
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
                name: "IX_Links_User",
                table: "Links",
                column: "User");

            migrationBuilder.CreateIndex(
                name: "IX_LinkTag_TagsName",
                table: "LinkTag",
                column: "TagsName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LinkTag");

            migrationBuilder.DropTable(
                name: "Links");

            migrationBuilder.DropTable(
                name: "Tags");
        }
    }
}
