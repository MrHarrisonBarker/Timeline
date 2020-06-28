﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Timeline.Contexts;

namespace Timeline.Migrations
{
    [DbContext(typeof(TimelineContext))]
    [Migration("20200603222001_userType")]
    partial class userType
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Timeline.Models.Affiliation", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("TeamId")
                        .HasColumnType("char(36)");

                    b.HasKey("UserId", "TeamId");

                    b.HasIndex("TeamId");

                    b.ToTable("Affiliation");
                });

            modelBuilder.Entity("Timeline.Models.Associations", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("JobId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("BoardId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("TeamId")
                        .HasColumnType("char(36)");

                    b.HasKey("UserId", "JobId", "BoardId", "TeamId");

                    b.HasIndex("BoardId");

                    b.HasIndex("JobId");

                    b.HasIndex("TeamId");

                    b.ToTable("Associations");
                });

            modelBuilder.Entity("Timeline.Models.Audit", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<int>("Action")
                        .HasColumnType("int");

                    b.Property<string>("Log")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Origin")
                        .HasColumnType("int");

                    b.Property<Guid?>("TeamId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.HasIndex("UserId");

                    b.ToTable("Audits");
                });

            modelBuilder.Entity("Timeline.Models.Board", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Accent")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("AvatarUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid>("InviteToken")
                        .HasColumnType("char(36)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("Board");
                });

            modelBuilder.Entity("Timeline.Models.BoardAffiliation", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("BoardId")
                        .HasColumnType("char(36)");

                    b.HasKey("UserId", "BoardId");

                    b.HasIndex("BoardId");

                    b.ToTable("BoardAffiliation");
                });

            modelBuilder.Entity("Timeline.Models.Job", b =>
                {
                    b.Property<Guid>("JobId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<bool>("Archived")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("AssociatedUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Commit")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid?>("CreatedById")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Finished")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Flagged")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("JobStatus")
                        .HasColumnType("int");

                    b.Property<int>("JobType")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Pings")
                        .HasColumnType("int");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("JobId");

                    b.HasIndex("CreatedById");

                    b.ToTable("Jobs");
                });

            modelBuilder.Entity("Timeline.Models.JobWorker", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("JobId")
                        .HasColumnType("char(36)");

                    b.HasKey("UserId", "JobId");

                    b.HasIndex("JobId");

                    b.ToTable("JobWorker");
                });

            modelBuilder.Entity("Timeline.Models.Team", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Accent")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("AvatarUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid>("InviteToken")
                        .HasColumnType("char(36)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid?>("OwnerId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Timeline.Models.TeamBoard", b =>
                {
                    b.Property<Guid>("BoardId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("TeamId")
                        .HasColumnType("char(36)");

                    b.HasKey("BoardId", "TeamId");

                    b.HasIndex("TeamId");

                    b.ToTable("TeamBoard");
                });

            modelBuilder.Entity("Timeline.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("AvatarUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("DisplayName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Email")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("FirstName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("LastName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Password")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Token")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Timeline.Models.Affiliation", b =>
                {
                    b.HasOne("Timeline.Models.Team", "Team")
                        .WithMany("TeamMembers")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Timeline.Models.User", "User")
                        .WithMany("Affiliations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Timeline.Models.Associations", b =>
                {
                    b.HasOne("Timeline.Models.Board", "Board")
                        .WithMany("Associations")
                        .HasForeignKey("BoardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Timeline.Models.Job", "Job")
                        .WithMany()
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Timeline.Models.Team", "Team")
                        .WithMany("Associations")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Timeline.Models.User", "User")
                        .WithMany("Associations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Timeline.Models.Audit", b =>
                {
                    b.HasOne("Timeline.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId");

                    b.HasOne("Timeline.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Timeline.Models.BoardAffiliation", b =>
                {
                    b.HasOne("Timeline.Models.Board", "Board")
                        .WithMany("BoardMembers")
                        .HasForeignKey("BoardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Timeline.Models.User", "User")
                        .WithMany("BoardAffiliations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Timeline.Models.Job", b =>
                {
                    b.HasOne("Timeline.Models.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");
                });

            modelBuilder.Entity("Timeline.Models.JobWorker", b =>
                {
                    b.HasOne("Timeline.Models.Job", "Job")
                        .WithMany("AssociatedUsers")
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Timeline.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Timeline.Models.Team", b =>
                {
                    b.HasOne("Timeline.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId");
                });

            modelBuilder.Entity("Timeline.Models.TeamBoard", b =>
                {
                    b.HasOne("Timeline.Models.Board", "Board")
                        .WithMany()
                        .HasForeignKey("BoardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Timeline.Models.Team", "Team")
                        .WithMany("TeamBoards")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}