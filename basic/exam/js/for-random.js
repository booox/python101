
castMembers = [
  {name: "import", code: "162656962", pcode: "print()", photo: "judy.jpg" },
  {name: "random", code: "326433952", pcode: "input()", photo: "ray.jpg" },
  {name: "for", code: "326433953", pcode: "int()", photo: "jack.jpg" },
  {name: "i", code: "651717534", pcode: "dir()", photo: "margaret.jpg" },
  {name: "in", code: "651717535", pcode: "dir()", photo: "margaret.jpg" },
  {name: "range(10)", code: "651717536", pcode: "dir()", photo: "margaret.jpg" },
  {name: ":", code: "651717546", pcode: "dir()", photo: "margaret.jpg" },
  {name: "x = ", code: "651717537", pcode: "dir()", photo: "margaret.jpg" },
  {name: "random.randint(", code: "651717538", pcode: "dir()", photo: "margaret.jpg" },
  {name: "-100", code: "651717539", pcode: "dir()", photo: "margaret.jpg" },
  {name: ", ", code: "651717540", pcode: "dir()", photo: "margaret.jpg" },
  {name: "100)", code: "651717541", pcode: "dir()", photo: "margaret.jpg" },
  {name: "print(x)", code: "651717542", pcode: "dir()", photo: "margaret.jpg" },
];


$(document).ready(function(){
  restart(castMembers);
});

function restart(castmembers) {
  $('#names').empty();
  $('#faces').empty();
  $('#score-reveal').html("<button class='btn btn-info pull-right' id='score-quiz'>查看得分</button>");
  buildQuiz(castMembers);
  initQuiz();

  $("#score-quiz").click(function(){
    scoreQuiz();
    $("button#restart").click(function(){
      restart();
    });
  });
}

function scoreQuiz(){
  var correctAnswers = $(".correct").length;
  var incorrectAnswers = $(".incorrect").length;
  var totalScore = castMembers.length;

  $('.correct').addClass('reveal');
  $('#score-reveal').html("<p class='display-score'>你得了 <strong>" + correctAnswers + "/" + totalScore + "</strong> 分。 <button id='restart' class='btn btn-info'>再试一次</button></p>");
}

function buildQuiz(castMembers) {
  castMembers.forEach(function(castMember) {
  });
  var shuffledCMs = castMembers.slice('');
  shuffle(shuffledCMs);

  $.each(shuffledCMs, function(index, castMember) {
    $("#names").append("<div class='col-xs-2'>" +
                         "<div class='dropzone'>" +
                           "<div data-match-code='" + castMember.code + "'class='name'>" +
                             castMember.name +
                           "</div>"+
                         "</div>" +
                       "</div>");
  });

  // line 1
  $("#faces").append("<ul class='nav'>");
  $.each(castMembers.slice(0, 2), function(index, castMember) {
        console.log(index);
        $("#faces").append("<li data-match-code='" + castMember.code + "'class='dropzone nav-item'></li>");        
  });
  $("#faces").append("</ul>");

  // line 2
  $("#faces").append("<ul class='nav'>");
  $.each(castMembers.slice(2, 7), function(index, castMember) {
        console.log(index);
        $("#faces").append("<li data-match-code='" + castMember.code + "'class='dropzone nav-item'></li>");        
  });
  $("#faces").append("</ul>");
  
  // line 3
  $("#faces").append("<ul class='nav'>");
  $("#faces").append("<li class='dropzone nav-item'></li>");        
  $.each(castMembers.slice(7, 12), function(index, castMember) {
        console.log(index);
        $("#faces").append("<li data-match-code='" + castMember.code + "'class='dropzone nav-item'></li>");        
  });
  $("#faces").append("</ul>");

  // line 4
  $("#faces").append("<ul class='nav'>");
  $("#faces").append("<li class='dropzone nav-item'></li>");        
  $.each(castMembers.slice(-1), function(index, castMember) {
        // console.log(index);
        $("#faces").append("<li data-match-code='" + castMember.code + "'class='dropzone nav-item'></li>");        

  });
  $("#faces").append("</ul>");
   

  
  
  $("#faces:first-child").addClass("col-xs-offset-1");
  $("#names:first-child").addClass("col-xs-offset-1");
}

function shuffle(arr) {
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}

function initQuiz() {
  $(".name").draggable({
    revert: true,
    revertDuration: 200,
    cursor: "move"
  });

  $(".dropzone").droppable({
    accept: ".name",
    drop: function(event, ui) {
      ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
      ui.draggable.draggable( 'option', 'revert', false );
      if ($(this).data("matchCode") == ui.draggable.data("matchCode")) {
        ui.draggable.addClass("correct");
      } else {
        ui.draggable.removeClass("correct");
      }
    }
  });

  $("#score-quiz").show();

}
