namespace ML
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string UserName { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string? ApellidoMaterno { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public string Sexo { get; set; }
        public string Telefono { get; set; }
        public string? Celular { get; set; }
        public bool Estatus { get; set; }
        public string? CURP { get; set; }
        public byte[]? Imagen { get; set; }
        public int idRol { get; set; }
        public Rol? Rol { get; set; }
    }
}
