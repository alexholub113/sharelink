# ShareLink.Api

## Database
### Setup database locally
run `docker compose -f docker-compose.deps.yaml -f docker-compose.deps.local.yaml up -d`
additionally with database pgAdmin will be deployed.

### EF
- To update db `dotnet ef database update -- "../ShareLink.Web/appsettings.json" "ShareLink"` from `src\ShareLink.Dal`
- To add migration `dotnet ef migrations add {migrationName} -- "../ShareLink.Web/appsettings.json" "ShareLink"` from from `src\ShareLink.Dal`
- To rollback last migration `dotnet ef database update {previousMigrationName} -- "../ShareLink.Web/appsettings.json" "ShareLink"` from from `src\ShareLink.Dal`
- To remove the last migration `dotnet ef migrations remove -- "../ShareLink.Web/appsettings.json" "ShareLink"` from from `src\ShareLink.Dal`

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