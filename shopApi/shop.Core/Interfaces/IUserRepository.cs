﻿using Microsoft.VisualBasic;
using shop.Core.Dtos;
using shop.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Core.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        User GetUserByEmail(string email);
        Task<string> Authenticate(UserDto user);
        User getUserInformationFormJwtToken(string token);

    }
}
