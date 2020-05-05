FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash \
    && apt-get install nodejs -yq
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash \
    && apt-get install nodejs -yq
WORKDIR /src
COPY ["Timeline.Web/Timeline.csproj", "Timeline.Web/"]
RUN dotnet restore "Timeline.Web/Timeline.csproj"

COPY ["Timeline.Web/ClientApp/package.json", "Timeline.Web/ClientApp/"]

RUN cd Timeline.Web/ClientApp \
    && npm i --silent

COPY . .
WORKDIR "/src/Timeline.Web"
RUN dotnet build "Timeline.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Timeline.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Timeline.dll"]