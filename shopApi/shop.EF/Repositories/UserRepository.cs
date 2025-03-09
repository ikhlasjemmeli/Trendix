﻿using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using shop.Core.Dtos;
using shop.Core.Interfaces;
using shop.Core.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace shop.EF.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        public User GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email == email);
        }

        public User getUserInformationFormJwtToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("mfslkdfjsdfmsldkfjsdfjsdf123456888797867698697");
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = jwtToken.Claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            var firstName = jwtToken.Claims.FirstOrDefault(x => x.Type == "FirstName")?.Value;
            var lastName = jwtToken.Claims.FirstOrDefault(x => x.Type == "LastName")?.Value;
            var email = jwtToken.Claims.FirstOrDefault(x => x.Type == "Email")?.Value;


            return new User
            {

                Id = int.Parse(userId),
                FirstName = firstName,
                LastName = lastName,
                Email = email
            };
        }

        private string GenerateToken(string Email)
        {
            var user = GetUserByEmail(Email);
            if (user != null)
            {
                List<Claim> claims = new List<Claim>
                {
                    new Claim("Email",Email),
                    new Claim("Id", user.Id.ToString()),
                    new Claim("FirstName",user.FirstName),
                    new Claim("LastName",user.LastName)
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mfslkdfjsdfmsldkfjsdfjsdf123456888797867698697"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
                var token = new JwtSecurityToken
                    (
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                    );
                var jwt = new JwtSecurityTokenHandler().WriteToken(token);
                return jwt;
            }
            return null;
        }

        public async Task<string> Authenticate(UserDto user)
        {
            if (user != null)
            {
                User account = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email && u.Password == user.Password);
                if (account != null)
                {
                    return GenerateToken(user.Email);
                }
                else
                {
                    return "Error: Incorrect email or password. Please try again.";
                }
            }
            else
            {
                return "Error: No data provided. Please check your input.";
            }
        }
    }
}
