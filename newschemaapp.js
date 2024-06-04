(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    // Define columns for physical data table
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
      },
      {
        id: "team_name",
        alias: "Team Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "team_id",
        alias: "Team ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "match_date",
        alias: "Match Date",
        dataType: tableau.dataTypeEnum.date,
      },
      {
        id: "competition_name",
        alias: "Competition Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "competition_id",
        alias: "Competition ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "season_name",
        alias: "Season Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "season_id",
        alias: "Season ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "competition_edition_id",
        alias: "Competition Edition ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "position",
        alias: "Position",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "position_group",
        alias: "Position Group",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "minutes_full_all",
        alias: "Minutes Full All",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "minutes_full_tip",
        alias: "Minutes Full Tip",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "minutes_full_otip",
        alias: "Minutes Full Otip",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "physical_check_passed",
        alias: "Physical Check Passed",
        dataType: tableau.dataTypeEnum.bool,
      },
      {
        id: "total_distance_full_all",
        alias: "Total Distance Full All",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "total_metersperminute_full_all",
        alias: "Total Meters Per Minute Full All",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "running_distance_full_all",
        alias: "Running Distance Full All",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "hsr_distance_full_all",
        alias: "HSR Distance Full All",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "hsr_count_full_all",
        alias: "HSR Count Full All",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "sprint_distance_full_all",
        alias: "Spring Distance Full All",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "sprint_count_full_all",
        alias: "Sprint Count Full All",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "hi_distance_full_all",
        alias: "HI Distance Full All",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hi_count_full_all",
        alias: "HI Count Full All",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "medaccel_count_full_all",
        alias: "Medium Acceleration Count Full All",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "highaccel_count_full_all",
        alias: "High Acceleration Count Full All",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "meddecel_count_full_all",
        alias: "Medium Decceleration Count Full All",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "highdecel_count_full_all",
        alias: "high Decceleration Count Full All",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "psv99",
        alias: "PSV 99",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "total_distance_full_all_p90",
        alias: "Total Distance Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "total_metersperminute_full_all_p90",
        alias: "Total Meters Per Minute Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "running_distance_full_all_p90",
        alias: "Running Distance Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hsr_distance_full_all_p90",
        alias: "HSR Distance Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hsr_count_full_all_p90",
        alias: "HSR Count Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "sprint_distance_full_all_p90",
        alias: "Spring Distance Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "sprint_count_full_all_p90",
        alias: "Sprint Count Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hi_distance_full_all_p90",
        alias: "HI Distance Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hi_count_full_all_p90",
        alias: "HI Count Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "medaccel_count_full_all_p90",
        alias: "Medium Acceleration Count Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "highaccel_count_full_all_p90",
        alias: "High Acceleration Count Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "meddecel_count_full_all_p90",
        alias: "Medium Decceleration Count Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "highdecel_count_full_all_p90",
        alias: "high Decceleration Count Full All P90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "total_distance_full_tip",
        alias: "Total Distance Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "total_metersperminute_full_tip",
        alias: "Total Meters Per Minute Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "running_distance_full_tip",
        alias: "Running Distance Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hsr_distance_full_tip",
        alias: "HSR Distance Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hsr_count_full_tip",
        alias: "HSR Count Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "sprint_distance_full_tip",
        alias: "Spring Distance Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "sprint_count_full_tip",
        alias: "Sprint Count Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hi_distance_full_tip",
        alias: "HI Distance Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hi_count_full_tip",
        alias: "HI Count Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "medaccel_count_full_tip",
        alias: "Medium Acceleration Count Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "highaccel_count_full_tip",
        alias: "High Acceleration Count Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "meddecel_count_full_tip",
        alias: "Medium Decceleration Count Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "highdecel_count_full_tip",
        alias: "high Decceleration Count Full TIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "total_distance_full_otip",
        alias: "Total Distance Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "total_metersperminute_full_otip",
        alias: "Total Meters Per Minute Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "running_distance_full_otip",
        alias: "Running Distance Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hsr_distance_full_otip",
        alias: "HSR Distance Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hsr_count_full_otip",
        alias: "HSR Count Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "sprint_distance_full_otip",
        alias: "Spring Distance Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "sprint_count_full_otip",
        alias: "Sprint Count Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hi_distance_full_otip",
        alias: "HI Distance Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hi_count_full_otip",
        alias: "HI Count Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "medaccel_count_full_otip",
        alias: "Medium Acceleration Count Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "highaccel_count_full_otip",
        alias: "High Acceleration Count Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "meddecel_count_full_otip",
        alias: "Medium Decceleration Count Full OTIP",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "highdecel_count_full_otip",
        alias: "high Decceleration Count Full OTIP",
        dataType: tableau.dataTypeEnum.float,
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
      "https://skillcorner.com/api/physical/?data_version=3&" +
      queryString.slice(1) + // Remove leading "&" if present
      "&group_by=&token=" +
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
            player_name: record.player_name,
            player_short_name: record.player_short_name,
            player_id: record.player_id,
            player_birthdate: record.player_birthdate,
            team_name: record.team_name,
            team_id: record.team_id,
            match_date: record.match_date,
            competition_name: record.competition_name,
            competition_id: record.competition_id,
            season_name: record.season_name,
            season_id: record.season_id,
            competition_edition_id: record.competition_edition_id,
            position: record.position,
            position_group: record.position_group,
            minutes_full_all: record.minutes_full_all,
            minutes_full_tip: record.minutes_full_tip,
            minutes_full_otip: record.minutes_full_otip,
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
            total_distance_full_all_p90: record.total_distance_full_all_p90,
            total_metersperminute_full_all_p90:
              record.total_metersperminute_full_all_p90,
            running_distance_full_all_p90: record.running_distance_full_all_p90,
            hsr_distance_full_all_p90: record.hsr_distance_full_all_p90,
            hsr_count_full_all_p90: record.hsr_count_full_all_p90,
            sprint_distance_full_all_p90: record.sprint_distance_full_all_p90,
            sprint_count_full_all_p90: record.sprint_count_full_all_p90,
            hi_distance_full_all_p90: record.hi_distance_full_all_p90,
            hi_count_full_all_p90: record.hi_count_full_all_p90,
            medaccel_count_full_all_p90: record.medaccel_count_full_all_p90,
            highaccel_count_full_all_p90: record.highaccel_count_full_all_p90,
            meddecel_count_full_all_p90: record.meddecel_count_full_all_p90,
            highdecel_count_full_all_p90: record.highdecel_count_full_all_p90,
            total_distance_full_tip: record.total_distance_full_tip,
            total_metersperminute_full_tip:
              record.total_metersperminute_full_tip,
            running_distance_full_tip: record.running_distance_full_tip,
            hsr_distance_full_tip: record.hsr_distance_full_tip,
            hsr_count_full_tip: record.hsr_count_full_tip,
            sprint_distance_full_tip: record.sprint_distance_full_tip,
            sprint_count_full_tip: record.sprint_count_full_tip,
            hi_distance_full_tip: record.hi_distance_full_tip,
            hi_count_full_tip: record.hi_count_full_tip,
            medaccel_count_full_tip: record.medaccel_count_full_tip,
            highaccel_count_full_tip: record.highaccel_count_full_tip,
            meddecel_count_full_tip: record.meddecel_count_full_tip,
            highdecel_count_full_tip: record.highdecel_count_full_tip,
            total_distance_full_otip: record.total_distance_full_otip,
            total_metersperminute_full_otip:
              record.total_metersperminute_full_otip,
            running_distance_full_otip: record.running_distance_full_otip,
            hsr_distance_full_otip: record.hsr_distance_full_otip,
            hsr_count_full_otip: record.hsr_count_full_otip,
            sprint_distance_full_otip: record.sprint_distance_full_otip,
            sprint_count_full_otip: record.sprint_count_full_otip,
            hi_distance_full_otip: record.hi_distance_full_otip,
            hi_count_full_otip: record.hi_count_full_otip,
            medaccel_count_full_otip: record.medaccel_count_full_otip,
            highaccel_count_full_otip: record.highaccel_count_full_otip,
            meddecel_count_full_otip: record.meddecel_count_full_otip,
            highdecel_count_full_otip: record.highdecel_count_full_otip,
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
  } // <-- Add this closing brace

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
}); // <-- Add this closing brace
