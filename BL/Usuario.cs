

using DL;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace BL
{
    public class Usuario
    {
        private readonly MjimenezUsuariosContext _context;

        // Constructor con inyección de dependencias
        public Usuario(MjimenezUsuariosContext context)
        {
            _context = context;
        }
        //SPEF
        public ML.Result GetAllSPEF()
        {
            ML.Result result = new ML.Result();
            try
            {
                var usuarios = _context.Usuarios.FromSqlRaw("EXEC GetAllUsuario").ToList();

                if (usuarios != null)
                {
                    result.Objects = new List<object>();

                    foreach (var item in usuarios)
                    {
                        ML.Usuario usuario = new ML.Usuario();
                        

                        usuario.IdUsuario = item.IdUsuario;
                        usuario.UserName = item.UserName;
                        usuario.Nombre = item.Nombre;
                        usuario.ApellidoPaterno = item.ApellidoPaterno;
                        usuario.ApellidoMaterno = item.ApellidoMaterno;
                        usuario.Email = item.Email;
                        usuario.Password = item.Password;
                        usuario.FechaNacimiento = item.FechaNacimiento.ToDateTime(TimeOnly.MinValue);
                        usuario.Sexo = item.Sexo;
                        usuario.Telefono = item.Telefono;
                        usuario.Celular = item.Celular;
                        usuario.Estatus = item.Estatus;
                        usuario.CURP = item.Curp;
                        usuario.Imagen = item.Imagen;

                        usuario.idRol = item.IdRol ?? 0;
                        usuario.Rol = new ML.Rol
                        {
                            IdRol = item.IdRol ?? 0,
                        };

                        result.Objects.Add(usuario);
                    }

                    result.Correct = true;
                }
                else
                {
                    result.Correct = false;
                    result.ErrorMessage = "No se encontraron datos";
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
                result.Ex = ex;
            }

            return result;
        }

        public ML.Result AddSPEF(ML.Usuario usuario)
        {
            ML.Result result = new ML.Result();
            try
            {
                int rowsAffected = _context.Database.ExecuteSqlRaw(
                    "EXEC AddUsuario @UserName, @Nombre, @ApellidoPaterno, @ApellidoMaterno, @Email, @Password, @FechaNacimiento, @Sexo, @Telefono, @Celular, @Estatus, @CURP, @idRol",
                    new SqlParameter("@UserName", usuario.UserName ?? (object)DBNull.Value),
                    new SqlParameter("@Nombre", usuario.Nombre ?? (object)DBNull.Value),
                    new SqlParameter("@ApellidoPaterno", usuario.ApellidoPaterno ?? (object)DBNull.Value),
                    new SqlParameter("@ApellidoMaterno", (object?)usuario.ApellidoMaterno ?? DBNull.Value),
                    new SqlParameter("@Email", usuario.Email ?? (object)DBNull.Value),
                    new SqlParameter("@Password", usuario.Password ?? (object)DBNull.Value),
                    new SqlParameter("@FechaNacimiento", (object?)usuario.FechaNacimiento ?? DBNull.Value), 
                    new SqlParameter("@Sexo", usuario.Sexo ?? (object)DBNull.Value),
                    new SqlParameter("@Telefono", usuario.Telefono ?? (object)DBNull.Value),
                    new SqlParameter("@Celular", (object?)usuario.Celular ?? DBNull.Value),
                    new SqlParameter("@Estatus", usuario.Estatus),
                    new SqlParameter("@CURP", (object?)usuario.CURP ?? DBNull.Value),
                    //new SqlParameter("@Imagen", usuario.Imagen == null),
                    new SqlParameter("@idRol", usuario.idRol)
                );

                result.Correct = rowsAffected > 0;
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
                result.Ex = ex;
            }
            return result;
        }


        public ML.Result DeleteSPEF(int idUsuario) 
        {
            ML.Result result = new ML.Result();
            try
            {
                _context.Database.ExecuteSqlRaw(
                    "EXEC DeleteUsuario @IdUsuario",
                    new SqlParameter("@IdUsuario", idUsuario)
                );

                result.Correct = true;
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
                result.Ex = ex;
            }
            return result;
        }

        //Update LINQ
        public ML.Result Update(ML.Usuario usuario)
        {
            ML.Result result = new ML.Result();
            try
            {
                var query = _context.Usuarios.FirstOrDefault(usuarioEntity => usuarioEntity.IdUsuario == usuario.IdUsuario); //Toma el primero sin lanzar excepcion

                if (query != null)
                {
                    query.UserName = usuario.UserName;
                    query.Nombre = usuario.Nombre;
                    query.ApellidoPaterno = usuario.ApellidoPaterno;
                    query.ApellidoMaterno = usuario.ApellidoMaterno;
                    query.Email = usuario.Email;
                    query.Password = usuario.Password;
                    usuario.FechaNacimiento = usuario.FechaNacimiento;
                    query.Sexo = usuario.Sexo;
                    query.Telefono = usuario.Telefono;
                    query.Celular = usuario.Celular;
                    query.Estatus = usuario.Estatus;
                    query.Curp = usuario.CURP;
                    query.Imagen = null;
                    query.IdRol = usuario.idRol;

                    _context.SaveChanges();
                    result.Correct = true;
                }
                else
                {
                    result.Correct = false;
                    result.ErrorMessage = "Usuario no encontrado para actualizar";
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
                result.Ex = ex;
            }
            return result;
        }

        //GetById LINQ
        public ML.Result GetById(int idUsuario) 
        {
            ML.Result result = new ML.Result();
            try 
            {
                var item = _context.Usuarios.FirstOrDefault(usuario => usuario.IdUsuario == idUsuario);

                if (item != null)
                {
                    ML.Usuario usuario = new ML.Usuario();
                    usuario.Rol = new ML.Rol();

                    usuario.IdUsuario = item.IdUsuario;
                    usuario.UserName = item.UserName;
                    usuario.Nombre = item.Nombre;
                    usuario.ApellidoPaterno = item.ApellidoPaterno;
                    usuario.ApellidoMaterno = item.ApellidoMaterno;
                    usuario.Email = item.Email;
                    usuario.Password = item.Password;
                    usuario.FechaNacimiento =item.FechaNacimiento.ToDateTime(TimeOnly.MinValue);
                    usuario.Sexo = item.Sexo;
                    usuario.Telefono = item.Telefono;
                    usuario.Celular = item.Celular;
                    usuario.Estatus = item.Estatus;
                    usuario.CURP = item.Curp;
                    usuario.Imagen = item.Imagen;

                    if (item.IdRol != null)
                    {
                        usuario.idRol = item.IdRol.Value;
                    }

                    result.Object = usuario;
                    result.Correct = true;
                }
                else
                {
                    result.Correct = false;
                    result.ErrorMessage = "Usuario no encontrado";
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
                result.Ex = ex;
            }
            return result;
        }
    }
}
