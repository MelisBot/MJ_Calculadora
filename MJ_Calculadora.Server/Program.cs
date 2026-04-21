

using Microsoft.EntityFrameworkCore;



namespace MJ_Calculadora.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Conexión a la base desde la capa DL
            var conString = builder.Configuration.GetConnectionString("MJimenezUsuarios") ?? throw new InvalidOperationException("Connection string 'MJimenezUsuarios'" + "not found.");

            builder.Services.AddDbContext<DL.MjimenezUsuariosContext>(options =>
                options.UseSqlServer(conString));

            builder.Services.AddScoped<BL.Usuario>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins", policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });

            var app = builder.Build();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowSpecificOrigins");
            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
