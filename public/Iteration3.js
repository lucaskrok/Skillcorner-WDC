(function () {
  // Create a new Web Data Connector (WDC) object
  var myConnector = tableau.makeConnector();

  // Define the schema for the data tables
  myConnector.getSchema = function (schemaCallback) {
    // Columns for the 'physicalData' table
    var physicalDataCols = [
      { id: "player_name", dataType: tableau.dataTypeEnum.string },
      { id: "player_short_name", dataType: tableau.dataTypeEnum.string },
      { id: "player_id", dataType: tableau.dataTypeEnum.int },
      { id: "player_birthdate", dataType: tableau.dataTypeEnum.date },
      { id: "team_name", dataType: tableau.dataTypeEnum.string },
      { id: "team_id", dataType: tableau.dataTypeEnum.int },
      { id: "match_name", dataType: tableau.dataTypeEnum.string },
      { id: "match_id", dataType: tableau.dataTypeEnum.int },
      { id: "match_date", dataType: tableau.dataTypeEnum.date },
      { id: "competition_name", dataType: tableau.dataTypeEnum.string },
      { id: "competition_id", dataType: tableau.dataTypeEnum.int },
      { id: "season_name", dataType: tableau.dataTypeEnum.string },
      { id: "season_id", dataType: tableau.dataTypeEnum.int },
      { id: "competition_edition_id", dataType: tableau.dataTypeEnum.int },
      { id: "position", dataType: tableau.dataTypeEnum.string },
      { id: "position_group", dataType: tableau.dataTypeEnum.string },
      { id: "minutes_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "physical_check_passed", dataType: tableau.dataTypeEnum.bool },
      { id: "total_distance_full_all", dataType: tableau.dataTypeEnum.float },
      {
        id: "total_metersperminute_full_all",
        dataType: tableau.dataTypeEnum.float,
      },
      { id: "running_distance_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "hsr_distance_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "hsr_count_full_all", dataType: tableau.dataTypeEnum.int },
      { id: "sprint_distance_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "sprint_count_full_all", dataType: tableau.dataTypeEnum.int },
      { id: "hi_distance_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "hi_count_full_all", dataType: tableau.dataTypeEnum.int },
      { id: "medaccel_count_full_all", dataType: tableau.dataTypeEnum.int },
      { id: "highaccel_count_full_all", dataType: tableau.dataTypeEnum.int },
      { id: "meddecel_count_full_all", dataType: tableau.dataTypeEnum.int },
      { id: "highdecel_count_full_all", dataType: tableau.dataTypeEnum.int },
      { id: "psv99", dataType: tableau.dataTypeEnum.float },
    ];

    // Schema definition for the 'physicalData' table
    var physicalDataTableSchema = {
      id: "physicalData",
      alias: "Physical Data",
      columns: physicalDataCols,
    };

    // Columns for the 'competitionEditionsData' table
    var competitionEditionsCols = [
      { id: "id", dataType: tableau.dataTypeEnum.int },
      { id: "competition_id", dataType: tableau.dataTypeEnum.int },
      { id: "competition_area", dataType: tableau.dataTypeEnum.string },
      { id: "competition_name", dataType: tableau.dataTypeEnum.string },
      { id: "competition_gender", dataType: tableau.dataTypeEnum.string },
      { id: "competition_age_group", dataType: tableau.dataTypeEnum.string },
      { id: "season_id", dataType: tableau.dataTypeEnum.int },
      { id: "season_start_year", dataType: tableau.dataTypeEnum.int },
      { id: "season_end_year", dataType: tableau.dataTypeEnum.int },
      { id: "season_name", dataType: tableau.dataTypeEnum.string },
      { id: "name", dataType: tableau.dataTypeEnum.string },
    ];

    // Schema definition for the 'competitionEditionsData' table
    var competitionEditionsTableSchema = {
      id: "competitionEditionsData",
      alias: "Competition Editions Data",
      columns: competitionEditionsCols,
    };

    // Provide the schema definitions to Tableau
    schemaCallback([physicalDataTableSchema, competitionEditionsTableSchema]);
  };

  // Fetch data for the tables based on the schema
  myConnector.getData = function (table, doneCallback) {
    // Parse connection data
    var connectionData = JSON.parse(tableau.connectionData);
    var parameterValues = connectionData.parameters;
    var token = connectionData.token;

    // Fetch data for the 'physicalData' table
    if (table.tableInfo.id === "physicalData") {
      fetchPhysicalData(table, parameterValues, token, doneCallback);
    }
    // Fetch data for the 'competitionEditionsData' table
    else if (table.tableInfo.id === "competitionEditionsData") {
      fetchCompetitionEditionsData(table, token, doneCallback);
    }
  };

  // Function to fetch physical data from the API
  function fetchPhysicalData(table, parameterValues, token, doneCallback) {
    // Build query string from parameters
    var queryString = "";
    if (parameterValues.season)
      queryString += "&season=" + parameterValues.season;
    if (parameterValues.competition)
      queryString += "&competition=" + parameterValues.competition;
    if (parameterValues.match) queryString += "&match=" + parameterValues.match;
    if (parameterValues.team) queryString += "&team=" + parameterValues.team;
    if (parameterValues.competition_edition)
      queryString +=
        "&competition_edition=" + parameterValues.competition_edition;

    // Construct the API URL
    var apiUrl =
      "https://skillcorner.com/api/physical/?data_version=3&physical_check_passed=true&" +
      queryString.slice(1) +
      "&group_by=player,match&average_per=match&token=" +
      token;

    console.log("Physical Data API URL:", apiUrl);

    // Recursive function to fetch paginated data from the API
    function fetchData(url, pageCount) {
      $.ajax({
        url: url, // The URL to request data from
        type: "GET", // HTTP method to use
        dataType: "json", // The type of data expected back from the server
        success: function (data) {
          // Function to run if the request succeeds
          var tableData = [];
          console.log(
            `Data received for page ${pageCount}:`,
            data.results.length
          );

          // Process each record in the data
          data.results.forEach(function (record) {
            // Create a structured data object for each record
            tableData.push({
              player_name: record.player_name,
              player_short_name: record.player_short_name,
              player_id: record.player_id,
              player_birthdate: record.player_birthdate,
              team_name: record.team_name,
              team_id: record.team_id,
              match_name: record.match_name,
              match_id: record.match_id,
              match_date: record.match_date,
              competition_name: record.competition_name,
              competition_id: record.competition_id,
              season_name: record.season_name,
              season_id: record.season_id,
              competition_edition_id: record.competition_edition_id,
              position: record.position,
              position_group: record.position_group,
              minutes_full_all: record.minutes_full_all,
              physical_check_passed: record.physical_check_passed,
              total_distance_full_all: record.total_distance_full_all,
              total_metersperminute_full_all:
                record.total_metersperminute_full_all,
              running_distance_full_all: record.running_distance_full_all,
              hsr_distance_full_all: record.hsr_distance_full_all,
              hsr_count_full_all: record.hsr_count_full_all,
              sprint_distance_full_all: record.sprint_distance_full_all,
              sprint_count_full_all: record.sprint_count_full_all,
              hi_distance_full_all: record.hi_distance_full_all,
              hi_count_full_all: record.hi_count_full_all,
              medaccel_count_full_all: record.medaccel_count_full_all,
              highaccel_count_full_all: record.highaccel_count_full_all,
              meddecel_count_full_all: record.meddecel_count_full_all,
              highdecel_count_full_all: record.highdecel_count_full_all,
              psv99: record.psv99,
            });
          });

          // Append rows to the table
          table.appendRows(tableData);

          // If there is a next page, fetch it
          if (data.next) {
            console.log("Fetching next page:", data.next);
            // Recursive call to fetch the next page of data
            fetchData(data.next, pageCount + 1);
          } else {
            console.log("All pages fetched");
            doneCallback();
          }
        },
        error: function (xhr, textStatus, errorThrown) {
          console.error(
            `Error while fetching data on page ${pageCount}:`,
            textStatus,
            errorThrown
          );
          tableau.abortWithError(
            "Failed to get physical data from SkillCorner API"
          );
        },
      });
    }

    // Initial data fetch call
    fetchData(apiUrl, 1);
  }

  // Function to fetch competition editions data from the API
  function fetchCompetitionEditionsData(table, token, doneCallback) {
    // Construct the API URL
    var apiUrl =
      "https://skillcorner.com/api/competition_editions/?user=true&token=" +
      token;

    $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      success: function (data) {
        var tableData = [];
        console.log("Competition Editions Data received:", data.results.length);

        // Process each record in the data
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

        // Append rows to the table
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

  // Register the connector with Tableau
  tableau.registerConnector(myConnector);

  // jQuery function to handle the submit button click event
  $(document).ready(function () {
    $("#submitButton").click(function () {
      // Create connection data object from user inputs
      var connectionData = {
        parameters: {
          season: $("#season-parameter").val().trim(),
          competition: $("#competition-parameter").val().trim(),
          match: $("#match-parameter").val().trim(),
          team: $("#team-parameter").val().trim(),
          competition_edition: $("#competition_edition-parameter").val().trim(),
        },
        token: "677560e21c8bb595c4b6",
      };

      // Set connection data and name, then submit
      tableau.connectionData = JSON.stringify(connectionData);
      tableau.connectionName = "SkillCorner Data";
      tableau.submit();
    });
  });
})();
