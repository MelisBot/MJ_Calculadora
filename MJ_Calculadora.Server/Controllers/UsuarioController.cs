using Microsoft.AspNetCore.Mvc;

namespace MJ_Calculadora.Server.Controllers
{
    [Route("api/[controller]")] // api/Usuario
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        // Inyección de la capa BL
        private readonly BL.Usuario _usuario;
        public UsuarioController(BL.Usuario usuario)
        {
            _usuario = usuario;
        }

        // GET ALL
        [HttpGet]
        public IActionResult GetAll()
        {
            ML.Result result = _usuario.GetAllSPEF();
            if (result.Correct)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // GET BY ID
        [HttpGet]
        [Route("{idUsuario}")]
        public IActionResult GetById(int idUsuario)
        {
            ML.Result result = _usuario.GetById(idUsuario);
            if (result.Correct)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // ADD
        [HttpPost]
        public IActionResult Add([FromBody] ML.Usuario usuario)
        {
            ML.Result result = _usuario.AddSPEF(usuario);
            if (result.Correct)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // UPDATE
        [HttpPut]
        [Route("{idUsuario}")]
        public IActionResult Update(int idUsuario, [FromBody] ML.Usuario usuario)
        {
            usuario.IdUsuario = idUsuario;
            ML.Result result = _usuario.Update(usuario);
            if (result.Correct)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // DELETE
        [HttpDelete]
        [Route("{idUsuario}")]
        public IActionResult Delete(int idUsuario)
        {
            ML.Result result = _usuario.DeleteSPEF(idUsuario);
            if (result.Correct)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }

}
