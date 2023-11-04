# ShareLink.Api

## Database
### Setup database locally
run `docker compose -f docker-compose.deps.yaml -f docker-compose.deps.local.yaml up -d`
additionally with database pgAdmin will be deployed.

### EF
- To update db `dotnet ef database update --context ApplicationDbContext -- "../ShareLink.Web/appsettings.Development.json"` from `src\ShareLink.Migrations`
- To add migration `dotnet ef migrations add {migrationName} --context ApplicationDbContext --output-dir Migrations/ApplicationMigrations -- "../ShareLink.Web/appsettings.Development.json"` from from `src\ShareLink.Migrations`
- To rollback last migration `dotnet ef database update {previousMigrationName} --context ApplicationDbContext -- "../ShareLink.Web/appsettings.Development.json"` from from `src\ShareLink.Migrations`
- To remove the last migration `dotnet ef migrations remove --context ApplicationDbContext -- "../ShareLink.Web/appsettings.Development.json"` from from `src\ShareLink.Migrations`

### EF Identity
- To update db `dotnet ef database update --context IdentityDbContext -- "../ShareLink.Web/appsettings.Development.json"` from `src\ShareLink.Migrations`
- To add migration `dotnet ef migrations add {migrationName} --context IdentityDbContext --output-dir Migrations/IdentityMigrations -- "../ShareLink.Web/appsettings.Development.json"` from from `src\ShareLink.Migrations`

### PG Admin
PG Admin can be reached at http://localhost:5050/. Use password `postgres`.

To connect to server right click on `Servers`, select `Create` -> `Server...`
Server props:
- name: `domainlist`
- host: `postgres`
- port: `5432`
- username: `testuser`
- password: `testuser`

# Tests
## Run with docker-compose
run `docker-compose -f docker-compose.deps.yaml -f docker-compose.deps.local.yaml up -d && dotnet test`

## Troubleshoot
### I'm getting "Unrecognized option '--'" error
Update dotnet-ef version. To do so run:
`dotnet tool update --global dotnet-ef --version 5.0.0` with correct version.
