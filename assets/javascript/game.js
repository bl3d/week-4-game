(function() {
  'use strict'; 


  	//set up players
  	var players = {

		oKenobi: {
			name: "Obi-Wan Kenobi",
			id: "Obi_Wan",
			img: "assets/images/obi-wan_kenobi.jpg",
			health: 120,
			attack: 8,
			counter: 15
		},

		lSkywalker: {
			name: "Luke Skywalker",
			id: "Luke",
			img: "assets/images/luke_skywalker.jpg",
			health: 100,
			attack: 14,
			counter: 5
		},

		dSidious: {
			name: "Darth Sidious",
			id: "dSidious",
			img: "assets/images/darth_sidious.jpg",
			health: 150,
			attack: 7,
			counter: 20
		},

		dMaul: {
			name: "Darth Maul",
			id: "dMaul",
			img: "assets/images/darth_maul.jpg",
			health: 180,
			attack: 6,
			counter: 25
		}

  	}





	//main game object/logic
	var sw = {		

	   init: function(){

	   		this.buildPlayers();

	   },

	   buildPlayers: function(){
			$.each( players, function( key, value ) {
		      $('<li id="'+value.id+'" class="player">'+
		        '<div class="name">'+value.name+'</div>'+
		        '<img class="characterImg" src="'+value.img+'" alt="'+value.name+'">'+
		        '<div class="health">'+value.health+'</div>'+
		      '</li>').appendTo('#characterSelectZone');
			});
	   }

	};


	// kick off game 
	sw.init(); 

	










	//user events
	//**************************************************//







}()); 