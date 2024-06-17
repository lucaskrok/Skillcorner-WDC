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
      {
        id: "player_birthdate",
        alias: "Player Birthdate",
        dataType: tableau.dataTypeEnum.date,
      }
      // Remove the empty object or add a column definition here
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

    var playersCols = [
      { id: "id", alias: "ID", dataType: tableau.dataTypeEnum.int },
      {
        id: "first_name",
        alias: "First Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "last_name",
        alias: "Last Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "short_name",
        alias: "Short Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "birthday",
        alias: "Birthday",
        dataType: tableau.dataTypeEnum.date,
      },
      {
        id: "trackable_object",
        alias: "Trackable Object",
        dataType: tableau.dataTypeEnum.int,
      },
      { id: "gender", alias: "Gender", dataType: tableau.dataTypeEnum.string },
      // Add other columns if needed
    ];

    var playersTableSchema = {
      id: "players",
      alias: "Players Data",
      columns: playersCols,
    };

    schemaCallback([
      physicalDataTableSchema,
      competitionEditionsTableSchema,
      playersTableSchema,
    ]);
  };

  myConnector.getData = function (table, doneCallback) {
    var connectionData = JSON.parse(tableau.connectionData);
    var parameterValues = connectionData.parameters;
    var token = connectionData.token;
    var competition = parameterValues.competition; // Retrieve the competition value

    if (table.tableInfo.id === "physicalData") {
      fetchPhysicalData(table, parameterValues, token, doneCallback);
    } else if (table.tableInfo.id === "competitionEditions") {
      fetchCompetitionEditionsData(table, token, doneCallback);
    } else if (table.tableInfo.id === "players") {
      fetchPlayersData(table, token, competition, doneCallback); // Pass the competition parameter value
    }
  };

  function fetchPhysicalData(table, parameterValues, token, doneCallback) {
    // Construct the query string for the API call
    var queryString = "";

    // Add non-empty fields to the query string
    if (parameterValues.competition_edition)
      queryString += "&=competition_edition=" + parameterValues.season;
    if (parameterValues.season)
      queryString += "&season=" + parameterValues.season;
    if (parameterValues.competition)
      queryString += "&competition=" + parameterValues.competition;
    if (parameterValues.match) queryString += "&match=" + parameterValues.match;
    if (parameterValues.team) queryString += "&team=" + parameterValues.team;
    if (parameterValues.group_by)
      queryString += "&group_by=" + parameterValues.group_by;

    // Construct the complete API URL for physical data
    var apiUrl =
      "https://skillcorner.com/api/physical/?data_version=3&" +
      queryString.slice(1) + // Remove leading "&" if present
      "&token=" +
      token;

    console.log("Physical Data API URL:", apiUrl);

    $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      success: function (data) {
        var tableData = [];
        console.log("Data received:", data);

        // Access the results property before iterating
        data.results.forEach(function (record) {
          tableData.push({
            player_name: record.player_name,
            player_short_name: record.player_short_name,
            player_id: record.player_id,
            player_birthdate: record.player_birthdate,

            // Map other fields as needed
          });
        });

        table.appendRows(tableData);
        doneCallback();
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error(
          "Error while fetching physical data:",
          textStatus,
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
        console.log("Competition Editions Data received:", data);

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
          "Error while fetching competition editions data:",
          textStatus,
          errorThrown
        );
        tableau.abortWithError(
          "Failed to get competition editions data from SkillCorner API"
        );
      },
    });
  }
  function fetchPlayersData(table, token, competition, doneCallback) {
    var apiUrl =
        "https://skillcorner.com/api/players/?competition=" +
        competition +
        "&token=" +
        token;
    console.log("Players API URL:", apiUrl);

    $.ajax({
        url: apiUrl,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var tableData = [];
            console.log("Players Data received:", data);

            data.results.forEach(function (record) {
                tableData.push({
                    id: record.id,
                    first_name: record.first_name,
                    last_name: record.last_name,
                    short_name: record.short_name,
                    birthday: record.birthday,
                    trackable_object: record.trackable_object,
                    gender: record.gender,
                });
            });

            table.appendRows(tableData);
            doneCallback();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error(
                "Error while fetching players data:",
                textStatus,
                errorThrown
            );
            tableau.abortWithError(
                "Failed to get players data from SkillCorner API"
            );
        }
    });
} // <-- Add this closing curly brace

tableau.registerConnector(myConnector);

// Create event listeners for when the user submits the form
$(document).ready(function () {
    $("#getData").click(function () {
      var competition_edition = $("#competition_edition").val().trim();  
      var season = $("#season").val().trim(); // Directly store string value
        var competition = $("#competition").val().trim();
        var match = $("#match").val().trim();
        var team = $("#team").val().trim();
        var group_by = $("#group_by").val().trim();

        var token = $("#token").val();

        var parameters = {
            match: match ? match : "",
            team: team ? team : "",
            season: season ? season : "",
            competition: competition ? competition : "",
            group_by: group_by ? group_by : "",
        };

        tableau.connectionData = JSON.stringify({
            parameters: parameters,
            token: token,
        });
        tableau.connectionName = "SkillCorner Data";
        tableau.submit();
    });
});
