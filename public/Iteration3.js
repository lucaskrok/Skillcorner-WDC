(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
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

    var physicalDataTableSchema = {
      id: "physicalData",
      alias: "Physical Data",
      columns: physicalDataCols,
    };

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

    var competitionEditionsTableSchema = {
      id: "competitionEditionsData",
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
    } else if (table.tableInfo.id === "competitionEditionsData") {
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
    if (parameterValues.competition_edition)
      queryString +=
        "&competition_edition=" + parameterValues.competition_edition;

    var apiUrl =
      "https://skillcorner.com/api/physical/?data_version=3&physical_check_passed=true&" +
      queryString.slice(1) +
      "&group_by=player,match&average_per=match&token=" +
      token;

    console.log("Physical Data API URL:", apiUrl);

    function fetchData(url) {
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (data) {
          var tableData = [];
          console.log("Data received:", data);

          data.results.forEach(function (record) {
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

          table.appendRows(tableData);

          if (data.next) {
            fetchData(data.next);
          } else {
            doneCallback();
          }
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

    fetchData(apiUrl);
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
        doneCallback(); // Call doneCallback once all data is appended
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.error(
          "Error while fetching competition editions data:",
          thrownError
        );
        tableau.abortWithError(
          "Failed to get competition editions data from SkillCorner API"
        );
      },
    });
  }

  tableau.registerConnector(myConnector);

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
        token: $("#api-token").val().trim(),
      };

      tableau.connectionData = JSON.stringify(connectionData);
      tableau.connectionName = "SkillCorner Data";
      tableau.submit();
    });
  });
})();
