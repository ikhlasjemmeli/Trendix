using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using shop.Core.Dtos;
using shop.Core.Interfaces;

namespace shop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUnitOfWork _unitOfWork;
        public UserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var Users = _unitOfWork.Users.GetAll();

            return Ok(Users);
        }

        [HttpPost("Authenticate")]
        public async Task<ActionResult> Authenticate([FromBody] UserDto user)
        {
            var token = await _unitOfWork.Users.Authenticate(user);
            var connectedUser = _unitOfWork.Users.getUserInformationFormJwtToken(token);
            return Ok(new { Token = token, ConnectedUser = connectedUser });
        }
    }
}
