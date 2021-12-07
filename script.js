var currentContext = 'action';
var actionIndex = 2;
var menuIndex = 2;
var maxIndex = 4;
var dialog = '';
var actionSelector = $('.action-option');
var dialogFrame;

var actIndex = 1;
var maxAct = 0;
var canAct = false;
var hasAct = false;
var TypedAct;

var menuMove = new Audio('snd_squeak.wav');
var menuSelect = new Audio('snd_select.wav');

var laslo = {
  "sprite":"laslo.png",
  "music":"https://www.youtube.com/embed/KFPwmPuiSSY?autoplay=1&version=3&loop=1&rel=0&showinfo=0&autohide=1&playlist=KFPwmPuiSSY&vq=tiny",
  "dialog":"An unusual character emerges from the sawing of trees to stand in front of you.",
  "gold":"150",
  "act-options":["Check", "Bow", "Protect", "Provoke"],
  "act-text":["* LASLO CHACHIGNAR 0 ATK 20 DEF<br>* He takes damages pretty well, and hits harder and harder as a result.", "The black panther greets you back.", "No need to protect yourself, the black panther not seem to attack harmless opponents.", "The black panther seems totally insensitive to provocations."]
}

$(function(){
 
  function rand(obj) {
      var result;
      var count = 0;
      for (var prop in obj)
          if (Math.random() < 1/++count)
             result = prop;
      return result;
  }
  
  function loadLaslo(laslo){
    
    var sprite = laslo['sprite'];
    music = laslo['music'];
    gold = laslo['gold'];
    
    dialog = laslo['dialog'];
    
   $.each(laslo['act-options'],function(key,value){
      $('.menu-act').append('<li class="menu-act-option menu-act-option-'+(key+1) +'">* '+ value +'</li>');
      $('.undertale').append('<ul class="menu menu-hidden menu-act-dialog menu-act-'+(key+1)+'"></ul>')
      

      maxAct++;
    });
    
    $('.menu-act-option-1').addClass('active');
    $('.laslo img').attr('src',sprite);
    
  }
  
  loadLaslo(laslo);
  
  dialogFrame = new Typed(".menu-dialog", {
    strings: [dialog],
    showCursor: false,
    cursorChar: '',
    typeSpeed: 10,
    onBegin: function(self) {
      self.interval = setInterval(() => {
        self.menuText = new Audio("SND_TXT2.wav");
        self.menuText.volume = 0.35;
        self.menuText.play();
      }, 20 * 3);
    },
    onComplete: function(self) {
      clearInterval(self.interval);
    },
    onReset: function(self) {
      clearInterval(self.interval);
    },
    onDestroy: function(self) {
      clearInterval(self.interval);
    },
    onStop: function(pos, self) { clearInterval(self.interval); },
    loop: false,
    loopCount: false,
});

  function prevAction(actionMenuItem){
    if(actionIndex > 2 && currentContext == 'action'){
      actionIndex--;
      actionSelector.removeClass('active');
      $('.action-option-' + actionIndex).addClass('active');

      menuMove.play()
    }
  }
  function nextAction(actionMenuItem){
    if(actionIndex < maxIndex && currentContext == 'action'){
      actionIndex++;
      actionSelector.removeClass('active');
      $('.action-option-' + actionIndex).addClass('active');

      menuMove.play()
    }
  }

  function prevAct(actionMenuItem){
    if(actIndex > 1 && currentContext == 'act'){
      actIndex--;
      $('.menu-act-option').removeClass('active');
      $('.menu-act-option-' + actIndex).addClass('active');

      menuMove.play()
    }
  }

  function nextAct(actionMenuItem){
    if(actIndex < maxAct && currentContext == 'act'){
      actIndex++;
      $('.menu-act-option').removeClass('active');
      $('.menu-act-option-' + actIndex).addClass('active');

      menuMove.play()
    }
  }



  Mousetrap.bind('enter', function(){ 
    if(currentContext == 'action'){
      currentContext = $('.action-option-' + actionIndex).data('context');
      $('.menu-' + currentContext).show(); 
      $('.action-option-' + actionIndex).removeClass('active');

      menuSelect.play();
      dialogFrame.destroy();
    }

    /* ACT */
    if(currentContext == 'act'){
      if (canAct) {
        if (hasAct) {
          $(".menu-act-dialog").hide();
          TypedAct.destroy();

          TypedAct = null;
          hasAct = false;

          Mousetrap.trigger('esc');
        } else {
          var ActA = laslo['act-text'][actIndex - 1];

          $(".menu-act-"+actIndex).show();
          TypedAct = new Typed(".menu-act-"+actIndex, {
            strings: [ActA], 
            showCursor: false, 
            cursorChar: '', 
            typeSpeed: 10,
            onBegin: function(self) {
              self.interval = setInterval(() => {
                self.menuText = new Audio("SND_TXT2.wav");
                self.menuText.volume = 0.35;
                self.menuText.play();
              }, 20 * 3);
            },
            onComplete: function(self) {
              clearInterval(self.interval);
            },
            onReset: function(self) {
              clearInterval(self.interval);
            },
            onDestroy: function(self) {
              clearInterval(self.interval);
            },
            onStop: function(pos, self) { clearInterval(self.interval); },
            loop: false,
            loopCount: false,
          });
    
          menuSelect.play();
          hasAct = true;
        }
      } else {
        canAct = true;
      }
    }
    if(currentContext == 'mercy'){
      $('.laslo').css('opacity','0.3');
      $('.audio').remove();
      $('.menu-mercy').css('color','white');
      
      /* play sound effect */
      var audio = new Audio('snd_vaporized.wav');
      audio.play();

      new Typed(".menu-mercy", {
        strings: ['* YOU WON! <br>* You earned 0 XP and ' + gold + ' gold.'], 
        showCursor: false, 
        cursorChar: '', 
        typeSpeed: 10,
        onBegin: function(self) {
          self.interval = setInterval(() => {
            self.menuText = new Audio("SND_TXT2.wav");
            self.menuText.volume = 0.35;
            self.menuText.play();
          }, 20 * 3);
        },
        onComplete: function(self) {
          clearInterval(self.interval);
        },
        onReset: function(self) {
          clearInterval(self.interval);
        },
        onDestroy: function(self) {
          clearInterval(self.interval);
        },
        onStop: function(pos, self) { clearInterval(self.interval); },
        loop: false,
        loopCount: false,
      });
      
      setInterval(function() {
        $('.laslo img').attr('src',$('.laslo img').attr('src'))
      },1)

      currentContext = 'battle-finished';

    } 
  });

  Mousetrap.bind('esc', function() {
    if(currentContext == 'act'
       || currentContext == 'item'
       || currentContext == 'mercy'){
      $('.menu-' + currentContext).hide();
      $('.action-option-' + actionIndex).addClass('active');
      $('.menu-act-option').removeClass('active');
      $('.menu-act-option-' + 1).addClass('active');
      $(".menu-act-dialog").hide();
      if (TypedAct != null) {
        TypedAct.destroy();
      }
      TypedAct = null;
      dialogFrame.reset(true);
      actIndex = 1;
      canAct = false;
      hasAct = false;
      currentContext = 'action';
    } 
  });
  
  Mousetrap.bind('right', function() { 
    if(currentContext == 'action'){
      nextAction($(this));
    }else if(currentContext == 'act'){
      nextAct($(this));
    }
  });
  
  Mousetrap.bind('left', function() { 
    if(currentContext == 'action'){
      prevAction($(this));
    } else if(currentContext == 'act'){
      prevAct($(this));
    }
  });
  

  $('.audio-toggle').click(function(){
    $('.audio').attr('src',music);
    $(this).fadeOut();
  });

});