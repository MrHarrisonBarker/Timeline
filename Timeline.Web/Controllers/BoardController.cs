using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Timeline.Contexts;
using Timeline.Models;
using Timeline.Services;

namespace Timeline.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly TimelineContext _timelineContext;
        private readonly IAuditService _auditService;
        readonly ILogger<BoardController> _log;

        public BoardController(TimelineContext timelineContext, ILogger<BoardController> log,
            IAuditService auditService)
        {
            _timelineContext = timelineContext;
            _auditService = auditService;
            _log = log;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IList<Board>>> GetBoards()
        {
            return await _timelineContext.Board
                .Include(x => x.BoardMembers).ThenInclude(x => x.User)
                .Include(x => x.Associations).ThenInclude(x => x.Job)
                .ThenInclude(x => x.AssociatedUsers).ToListAsync();
        }

        [HttpGet("GetJobs")]
        public async Task<ActionResult<Board>> GetBoardJobs(Guid boardId)
        {
            return await _timelineContext.Board.Where(x => x.Id == boardId).Include(x => x.Jobs).FirstOrDefaultAsync();
        }

        [HttpGet("GetBoard")]
        public async Task<ActionResult<Board>> GetBoard(Guid boardId)
        {
            return await _timelineContext.Board
                .Include(x => x.Associations).ThenInclude(x => x.Job).ThenInclude(x => x.AssociatedUsers)
                .Include(x => x.BoardMembers).ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == boardId);
        }

        [HttpPost("JoinBoard")]
        public async Task<IActionResult> JoinBoard([FromBody] JoinBoard joinBoard)
        {
            var board = await _timelineContext.Board.Where(x => x.InviteToken == joinBoard.InviteToken)
                .Include(x => x.BoardMembers).FirstOrDefaultAsync();

            var user = await _timelineContext.Users.Where(x => x.Id == joinBoard.UserId).FirstOrDefaultAsync();

            if (board == null || user == null)
            {
                return BadRequest();
            }

            var boardAffiliation = new BoardAffiliation() {UserId = joinBoard.UserId, BoardId = board.Id};
            board.BoardMembers.Add(boardAffiliation);

            Audit audit = new Audit
            {
                Action = AuditAction.UserJoinedBoard,
                Log = ($"{boardAffiliation.UserId} joined board {boardAffiliation.BoardId}"),
                Origin = AuditOrigin.BoardController,
                Team = null,
                TimeStamp = DateTime.Now,
                User = user
            };
            await _auditService.CreateAudit(audit);

            await _timelineContext.SaveChangesAsync();

            Console.WriteLine($"board affiliation {boardAffiliation.UserId} : {boardAffiliation.BoardId}");
            _log.LogInformation("Creating board affiliation {userId} : {TeamId}", boardAffiliation.UserId,
                boardAffiliation.BoardId);

            return Ok(board);
        }

        [HttpPost("create")]
        public async Task<ActionResult<Board>> CreateBoard([FromBody] NewBoard newBoard)
        {
            var team = await _timelineContext.Teams.Include(x => x.TeamBoards)
                .FirstOrDefaultAsync(x => x.Id == newBoard.TeamId);
            var user = await _timelineContext.Users.Include(x => x.BoardAffiliations)
                .FirstOrDefaultAsync(x => x.Id == newBoard.UserId);

            if (team == null || user == null)
            {
                return BadRequest();
            }

            Board board = new Board();
            board = newBoard.Board;

            await _timelineContext.Board.AddAsync(board);

            await _timelineContext.SaveChangesAsync();

            TeamBoard teamBoard = new TeamBoard {BoardId = board.Id, TeamId = newBoard.TeamId};
            BoardAffiliation boardAffiliation = new BoardAffiliation {BoardId = board.Id, UserId = newBoard.UserId};

            Console.WriteLine($"Creating team board {board.Id} : {newBoard.TeamId}");
            Console.WriteLine($"Creating board affiliation {board.Id} : {newBoard.UserId}");

            team.TeamBoards.Add(teamBoard);
            user.BoardAffiliations.Add(boardAffiliation);

            await _timelineContext.SaveChangesAsync();

            return Ok(board);
        }
    }

    public class NewBoard
    {
        public Guid UserId { get; set; }
        public Guid TeamId { get; set; }
        public Board Board { get; set; }
    }

    public class JoinBoard
    {
        public Guid UserId { get; set; }
        public Guid InviteToken { get; set; }
    }
}