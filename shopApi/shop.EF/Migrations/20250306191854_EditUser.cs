﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace shop.EF.Migrations
{
    /// <inheritdoc />
    public partial class EditUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Users",
                newName: "Email");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "Description");
        }
    }
}
