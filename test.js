(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    var physicalDataCols = [
      {
        id: "player_name",
        alias: "Player Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "player_short_name",
        alias: "Player Short Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "player_id",
        alias: "Player ID",
        dataType: tableau.dataTypeEnum.int,
      },
      // Define other columns for physical data table
    ];

    var physicalDataTableSchema = {
      id: "physicalData",
      alias: "Physical Data",
      columns: physicalDataCols,
    };

    var competitionEditionsCols = [
      { id: "id", alias: "ID", dataType: tableau.dataTypeEnum.int },
      {
        id: "competition_id",
        alias: "Competition ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "competition_area",
        alias: "Competition Area",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "competition_name",
        alias: "Competition Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "competition_gender",
        alias: "Competition Gender",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "competition_age_group",
        alias: "Competition Age Group",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "season_id",
        alias: "Season ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "season_start_year",
        alias: "Season Start Year",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "season_end_year",
        alias: "Season End Year",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "season_name",
        alias: "Season Name",
        dataType: tableau.dataTypeEnum.string,
      },
      { id: "name", alias: "Name", dataType: tableau.dataTypeEnum.string },
      // Add other columns for competition editions data table
    ];

    var competitionEditionsTableSchema = {
      id: "competitionEditions",
      alias: "Competition Editions Data",
      columns: competitionEditionsCols,
    };

    schemaCallback([physicalDataTableSchema, competitionEditionsTableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    var connectionData = JSON.parse(tableau.connectionData);
    var parameterValues = connectionData.parameters;
    var token = connectionData.token;

    if (table.tableInfo.id === "physicalData") {
      fetchPhysicalData(table, parameterValues, token, doneCallback);
    } else if (table.tableInfo.id === "competitionEditions") {
      fetchCompetitionEditionsData(table, token, doneCallback);
    }
  };

  function fetchPhysicalData(table, parameterValues, token, doneCallback) {
    var queryString = "";

    if (parameterValues.season)
      queryString += "&season=" + parameterValues.season;
    if (parameterValues.competition)
      queryString += "&competition=" + parameterValues.competition;
    if (parameterValues.match) queryString += "&match=" + parameterValues.match;
    if (parameterValues.team) queryString += "&team=" + parameterValues.team;

    var apiUrl =
      "https://skillcorner.com/api/physical/?data_version=3" +
      (queryString ? queryString : "") + // Only add queryString if it's not empty
      "&group_by=&token=" +
      token;

    console.log("Physical Data API URL:", apiUrl);

    $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      success: function (data) {
        var tableData = [];

        data.forEach(function (record) {
          tableData.push({
            player_name: record.player_name,
            player_short_name: record.player_short_name,
            player_id: record.player_id,
            // Map other fields as needed
          });
        });

        table.appendRows(tableData);
        doneCallback();
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error(
          "Error while fetching physical data: " + textStatus,
          errorThrown
        );
        tableau.abortWithError(
          "Failed to get physical data from SkillCorner API"
        );
      },
    });
  }

  function fetchCompetitionEditionsData(table, token, doneCallback) {
    var apiUrl =
      "https://skillcorner.com/api/competition_editions/?user=true&token=" +
      token;

    console.log("Competition Editions API URL:", apiUrl);

    $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      success: function (data) {
        var tableData = [];

        data.results.forEach(function (record) {
          tableData.push({
            id: record.id,
            competition_id: record.competition.id,
            competition_area: record.competition.area,
            competition_name: record.competition.name,
            competition_gender: record.competition.gender,
            competition_age_group: record.competition.age_group,
            season_id: record.season.id,
            season_start_year: record.season.start_year,
            season_end_year: record.season.end_year,
            season_name: record.season.name,
            name: record.name,
          });
        });

        table.appendRows(tableData);
        doneCallback();
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error(
          "Error while fetching competition editions data: " + textStatus,
          errorThrown
        );
        tableau.abortWithError(
          "Failed to get competition editions data from SkillCorner API"
        );
      },
    });
  }

  tableau.registerConnector(myConnector);

  $(document).ready(function () {
    $("#dataForm").submit(function (event) {
      event.preventDefault();

      var match = $("#match").val();
      var team = $("#team").val();
      var season = $("#season").val();
      var competition = $("#competition").val();
      var token = $("#token").val();

      var parameters = {
        match: match ? match : "",
        team: team ? team : "",
        season: season ? season : "",
        competition: competition ? competition : "",
      };

      tableau.connectionData = JSON.stringify({
        parameters: parameters,
        token: token,
      });
      tableau.connectionName = "SkillCorner Data";
      tableau.submit();
    });
  });
})();
