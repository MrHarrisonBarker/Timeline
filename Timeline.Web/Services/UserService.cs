using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Timeline.Contexts;
using Timeline.Helpers;
using Timeline.Models;

namespace Timeline.Services
{
    public interface IUserService
    {
        User Authenticate(string email, string password);
        Task<int> CreateUser(User user);
        IEnumerable<User> GetAll();
    }
    
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly TimelineContext _timelineContext;

        public UserService(TimelineContext timelineContext,IOptions<AppSettings> appSettings)
        {
            _timelineContext = timelineContext;
            _appSettings = appSettings.Value;
        }

        public User Authenticate(string email, string password)
        {
            PasswordHasher<User> hasher = new PasswordHasher<User>(
                new OptionsWrapper<PasswordHasherOptions>(
                    new PasswordHasherOptions() {
                        CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2
                    })
            );
            
            Console.WriteLine($"Authenticating: {email}");
            
            var user = _timelineContext.Users.SingleOrDefault(x => x.Email == email);
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
            
            Console.WriteLine($"database password: {user.Password}");
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            
            return user.WithoutPassword();
        }

        public async Task<int> CreateUser(User user)
        {
            PasswordHasher<User> hasher = new PasswordHasher<User>(
                new OptionsWrapper<PasswordHasherOptions>(
                    new PasswordHasherOptions() {
                        CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2
                    })
            ); 
            
            
            user.Password = hasher.HashPassword(user,user.Password);
            
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