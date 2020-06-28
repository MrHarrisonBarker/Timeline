using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Timeline.Neo.Contexts;
using Timeline.Neo.Helpers;
using Timeline.Neo.Models;


namespace Timeline.Neo.Services
{
    public interface IUserService
    {
        UserViewModel Authenticate(string email, string password);
        Task<int> CreateUser(User user);
        IEnumerable<User> GetAll();
    }

    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly TimelineContext _timelineContext;
        private readonly IMapper _mapper;
        
        public UserService(TimelineContext timelineContext, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _timelineContext = timelineContext;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public UserViewModel Authenticate(string email, string password)
        {
            PasswordHasher<UserViewModel> hasher = new PasswordHasher<UserViewModel>(
                new OptionsWrapper<PasswordHasherOptions>(
                    new PasswordHasherOptions()
                    {
                        CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2
                    })
            );

            Console.WriteLine($"Authenticating: {email}");

            var user = _timelineContext.Users.Select(x => new UserViewModel
            {
                Id = x.Id,
                Avatar = x.Avatar,
                DisplayName = x.DisplayName,
                Email = x.Email,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Token = x.Token,
                Password = x.Password,
                Assignments = x.Assignments.Select(assignment => _mapper.Map<MinimalJobViewModel>(assignment.Job)).ToList(),
                BoardMemberships = x.BoardMemberships.Select(membership => _mapper.Map<MinimalBoardViewModel>(membership.Board)).ToList(),
                Employments = x.Employments.Select(employment => _mapper.Map<MinimalTeamViewModel>(employment.Team)).ToList()
            }).SingleOrDefault(x => x.Email == email);

            if (user == null)
            {
                Console.WriteLine("Cant find user");
                return null;
            }

            if (hasher.VerifyHashedPassword(user, user.Password, password) == PasswordVerificationResult.Failed)
            {
                Console.WriteLine("Password incorrect");
                return null;
            }

            // Console.WriteLine($"database password: {user.Password}");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            user.Password = null;
            
            return user;
        }

        public async Task<int> CreateUser(User user)
        {
            PasswordHasher<User> hasher = new PasswordHasher<User>(
                new OptionsWrapper<PasswordHasherOptions>(
                    new PasswordHasherOptions()
                    {
                        CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2
                    })
            );


            user.Password = hasher.HashPassword(user, user.Password);

            _timelineContext.Users.Add(user);
            return await _timelineContext.SaveChangesAsync();
        }

        public IEnumerable<User> GetAll()
        {
            return _timelineContext.Users.WithoutPasswords();
        }

        private string HashPassword(string password)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashed;
        }
    }
}