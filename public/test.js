(function () {
  var myConnector = tableau.makeConnector();

  // Init function for the connector
  myConnector.init = function (initCallback) {
    tableau.authType = tableau.authTypeEnum.basic; // Set authType to basic

    // Handle different phases
    if (tableau.phase === tableau.phaseEnum.authPhase) {
      $("#connectionForm").hide(); // Hide form during auth phase
    } else if (tableau.phase === tableau.phaseEnum.gatherDataPhase) {
      // During gatherDataPhase, ensure username and password are available
      if (!tableau.username || !tableau.password) {
        tableau.abortForAuth(); // Abort if credentials are missing
        return;
      }
    }

    initCallback();

    if (tableau.phase === tableau.phaseEnum.authPhase) {
      tableau.submit(); // Submit after authentication phase
    }
  };

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
      { id: "competition_name", dataType: tableau.dataTypeEnum.string },
      { id: "competition_id", dataType: tableau.dataTypeEnum.int },
      { id: "season_name", dataType: tableau.dataTypeEnum.string },
      { id: "season_id", dataType: tableau.dataTypeEnum.int },
      { id: "position_group", dataType: tableau.dataTypeEnum.string },
      { id: "minutes_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "minutes_full_bip", dataType: tableau.dataTypeEnum.float },
      { id: "minutes_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "minutes_full_otip", dataType: tableau.dataTypeEnum.float },
      { id: "count_match", dataType: tableau.dataTypeEnum.int },
      { id: "count_match_failed", dataType: tableau.dataTypeEnum.int },
      { id: "total_distance_full_all", dataType: tableau.dataTypeEnum.float },
      {
        id: "total_metersperminute_full_all",
        dataType: tableau.dataTypeEnum.float,
      },
      { id: "running_distance_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "hsr_distance_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "hsr_count_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "sprint_distance_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "sprint_count_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "hi_distance_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "hi_count_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "medaccel_count_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "highaccel_count_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "meddecel_count_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "highdecel_count_full_all", dataType: tableau.dataTypeEnum.float },
      { id: "psv99", dataType: tableau.dataTypeEnum.float },
      { id: "psv99_top5", dataType: tableau.dataTypeEnum.float },
      {
        id: "total_distance_full_all_p90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "total_metersperminute_full_all_p90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "running_distance_full_all_p90",
        dataType: tableau.dataTypeEnum.float,
      },
      { id: "hsr_distance_full_all_p90", dataType: tableau.dataTypeEnum.float },
      { id: "hsr_count_full_all_p90", dataType: tableau.dataTypeEnum.float },
      {
        id: "sprint_distance_full_all_p90",
        dataType: tableau.dataTypeEnum.float,
      },
      { id: "sprint_count_full_all_p90", dataType: tableau.dataTypeEnum.float },
      { id: "hi_distance_full_all_p90", dataType: tableau.dataTypeEnum.float },
      { id: "hi_count_full_all_p90", dataType: tableau.dataTypeEnum.float },
      {
        id: "medaccel_count_full_all_p90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "highaccel_count_full_all_p90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "meddecel_count_full_all_p90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "highdecel_count_full_all_p90",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "total_distance_full_bip_p60bip",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "total_metersperminute_full_bip_p60bip",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "running_distance_full_bip_p60bip",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hsr_distance_full_bip_p60bip",
        dataType: tableau.dataTypeEnum.float,
      },
      { id: "hsr_count_full_bip_p60bip", dataType: tableau.dataTypeEnum.float },
      {
        id: "sprint_distance_full_bip_p60bip",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "sprint_count_full_bip_p60bip",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "hi_distance_full_bip_p60bip",
        dataType: tableau.dataTypeEnum.float,
      },
      { id: "hi_count_full_bip_p60bip", dataType: tableau.dataTypeEnum.float },
      {
        id: "medaccel_count_full_bip_p60bip",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "highaccel_count_full_bip_p60bip",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "meddecel_count_full_bip_p60bip",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "highdecel_count_full_bip_p60bip",
        dataType: tableau.dataTypeEnum.float,
      },
      { id: "total_distance_full_tip", dataType: tableau.dataTypeEnum.float },
      {
        id: "total_metersperminute_full_tip",
        dataType: tableau.dataTypeEnum.float,
      },
      { id: "running_distance_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "hsr_distance_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "hsr_count_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "sprint_distance_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "sprint_count_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "hi_distance_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "hi_count_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "medaccel_count_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "highaccel_count_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "meddecel_count_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "highdecel_count_full_tip", dataType: tableau.dataTypeEnum.float },
      { id: "total_distance_full_otip", dataType: tableau.dataTypeEnum.float },
      {
        id: "total_metersperminute_full_otip",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "running_distance_full_otip",
        dataType: tableau.dataTypeEnum.float,
      },
      { id: "hsr_distance_full_otip", dataType: tableau.dataTypeEnum.float },
      { id: "hsr_count_full_otip", dataType: tableau.dataTypeEnum.float },
      { id: "sprint_distance_full_otip", dataType: tableau.dataTypeEnum.float },
      { id: "sprint_count_full_otip", dataType: tableau.dataTypeEnum.float },
      { id: "hi_distance_full_otip", dataType: tableau.dataTypeEnum.float },
      { id: "hi_count_full_otip", dataType: tableau.dataTypeEnum.float },
      { id: "medaccel_count_full_otip", dataType: tableau.dataTypeEnum.float },
      { id: "highaccel_count_full_otip", dataType: tableau.dataTypeEnum.float },
      { id: "meddecel_count_full_otip", dataType: tableau.dataTypeEnum.float },
      { id: "highdecel_count_full_otip", dataType: tableau.dataTypeEnum.float },
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
    var connectionData = JSON.parse(tableau.connectionData);
    var parameters = connectionData.parameters || {}; // Ensure parameters is at least an empty object

    if (!parameters) {
      tableau.abortWithError("Parameters are not defined.");
      return;
    }

    if (table.tableInfo.id === "physicalData") {
      fetchPhysicalData(table, parameters, doneCallback);
    } else if (table.tableInfo.id === "competitionEditionsData") {
      fetchCompetitionEditionsData(table, doneCallback);
    }
  };

  // Function to fetch physical data from the API
  function fetchPhysicalData(table, parameters, doneCallback) {
    var apiUrl =
      "https://skillcorner.com/api/physical/?data_version=3&count_match__gte=1&possession=all,tip,otip&physical_check_passed=true&group_by=player,team,position_group,season,competition&average_per=p90,match,p60bip";
    var queryParams = [];

    if (parameters.season)
      queryParams.push("season=" + encodeURIComponent(parameters.season));
    if (parameters.competition)
      queryParams.push(
        "competition=" + encodeURIComponent(parameters.competition)
      );
    if (parameters.match)
      queryParams.push("match=" + encodeURIComponent(parameters.match));
    if (parameters.team)
      queryParams.push("team=" + encodeURIComponent(parameters.team));
    if (parameters.competition_edition)
      queryParams.push(
        "competition_edition=" +
          encodeURIComponent(parameters.competition_edition)
      );

    // Add the playing_time__gte parameter with a default value of 60
    var playingTime = parameters.playing_time ? parameters.playing_time : 60;
    queryParams.push("playing_time__gte=" + encodeURIComponent(playingTime));

    var queryString = queryParams.length ? "&" + queryParams.join("&") : "";
    apiUrl += queryString;

    $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Basic " + btoa(tableau.username + ":" + tableau.password)
        );
      },
      success: function (data) {
        var tableData = [];
        data.results.forEach(function (record) {
          tableData.push({
            player_name: record.player_name,
            player_short_name: record.player_short_name,
            player_id: record.player_id,
            player_birthdate: record.player_birthdate,
            team_name: record.team_name,
            team_id: record.team_id,
            competition_name: record.competition_name,
            competition_id: record.competition_id,
            season_name: record.season_name,
            season_id: record.season_id,
            position_group: record.position_group,
            minutes_full_all: record.minutes_full_all,
            minutes_full_tip: record.minutes_full_tip,
            minutes_full_otip: record.minutes_full_otip,
            count_match: record.count_match,
            count_match_failed: record.count_match_failed,
            psv99: record.psv99,
            psv99_top5: record.psv99_top5,
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
          });
        });
        table.appendRows(tableData);
        doneCallback();
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Error fetching physical data:", textStatus, errorThrown);
        tableau.abortWithError(
          "Error fetching physical data from SkillCorner API"
        );
      },
    });
  }

  // Function to fetch competition editions data from the API
  function fetchCompetitionEditionsData(table, doneCallback) {
    var apiUrl = "https://skillcorner.com/api/competition_editions/?user=true";

    $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Basic " + btoa(tableau.username + ":" + tableau.password)
        );
      },
      success: function (data) {
        var tableData = [];
        data.results.forEach(function (record) {
          tableData.push({
            id: record.id,
            competition_id: record.competition_id,
            competition_area: record.competition_area,
            competition_name: record.competition_name,
            competition_gender: record.competition_gender,
            competition_age_group: record.competition_age_group,
            season_id: record.season_id,
            season_start_year: record.season_start_year,
            season_end_year: record.season_end_year,
            season_name: record.season_name,
            name: record.name,
          });
        });
        table.appendRows(tableData);
        doneCallback();
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error(
          "Error fetching competition editions data:",
          textStatus,
          errorThrown
        );
        tableau.abortWithError(
          "Error fetching competition editions data from SkillCorner API"
        );
      },
    });
  }

  // Register the connector with Tableau
  tableau.registerConnector(myConnector);

  // jQuery function to handle the submit button click event
  $(document).ready(function () {
    $("#submitButton").click(function () {
      var connectionData = {
        parameters: {
          season: $("#season-parameter").val().trim(),
          competition: $("#competition-parameter").val().trim(),
          match: $("#match-parameter").val().trim(),
          team: $("#team-parameter").val().trim(),
          competition_edition: $("#competition_edition-parameter").val().trim(),
        },
      };

      tableau.connectionData = JSON.stringify(connectionData);
      tableau.connectionName = "SkillCorner WDC";
      tableau.submit();
    });
  });

  // Initiate the Tableau connector
  $(document).ready(function () {
    tableau.initCallback();
  });
})();
