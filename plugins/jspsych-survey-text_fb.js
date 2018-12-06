/**
 * jspsych-survey-text
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['survey-text-fb'] = (function() {

  var plugin = {};
  
    var gfx = function ggfx() {
  	    window.open("https://google.com", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=1000,left=500,width=1000,height=1000,fullscreen=yes");
  	};
  	
        
  plugin.trial = function(display_element, trial) {

    trial.preamble = typeof trial.preamble == 'undefined' ? "" : trial.preamble;
    if (typeof trial.rows == 'undefined') {
      trial.rows = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.rows.push(1);
      }
    }
    if (typeof trial.columns == 'undefined') {
      trial.columns = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.columns.push(40);
      }
    }

    trial.prompt = (typeof trial.prompt === 'undefined') ? "" : trial.prompt;
    if (typeof trial.prompt == 'undefined') {
      trial.prompt = "";
    };

    trial.image = (typeof trial.prompt === 'undefined') ? "" : trial.prompt;
    if (typeof trial.prompt == 'undefined') {
      trial.prompt = "";
    };



    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);



    display_element.append($('<div>', {
      "id": 'jspsych-survey-text-image',
      "class": 'jspsych-survey-text-image'
    }));
    $('#jspsych-survey-text-image').html(trial.image);



    // add questions
    for (var i = 0; i < trial.questions.length; i++) {
      // create div
      display_element.append($('<div>', {
        "id": 'jspsych-survey-text-' + i,
        "class": 'jspsych-survey-text-question'
      }));
      
     
        // show preamble text
      display_element.append($('<div>', {
        "id": 'jspsych-survey-text-preamble',
        "class": 'jspsych-survey-text-preamble'
      }));

 // display search buttons
      if(i==1){
        display_element.append($('<button>', {
          'id': 'jspsych-survey-text-YouTube',
          'class': 'jspsych-btn jspsych-survey-text',
        }));
        $("#jspsych-survey-text-YouTube").html('YouTube');
        $("#jspsych-survey-text-YouTube").click(function() {
          window.open("https://youtube.com", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=1000,left=500,width=1000,height=1000,fullscreen=yes");
        });
        display_element.append($('<button>', {
          'id': 'jspsych-survey-text-Soundcloud',
          'class': 'jspsych-btn jspsych-survey-text'
        }));
        $("#jspsych-survey-text-Soundcloud").html('Soundcloud');
        $("#jspsych-survey-text-Soundcloud").click(function() {
          window.open("https://soundcloud.com", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=1000,left=500,width=1000,height=1000,fullscreen=yes");
        });
         display_element.append($('<button>', {
          'id': 'jspsych-survey-text-Google',
          'class': 'jspsych-btn jspsych-survey-text'
        }));
        $("#jspsych-survey-text-Google").html('Google');
        $("#jspsych-survey-text-Google").click(function() {
          window.open("https://google.com", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=1000,left=500,width=1000,height=1000,fullscreen=yes");
        });
      }

      // add question text
      $("#jspsych-survey-text-" + i).append('<p class="jspsych-survey-text">' + trial.questions[i] + '</p>');

      // add text box
      $("#jspsych-survey-text-" + i).append('<textarea name="#jspsych-survey-text-response-' + i + '" cols="' + trial.columns[i] + '" rows="' + trial.rows[i] + '"></textarea>');
          }

    //show prompt if there is one
    if (trial.prompt !== "") {
      display_element.append(trial.prompt);
    }

    $('#jspsych-survey-text-preamble').html(trial.preamble);

    
      
      
    // add submit button
    display_element.append($('<button>', {
      'id': 'jspsych-survey-text-next',
      'class': 'jspsych-btn jspsych-survey-text'
    }));
    $("#jspsych-survey-text-next").html('Weiter');
    
    $("#jspsych-survey-text-next").click(function() {
      // measure response time
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      // create object to hold responses
      var question_data = {};
      $("div.jspsych-survey-text-question").each(function(index) {
        var id = "Q" + index;
        var val = $(this).children('textarea').val();
        var obje = {};
        obje[id] = val;
        $.extend(question_data, obje);
      });
    
    
      // save data
      var trialdata = {
        "rt": response_time,
        "responses": JSON.stringify(question_data)
      };

      display_element.html('');

      // next trial
      jsPsych.finishTrial(trialdata);
    });

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
