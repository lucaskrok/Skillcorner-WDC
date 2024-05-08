(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    // Define columns for physical data table
    var physicalDataCols = [
      {
        id: "match_id",
        alias: "Match ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "player_id",
        alias: "Player ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "team_id",
        alias: "Team ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "position",
        alias: "Position",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "group",
        alias: "Group",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "competition_id",
        alias: "Competition ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "competition_edition_id",
        alias: "Competition Edition ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "season_id",
        alias: "Season ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "quality_check",
        alias: "Quality Check",
        dataType: tableau.dataTypeEnum.bool,
      },
      {
        id: "distance_1",
        alias: "Distance 1",
        dataType: tableau.dataTypeEnum.int,
      },
      // Define other columns for physical data table
    ];

    var physicalDataTableSchema = {
      id: "physicalData",
      alias: "Physical Data",
      columns: physicalDataCols,
    };

    // Define columns for competition editions data table
    var competitionEditionsCols = [
      {
        id: "id",
        alias: "ID",
        dataType: tableau.dataTypeEnum.int,
      },
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
      {
        id: "name",
        alias: "Name",
        dataType: tableau.dataTypeEnum.string,
      },
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
    // Get the parameter values and token from tableau.connectionData
    var connectionData = JSON.parse(tableau.connectionData);
    var parameterValues = connectionData.parameters;
    var token = connectionData.token;

    if (table.tableInfo.id === "physicalData") {
      // Fetch physical data
      fetchPhysicalData(table, parameterValues, token, doneCallback);
    } else if (table.tableInfo.id === "competitionEditions") {
      // Fetch competition editions data
      fetchCompetitionEditionsData(table, token, doneCallback);
    }
  };

  // Function to fetch physical data
  function fetchPhysicalData(table, parameterValues, token, doneCallback) {
    // Construct the query string for the API call
    var queryString = "";

    // Add non-empty fields to the query string
    if (parameterValues.season)
      queryString += "&season=" + parameterValues.season;
    if (parameterValues.competition)
      queryString += "&competition=" + parameterValues.competition;
    if (parameterValues.match) queryString += "&match=" + parameterValues.match;
    if (parameterValues.team) queryString += "&team=" + parameterValues.team;

    // Construct the complete API URL for physical data
    var apiUrl =
      "https://skillcorner.com/api/physical/?" +
      queryString.slice(1) + // Remove leading "&" if present
      "&average=false&api_version=v2&token=" +
      token;

    console.log("Physical Data API URL:", apiUrl); // Log the API URL for debugging

    $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      success: function (data) {
        var tableData = [];

        data.forEach(function (record) {
          // Map the response fields to the correct column names
          tableData.push({
            match_id: record.match_id,
            player_id: record.player_id,
            team_id: record.team_id,
            position: record.position,
            group: record.group,
            competition_id: record.competition_id,
            competition_edition_id: record.competition_edition_id,
            season_id: record.season_id,
            quality_check: record.quality_check,
            distance_1: record["Distance 1"],
            // Map other fields similarly
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

  // Function to fetch competition editions data
  function fetchCompetitionEditionsData(table, token, doneCallback) {
    // Construct the complete API URL for competition editions data
    var competitionEditionsApiUrl =
      "https://skillcorner.com/api/competition_editions/?user=true&token=" +
      token;

    console.log("Competition Editions API URL:", competitionEditionsApiUrl); // Log the API URL for debugging

    $.ajax({
      url: competitionEditionsApiUrl,
      type: "GET",
      dataType: "json",
      success: function (competitionEditionsData) {
        var competitionEditionsTableData = [];

        competitionEditionsData.results.forEach(function (record) {
          // Map the response fields to the correct column names
          competitionEditionsTableData.push({
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

        // Append rows to the competition editions table
        table.appendRows(competitionEditionsTableData);
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

  // Create event listeners for when the user submits the form
  $(document).ready(function () {
    $("#getData").click(function () {
      // Get the parameter values from the input fields and store them in an object
      var parameterValues = {
        season: $("#season").val().trim(),
        competition: $("#competition").val().trim(),
        match: $("#match").val().trim(),
        team: $("#team").val().trim(),
      };

      // Validate the parameter values if needed

      // Get the token value
      var token = $("#token").val().trim();

      // Set tableau.connectionData to include both parameter values and token
      tableau.connectionData = JSON.stringify({
        parameters: parameterValues,
        token: token,
      });

      // Set the connection name
      tableau.connectionName = "SkillCorner Data";

      // Submit the connector object to Tableau
      tableau.submit();
    });
  });
})();
