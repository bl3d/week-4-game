(function() {
  'use strict'; 


  	//set up players
  	var players = {

		oKenobi: {
			name: "Obi-Wan Kenobi",
			id: "Obi_Wan",
			img: "assets/images/obi-wan_kenobi.png",
			health: 120,
			attack: 8,
			counter: 15
		},

		lSkywalker: {
			name: "Luke Skywalker",
			id: "Luke",
			img: "assets/images/luke_skywalker.png",
			health: 100,
			attack: 14,
			counter: 5
		},

		dSidious: {
			name: "Darth Sidious",
			id: "dSidious",
			img: "assets/images/darth_sidious.png",
			health: 150,
			attack: 6,
			counter: 20
		},

		dMaul: {
			name: "Darth Maul",
			id: "dMaul",
			img: "assets/images/darth_maul.png",
			health: 180,
			attack: 5,
			counter: 25
		}

  	}





	//main game object/logic
	var sw = {

	   heroChosen: false,

	   inBattle: false,	

	   attackInProgress: false,	

	   userPlayer: '',

	   currentEnemy: '',

	   playerHealth: '',

	   playerAttack: '',

	   enemyHealth: '',

	   enemyCounter: '',

	   init: function(){

	   		$('#choseEnemyMessage').css({ opacity: 0.0 });
	   		$('#attackBtn').hide();
	   		this.buildPlayers();

	   		$('body').animate({opacity: 1.0}, 1500);

	   },

	   buildPlayers: function(){
			$.each( players, function( key, value ) {
		      $('<li id="'+value.id+'" class="player initial">'+
		        '<div class="name">'+value.name+'</div>'+
		        '<img class="characterImg" src="'+value.img+'" alt="'+value.name+'">'+
		        '<div class="health">'+value.health+'</div>'+
		      '</li>').appendTo('#characterSelectZone');
			});
	   },

	   handlePlayer: function(player){ 

		   	var _this = this;

		   	//if user has not yet chosen a player
		   	if (!_this.heroChosen) {

		   		_this.heroChosen = true;
				$.each( players, function( key, value ) {
					if (value.id === player.attr('id')) {
				   		_this.userPlayer = value; 
				   		_this.playerHealth = value.health; 
				   		_this.playerAttack = value.attack;  
					}; 
				});	   

				player.addClass('chosen');

				//move any player this isn't the chosen one to the attack zone
				$('#characterSelectZone').find('.player').each( function(i, el){
					$(el).removeClass('initial')
					.not(player).addClass('enemy').appendTo('#toAttackZone'); 
				});	

				//fade out chosePlayerMessage
				$('#chosePlayerMessage').stop().animate({ opacity: 0.0, marginBottom: '-40px' }, 500);

		   		//show choseEnemyMessage
		   		$('#choseEnemyMessage').stop().animate({ opacity: 1.0 }, 500);

		   	} else{

		   		//if a battle isn't already underway and player clicked isnt users player
		   		if (!_this.inBattle && (!player.hasClass('chosen'))) {

		   			_this.inBattle = true;  
					$.each( players, function( key, value ) {
						if (value.id === player.attr('id')) {
					   		_this.currentEnemy = value; 
					   		_this.enemyHealth = value.health;
					   		_this.enemyCounter = value.counter;
						}; 
					});	 

		   			//changing this up, move non-selected to enemiesInWaiting holder (if not last enemy)
		   			if ($('.enemy').length > 0) {
		   				$('.enemy').not(player).appendTo('#enemiesInWaiting');
		   				player.addClass('defender');
		   			}else{
		   				//just keep last player here to fight
		   			}		   		

			   		//hide choseEnemyMessage
			   		$('#choseEnemyMessage').stop().animate({ opacity: 0.0 }, 500);

			   		//show attackBtn
			   		$('#attackBtn').stop().css({ display: 'block' }).animate({ opacity: 1.0 }, 500);

		   		};

		   	} 

	   },

	   handleAttack: function(){

	   		var _this = this;
	   		
	   		if (!_this.attackInProgress) {
	   			_this.attackInProgress = true; 

		   		//deduct the enemy health by players attack strength
		   		_this.enemyHealth = _this.enemyHealth - _this.playerAttack;

		   		//if enemy's health is at or below 0 - he dead, remove him 
		   		if (_this.enemyHealth <= 0) {
		   			$('#'+_this.currentEnemy.id).find('.health').text(0); //health shouldn't go below 0;
		   			_this.removeEnemy();
		   		}else{
		   			//enemy counters

		   			$('#'+_this.currentEnemy.id).find('.health').text(_this.enemyHealth);

			   		//reduce the players health by enemy's counter attack strength
			   		_this.playerHealth = _this.playerHealth - _this.enemyCounter;

			   		//if  player health is 0 or below, game over 
			   		if (_this.playerHealth <= 0) {
			   			$('#'+_this.userPlayer.id).find('.health').text(0); //health shouldn't go below 0;

			   			_this.resolveGame('You\'ve been defeated :(');
			   		} else{	
				   		$('#'+_this.userPlayer.id).find('.health').text(_this.playerHealth);		
			   		}
 			
		   		}

		   		// update attackFeedback
		   		$('#attackFeedback').html('You attacked '+_this.currentEnemy.name+' for '+_this.playerAttack+' damage.<br>'+_this.currentEnemy.name+' attacked you back for '+_this.enemyCounter+' damage.');

		   		//increase the players attack strength by it's original attack strength
		   		_this.playerAttack = _this.playerAttack + _this.userPlayer.attack;		   		

		   		_this.attackInProgress = false;

	   		};


	   },

	   removeEnemy: function(){
	   		var _this = this;
	   	    var enemy = $('#'+this.currentEnemy.id);

	   		//remove attackBtn
	   		$('#attackBtn').fadeOut();
	   		$('#attackFeedback').animate({opacity: 0.0}, function(){
	   			$(this).html('').css({opacity: 1.0});
	   		})

	   		//remove enemy
	   		_this.destroyPlayer(enemy);

	   		//if was the last enemy, user won
	   		//else bring back other enemies
			setTimeout(function(){
	   			if ($('.enemy').length > 0) {
	   				$('#enemiesInWaiting').find('.enemy').appendTo('#toAttackZone');
	   				$('#toAttackZone').stop().animate({opacity: 1.0});

			   		//show choseEnemyMessage
			   		$('#choseEnemyMessage').stop().animate({ opacity: 1.0 }, 500);	
			   		   				
	   				_this.inBattle = false; 
	   			}else{
	   				_this.resolveGame('You Win!!');
	   			}				
			}, 1800);  

	   }, 

	   destroyPlayer: function(player){
	   		$('#toAttackZone').stop().animate({opacity: 0.0}, 1750);
	   		player.find('.characterImg').animate({ opacity: 0.0 }, 1000, function(){
	   			player.remove();
	   		});
	   		player.hide( "explode", {pieces: 16 }, 1000 );
	   },

	   resolveGame: function(result){ 
	   		$('#attackFeedback, #attackUI').fadeOut(); 
			setTimeout(function(){
				$('#endOfGameStatus').html(result).fadeIn();
				$('#replayBtn').fadeIn(2000);
			}, 500); 	   	
	   },

	   replayGame: function(){
			$('body').animate({opacity: 0.0}, 2000, function(){
				location.reload();
			});	   	
	   }

	};


	// kick off game 
	sw.init(); 

	










	//user events
	//**************************************************//

	//capture click on a player and determine what to do with it
	$('.player').on('click', function(){
		sw.handlePlayer($(this));
	});

	//handle attackBtn click
	$('#attackBtn').on('click', function(){
		sw.handleAttack();
	});

	//handle replayBtn click
	$('#replayBtn').on('click', function(){
		sw.replayGame();
	});




}()); 