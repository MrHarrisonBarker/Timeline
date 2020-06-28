using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Timeline.Neo.Contexts;
using Timeline.Neo.Models;

namespace Timeline.Neo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly TimelineContext _timelineContext;
        private readonly IMapper _mapper;

        public BoardController(TimelineContext timelineContext, IMapper mapper)
        {
            _timelineContext = timelineContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Board>>> GetBoards()
        {
            return await _timelineContext.Boards.Include(x => x.BoardMembers).ThenInclude(x => x.User)
                .Include(x => x.Jobs).ToListAsync();
        }

        [HttpGet("Get")]
        public async Task<ActionResult<GetBoardViewModel>> GetBoard(Guid boardId)
        {
            var board = _timelineContext.Boards.Select(x => new GetBoardViewModel
            {
                Id = x.Id,
                Avatar = x.Avatar,
                Description = x.Description,
                Name = x.Name,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                Accent = x.Accent,
                InviteToken = x.InviteToken,
                Finished = x.Finished,
                Permanent = x.Permanent,
                Team = _mapper.Map<MinimalTeamViewModel>(x.Team),
                Jobs = x.Jobs.Select(job => new JobOnBoardViewModel
                {
                    Id = job.Id,
                    Name = job.Name,
                    Archived = job.Archived,
                    Backlog = job.Backlog,
                    Commit = job.Commit,
                    Deadline = job.Deadline,
                    Description = job.Description,
                    Finished = job.Finished,
                    Flagged = job.Flagged,
                    Pings = job.Pings,
                    Priority = job.Priority,
                    StartDate = job.StartDate,
                    JobType = job.JobType,
                    JobStatus = job.JobStatus,
                    EndDate = job.EndDate,
                    AssociatedUrl = job.AssociatedUrl,
                    Team = _mapper.Map<SuperMinimalTeamViewModel>(job.Team),
                    AssignedMembers = job.AssignedMembers
                        .Select(member => _mapper.Map<SuperMinimalUserViewModel>(member.User)).ToList(),
                }).ToList(),
                BoardMembers = x.BoardMembers.Select(member => _mapper.Map<MinimalUserViewModel>(member.User)).ToList()
            }).FirstOrDefaultAsync(x => x.Id == boardId);

            return await board;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Board>> CreateBoard([FromBody] NewBoard newBoard)
        {
            var team = await _timelineContext.Teams
                .Include(x => x.Boards)
                .FirstOrDefaultAsync(x => x.Id == newBoard.TeamId);

            var user = await _timelineContext.Users
                .Include(x => x.BoardMemberships)
                .FirstOrDefaultAsync(x => x.Id == newBoard.UserId);

            if (team == null || user == null)
            {
                return BadRequest();
            }

            Board board = new Board();
            board = newBoard.Board;
            board.Team = team;
            board.BoardMembers = new List<BoardMember>();

            if (user.BoardMemberships == null)
            {
                user.BoardMemberships = new List<BoardMember>();
            }

            var jobs = _timelineContext.Jobs.Where(job => board.Jobs.Contains(job)).ToList();

            board.Jobs = new List<Job>();

            await _timelineContext.Boards.AddAsync(board);

            jobs.ForEach(job =>
            {
                Console.WriteLine($"Adding board to job {job.Name}");
                job.Board = board;
            });

            var boardMember = new BoardMember {BoardId = board.Id, UserId = user.Id};

            board.BoardMembers = new List<BoardMember> {boardMember};


            // BoardMember boardMember = new BoardMember {BoardId = board.Id, UserId = user.Id};

            // Console.WriteLine($"Creating board member {boardMember.BoardId} : {boardMember.UserId}");
            //
            // user.BoardMemberships.Add(boardMember);
            // added.Entity.BoardMembers.Add(boardMember);

            // await _timelineContext.BoardMembers.AddAsync(boardMember);


            await _timelineContext.SaveChangesAsync();

            return Ok(board);
        }

        [HttpPost("complete")]
        public async Task<ActionResult<bool>> CompleteBoard(Guid boardId)
        {
            var board = await _timelineContext.Boards.Include(x => x.Jobs).FirstOrDefaultAsync(x => x.Id == boardId);

            if (board == null)
            {
                return BadRequest(false);
            }

            board.Finished = true;

            var jobs = _timelineContext.Jobs.Where(job => board.Jobs.Contains(job)).ToList();

            jobs.ForEach(job =>
            {
                Console.WriteLine($"Archiving job : {job.Id}");
                job.Archived = true;
            });

            await _timelineContext.SaveChangesAsync();

            return Ok(true);
        }

        [HttpPost("delete")]
        public async Task<ActionResult<bool>> DeleteBoard(Guid boardId, [FromBody] warehouseJobs warehouseJobs)
        {
            var board = await _timelineContext.Boards.Include(x => x.Jobs).FirstOrDefaultAsync(x => x.Id == boardId);

            if (board == null)
            {
                return BadRequest(false);
            }

            var jobs = _timelineContext.Jobs.Where(job => board.Jobs.Contains(job)).ToList();

            if (warehouseJobs.warehouse)
            {
                jobs.ForEach(job => job.Board = null);
            }
            else
            {
                jobs.ForEach(job => job.Archived = true);
            }

            _timelineContext.Boards.Remove(board);

            await _timelineContext.SaveChangesAsync();

            return Ok(true);
        }

        public class warehouseJobs
        {
            public bool warehouse { get; set; }
        }
        
        public class NewBoard
        {
            public Guid UserId { get; set; }
            public Guid TeamId { get; set; }
            public Board Board { get; set; }
        }
    }
}